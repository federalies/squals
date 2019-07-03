import { IRef, squals } from '../Template'

export class AppSyncDataSource implements squals {
  name: string
  Type = 'AWS::AppSync::DataSource'
  Properties: {
    ApiId: string | IRef // inherit from the API?
    Name: string | IRef // constuctor
    Description?: string | IRef
    DynamoDBConfig?: string // DynamoDBConfig,
    ElasticsearchConfig?: string // ElasticsearchConfig,
    HttpConfig?: string // HttpConfig,
    LambdaConfig?: string // LambdaConfig,
    RelationalDatabaseConfig?: string // RelationalDatabaseConfig,
    ServiceRoleArn?: string | IRef
    Type:
      | 'NONE'
      | 'HTTP'
      | 'AWS_LAMBDA'
      | 'AMAZON_DYNAMODB'
      | 'AMAZON_ELASTICSEARCH'
      | 'RELATIONAL_DATABASE'
  }
  constructor () {
    this.name = ''
    this.Properties = { ApiId: '', Name: '', Type: 'NONE' }
  }
  static fromJSON (i: string | object) {}
  toJSON (): object[] {
    return []
  }
  validate (): AppSyncDataSource {
    return this
  }
  Ref () {}
  DataSourceArn () {}
  Name () {}
}
