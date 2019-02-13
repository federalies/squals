export class AppSyncApiKey {}
export class AppSyncDataSource {}
export class AppSyncFunctionConfiguration {}
export class AppSyncGraphQLApi {}
export class AppSyncGraphQLSchema {}
export class AppSyncResolver {}

export const cfnAppSync = () => {
  const apiKey = () => ({
    Type: 'AWS::AppSync::ApiKey',
    Properties: {
      Description: String,
      Expires: Number,
      ApiId: String
    }
  })

  const _authConfig = () => ({
    AuthorizationType: String,
    AwsIamConfig: {
      SigningRegion: String,
      SigningServiceName: String
    }
  })

  const _lambdaConfig = () => ({
    LambdaFunctionArn: String
  })

  const _dynamoDBconfig = () => ({
    TableName: String,
    AwsRegion: String,
    UseCallerCredentials: Boolean
  })
  const _elasticSearchConfig = {
    AwsRegion: String,
    Endpoint: String
  }
  const _relationDBConfig = () => ({
    RelationalDatabaseSourceType: String,
    RdsHttpEndpointConfig: {
      AwsRegion: String,
      DbClusterIdentifier: String,
      DatabaseName: String,
      Schema: String,
      AwsSecretStoreArn: String
    }
  })
  const _httpConfig = () => ({
    AuthorizationConfig: _authConfig(),
    Endpoint: String
  })
  const dataSource = () => ({
    Type: 'AWS::AppSync::DataSource',
    Properties: {
      Type: String,
      Description: String,
      ServiceRoleArn: String,
      LambdaConfig: _lambdaConfig(),
      ApiId: String,
      Name: String,
      DynamoDBConfig: _dynamoDBconfig(),
      ElasticsearchConfig: _elasticSearchConfig(),
      HttpConfig: _httpConfig(),
      RelationalDatabaseConfig: _relationDBConfig()
    }
  })
  const funcConfig = () => ({
    Type: 'AWS::AppSync::FunctionConfiguration',
    Properties: {
      ApiId: String,
      Name: String,
      Description: String,
      DataSourceName: String,
      FunctionVersion: String,
      RequestMappingTemplate: String,
      RequestMappingTemplateS3Location: String,
      ResponseMappingTemplate: String,
      ResponseMappingTemplateS3Location: String
    }
  })
  const _logConfig = () => ({
    CloudWatchLogsRoleArn: String,
    FieldLogLevel: String
  })
  const _openIDConnect = () => ({
    Issuer: String,
    ClientId: String,
    IatTTL: Number,
    AuthTTL: Number
  })
  const _userPoolConfig = () => ({
    AppIdClientRegex: String,
    UserPoolId: String,
    AwsRegion: String,
    DefaultAction: String
  })
  const graphQL = () => ({
    Type: 'AWS::AppSync::GraphQLApi',
    Properties: {
      UserPoolConfig: UserPoolConfig,
      OpenIDConnectConfig: OpenIDConnectConfig,
      Name: String,
      AuthenticationType: String,
      LogConfig: _logConfig()
    }
  })
  const graphQLschema = () => ({
    Type: 'AWS::AppSync::GraphQLSchema',
    Properties: {
      Definition: String,
      DefinitionS3Location: String,
      ApiId: String
    }
  })
  const resolver = () => ({
    Type: 'AWS::AppSync::Resolver',
    Properties: {
      ResponseMappingTemplateS3Location: String,
      TypeName: String,
      DataSourceName: String,
      RequestMappingTemplate: String,
      ResponseMappingTemplate: String,
      RequestMappingTemplateS3Location: String,
      ApiId: String,
      FieldName: String,
      Kind: String,
      PipelineConfig: {
        Functions: ['FucntionID']
      }
    }
  })
}
