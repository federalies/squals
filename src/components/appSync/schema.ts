import { IRef, IGetAtt, squals, baseSchemas } from '../Template'
import Joi from '@hapi/joi'
import { buildSchema } from 'graphql'

export class AppSyncSchema implements squals {
  name: string
  Type = 'AWS::AppSync::GraphQLSchema'
  Properties: ISchema_out

  constructor (i: ISchema_in | AppSyncSchema) {
    this.name = ''
    this.Properties = { ApiId: '' }
  }

  static fromJSON (o: string | object | ISchema_in): AppSyncSchema {
    if(typeof o === 'string') o = JSON.parse(o)
    return this.validate(o as ISchema_in)
  }

  static validate (s: ISchema_in | AppSyncSchema): AppSyncSchema {
    // validate the ApiId is not ''
    // validate the Defintion with buildSchema
    const schemes ={
      strRefGet : [Joi.string(),baseSchemas.Ref],
      strRefGetAttBuffer : [Joi.string(), Joi.binary(), baseSchemas.GetAtt, baseSchemas.Ref, ]
    }

    if (s instanceof AppSyncSchema) {
      const schema = Joi.object({
        name: Joi.string().min(2),
        Type:'AWS::AppSync::GraphQLSchema',
        Properties: Joi.object({
          ApiId: Joi.alternatives().try(...schemes.strRefGet).required(),
          Definition: Joi.alternatives().try(...schemes.strRefGetAttBuffer),
          DefinitionS3Location: Joi.alternatives().try(...schemes.strRefGetAttBuffer),
        }).xor('Definition', 'DefinitionS3Location')
      })

      const err = schema.validate(s).error
      if(err) throw new Error(`Validation Error Occured in the AppSyncSchema Class`)
      
      return new AppSyncSchema(s)
    
    } else {
      s = s as ISchema_in
      const {apiId} = s
      if(apiId){
        s = s as ISchema_in_min

        const err = Joi.object({
          apiId: Joi.alternatives().try(...schemes.strRefGet).required(),
          def: Joi.alternatives().try(...schemes.strRefGetAttBuffer).required()
        }).validate(s).error

        if(err) throw new Error(`Validation Error Occured in the AppSyncSchema Class`)
        return new AppSyncSchema(s)
      }else{

        s = s as ISchema_in_JSON
        const _name = Object.keys(s)[0]

        const errName = Joi.string().min(2).validate(s).error
        const errBody = Joi.object({
          apiId: Joi.alternatives().try(...schemes.strRefGet).required(),
          def: Joi.alternatives().try(...schemes.strRefGetAttBuffer).required()
        }).validate(s).error
  
        if(errBody|| errName) throw new Error(`Validation Error Occured in the AppSyncSchema Class`)
        return new AppSyncSchema(s)
      }
    }
    
  }
  toJSON (): JSON[] {
    AppSyncSchema.validate(this)

    return [
      {[this.name]:
        {
          Type:'AWS::AppSync::GraphQLSchema',
          Properties: this.Properties
        }
      } as unknown as JSON
    ]
  }
  Ref():IRef{
    return {Ref: this.name}
  }
}

type ISchema_in = ISchema_in_min | ISchema_in_JSON

interface ISchema_in_min {
  apiId: string | IRef
  def: string | IRef | Buffer // s3://string
}

interface ISchema_in_JSON {
  [name: string]: {
    apiId: string | IRef
    def: string | IRef | Buffer // s3://string
  }
}

interface ISchema_out {
  ApiId: string | IRef | IGetAtt
  Definition?: string |  Buffer | IRef | IGetAtt
  DefinitionS3Location?: string | IRef | IGetAtt
}