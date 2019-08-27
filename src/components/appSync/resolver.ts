import {
  IRef,
  IGetAtt,
  IStrRefGetAtt,
  squals,
  baseSchemas,
  struct,
  genComponentName,
  validatorGeneric
} from '../Template'
import { AppSyncApi } from './api'
import { AppSyncDataSource, IAppSyncDataSource_min } from '.'
import { verifyIfThen, ifPathEq, has } from '../../utils/validations/objectCheck'

export class AppSyncResolver implements squals {
  name: string
  Type = 'AWS::AppSync::Resolver'
  Properties: AppSyncResolver_Props

  constructor (i: IAppSyncResolver_min, api?: AppSyncApi) {
    this.name = i.name || genComponentName()
    this.Properties = {
      ApiId: api ? api.ApiId() : i.api ? i.api : '< StillNeedsToBeLinked >',
      Kind: i.kind ? i.kind : 'UNIT',
      FieldName: i.field,
      TypeName: i.type
    }
    if (i.source) this.Properties.DataSourceName = i.source
    if (i.pipelineFns) this.Properties.PipelineConfig = { Functions: i.pipelineFns }
    // @todo Apache Velocity templates are sitting in string formats unverfied
    if (i.reqTempl) this.Properties.RequestMappingTemplate = i.reqTempl
    if (i.reqTemplS3Loc) this.Properties.RequestMappingTemplateS3Location = i.reqTemplS3Loc
    if (i.resTempl) this.Properties.ResponseMappingTemplate = i.resTempl
    if (i.resTemplS3Loc) this.Properties.ResponseMappingTemplateS3Location = i.resTemplS3Loc
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
    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::AppSync::Resolver'),
          Properties: struct({
            ApiId: 'StrRefGetAtt',
            FieldName: 'StrRef',
            TypeName: 'StrRef',
            Kind: struct.optional(struct.enum(['UNIT', 'PIPELINE'])),
            DataSourceName: 'StrRefGetAtt?',
            PipelineConfig: struct.optional({
              Functions: struct(['StrRef'])
            }),
            RequestMappingTemplate: 'StrRef?',
            RequestMappingTemplateS3Location: 'StrRef?',
            ResponseMappingTemplate: 'StrRef?',
            ResponseMappingTemplateS3Location: 'StrRef?'
          })
        })
      ])
    )(i)
    const name = Object.keys(i)[0]
    const interdeps = verifyIfThen(ifPathEq('Kind', 'PIPELINE'), has('PipelineConfig.Functions'))
    // add interdeps as a flowRight function - and `verify(ifHas(requestTempl), verifySyntax(string, compileFunction))`
    const props = interdeps(i[name].Properties)
    const ret = new AppSyncResolver({
      field: props.FieldName,
      type: props.TypeName
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
    const interdep = verifyIfThen(ifPathEq('kind', 'pipeline'), has('pipelineFns'))
    return new AppSyncResolver(interdep(i))
  }
  static validate (i: string | object): AppSyncResolver {
    return validatorGeneric<AppSyncResolver>(i as squals, AppSyncResolver)
  }
  _name (n: string) {
    this.name = n
    return this
  }
  linkDataSource (source: IAppSyncDataSource_min | AppSyncDataSource): AppSyncResolver {
    throw new Error(`not implemented yet`)
  }
  fieldName (s: string | IRef) {
    this.Properties.FieldName = s
    return this
  }
  typeName (s: string | IRef) {
    this.Properties.TypeName = s
    return this
  }

  toJSON (): AppSyncResolver_json {
    return {
      [this.name]: {
        Type: 'AWS::AppSync::Resolver',
        Properties: this.Properties
      }
    }
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

// #region interfaces
export interface IAppSyncResolver_min {
  name?: string
  api?: IStrRefGetAtt
  field: IStrRefGetAtt
  type: IStrRefGetAtt
  kind?: 'UNIT' | 'PIPELINE'
  source?: IStrRefGetAtt
  pipelineFns?: IStrRefGetAtt[]
  reqTempl?: IStrRefGetAtt
  reqTemplS3Loc?: IStrRefGetAtt
  resTempl?: IStrRefGetAtt
  resTemplS3Loc?: IStrRefGetAtt
}

interface AppSyncResolver_json {
  [name: string]: {
    Type: 'AWS::AppSync::Resolver'
    Properties: AppSyncResolver_Props
  }
}

interface AppSyncResolver_Props {
  ApiId: IStrRefGetAtt
  FieldName: IStrRefGetAtt
  TypeName: IStrRefGetAtt
  Kind?: 'UNIT' | 'PIPELINE'
  DataSourceName?: IStrRefGetAtt
  PipelineConfig?: {
    Functions: IStrRefGetAtt[]
  }
  RequestMappingTemplate?: IStrRefGetAtt
  RequestMappingTemplateS3Location?: IStrRefGetAtt
  ResponseMappingTemplate?: IStrRefGetAtt
  ResponseMappingTemplateS3Location?: IStrRefGetAtt
}

// #endregion interfaces
