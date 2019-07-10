import { IRef, IGetAtt, squals, genComponentName , baseSchemas} from '../Template'
import { AppSyncGraphQlApi } from './api'
import Joi from '@hapi/joi'

export class AppSyncApiKey implements squals {
  name: string
  Type = 'AWS::AppSync::ApiKey'
  Properties: AppSyncApiKey_Properties

  constructor (k: AppSyncApiKey_in | AppSyncApiKey, api?: AppSyncGraphQlApi) {
    if (k instanceof AppSyncApiKey) {
      this.name = k.name
      this.Properties = k.Properties
    }else{
      const {apiId} = k
      if(apiId){
        k=k as AppSyncApiKey_inData
        this.name = genComponentName()
        this.Properties = {
          ApiId: k.apiId,
          Description: k.desc,
          Expires: k.exp
        }
      }else{
        k=k as AppSyncApiKey_in_json
        this.name = Object.keys(k)[0]
        this.Properties = {
            ApiId: k[this.name].apiId,
            Description: k[this.name].desc,
            Expires: k[this.name].exp
          }
      }
    }
  }
  
  static validate (s: AppSyncApiKey_in | AppSyncApiKey ): AppSyncApiKey {
    const unions = {
      strRefGet : [Joi.string(), baseSchemas.Ref, baseSchemas.GetAtt]
    }
    
    if (s instanceof AppSyncApiKey) {
      s = s as AppSyncApiKey
      const err = Joi.object().keys({
        name: Joi.string().min(2),
        Type: 'AWS::AppSync::ApiKey',
        Properties: Joi.object({
          ApiId: Joi.alternatives().try(...unions.strRefGet).required(),
          Description: Joi.string().optional(),
          Expires: Joi.number().optional(),
        })
      }).validate(s)
      return new AppSyncApiKey(s)

    } else {
      const {apiId} = s
      if(apiId){
        s = s as AppSyncApiKey_inData
        const err = Joi.object({
          apiId: Joi.alternatives().try(...unions.strRefGet).required(),
          desc: Joi.string().optional(),
          exp: Joi.number().optional(),
        }).validate(s)
        return new AppSyncApiKey(s)

      }else{
        s = s as AppSyncApiKey_in_json
        const _name = Object.keys(s)[0]
        const errName = Joi.string().min(2).validate(_name)
        const errBody = Joi.object().keys({
          name: Joi.string().min(2),
          Type: 'AWS::AppSync::ApiKey',
          Properties: Joi.object({
            ApiId: Joi.alternatives().try(...unions.strRefGet).required(),
            Description: Joi.string().optional(),
            Expires: Joi.number().optional(),
          })
        }).validate(s[_name])
        return new AppSyncApiKey(s)

      } 
    }
  }

  static fromJSON (o: string | object): AppSyncApiKey {
    if (typeof o === 'string') o = JSON.parse(o)
    return AppSyncApiKey.validate(o as AppSyncApiKey_in | AppSyncApiKey )
  }

  toJSON (): JSON[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::AppSync::ApiKey',
          Properties: this.Properties
        }
      } as IAppSyncApiKey_json as unknown as JSON,
    ]
  }

  Ref ():IRef {
    return {Ref: this.name }
  }
  ApiKey ():IGetAtt {
    return {'Fn::GetAtt':[this.name,'ApiKey' ]}
  }
  Arn ():IGetAtt {
    return {'Fn::GetAtt':[this.name, 'Arn']}
  }
}

type AppSyncApiKey_in = AppSyncApiKey_in_json | AppSyncApiKey_inData

interface AppSyncApiKey_in_json {
  [name:string]:AppSyncApiKey_inData
}
interface AppSyncApiKey_inData {
  apiId: string | IRef | IGetAtt
  desc?: string
  exp?: number
}

interface IAppSyncApiKey_json {
  [name: string]:{
    Type : 'AWS::AppSync::ApiKey'
    Properties: AppSyncApiKey_Properties
  }
}
interface AppSyncApiKey_Properties  {
  ApiId: string | IRef | IGetAtt
  Description?: string
  Expires?: number
}
