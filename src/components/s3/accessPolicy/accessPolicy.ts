export class AccessPolicy {
  Version: '2012-10-17'
  Id: string
  Statement: AccessPolicyStatement[]

  constructor (id: string = '', ...props: any[]) {
    this.Version = '2012-10-17'
    this.Id = id === '' ? 'SOMEAUTOGEND POLICY NAME' : id
    this.Statement = props
  }
}

export class AccessPolicyStatement {
  Sid: string
  Effect: string
  Principal: {
    AWS?: string
    CanonicalUser?: string
  }
  Action: IAccessS3Permission[] // actually an enum...
  Resource: IRef[] // list of ARN strings or Refs
  constructor () {
    this.Sid = ''
    this.Effect = ''
    this.Resource = ['']
    this.Principal = { AWS: '' }
    this.Action = ['s3:GetObject']
  }
}

type IRef = string | Ref

interface Ref {
  Ref: string // arn
}

type IAccessS3Permission =
  | 's3:AbortMultipartUpload'
  | 's3:DeleteObject'
  | 's3:DeleteObjectTagging'
  | 's3:DeleteObjectVersion'
  | 's3:DeleteObjectVersionTagging'
  | 's3:GetObject'
  | 's3:GetObjectAcl'
  | 's3:GetObjectTagging'
  | 's3:GetObjectTorrent'
  | 's3:GetObjectVersion'
  | 's3:GetObjectVersionAcl'
  | 's3:GetObjectVersionTagging'
  | 's3:GetObjectVersionTorrent'
  | 's3:ListMultipartUploadParts'
  | 's3:PutObject'
  | 's3:PutObjectAcl'
  | 's3:PutObjectTagging'
  | 's3:PutObjectVersionAcl'
  | 's3:PutObjectVersionTagging'
  | 's3:RestoreObject'
  | 's3:CreateBucket'
  | 's3:DeleteBucket'
  | 's3:ListBucket'
  | 's3:ListBucketVersions'
  | 's3:ListAllMyBuckets'
  | 's3:ListBucketMultipartUploads'
  | 's3:DeleteBucketPolicy'
  | 's3:DeleteBucketWebsite'
  | 's3:GetAccelerateConfiguration'
  | 's3:GetAnalyticsConfiguration'
  | 's3:GetBucketAcl'
  | 's3:GetBucketCORS'
  | 's3:GetBucketLocation'
  | 's3:GetBucketLogging'
  | 's3:GetBucketNotification'
  | 's3:GetBucketPolicy'
  | 's3:GetBucketPolicyStatus'
  | 's3:GetBucketPublicAccessBlock'
  | 's3:GetBucketRequestPayment'
  | 's3:GetBucketTagging'
  | 's3:GetBucketVersioning'
  | 's3:GetBucketWebsite'
  | 's3:GetEncryptionConfiguration'
  | 's3:GetInventoryConfiguration'
  | 's3:GetLifecycleConfiguration'
  | 's3:GetMetricsConfiguration'
  | 's3:GetReplicationConfiguration'
  | 's3:PutAccelerateConfiguration'
  | 's3:PutAnalyticsConfiguration'
  | 's3:PutBucketAcl'
  | 's3:PutBucketCORS'
  | 's3:PutBucketLogging'
  | 's3:PutBucketNotification'
  | 's3:PutBucketPolicy'
  | 's3:PutBucketPublicAccessBlock'
  | 's3:PutBucketRequestPayment'
  | 's3:PutBucketTagging'
  | 's3:PutBucketVersioning'
  | 's3:PutBucketWebsite'
  | 's3:PutEncryptionConfiguration'
  | 's3:PutInventoryConfiguration'
  | 's3:PutLifecycleConfiguration'
  | 's3:PutMetricsConfiguration'
  | 's3:PutReplicationConfiguration'
  | 's3:GetAccountPublicAccessBlock'
  | 's3:PutAccountPublicAccessBlock'
