import { IRef, IGetAtt, squals, genComponentName, baseSchemas, validatorGeneric } from '../Template'
import { AppSyncGraphQlApi } from './api'
import { struct } from 'superstruct'

export class AppSyncApiKey implements squals {
  name: string
  Type = 'AWS::AppSync::ApiKey'
  Properties: AppSyncApiKey_Properties
  _linkedApi?: AppSyncGraphQlApi

  constructor (k?: AppSyncApiKey_in, api?: AppSyncGraphQlApi) {
    this._linkedApi = api
    this.name = k && k.name ? k.name : genComponentName()
    this.Properties = { ApiId: api ? api.ApiId() : '' }
    this.Properties.Description = k && k.desc ? k.desc : ''
  }

  static from (i: string | object): AppSyncApiKey {
    return AppSyncApiKey.validate(i)
  }
  static fromString (i: string): AppSyncApiKey {
    return AppSyncApiKey.from(JSON.parse(i))
  }
  static fromJS (i: object): AppSyncApiKey {
    return AppSyncApiKey.validateJS(i as AppSyncApiKey_in)
  }
  static fromJSON (o: object): AppSyncApiKey {
    return AppSyncApiKey.validateJSON(o as IAppSyncApiKey_json)
  }
  private static fromSDK (i: object): AppSyncApiKey {
    // make this public - after 0.1 launches
    throw new Error('not implemented yet')
  }
  static validate (i: string | object): AppSyncApiKey {
    return validatorGeneric<AppSyncApiKey>(i as squals, AppSyncApiKey)
  }

  static validateJS (i: AppSyncApiKey_in): AppSyncApiKey {
    struct({
      name: 'string?',
      desc: 'string?',
      exp: 'number?'
    })(i)

    const ret = new AppSyncApiKey()
    ret.name = i.name || genComponentName()
    ret.Properties = {
      ApiId: '',
      Description: i.desc,
      Expires: i.exp
    }
    return ret
  }

  static validateJSON (i: IAppSyncApiKey_json): AppSyncApiKey {
    struct(
      struct.dict([
        'string',
        struct({
          Type: struct.literal('AWS::AppSync::ApiKey'),
          Properties: struct({
            ApiId: struct.union([
              'string',
              struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) }),
              struct({ Ref: 'string' })
            ]),
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

  toJSON (): object[] {
    const retElem = {
      [this.name]: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: this.Properties
      }
    } as IAppSyncApiKey_json

    return [AppSyncApiKey.validateJSON(retElem)]
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

interface AppSyncApiKey_in {
  name?: string
  desc?: string
  exp?: number
}

interface IAppSyncApiKey_json {
  [name: string]: {
    Type: 'AWS::AppSync::ApiKey'
    Properties: AppSyncApiKey_Properties
  }
}
interface AppSyncApiKey_Properties {
  ApiId: string | IRef | IGetAtt
  Description?: string
  Expires?: number
}
