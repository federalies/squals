import { IRef, IGetAtt, squals, baseSchemas, genComponentName } from '../Template'
import { AppSyncGraphQlApi } from './api'

import { struct } from 'superstruct'
import { flowRight } from 'lodash-es'

export class AppSyncFuncConfig implements squals {
  name: string
  Type = 'AWS::AppSync::FunctionConfiguration'
  Properties: AppSyncFuncConfig_props

  constructor (data: AppSyncFuncConfig_in | AppSyncFuncConfig, api?: AppSyncGraphQlApi) {
    if (data instanceof AppSyncFuncConfig) {
      const ret = AppSyncFuncConfig.from(data)
      this.name = ret.name
      this.Properties = ret.Properties
    }

    if (data instanceof AppSyncFuncConfig) {
      this.name = data.name
      this.Properties = data.Properties
    } else {
      this.name = Object.keys(data)[0]
      this.Properties = {
        ApiId: '',
        Name: data.name,
        DataSourceName: data.sourceName,
        FunctionVersion: '2018-05-29'
      }
      if (data.reqTempl) {
        this.Properties.RequestMappingTemplate = data.reqTempl
      }
      if (data.reqTemplS3Loc) {
        this.Properties.RequestMappingTemplate = data.reqTemplS3Loc
      }
      if (data.resTempl) {
        this.Properties.RequestMappingTemplate = data.resTempl
      }
      if (data.resTemplS3Loc) {
        this.Properties.RequestMappingTemplate = data.resTemplS3Loc
      }
    }
  }
  static from (i: string | object): AppSyncFuncConfig {
    return typeof i === 'string'
      ? AppSyncFuncConfig.fromString(i)
      : !(i instanceof AppSyncFuncConfig)
        ? AppSyncFuncConfig.validate(i as AppSyncFuncConfig_json)
        : new AppSyncFuncConfig(i)
  }

  static fromJS (i: object): AppSyncFuncConfig {
    return AppSyncFuncConfig.validateJS(i as AppSyncFuncConfig_in)
  }

  static fromString (o: string): AppSyncFuncConfig {
    return AppSyncFuncConfig.validate(JSON.parse(o))
  }

  static fromJSON (o: object): AppSyncFuncConfig {
    return this.validateJSON(o as AppSyncFuncConfig_json)
  }

  private static fromSDK (o: object) {
    return new Error('not implemented yet - will be public once implemented')
  }

  private static validateJS (o: AppSyncFuncConfig_in): AppSyncFuncConfig {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))
    const optUnion = flowRight(
      struct.optional,
      struct.union
    )
    const optliteral = flowRight(
      struct.optional,
      struct.literal
    )
    struct({
      name: strGetAttRef,
      sourceName: strGetAttRef,
      v: optliteral('2018-05-29'),
      desc: optUnion(['string', ref]),
      reqTempl: optUnion(['string', ref]),
      reqTemplS3Loc: optUnion(['string', ref]),
      resTempl: optUnion(['string', ref]),
      resTemplS3Loc: struct.optional(struct.union(['string', ref]))
    })(o)

    return new AppSyncFuncConfig(o)
  }

  private static validateJSON (o: AppSyncFuncConfig_json): AppSyncFuncConfig {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))

    struct(
      struct.dict([
        'string', // component name
        struct.interface({
          Type: struct.literal('AWS::AppSync::FunctionConfiguration'),
          Properties: struct({
            Name: strGetAttRef,
            ApiId: strGetAttRef,
            DataSourceName: strGetAttRef,
            FunctionVersion: struct.literal('2018-05-29'),
            Description: struct.optional(struct.union(['string', ref])),
            RequestMappingTemplate: struct.optional(struct.union(['string', ref])),
            RequestMappingTemplateS3Location: struct.optional(struct.union(['string', ref])),
            ResponseMappingTemplate: struct.optional(struct.union(['string', ref])),
            ResponseMappingTemplateS3Location: struct.optional(struct.union(['string', ref]))
          })
          // `struct` does not yet support conjoint / conditional assertions
          // @ref <https://github.com/ianstormtaylor/superstruct/issues/123>
        })
      ])
    )(o)

    const _name = Object.keys(o)[0]

    const ret = new AppSyncFuncConfig({
      name: _name,
      sourceName: o[_name].Properties.DataSourceName,
      desc: o[_name].Properties.Description,
      reqTempl: o[_name].Properties.RequestMappingTemplate,
      reqTemplS3Loc: o[_name].Properties.RequestMappingTemplateS3Location,
      resTempl: o[_name].Properties.ResponseMappingTemplate,
      resTemplS3Loc: o[_name].Properties.ResponseMappingTemplateS3Location
    })
    ret.Properties = o[_name].Properties
    return ret
  }

  static validate (o: object | AppSyncFuncConfig): AppSyncFuncConfig {
    const _name = Object.keys(o)[0]
    const { Type, Properties } = (o as AppSyncFuncConfig_json)[_name]
    if (Type && Properties) {
      return AppSyncFuncConfig.validateJSON(o as AppSyncFuncConfig_json)
    } else {
      return AppSyncFuncConfig.validateJS(o as AppSyncFuncConfig_in)
    }
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

export interface AppSyncFuncConfig_json {
  [name: string]: {
    Type: 'AWS::AppSync::FunctionConfiguration'
    Properties: AppSyncFuncConfig_props
  }
}

export interface AppSyncFuncConfig_in {
  name: string | IRef | IGetAtt
  // api handled by component
  sourceName: string | IRef | IGetAtt
  v?: '2018-05-29'
  desc?: string | IRef
  reqTempl?: string | IRef
  reqTemplS3Loc?: string | IRef
  resTempl?: string | IRef
  resTemplS3Loc?: string | IRef
}

interface AppSyncFuncConfig_props {
  Name: string | IRef | IGetAtt
  ApiId: string | IRef | IGetAtt
  DataSourceName: string | IRef | IGetAtt
  FunctionVersion: '2018-05-29'
  Description?: string | IRef
  RequestMappingTemplate?: string | IRef
  RequestMappingTemplateS3Location?: string | IRef
  ResponseMappingTemplate?: string | IRef
  ResponseMappingTemplateS3Location?: string | IRef
}
