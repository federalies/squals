import {
  AppSyncApiKey,
  AppSyncApi,
  IAppSyncApiKey_json,
  AppSyncApiKey_Properties
} from '../../src/components/appSync/index'
import { IGetAtt } from '../../src/components/Template'

describe('AppSync ApiKey', () => {
  test('Defaults', () => {
    const a = new AppSyncApiKey().toJSON()[0] as IAppSyncApiKey_json
    const _name = Object.keys(a)[0]
    expect(_name).toBeDefined()
    expect(a[_name].Type).toBe('AWS::AppSync::ApiKey')
    expect(a[_name].Properties).toEqual({
      ApiId: '< StillNeedsToBeLinked >'
    } as AppSyncApiKey_Properties)
  })

  test('from valid JS', () => {
    const input = {
      name: 'MyComponentName',
      api: 'SomeApiId',
      desc: 'MyDescription',
      exp: 1000
    }

    const a = AppSyncApiKey.from(input).toJSON()[0]
    const e = {
      MyComponentName: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: 'SomeApiId',
          Description: 'MyDescription',
          Expires: 1000
        }
      }
    } as IAppSyncApiKey_json
    expect(a).toEqual(e)
    expect(AppSyncApiKey.fromJS(input).toJSON()[0]).toEqual(e)
  })

  test('from valid JSON', () => {
    const e = {
      MyComponentName: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: 'SomeApiId',
          Description: 'MyDescription',
          Expires: 1000
        }
      }
    } as IAppSyncApiKey_json
    const a = AppSyncApiKey.from(e).toJSON()[0]
    expect(a).toEqual(e)
    expect(AppSyncApiKey.fromJSON(e).toJSON()[0]).toEqual(e)
  })

  test('from valid string', () => {
    const o = {
      MyComponentName: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: 'SomeApiId',
          Description: 'MyDescription',
          Expires: 1000
        }
      }
    } as IAppSyncApiKey_json
    const s = JSON.stringify(o)
    const a = AppSyncApiKey.from(s).toJSON()[0]
    expect(a).toEqual(o)
  })

  test('from invalid string', () => {
    const s = `this is not a valid JSON string`
    const a1 = () => AppSyncApiKey.from(s)
    const a2 = () =>
      AppSyncApiKey.from({
        MyComponentName: {
          Type: 'bad Type',
          Properties: {
            ApiId: ''
          }
        }
      })
    expect(a1).toThrow()
    expect(a2).toThrow()
  })

  test('from invalid string', () => {
    const s = `this is not a valid JSON string`
    const a1 = () => AppSyncApiKey.from(s)
    const a2 = () =>
      AppSyncApiKey.from({
        MyComponentName: {
          Type: 'bad Type',
          Properties: {
            ApiId: ''
          }
        }
      })
    expect(a1).toThrow()
    expect(a2).toThrow()
  })

  test('Builder Functions', () => {
    const a = new AppSyncApiKey()
      .api('someApi')
      .description('my Description')
      .expires(1000)
      .toJSON()[0]
    const _name = Object.keys(a)[0]
    expect(a[_name].Properties).toEqual({
      ApiId: 'someApi',
      Description: 'my Description',
      Expires: 1000
    } as AppSyncApiKey_Properties)
  })

  test('Basic + Linked  API', () => {
    const a = new AppSyncApiKey(
      {
        name: 'FederaliGraphQL',
        api: 'Awesome GraphQL',
        desc: 'my one graph',
        exp: 1000
      },
      new AppSyncApi({ name: 'Awesome GraphQL' })
    )
    const e = {
      FederaliGraphQL: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: { 'Fn::GetAtt': ['Awesome GraphQL', 'ApiId'] },
          Description: 'my one graph',
          Expires: 1000
        }
      }
    } as IAppSyncApiKey_json
    expect(a.toJSON()[0]).toEqual(e)
    expect(a.Ref()).toEqual({ Ref: 'FederaliGraphQL' })
    expect(a.ApiKey()).toEqual({ 'Fn::GetAtt': ['FederaliGraphQL', 'ApiKey'] })
    expect(a.Arn()).toEqual({ 'Fn::GetAtt': ['FederaliGraphQL', 'Arn'] })
  })

  test('Basic', () => {
    const api = new AppSyncApi({ name: 'FederaGraphQlApi' })

    const e = {
      FederaliGraphQLKey: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: { 'Fn::GetAtt': ['FederaGraphQlApi', 'ApiId'] },
          Description: 'my one graph',
          Expires: 1000
        }
      }
    } as IAppSyncApiKey_json

    const input = {
      name: 'FederaliGraphQLKey',
      desc: 'my one graph',
      exp: 1000,
      api: (undefined as unknown) as IGetAtt
    }

    let a = new AppSyncApiKey(input, api)
    expect(a.toJSON()[0]).toEqual(e)

    input.api = api.ApiId()
    a = new AppSyncApiKey(input)
    expect(a.toJSON()[0]).toEqual(e)
  })

  test('passing validations', () => {
    const api = new AppSyncApi({ name: 'FederaGraphQlApi' })

    const a1 = AppSyncApiKey.validateJS({ api: api.ApiId(), desc: 'desc', exp: 1000 }).toJSON()[0]
    const a2 = AppSyncApiKey.validateJS({ desc: 'desc', exp: 1000 }).toJSON()[0]
    const b = AppSyncApiKey.validateJSON({
      Hi: {
        Type: 'AWS::AppSync::ApiKey',
        Properties: {
          ApiId: 'ApiId',
          Description: 'desc'
        }
      }
    }).toJSON()[0]
    const a_name = Object.keys(a1)[0]
    const a2_name = Object.keys(a2)[0]
    const b_name = Object.keys(b)[0]

    expect(a1[a_name].Properties).toEqual({
      ApiId: { 'Fn::GetAtt': ['FederaGraphQlApi', 'ApiId'] },
      Description: 'desc',
      Expires: 1000
    })

    expect(a2[a2_name].Properties).toEqual({
      ApiId: '< StillNeedsToBeLinked >',
      Description: 'desc',
      Expires: 1000
    })

    expect(b[b_name].Properties).toEqual({
      ApiId: 'ApiId',
      Description: 'desc'
    })
  })
})
