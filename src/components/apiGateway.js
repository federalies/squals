// const esmImporter = require('esm')(module)

export class ApiGatewayAccount {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Account'
  }
}

export class ApiGatewayApiKey {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::ApiKey'
  }
}

export class ApiGatewayAuthorizer {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Authorizer'
  }
}

export class ApiGatewayBasePathMapping {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::BasePathMapping'
  }
}
export class ApiGatewayClientCertificate {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::ClientCertificate'
  }
}
export class ApiGatewayDeployment {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Deployment'
  }
}
export class ApiGatewayDocumentationPart {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::DocumentationPart'
  }
}
export class ApiGatewayDocumentationVersion {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::DocumentationVersion'
  }
}
export class ApiGatewayDomainName {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::DomainName'
  }
}
export class ApiGatewayGatewayResponse {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::GatewayResponse'
  }
}
export class ApiGatewayMethod {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Method'
  }
}
export class ApiGatewayRequestValidator {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::RequestValidator'
  }
}
export class ApiGatewayResource {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Resource'
  }
}
export class ApiGatewayRestApi {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::RestApi'
  }
}
export class ApiGatewayStage {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::Stage'
  }
}
export class ApiGatewayUsagePlan {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::UsagePlan'
  }
}
export class ApiGatewayUsagePlanKey {
  constructor (props = {}) {
    this.Type = 'AWS::ApiGateway::UsagePlanKey'
  }
}

export const cfnAPIGateway = env => {
  console.log(env)

  const acct = CloudWatchRoleArn => ({
    Type: 'AWS::ApiGateway::Account',
    Properties: {
      CloudWatchRoleArn
    }
  })

  const basepathMapping = () => ({
    Type: 'AWS::ApiGateway::BasePathMapping',
    Properties: {
      BasePath: String,
      DomainName: String,
      RestApiId: String,
      Stage: String
    }
  })

  const apiKey = StageKeys => ({
    Type: 'AWS::ApiGateway::ApiKey',
    Properties: {
      CustomerId: String,
      Description: String,
      Enabled: Boolean,
      GenerateDistinctId: Boolean,
      Name: String,
      StageKeys: [...StageKeys]
    }
  })

  const authorizer = ProviderARNs => ({
    Type: 'AWS::ApiGateway::Authorizer',
    Properties: {
      AuthType: String,
      AuthorizerCredentials: String,
      AuthorizerResultTtlInSeconds: 'Integers',
      AuthorizerUri: String,
      IdentitySource: String,
      IdentityValidationExpression: String,
      Name: String,
      ProviderARNs: [...ProviderARNs],
      RestApiId: String,
      Type: String
    }
  })
  const clientCert = () => ({
    Type: 'AWS::ApiGateway::ClientCertificate',
    Properties: {
      Description: String
    }
  })

  const deployment = () => ({
    Type: 'AWS::ApiGateway::Deployment',
    Properties: {
      DeploymentCanarySettings: {
        PercentTraffic: Double,
        StageVariableOverrides: { key: 'value' },
        UseStageCache: Boolean
      },
      StageDescription: {
        AccessLogSetting: {
          DestinationArn: String,
          Format: String
        },
        CacheClusterEnabled: Boolean,
        CacheClusterSize: String,
        CacheDataEncrypted: Boolean,
        CacheTtlInSeconds: 'Integer',
        CachingEnabled: Boolean,
        CanarySetting: {
          PercentTraffic: [Double],
          StageVariableOverrides: { key: 'value' },
          UseStageCache: Boolean
        },
        ClientCertificateId: String,
        DataTraceEnabled: Boolean,
        Description: String,
        DocumentationVersion: String,
        LoggingLevel: String,
        MethodSettings: [
          {
            CacheDataEncrypted: Boolean,
            CacheTtlInSeconds: 'Integer',
            CachingEnabled: Boolean,
            DataTraceEnabled: Boolean,
            HttpMethod: String,
            LoggingLevel: String,
            MetricsEnabled: Boolean,
            ResourcePath: String,
            ThrottlingBurstLimit: 'Integer',
            ThrottlingRateLimit: Number
          }
        ],
        MetricsEnabled: Boolean,
        Tags: [...Tags],
        ThrottlingBurstLimit: Integer,
        ThrottlingRateLimit: Number,
        TracingEnabled: Boolean,
        Variables: { key: 'value' }
      },
      Description: String,
      RestApiId: String,
      StageName: String
    }
  })

  const documentationPart = () => ({
    Type: 'AWS::ApiGateway::DocumentationPart',
    Properties: {
      Location: {
        Method: String,
        Name: String,
        Path: String,
        StatusCode: String,
        Type: String
      },
      Properties: String,
      RestApiId: String
    }
  })

  const documentationVersion = () => ({
    Type: 'AWS::ApiGateway::DocumentationVersion',
    Properties: {
      Description: String,
      DocumentationVersion: String,
      RestApiId: String
    }
  })

  const domainName = () => ({
    Type: 'AWS::ApiGateway::DomainName',
    Properties: {
      CertificateArn: String,
      DomainName: String,
      EndpointConfiguration: {
        Types: ['EDGE', 'REGIONAL']
      },
      RegionalCertificateArn: String
    }
  })

  const gatewayResponse = () => ({
    Type: 'AWS::ApiGateway::GatewayResponse',
    Properties: {
      ResponseParameters: { key: 'value' },
      ResponseTemplates: { key: 'value' },
      ResponseType: String,
      RestApiId: String,
      StatusCode: String
    }
  })

  const gatewayMethod = () => ({
    Type: 'AWS::ApiGateway::Method',
    Properties: {
      ApiKeyRequired: true,
      AuthorizationScopes: [String],
      AuthorizationType: String,
      AuthorizerId: String,
      HttpMethod: String,
      Integration: {
        CacheKeyParameters: [String],
        CacheNamespace: String,
        ConnectionId: String,
        ConnectionType: String,
        ContentHandling: String,
        Credentials: String,
        IntegrationHttpMethod: String,
        IntegrationResponses: [
          {
            ContentHandling: String,
            ResponseParameters: { String: String },
            ResponseTemplates: { String: String },
            SelectionPattern: String,
            StatusCode: String
          }
        ],
        PassthroughBehavior: String,
        RequestParameters: { String: String },
        RequestTemplates: { String: String },
        TimeoutInMillis: 'Integer',
        Type: String,
        Uri: String
      },
      MethodResponses: [
        {
          ResponseModels: { String: String },
          ResponseParameters: { String: Boolean },
          StatusCode: String
        }
      ],
      OperationName: String,
      RequestModels: { String: 'String' },
      RequestParameters: { String: true },
      RequestValidatorId: String,
      ResourceId: String,
      RestApiId: String
    }
  })
  const model = () => ({
    Type: 'AWS::ApiGateway::Model',
    Properties: {
      ContentType: String,
      Description: String,
      Name: String,
      RestApiId: String,
      Schema: { JSON: 'object' }
    }
  })
  const requestvalidator = () => ({
    Type: 'AWS::ApiGateway::RequestValidator',
    Properties: {
      Name: String,
      RestApiId: String,
      ValidateRequestBody: Boolean,
      ValidateRequestParameters: Boolean
    }
  })
  const resource = () => ({
    Type: 'AWS::ApiGateway::Resource',
    Properties: {
      ParentId: String,
      PathPart: String,
      RestApiId: String
    }
  })
  const RestAPI = () => ({
    Type: 'AWS::ApiGateway::RestApi',
    Properties: {
      Name: String,
      Description: String,
      ApiKeySourceType: String,
      BinaryMediaTypes: [String],
      Body: { JSON: 'object' },
      BodyS3Location: {
        Bucket: String,
        ETag: String,
        Key: String,
        Version: String
      },
      CloneFrom: String,
      EndpointConfiguration: {
        Types: ['EDGE', 'REGIONAL', 'PRIVATE']
      },
      FailOnWarnings: Boolean,
      MinimumCompressionSize: Integer,
      Parameters: { String: String },
      Policy: { JSON: 'object' }
    }
  })
  const stage = () => ({
    Type: 'AWS::ApiGateway::Stage',
    Properties: {
      AccessLogSetting: {
        DestinationArn: String,
        Format: String
      },
      CacheClusterEnabled: Boolean,
      CacheClusterSize: String,
      CanarySetting: {
        DeploymentId: String,
        PercentTraffic: Double,
        StageVariableOverrides: { String: String },
        UseStageCache: Boolean
      },
      ClientCertificateId: String,
      DeploymentId: String,
      Description: String,
      DocumentationVersion: String,
      MethodSettings: [
        {
          CacheDataEncrypted: Boolean,
          CacheTtlInSeconds: Integer,
          CachingEnabled: Boolean,
          DataTraceEnabled: Boolean,
          HttpMethod: String,
          LoggingLevel: String,
          MetricsEnabled: Boolean,
          ResourcePath: String,
          ThrottlingBurstLimit: Integer,
          ThrottlingRateLimit: Number
        }
      ],
      RestApiId: String,
      StageName: String,
      Tags: [...Tags],
      TracingEnabled: Boolean,
      Variables: { String: String }
    }
  })
  const usagePlan = () => ({
    Type: 'AWS::ApiGateway::UsagePlan',
    Properties: {
      UsagePlanName: String,
      Description: String,
      ApiStages: [
        {
          ApiId: String,
          Stage: String,
          Throttle: {
            String: [
              {
                BurstLimit: Integer,
                RateLimit: Number
              }
            ]
          }
        }
      ],
      Quota: {
        Limit: Integer,
        Offset: Integer,
        Period: String
      },
      Throttle: {
        BurstLimit: Integer,
        RateLimit: Number
      }
    }
  })
  const usagePlanKey = () => ({
    Type: 'AWS::ApiGateway::UsagePlanKey',
    Properties: {
      KeyId: String,
      KeyType: String,
      UsagePlanId: String
    }
  })
  const vpcLink = () => ({
    Type: 'AWS::ApiGateway::VpcLink',
    Properties: {
      Description: String,
      Name: String,
      TargetArns: [String]
    }
  })

  // websocket
  const api = {
    Type: 'AWS::ApiGatewayV2::Api',
    Properties: {
      Name: String, // *
      Description: String,
      DisableSchemaValidation: Boolean,
      ProtocolType: String, // *
      ApiKeySelectionExpression: String,
      RouteSelectionExpression: String, // *
      Version: String
    }
  }
  return api
}
