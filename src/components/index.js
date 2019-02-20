// find replace helper
// find : ^AWS::(.*)::(.*)
// $1$2,

export { Template } from './Template'
export { S3Bucket, S3BucketPolicy } from './s3.js'
export { SqsQueue, SqsQueuePolicy } from './sqs.js'
export { SnsSubscription, SnsTopic, SnsTopicPolicy } from './sns.js'
export { CodeCommitRepo } from './codeCommit.js'
export { Table } from './dynamoDB.js'
export { EcsCluster, EcsService, EcsTaskDefinition } from './ecs'
export { EksCluster } from './eks'

export {
  CloudFrontCDN,
  CloudFrontID,
  CloudFrontStreaming
} from './cloudFront.js'

export {
  // https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome-pricing
  CodeBuildProject
} from './codeBuild.js'

export {
  // https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html
  CodeDeployApp,
  CodeDeployConfig,
  CodeDeployGroup
} from './codeDeploy.js'

export {
  CodePipelineCustomActionType,
  CodePipelinePipeline,
  CodePipelineWebhook
} from './codePipeline'

export {
  AppSyncApiKey,
  AppSyncDataSource,
  AppSyncFunctionConfiguration,
  AppSyncGraphQLApi,
  AppSyncGraphQLSchema,
  AppSyncResolver
} from './appSync.js'

export {
  CognitoIDPool,
  CognitoUserPool,
  CognitoUserPoolCient,
  CognitoUserPoolGroup,
  CognitoIDPoolRoleAttachment,
  CognitoUserPoolUserToGroupAttachment
} from './cognito.js'

export {
  BatchComputeEnvironment,
  BatchJobDefinition,
  BatchJobQueue
} from './awsBatch.js'

// export { Cloud9EnvironmentEC2 } from './awsCloud9.js'

export {
  ElastiCacheCacheCluster,
  ElastiCacheParameterGroup,
  ElastiCacheReplicationGroup,
  ElastiCacheSecurityGroup,
  ElastiCacheSecurityGroupIngress,
  ElastiCacheSubnetGroup
} from './elastiCache.js'

export {
  KinesisStream,
  KinesisStreamConsumer,
  KinesisFirehoseDeliveryStream,
  KinesisAnalyticsApplication,
  KinesisAnalyticsApplicationOutput,
  KinesisAnalyticsApplicationReferenceDataSource
} from './kinesis.js'

export {
  LambdaEventSourceMapping,
  LambdaAlias,
  LambdaFunction,
  LambdaLayerVersion,
  LambdaLayerVersionPermission,
  LambdaPermission,
  LambdaVersion
} from './lambda.js'

export {
  Route53HealthCheck,
  Route53HostedZone,
  Route53RecordSet,
  Route53RecordSetGroup,
  Route53ResolverResolverEndpoint,
  Route53ResolverResolverRule,
  Route53ResolverResolverRuleAssociation
} from './route53.js'

export {
  SecretsManagerResourcePolicy,
  SecretsManagerRotationSchedule,
  SecretsManagerSecret,
  SecretsManagerSecretTargetAttachment
} from './secretsManager.js'

export {
  SesConfigurationSet,
  SesConfigurationSetEventDestination,
  SesReceiptFilter,
  SesReceiptRule,
  SesReceiptRuleSet,
  SesTemplate
} from './ses.js'

export {
  ApiGatewayAccount,
  ApiGatewayApiKey,
  ApiGatewayAuthorizer,
  ApiGatewayBasePathMapping,
  ApiGatewayClientCertificate,
  ApiGatewayDeployment,
  ApiGatewayDocumentationPart,
  ApiGatewayDocumentationVersion,
  ApiGatewayDomainName,
  ApiGatewayGatewayResponse,
  ApiGatewayMethod,
  ApiGatewayRequestValidator,
  ApiGatewayResource,
  ApiGatewayRestApi,
  ApiGatewayStage,
  ApiGatewayUsagePlan,
  ApiGatewayUsagePlanKey
} from './apiGateway.js'

export {
  Ec2CustomerGateway,
  Ec2DHCPOptions,
  Ec2EC2Fleet,
  Ec2EgressOnlyInternetGateway,
  Ec2EIP,
  Ec2EIPAssociation,
  Ec2FlowLog,
  Ec2Host,
  Ec2Instance,
  Ec2InternetGateway,
  Ec2LaunchTemplate,
  Ec2NatGateway,
  Ec2NetworkAcl,
  Ec2NetworkAclEntry,
  Ec2NetworkInterface,
  Ec2NetworkInterfaceAttachment,
  Ec2NetworkInterfacePermission,
  Ec2PlacementGroup,
  Ec2Route,
  Ec2RouteTable,
  Ec2SecurityGroup,
  Ec2SecurityGroupEgress,
  Ec2SecurityGroupIngress,
  Ec2SpotFleet,
  Ec2Subnet,
  Ec2SubnetCidrBlock,
  Ec2SubnetNetworkAclAssociation,
  Ec2SubnetRouteTableAssociation,
  Ec2TransitGateway,
  Ec2TransitGatewayAttachment,
  Ec2TransitGatewayRoute,
  Ec2TransitGatewayRouteTable,
  Ec2TransitGatewayRouteTableAssociation,
  Ec2TransitGatewayRouteTablePropagation,
  Ec2Volume,
  Ec2VolumeAttachment,
  Ec2VPC,
  Ec2VPCCidrBlock,
  Ec2VPCDHCPOptionsAssociation,
  Ec2VPCEndpoint,
  Ec2VPCEndpointConnectionNotification,
  Ec2VPCEndpointService,
  Ec2VPCEndpointServicePermissions,
  Ec2VPCGatewayAttachment,
  Ec2VPCPeeringConnection,
  Ec2VPNConnection,
  Ec2VPNConnectionRoute,
  Ec2VPNGateway,
  Ec2VPNGatewayRoutePropagation
} from './ec2'
