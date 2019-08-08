// find replace helper
// find : ^AWS::(.*)::(.*)
// $1$2,

export { Template } from './Template'
export { S3Bucket, S3BucketPolicy } from './s3'
export * from './sqs'
export { AWSCertificate } from './certificateManager'
// export { SnsSubscription, SnsTopic, SnsTopicPolicy } from './sns.js'
// export { CodeCommitRepo } from './codeCommit.js'
// export { Table } from './dynamoDB.js'
// export { EcsCluster, EcsService, EcsTaskDefinition } from './ecs'
// export { EksCluster } from './eks'

export * from './cloudFront'

// https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html#welcome-pricing
export * from './codeBuild'

// https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html
export * from './codeDeploy'
export * from './codePipeline'
export * from './appSync'
export * from './cognito'
export * from './awsBatch'
export * from './awsCloud9'
export * from './elastiCache'
export * from './kinesis'
export * from './lambda'
export * from './route53'
export * from './secretsManager'
export * from './ses'
export * from './apiGateway_v2'
export * from './ec2'
