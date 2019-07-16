import { IRef, squals, IGetAtt, genComponentName } from '../Template'
import { struct } from 'superstruct'

export class AppSyncDataSource implements squals {
  name: string
  Type = 'AWS::AppSync::DataSource'
  Properties: IDataSource_Props
  constructor (i: IDataSource_byHand) {
    this.name = typeof i.name === 'string' ? i.name : genComponentName()
    this.Properties = { 
      ApiId: '', 
      Name: '', 
      Type: 'NONE' 
    }
  }
  static fromString (i: string): AppSyncDataSource {
    return AppSyncDataSource.from(JSON.parse)
  }
  static fromJS (i: IDataSource_byHand): AppSyncDataSource {
    return AppSyncDataSource.validateJS(i)
  }
  static fromJSON (i: IDataSource_json): AppSyncDataSource {
    return AppSyncDataSource.validateJSON(i)
  }
  static from (i: string | object): AppSyncDataSource {
    if (typeof i === 'string') {
      return AppSyncDataSource.fromString(i)
    } else if (i instanceof AppSyncDataSource) {
      const ret = new AppSyncDataSource({ name: '', type: 'NONE' })
      ret.name = i.name
      ret.Properties = i.Properties
      return ret
    } else {
      const _name = Object.keys(i)[0]
      const { Type, Properties } = (i as IDataSource_json)[_name]
      if (Type && Properties) {
        return AppSyncDataSource.validateJSON(i as IDataSource_json)
      } else {
        return AppSyncDataSource.validateJS(i as IDataSource_byHand)
      }
    }
  }
  private static validateJS (i: IDataSource_byHand): AppSyncDataSource {
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
      rds: {
        region: strGetAttRef,
        secretStoreArn: strGetAttRef,
        clusterId: strGetAttRef,
        dbName: struct.optional(strGetAttRef),
        schema: struct.optional(strGetAttRef)
      }
    })(i)

    return new AppSyncDataSource(i)
  }
  private static validateJSON (i: IDataSource_json): AppSyncDataSource {
    const ref = struct({ Ref: 'string' })
    const getAtt = struct({ 'Fn:GetAtt': struct.tuple(['string', 'string']) })
    const strGetAttRef = struct(struct.union(['string', getAtt, ref]))

    struct(
      struct.dict([
        'stirng',
        struct.interface({
          Type: struct.literal('AWS::AppSync::DataSource'),
          Properties: struct({
            Name: struct.union(['string', ref]),
            ApiId: struct.union(['string', ref]),
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
  static validate (i: object | AppSyncDataSource): AppSyncDataSource {
    if (i instanceof AppSyncDataSource) {
      return i
    } else {
      const _name = Object.keys(i)[0]
      const { Type, Properties } = (i as IDataSource_json)[_name]
      if (Type && Properties) {
        return AppSyncDataSource.validateJSON(i as IDataSource_json)
      } else {
        return AppSyncDataSource.validateJS(i as IDataSource_byHand)
      }
    }
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
  Name: string | IRef // constuctor
  ApiId: string | IRef // inherit from the API?
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

export interface IDataSource_byHand {
  name: string | IGetAtt | IRef
  apiId?: string | IGetAtt | IRef
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
