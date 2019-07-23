import { IRef, IGetAtt, squals, genComponentName, baseSchemas, validatorGeneric } from '../Template'
import { AppSyncApi } from './api'
import { struct } from 'superstruct'

export class AppSyncApiKey implements squals {
  name: string
  Type = 'AWS::AppSync::ApiKey'
  Properties: AppSyncApiKey_Properties
  // _linkedApi?: AppSyncGraphQlApi

  constructor (k?: IAppSyncApiKey_min, api?: AppSyncApi) {
    // this._linkedApi = api
    this.name = k && k.name ? k.name : genComponentName()
    this.Properties = {
      ApiId: api ? api.ApiId() : k && k.api ? k.api : '< StillNeedsToBeLinked >'
    }
    this.Properties.Description = k ? k.desc : undefined
    this.Properties.Expires = k ? k.exp : undefined
  }

  static from (i: string | object): AppSyncApiKey {
    return AppSyncApiKey.validate(i)
  }
  static fromString (i: string): AppSyncApiKey {
    return AppSyncApiKey.from(JSON.parse(i))
  }
  static fromJS (i: object): AppSyncApiKey {
    return AppSyncApiKey.validateJS(i as IAppSyncApiKey_min)
  }
  static fromJSON (o: object): AppSyncApiKey {
    return AppSyncApiKey.validateJSON(o as IAppSyncApiKey_json)
  }
  /* istanbul ignore next */
  private static fromSDK (i: object): AppSyncApiKey {
    // make this public - after 0.1
    /* istanbul ignore next */
    throw new Error('not implemented yet')
  }
  static validate (i: string | object): AppSyncApiKey {
    return validatorGeneric<AppSyncApiKey>(i as squals, AppSyncApiKey)
  }

  static validateJS (i: IAppSyncApiKey_min): AppSyncApiKey {
    struct(
      struct.interface({
        api: struct.optional(baseSchemas.StrRefGetAtt),
        name: 'string?',
        desc: 'string?',
        exp: 'number?'
      })
    )(i)

    const ret = new AppSyncApiKey()
    ret.name = i.name || genComponentName()
    ret.Properties = {
      ApiId: i.api ? i.api : '< StillNeedsToBeLinked >',
      Description: i.desc,
      Expires: i.exp
    }
    return ret
  }

  static validateJSON (i: IAppSyncApiKey_json): AppSyncApiKey {
    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::AppSync::ApiKey'),
          Properties: struct({
            ApiId: baseSchemas.StrRefGetAtt,
            Description: 'string?',
            Expires: 'number?'
          })
        })
      ])
    )(i)

    const ret = new AppSyncApiKey()
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  api (i: string | IRef | IGetAtt) {
    this.Properties.ApiId = i
    return this
  }

  description (d: string) {
    this.Properties.Description = d
    return this
  }

  expires (e: number) {
    this.Properties.Expires = e
    return this
  }

  toJSON (): IAppSyncApiKey_json[] {
    const retElem = {
      [this.name]: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: this.Properties
      }
    } as IAppSyncApiKey_json

    AppSyncApiKey.validateJSON(retElem)
    return [retElem]
  }

  Ref (): IRef {
    return { Ref: this.name }
  }
  ApiKey (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'ApiKey'] }
  }
  Arn (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
}

export interface IAppSyncApiKey_min {
  name?: string
  api?: string | IRef | IGetAtt
  desc?: string
  exp?: number
}

export interface IAppSyncApiKey_json {
  [name: string]: {
    Type: 'AWS::AppSync::ApiKey'
    Properties: AppSyncApiKey_Properties
  }
}
export interface AppSyncApiKey_Properties {
  ApiId: string | IRef | IGetAtt
  Description?: string
  Expires?: number
}
