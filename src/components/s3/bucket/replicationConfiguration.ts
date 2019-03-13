/**
 * Title.
 *
 * @description descrip.
 * @param param - Asd.
 * @param param.iamARN - Asd.
 * @param param.rules - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-replicationconfiguration.html>
 * @example
 *  var rcfg = replicationConfig({ iamARN:getActingIAMWhileReplcating(),
 *                                 rules: getTheRuleListWeNeedToConfigureTheTempalte() })
 */
export const replicationConfig = (params: InReplicaConfig): OutReplicaConfig => {
  const { iamARN } = params
  let { rules } = params
  rules = Array.isArray(rules) ? rules : new Array(rules)
  return {
    ReplicationConfiguration: {
      Role: iamARN,
      Rules: rules.map(r => replicationRule(r))
    }
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param params - Asd.
 * @param params.dest - Defines the destination where Amazon S3 stores replicated objects.
 * @param params.prefix - An object prefix. This rule applies to all Amazon S3 objects with this prefix. To specify all objects in an S3 bucket, specify an empty string.
 * @param params.id - A unique identifier for the rule. If you don't specify a value, AWS CloudFormation generates a random ID.
 * @param params.status - Whether the rule is enabled. For valid values.
 * @param params.replicateEncData - Contains the status of whether Amazon S3 replicates objects created with server-side encryption using an AWS KMS-managed key.
 * @example
 *  var r = replicationRule()
 */
export const replicationRule = (
  params: InReplicaRule = {
    dest: { bucket: '' },
    prefix: '',
    id: undefined,
    replicateEncData: false,
    status: true
  }
): OutReplicationRule => {
  const {
    dest: { bucket },
    id,
    prefix,
    replicateEncData,
    status
  } = {
    id: null,
    prefix: '',
    status: true,
    replicateEncData: false,
    ...params
  }

  if (bucket === '') {
    throw new Error(`ƒ.replicationRule requries a 'dest.bucket' input`)
  }

  const ret: OutReplicationRule = {
    Destination: replicationDest(params.dest),
    Prefix: prefix,
    Status: status ? 'Enabled' : 'Disabled'
  }

  if ('replicateEncData' in params) {
    ret['SourceSelectionCriteria'] = {
      SseKmsEncryptedObjects: {
        Status: replicateEncData ? 'Enabled' : 'Disabled'
      }
    }
  }
  if (id) ret['Id'] = id

  return ret
}

/**
 * TItle.
 *
 * @description descript.
 * @param params - Asd.
 * @param params.bucket - Asd.
 * @param params.account - Asd.
 * @param params.kmsID - Asd.
 * @param params.storageClass - Asd.
 * @see <https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html#RESTBucketPUTreplication-requests-request-elements>
 * @returns {Object} - Asd.
 * @example
 *  var d = replicationDest({bucket: 'myBucket'})
 */
export const replicationDest = (params: InReplicaDest): OutReplicaDestination => {
  const { bucket, account, kmsId, storageClass } = {
    account: null,
    kmsId: null,
    storageClass: undefined,
    ...params
  }

  const validStorageClass = ['STANDARD', 'STANDARD_IA', 'ONEZONE_IA', 'REDUCED_REDUNDANCY']

  if (storageClass && !validStorageClass.includes(storageClass)) {
    throw new Error(
      `ƒ.replicationDest has an invalid storageClass of: ${storageClass} see: ${{
        validStorageClass
      }}`
    )
  }

  const ret: OutReplicaDestination = {
    Bucket: bucket
  }

  if (account) {
    ret['Account'] = account
    ret['AccessControlTranslation'] = { Owner: 'Destination' }
  }
  if (storageClass) ret['StorageClass'] = storageClass
  if (kmsId) ret['EncryptionConfiguration'] = { ReplicaKmsKeyID: kmsId }

  return ret
}

export interface InReplicaConfig {
  iamARN: string
  rules: InReplicaRule | InReplicaRule[]
}

export interface InReplicaRule {
  dest: InReplicaDest
  id?: string
  prefix?: string // output allows empty string - represents ALL - chosen as default
  status?: boolean
  replicateEncData?: boolean
}

export interface InReplicaDest {
  bucket: string
  account?: string
  storageClass?: string
  kmsId?: string
}

export interface OutReplicaDestination {
  Bucket: string
  StorageClass?: string
  Account?: string
  AccessControlTranslation?: {
    Owner: string
  }
  EncryptionConfiguration?: {
    ReplicaKmsKeyID: string
  }
}

export interface OutReplicationRule {
  Destination: OutReplicaDestination
  Prefix: string
  Id?: string
  Status: 'Enabled' | 'Disabled'
  SourceSelectionCriteria?: {
    SseKmsEncryptedObjects: {
      Status: 'Enabled' | 'Disabled'
    }
  }
}

export interface OutReplicaConfig {
  ReplicationConfiguration: {
    Role: string
    Rules: OutReplicationRule[]
  }
}
