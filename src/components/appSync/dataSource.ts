import { IRef, squals, IGetAtt, genComponentName, validatorGeneric } from '../Template'
import { verifyIfThen, ifPathEq, has } from '../../utils/validations/objectCheck'
import { struct } from 'superstruct'
import { AppSyncApi } from './api'
import { flowRight } from 'lodash-es'

export class AppSyncDataSource implements squals {
  name: string
  Type = 'AWS::AppSync::DataSource'
  Properties: IDataSource_Props

  constructor (i: IAppSyncDataSource_min, api?: AppSyncApi) {
    this.name = typeof i.name === 'string' ? i.name : genComponentName()
    this.Properties = {
      ApiId: api ? api.ApiId() : i.api ? i.api : '< StillNeedsToBeLinked >',
      Name: i.name,
      Type: 'NONE'
    }
  }
  static fromString (i: string): AppSyncDataSource {
    return AppSyncDataSource.from(JSON.parse)
  }
  static fromJS (i: object): AppSyncDataSource {
    return AppSyncDataSource.validateJS(i as IAppSyncDataSource_min)
  }
  static fromJSON (i: object): AppSyncDataSource {
    return AppSyncDataSource.validateJSON(i as IDataSource_json)
  }
  static from (i: string | object): AppSyncDataSource {
    return AppSyncDataSource.validate(i)
  }
  static validateJS (i: IAppSyncDataSource_min): AppSyncDataSource {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))

    struct({
      name: strGetAttRef,
      apiId: struct.optional(strGetAttRef),
      desc: struct.optional(strGetAttRef),
      type: struct.enum([
        'NONE',
        'HTTP',
        'AWS_LAMBDA',
        'AMAZON_DYNAMODB',
        'AMAZON_ELASTICSEARCH',
        'RELATIONAL_DATABASE'
      ]),
      roleArn: struct.optional(strGetAttRef),
      lambdaArn: struct.optional(strGetAttRef),
      dynamoDB: struct.optional(
        struct({
          region: strGetAttRef,
          table: strGetAttRef,
          useCallerCreds: 'boolean'
        })
      ),
      elasticsearch: struct.optional(
        struct({
          region: strGetAttRef,
          endpoint: strGetAttRef
        })
      ),
      http: struct.optional(
        struct({
          url: strGetAttRef,
          signing: struct.optional(
            struct({
              region: struct.optional(strGetAttRef),
              svcName: struct.optional(strGetAttRef)
            })
          )
        })
      ),
      rds: struct.optional(
        struct({
          region: strGetAttRef,
          secretStoreArn: strGetAttRef,
          clusterId: strGetAttRef,
          dbName: struct.optional(strGetAttRef),
          schema: struct.optional(strGetAttRef)
        })
      )
    })(i)

    // input interdependencies
    // basically makes something not optional - depending on a  differnet key
    //
    const v1 = verifyIfThen(ifPathEq('type', 'HTTP'), has('http'))
    const v2 = verifyIfThen(ifPathEq('type', 'AWS_LAMBDA'), has('lambdaArn'))
    const v3 = verifyIfThen(ifPathEq('type', 'AMAZON_DYNAMODB'), has('dynamoDB'))
    const v4 = verifyIfThen(ifPathEq('type', 'AMAZON_ELASTICSEARCH'), has('elasticsearch'))
    const v5 = verifyIfThen(ifPathEq('type', 'RELATIONAL_DATABASE'), has('rds'))

    // can't get it to pass tsc
    // ugh
    // const verifyInterDeps = flowRight(
    //   verifyIfThen(ifPathEq('type', 'HTTP'), has('http')),
    //   verifyIfThen(ifPathEq('type', 'AWS_LAMBDA'), has('lambdaArn')),
    //   verifyIfThen(ifPathEq('type', 'AMAZON_DYNAMODB'), has('dynamoDB')),
    //   verifyIfThen(ifPathEq('type', 'AMAZON_ELASTICSEARCH'), has('elasticsearch')),
    //   verifyIfThen(ifPathEq('type', 'RELATIONAL_DATABASE'), has('rds'))
    // )

    return new AppSyncDataSource(v5(v4(v3(v2(v1(i))))))
  }
  static validateJSON (i: IDataSource_json): AppSyncDataSource {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))

    struct(
      struct.dict([
        'stirng',
        struct.interface({
          Type: struct.literal('AWS::AppSync::DataSource'),
          Properties: struct({
            Name: strGetAttRef,
            ApiId: strGetAttRef,
            Description: struct.optional(struct.union(['string', ref])),
            ServiceRoleArn: struct.optional(struct.union(['string', ref])),
            LambdaConfig: struct.optional({ LambdaFunctionArn: 'string' }),
            Type: struct.enum([
              'NONE',
              'HTTP',
              'AWS_LAMBDA',
              'AMAZON_DYNAMODB',
              'AMAZON_ELASTICSEARCH',
              'RELATIONAL_DATABASE'
            ]),
            DynamoDBConfig: struct.optional({
              AwsRegion: 'string',
              TableName: 'string',
              UseCallerCredentials: 'boolean'
            }),
            ElasticsearchConfig: struct.optional({
              AwsRegion: 'string',
              Endpoint: 'string'
            }),
            HttpConfig: struct.optional({
              Endpoint: 'string',
              AuthorizationConfig: {
                AuthorizationType: struct.literal('AWS_IAM'),
                AwsIamConfig: {
                  signingRegion: 'string',
                  signingServiceName: 'string'
                }
              }
            }),
            RelationalDatabaseConfig: struct.optional({
              RelationalDatabaseSourceType: struct.literal('RDS_HTTP_ENDPOINT'),
              RdsHttpEndpointConfig: struct({
                AwsRegion: 'string',
                AwsSecretStoreArn: 'string',
                DbClusterIdentifier: 'string',
                Schema: 'string?',
                DatabaseName: 'string?'
              })
            })
          })
        })
      ])
    )(i)
    const o = i as IDataSource_json
    const _name = Object.keys(o)[0]
    const ret = new AppSyncDataSource({ name: _name, type: 'NONE' })
    ret.Properties = o[_name].Properties
    return ret
  }
  static validate (i: string | object): AppSyncDataSource {
    return validatorGeneric<AppSyncDataSource>(i as squals, AppSyncDataSource)
  }
  toJSON (): object[] {
    return ([] as unknown) as JSON[]
  }
  Ref () {}
  DataSourceArn () {}
  Name () {}
}

interface IDataSource_json {
  [name: string]: {
    Type: 'AWS::AppSync::DataSource'
    Properties: IDataSource_Props
  }
}

interface IDataSource_Props {
  Name: string | IGetAtt | IRef // constuctor
  ApiId: string | IGetAtt | IRef // inherit from the API?
  Description?: string | IRef
  DynamoDBConfig?: {
    AwsRegion: string
    TableName: string
    UseCallerCredentials: boolean
  }
  ElasticsearchConfig?: {
    AwsRegion: string
    Endpoint: string
  }
  HttpConfig?: {
    Endpoint: string
    AuthorizationConfig: {
      AuthorizationType: 'AWS_IAM'
      AwsIamConfig: {
        signingRegion: string
        signingServiceName: string
      }
    }
  }
  LambdaConfig?: { LambdaFunctionArn: string }
  RelationalDatabaseConfig?: {
    RelationalDatabaseSourceType: 'RDS_HTTP_ENDPOINT'
    RdsHttpEndpointConfig: {
      AwsRegion: string
      AwsSecretStoreArn: string
      DbClusterIdentifier: string
      DatabaseName?: string
      Schema?: string
    }
  }
  ServiceRoleArn?: string | IRef
  Type:
    | 'NONE'
    | 'HTTP'
    | 'AWS_LAMBDA'
    | 'AMAZON_DYNAMODB'
    | 'AMAZON_ELASTICSEARCH'
    | 'RELATIONAL_DATABASE'
}

export interface IAppSyncDataSource_min {
  name: string | IGetAtt | IRef
  api?: string | IGetAtt | IRef
  desc?: string | IGetAtt | IRef
  roleArn?: string | IGetAtt | IRef
  lambdaArn?: string | IGetAtt | IRef
  dynamoDB?: {
    region: string | IGetAtt | IRef
    table: string | IGetAtt | IRef
    useCallerCreds: boolean
  }
  elasticsearch?: {
    region: string | IGetAtt | IRef
    endpoint: string | IGetAtt | IRef
  }
  http?: {
    url: string | IGetAtt | IRef
    signing?: {
      region?: string | IGetAtt | IRef
      svcName?: string | IGetAtt | IRef
    }
  }
  rds?: {
    region: string | IGetAtt | IRef
    secretStoreArn: string | IGetAtt | IRef
    clusterId: string | IGetAtt | IRef
    dbName?: string | IGetAtt | IRef
    schema?: string | IGetAtt | IRef
  }
  type:
    | 'NONE'
    | 'HTTP'
    | 'AWS_LAMBDA'
    | 'AMAZON_DYNAMODB'
    | 'AMAZON_ELASTICSEARCH'
    | 'RELATIONAL_DATABASE'
}
