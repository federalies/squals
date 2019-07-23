import {
  AppSyncApi,
  AppSyncResolver,
  AppSyncFuncConfig,
  AppSyncDataSource,
  AppSyncSchema,
  AppSyncApiKey,
  IAppSyncApi_json,
  IAppSyncApi_props
} from '../../src/components/appSync/index'

describe('SomeTest', () => {
  test('A Test', () => {
    const a = new AppSyncApi({ name: 'myname' })
    const data = a.toJSON()[0] as IAppSyncApi_json
    const _name = a.name

    expect(data[_name].Properties).toEqual({
      Name: _name,
      AuthenticationType: 'API_KEY'
    } as IAppSyncApi_props)
  })
})
