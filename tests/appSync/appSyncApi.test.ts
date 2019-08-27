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

import { cloneDeep as deepclone } from 'lodash'

describe('GraphQL Main Api Object', () => {
  const a1 = Object.freeze(new AppSyncApi({ name: 'myname' }))
  const a2 = Object.freeze(
    new AppSyncApi({
      name: 'LongName',
      authType: 'API_KEY',
      logs: { level: 'ALL', roleArn: 'SOMEARN' },
      tags: [
        {
          key1: 'Value1',
          key2: 'Value2',
          key3: 'Value3'
        }
      ]
    })
  )

  test('A1 Test', () => {
    const data = a1.toJSON() as IAppSyncApi_json
    const _name = a1.name

    expect(data[_name].Properties).toEqual({
      Name: _name,
      AuthenticationType: 'API_KEY'
    } as IAppSyncApi_props)
  })

  test('A2 Test', () => {
    const data = a2.toJSON() as IAppSyncApi_json
    const _name = a2.name

    const e = {
      Name: _name,
      AuthenticationType: 'API_KEY',
      LogConfig: { FieldLogLevel: 'ALL', CloudWatchLogsRoleArn: 'SOMEARN' },
      Tags: [
        { Key: 'key1', Value: 'Value1' },
        { Key: 'key2', Value: 'Value2' },
        { Key: 'key3', Value: 'Value3' }
      ]
    } as IAppSyncApi_props
    expect(data[_name].Properties).toEqual(e)
  })

  test('a3 -ƒ.chains-> a2', () => {
    // const a3 = a1.clone() this still alters a1
    const a3 = new AppSyncApi({ name: 'LongName' })
      .defaultAuthUses('API_KEY')
      .logConfig({ roleArn: 'SOMEARN', level: 'ALL' })
      .tags({ key1: 'Value1', key2: 'Value2', key3: 'Value3' })

    expect(a2).toEqual(a3)
  })

  test('a3 -ƒ.chains-> a4', () => {
    const a4 = new AppSyncApi({
      name: 'OneGraph',
      logs: { level: 'ALL', roleArn: 'RoleArn' },
      authType: 'OPENID_CONNECT',
      openId: { issuer: 'NYT', authTTLms: 100, clientId: '1234', iatTTLms: 100 },
      tags: [{ k1: 'v1', k2: 'v2' }],
      additional: [
        {
          authType: 'AMAZON_COGNITO_USER_POOLS',
          pool: { id: 'id', region: 'region', clientIdRegex: 'regex' }
        }
      ]
    })

    const a3 = new AppSyncApi({ name: a4.name })
      .logConfig({ level: 'ALL', roleArn: 'RoleArn' })
      .tags({ k1: 'v1', k2: 'v2' })
      .moreAuthProviders({
        authType: 'AMAZON_COGNITO_USER_POOLS',
        pool: { id: 'id', region: 'region', clientIdRegex: 'regex' }
      })
      .defaultAuthUses(null, {
        issuer: 'NYT',
        authTTLms: 100,
        clientId: '1234',
        iatTTLms: 100
      })

    expect(a3).toEqual(a4)
  })

  test('linked data', () => {
    const aResolver = new AppSyncResolver({ name: 'resovler', field: 'field', type: 'Contacts' })
    const aConfig = new AppSyncFuncConfig({ name: 'config1', sourceName: 'source' })
    const aSource = new AppSyncDataSource({ name: 'source', type: 'HTTP' })
    const aKey = new AppSyncApiKey({ name: 'keyname', desc: 'somedescription' })
    const schema = `schema { query: QueryType }
type QueryType {
hero(episode: Episode): Character
human(id : String) : Human
droid(id: ID!): Droid
}
enum Episode {
NEWHOPE
EMPIRE
JEDI
}
interface Character {
id: ID!
name: String!
friends: [Character]
appearsIn: [Episode]!
}
type Human implements Character {
id: ID!
name: String!
friends: [Character]
appearsIn: [Episode]!
homePlanet: String
}
type Droid implements Character {
id: ID!
name: String!
friends: [Character]
appearsIn: [Episode]!
primaryFunction: String
}`
    const aSchema = new AppSyncSchema({
      name: 'mySchema',
      def: schema
    })
    const a = new AppSyncApi({ name: 'Linked' })
      .linkApiKeys(aKey, { name: 'key2' })
      .linkDataSouces(aSource)
      .linkFunctionConfigs(aConfig)
      .linkSchemas(aSchema)
      .linkeResolvers(aResolver)

    aSchema

    const r = a.toJsonCollection()
    expect(r).toEqual([
      {
        Linked: {
          Type: 'AWS::AppSync::GraphQLApi',
          Properties: {
            Name: 'Linked',
            AuthenticationType: 'API_KEY'
          }
        }
      },
      {
        keyname: {
          Type: 'AWS::AppSync::ApiKey',
          Properties: {
            Description: 'somedescription',
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            }
          }
        }
      },
      {
        key2: {
          Type: 'AWS::AppSync::ApiKey',
          Properties: {
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            }
          }
        }
      },
      {
        config1: {
          Type: 'AWS::AppSync::FunctionConfiguration',
          Properties: {
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            },
            Name: 'config1',
            DataSourceName: 'source',
            FunctionVersion: '2018-05-29'
          }
        }
      },
      {
        resovler: {
          Type: 'AWS::AppSync::Resolver',
          Properties: {
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            },
            Kind: 'UNIT',
            FieldName: 'field',
            TypeName: 'Contacts'
          }
        }
      },
      {
        mySchema: {
          Type: 'AWS::AppSync::GraphQLSchema',
          Properties: {
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            },
            Definition: schema
          }
        }
      },
      {
        source: {
          Type: 'AWS::AppSync::DataSource',
          Properties: {
            ApiId: {
              'Fn::GetAtt': ['Linked', 'ApiId']
            },
            Name: 'source',
            Type: 'NONE'
          }
        }
      }
    ])
  })
})
