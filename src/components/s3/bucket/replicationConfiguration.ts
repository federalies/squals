/** @module S3Bucket */

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} param - Asd.
 * @param {string} param.iamARN - Asd.
 * @param {Array<Object>} param.rules - Asd.
 * @returns {Object} - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-replicationconfiguration.html>
 * @example
 *  var rcfg = replicationConfig({ iamARN:getActingIAMWhileReplcating(),
 *                                 rules: getTheRuleListWeNeedToConfigureTheTempalte() })
 */
export const replicationConfig = (params: InReplicaConfig): OutReplicaConfig => {
  const { iamARN, rules } = params
  return Array.isArray(rules)
    ? {
      ReplicationConfiguration: {
        Role: iamARN,
        Rules: rules.map(r => replicationRule(r))
      }
    }
    : {
      ReplicationConfiguration: {
        Role: iamARN,
        Rules: [replicationRule(rules)]
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
    id: '',
    replicateEncData: false,
    status: true
  }
): OutReplicationRule => {
  const { id, prefix, replicateEncData, status } = {
    // dest*
    prefix: '',
    status: true,
    replicateEncData: false,
    id: null,
    ...params
  }

  const ret: OutReplicationRule = {
    Destination: replicationDest(params.dest),
    Prefix: prefix,
    Status: status ? 'Enabled' : 'Disabled'
  }

  if (replicateEncData) {
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
    storageClass: 'STANDARD',
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

export interface InReplicaDest {
  bucket: string
  account?: string
  storageClass?: string
  owner?: string
  kmsId?: string
}

export interface InReplicaConfig {
  iamARN: string
  rules: InReplicaRule | Array<InReplicaRule>
}

export interface InReplicaRule {
  dest: InReplicaDest
  prefix: string // allows empty string here and in the Out interface
  status?: boolean
  replicateEncData?: boolean
  id?: string
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
