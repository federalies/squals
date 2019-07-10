import { IRef, squals, IGetAtt } from '../Template'

export class AppSyncDataSource implements squals {
  name: string
  Type = 'AWS::AppSync::DataSource'
  Properties: {
    ApiId: string | IRef // inherit from the API?
    Name: string | IRef // constuctor
    Description?: string | IRef
    DynamoDBConfig?: {
      AwsRegion : string
      TableName : string
      UseCallerCredentials : boolean
    }
    ElasticsearchConfig?: {
      AwsRegion : string
      Endpoint : string
    }    
    HttpConfig?: {
      Endpoint : string
      AuthorizationConfig : {
        AuthorizationType : 'AWS_IAM'
        AwsIamConfig : {
          signingRegion : string
          signingServiceName : string
        } 
      }
    }    
    LambdaConfig?: {LambdaFunctionArn: string}
    RelationalDatabaseConfig?: {
      RelationalDatabaseSourceType: 'RDS_HTTP_ENDPOINT'
      RdsHttpEndpointConfig : {
        AwsRegion : string
        AwsSecretStoreArn : string
        DbClusterIdentifier : string
        DatabaseName? : string
        Schema? : string
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
  constructor () {
    this.name = ''
    this.Properties = { ApiId: '', Name: '', Type: 'NONE' }
  }
  static fromJSON (i: string | object) {}
  toJSON (): JSON[] {
    return [] as unknown as JSON[]
  }
  validate (): AppSyncDataSource {
    return this
  }
  Ref () {}
  DataSourceArn () {}
  Name () {}
}

interface IDataSource_json{
  [name:string]:{
    Type:'AWS::AppSync::DataSource'
    Properties:IDataSource_Props
  }
}


interface IDataSource_Props{
  ApiId: string | IRef // inherit from the API?
    Name: string | IRef // constuctor
    Description?: string | IRef
    DynamoDBConfig?: {
      AwsRegion : string
      TableName : string
      UseCallerCredentials : boolean
    }
    ElasticsearchConfig?: {
      AwsRegion : string
      Endpoint : string
    }    
    HttpConfig?: {
      Endpoint : string
      AuthorizationConfig : {
        AuthorizationType : 'AWS_IAM'
        AwsIamConfig : {
          signingRegion : string
          signingServiceName : string
        } 
      }
    }    
    LambdaConfig?: {LambdaFunctionArn: string}
    RelationalDatabaseConfig?: {
      RelationalDatabaseSourceType: 'RDS_HTTP_ENDPOINT'
      RdsHttpEndpointConfig : {
        AwsRegion : string
        AwsSecretStoreArn : string
        DbClusterIdentifier : string
        DatabaseName? : string
        Schema? : string
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

export interface IDataSource_byHand{
  name: string | IGetAtt| IRef 
  apiId?: string | IGetAtt| IRef
  desc?: string | IGetAtt| IRef
  dynamoDBConfig?: {
    region : string | IGetAtt| IRef
    table : string | IGetAtt| IRef
    useCallerCreds : boolean
  }  
  elasticsearchConfig?: {
    region : string | IGetAtt| IRef
    endpoint : string | IGetAtt| IRef
  }
  httpConfig?: {
    url: string | IGetAtt| IRef
    signing?:{
      region?:string| IGetAtt| IRef
      svcName?:string | IGetAtt| IRef
    }
  }
  lambdaArn?: string | IGetAtt| IRef
  rdsConfig:{
    region:string | IGetAtt| IRef
    secretStoreArn:string | IGetAtt| IRef
    clusterId:string | IGetAtt| IRef
    dbName?:string  | IGetAtt| IRef
    schema?:string| IGetAtt| IRef
  }
  roleArn?: string | IGetAtt| IRef
  type:
    | 'NONE'
    | 'HTTP'
    | 'AWS_LAMBDA'
    | 'AMAZON_DYNAMODB'
    | 'AMAZON_ELASTICSEARCH'
    | 'RELATIONAL_DATABASE'
}