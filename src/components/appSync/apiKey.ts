import { IRef, IGetAtt, squals, genComponentName, baseSchemas } from '../Template'
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
    if (i instanceof AppSyncApiKey) {
      const ret = new AppSyncApiKey()
      ret.name = i.name
      ret._linkedApi = i._linkedApi
      ret.Properties = i.Properties
      return ret
    } else if (typeof i === 'string') {
      return AppSyncApiKey.fromString(i)
    } else if (
      /* exported JSON? */
      Object.keys(i).length === 1 &&
      'Type' in (i as IAppSyncApiKey_json)[Object.keys(i)[0]]
    ) {
      const o = i as IAppSyncApiKey_json
      const ret = new AppSyncApiKey()
      ret.name = Object.keys(o)[0]
      ret.Properties = o[ret.name].Properties
      return ret
    } else {
      const o = i as AppSyncApiKey_in
      const ret = new AppSyncApiKey(o)
      // need to validate?
      return ret
    }
  }
  static fromString (i: string): AppSyncApiKey {
    return AppSyncApiKey.from(JSON.parse(i))
  }
  static fromJSON (o: object): AppSyncApiKey {
    const valdInput = AppSyncApiKey.validateJSON(o as IAppSyncApiKey_json)
    return new AppSyncApiKey()
  }
  private static fromSDK (i: object): AppSyncApiKey {
    // make this public - after 0.1 launches
    throw new Error('not implemented yet')
  }
  static validate (i: string | object): AppSyncApiKey {
    // AppSyncApiKey_in | AppSyncApiKey
    if (typeof i === 'string') {
      return AppSyncApiKey.fromString(i)
    } else if (i instanceof AppSyncApiKey) {
      const ret = new AppSyncApiKey()
      ret.name = ret.name
      ret.Properties = ret.Properties
      return ret
    } else if (
      Object.keys(i).length === 1 &&
      'Type' in (i as IAppSyncApiKey_json)[Object.keys(i)[0]]
    ) {
      return AppSyncApiKey.validateJSON(i as IAppSyncApiKey_json)
    } else {
      return AppSyncApiKey.validateJS(i as AppSyncApiKey_in)
    }
  }

  private static validateJS (i: AppSyncApiKey_in): AppSyncApiKey {
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

  private static validateJSON (i: IAppSyncApiKey_json): AppSyncApiKey {
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
