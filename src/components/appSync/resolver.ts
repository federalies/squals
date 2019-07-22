import { IRef, IGetAtt, squals, baseSchemas, genComponentName, validatorGeneric } from '../Template'
import { AppSyncGraphQlApi } from './api'
import { struct } from 'superstruct'

export class AppSyncResolver implements squals {
  name: string
  Type = 'AWS::AppSync::Resolver'
  Properties: AppSyncResolver_Props
  constructor (i: IAppSyncResolver_min, api?: AppSyncGraphQlApi) {
    this.name = i.name || genComponentName()
    this.Properties = { 
      ApiId: api? api.ApiId() : i.api ? i.api : '< linkMe >',
      FieldName: i.field, 
      TypeName: i.type, 
      Kind: 'UNIT' }
  }
  static fromString (i: string): AppSyncResolver {
    return AppSyncResolver.from(JSON.parse(i))
  }
  static fromJSON (i: object): AppSyncResolver {
    return AppSyncResolver.validateJSON(i as AppSyncResolver_json)
  }
  static fromJS (i: object): AppSyncResolver {
    return AppSyncResolver.validateJS(i as IAppSyncResolver_min)
  }
  static from (i: string | object): AppSyncResolver {
    return AppSyncResolver.validate(i)
  }
  static validateJSON (i: AppSyncResolver_json): AppSyncResolver {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strRef = struct.union(['string', ref])
    const strGetAttRef = struct.union(['string', getAtt, ref])

    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::AppSync::Resolver'),
          Properties: struct({
            ApiId: strGetAttRef,
            FieldName: strRef,
            TypeName: strRef,
            Kind: struct.optional(struct.enum(['UNIT', 'PIPELINE'])),
            DataSourceName: struct.optional(strRef),
            PipelineConfig: struct.optional({
              Functions: struct([strRef])
            }),
            RequestMappingTemplate: struct.optional(strRef),
            RequestMappingTemplateS3Location: struct.optional(strRef),
            ResponseMappingTemplate: struct.optional(strRef),
            ResponseMappingTemplateS3Location: struct.optional(strRef)
          })
        })
      ])
    )(i)

    const name = Object.keys(i)[0]
    const ret = new AppSyncResolver({
      field: i[name].Properties.FieldName,
      type: i[name].Properties.TypeName
    })
    ret.Properties = i[name].Properties
    ret.name = name
    return ret
  }
  static validateJS (i: IAppSyncResolver_min): AppSyncResolver {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strRef = struct.union(['string', ref])
    const strGetAttRef = struct.union(['string', getAtt, ref])
    struct({
      name: 'string?',
      api: struct.optional(strGetAttRef),
      field: strRef,
      type: strRef,
      kind: struct.optional(struct.enum(['UNIT', 'PIPELINE'])),
      source: struct.optional(strRef),
      pipelineFns: struct.optional(struct([strRef])),
      reqTempl: struct.optional(strRef),
      reqTemplS3Loc: struct.optional(strRef),
      resTempl: struct.optional(strRef),
      resTemplS3Loc: struct.optional(strRef)
    })(i)
    return new AppSyncResolver(i)
  }
  static validate (i: string | object): AppSyncResolver {
    return validatorGeneric<AppSyncResolver>(i as squals, AppSyncResolver)
  }
  linkDataSource (): AppSyncResolver {
    throw new Error()
    return new AppSyncResolver({ field: '_', type: '_' })
  }
  toJSON (): object[] {
    return [
      {
        [this.name]: {
          Type: 'AWS::AppSync::Resolver',
          Properties: this.Properties
        }
      } as AppSyncResolver_json
    ]
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  FieldName (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'FieldName'] }
  }
  ResolverArn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'ResolverName'] }
  }
  TypeName (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'TypeName'] }
  }
}

export interface IAppSyncResolver_min {
  name?: string
  api?: string | IRef | IGetAtt
  field: string | IRef
  type: string | IRef
  kind?: 'UNIT' | 'PIPELINE'
  source?: string | IRef
  pipelineFns?: (string | IRef)[]
  reqTempl?: string | IRef
  reqTemplS3Loc?: string | IRef
  resTempl?: string | IRef
  resTemplS3Loc?: string | IRef
}

interface AppSyncResolver_json {
  [name: string]: {
    Type: 'AWS::AppSync::Resolver'
    Properties: AppSyncResolver_Props
  }
}

interface AppSyncResolver_Props {
  ApiId: string | IRef | IGetAtt
  FieldName: string | IRef
  TypeName: string | IRef
  Kind?: 'UNIT' | 'PIPELINE'
  DataSourceName?: string | IRef
  PipelineConfig?: {
    Functions: (string | IRef)[]
  }
  RequestMappingTemplate?: string | IRef
  RequestMappingTemplateS3Location?: string | IRef
  ResponseMappingTemplate?: string | IRef
  ResponseMappingTemplateS3Location?: string | IRef
}
