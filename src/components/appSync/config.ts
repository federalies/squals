import { IRef, IGetAtt, squals, baseSchemas, genComponentName } from '../Template'
import Joi from '@hapi/joi'

export class AppSyncFuncConfig implements squals {
  name: string
  Type = 'AWS::AppSync::FunctionConfiguration'
  Properties: {
    Name: string | IRef
    ApiId: string | IRef | IGetAtt
    DataSourceName: string | IRef | IGetAtt
    FunctionVersion: '2018-05-29'
    Description?: string | IRef
    RequestMappingTemplate?: string | IRef
    RequestMappingTemplateS3Location?: string | IRef
    ResponseMappingTemplate?: string | IRef
    ResponseMappingTemplateS3Location?: string | IRef
  }

  constructor (data: AppSyncFuncConfig_injson | AppSyncFuncConfig) {
    if (data instanceof AppSyncFuncConfig) {
      this.name = data.name
      this.Properties = data.Properties
    } else {
      this.name = Object.keys(data)[0]
      this.Properties = {
        ApiId: data[this.name].apiId,
        Name: data[this.name].name,
        DataSourceName: data[this.name].sourceName,
        FunctionVersion: '2018-05-29'
      }
      if (data[this.name].reqTempl) {
        this.Properties.RequestMappingTemplate = data[this.name].reqTempl
      }
      if (data[this.name].reqTemplS3Loc) {
        this.Properties.RequestMappingTemplate = data[this.name].reqTemplS3Loc
      }
      if (data[this.name].resTempl) {
        this.Properties.RequestMappingTemplate = data[this.name].resTempl
      }
      if (data[this.name].resTemplS3Loc) {
        this.Properties.RequestMappingTemplate = data[this.name].resTemplS3Loc
      }
    }
  }

  static validate (o: { [name: string]: object } | AppSyncFuncConfig): AppSyncFuncConfig {
    // helpers shorthand vars
    const strRefSchema = Joi.alternatives().try(Joi.string(), baseSchemas.Ref)
    const strGetAttRefSchema = Joi.alternatives().try(
      Joi.string(),
      baseSchemas.GetAtt,
      baseSchemas.Ref
    )
    // setup schemas
    const nameSchema = Joi.string()
      .min(2)
      .required()

    // validate
    let errName: Joi.ValidationError
    let errBody: Joi.ValidationError

    if (o instanceof AppSyncFuncConfig) {
      const propertySchema = Joi.object({
        Name: strGetAttRefSchema.required(),
        ApiId: strGetAttRefSchema.required(),
        DataSourceName: strGetAttRefSchema.required(),
        FunctionVersion: Joi.string()
          .regex(new RegExp('2018-05-29'), 'Request-Mapping-Version')
          .required(),
        Description: strRefSchema.optional(),
        RequestMappingTemplate: strRefSchema.optional(),
        RequestMappingTemplateS3Location: strRefSchema.optional(),
        ResponseMappingTemplate: strRefSchema.optional(),
        ResponseMappingTemplateS3Location: strRefSchema.optional()
      })

      errName = nameSchema.validate(o.name).error
      errBody = propertySchema.validate(o.Properties).error
    } else {
      o = (o as unknown) as AppSyncFuncConfig_injson
      const _name = Object.keys(o)[0]

      const propertyLowerCaseSchema = Joi.object({
        name: strGetAttRefSchema.required(),
        apiId: strGetAttRefSchema.required(),
        sourceName: strGetAttRefSchema.required(),
        v: Joi.string()
          .regex(new RegExp('2018-05-29'), 'Request-Mapping-Version')
          .required(),
        desc: strRefSchema.optional(),
        reqTempl: strRefSchema.optional(),
        reqTemplS3Loc: strRefSchema.optional(),
        resTempl: strRefSchema.optional(),
        resTemplS3Loc: strRefSchema.optional()
      })

      errName = nameSchema.validate(_name).error
      errBody = propertyLowerCaseSchema.validate(o[_name]).error
    }

    if (errName || errBody) {
      throw new Error(`AppSyncFuncConfig could did not have a valid data structure `)
    }
    return new AppSyncFuncConfig(o as AppSyncFuncConfig_injson | AppSyncFuncConfig)
  }
  static fromJSON (o: object | string): AppSyncFuncConfig {
    if (typeof o === 'string') o = JSON.parse(o)
    return this.validate(o as { [name: string]: object })
  }
  toJSON (): object[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::AppSync::FunctionConfiguration',
          Properties: this.Properties
        }
      } as AppSyncFuncConfig_json
    ]
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  DataSourceName (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'DataSourceName'] }
  }
  FunctionArn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'FunctionArn'] }
  }
  FunctionId (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'FunctionId'] }
  }
  Name (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Name'] }
  }
}

interface AppSyncFuncConfig_json {
  [name: string]: {
    Type: 'AWS::AppSync::FunctionConfiguration'
    Properties: AppSyncFuncConfig_out
  }
}
interface AppSyncFuncConfig_injson {
  [compRefName: string]: AppSyncFuncConfig_in
}

interface AppSyncFuncConfig_in {
  name: string | IRef
  apiId: string | IRef | IGetAtt
  sourceName: string | IRef | IGetAtt
  v: '2018-05-29'
  desc?: string | IRef
  reqTempl?: string | IRef
  reqTemplS3Loc?: string | IRef
  resTempl?: string | IRef
  resTemplS3Loc?: string | IRef
}

interface AppSyncFuncConfig_out {
  Name: string | IRef
  ApiId: string | IRef | IGetAtt
  DataSourceName: string | IRef | IGetAtt
  FunctionVersion: '2018-05-29'
  Description?: string | IRef
  RequestMappingTemplate?: string | IRef
  RequestMappingTemplateS3Location?: string | IRef
  ResponseMappingTemplate?: string | IRef
  ResponseMappingTemplateS3Location?: string | IRef
}
