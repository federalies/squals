import { IRef, IGetAtt, squals, baseSchemas } from '../Template'

import Joi from '@hapi/joi'

export class AppSyncResolver implements squals {
  name: string
  Type = 'AWS::AppSync::Resolver'
  Properties: {
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
  constructor (i: AppSyncResolver_min | AppSyncResolver) {
    this.name = ''
    this.Properties = { ApiId: '', FieldName: '', Kind: 'UNIT', TypeName: '' }
  }
  linkDataSource () {}
  static fromJSON (i: string | object) {}
  toJSON (): JSON[] {
    return [] as unknown as JSON[]
  }
  validate (): AppSyncResolver {
    const stringOrRefSchema = Joi.alternatives().try(Joi.string(), baseSchemas.Ref)
    const schematryStringGetAttRef = Joi.alternatives().try(
      Joi.string(),
      baseSchemas.GetAtt,
      baseSchemas.Ref
    )

    // besure to sync this with the class/type/interrface
    const schema = Joi.object({
      name: Joi.string().min(2),
      Type: Joi.string().regex(new RegExp('AWS::AppSync::Resolver'), 'AppSyncResolver Type'),
      Properties: Joi.object({
        ApiId: schematryStringGetAttRef.required(),
        FieldName: stringOrRefSchema.optional(),
        TypeName: stringOrRefSchema.optional(),
        Kind: Joi.string(), //  'UNIT' | 'PIPELINE'
        DataSourceName: stringOrRefSchema.optional(),
        PipelineConfig: Joi.object({
          Functions: Joi.array().items(stringOrRefSchema)
        }).optional(),
        RequestMappingTemplate: stringOrRefSchema.optional(),
        RequestMappingTemplateS3Location: stringOrRefSchema.optional(),
        ResponseMappingTemplate: stringOrRefSchema.optional(),
        ResponseMappingTemplateS3Location: stringOrRefSchema.optional()
      })
    })
    const err = schema.validate(this).error
    if (err) {
      throw new Error(`AppSyncResolver was not valid see: ${err}`)
    }
    return this
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

interface AppSyncResolver_min {
  ApiId: string | IRef
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
