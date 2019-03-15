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
export const replicationConfig = (params: InReplicaConfig): OutReplicaConfig | undefined => {
  const { iamARN, destBucket } = params

  if (!iamARN || !(destBucket || 'rules' in params)) {
    throw new Error('ƒ.replicationConfig needs "iamARN*(destBucket+rules)"')
  } else {
    // setup the default rule - what is the easiest config here?
    // IamRole + DestBucket Name
    // perhap it's reducible to just the bucket
    // replciate "everything" to some other bucket
    // where "eveything" still includes SSE objects
    const complierEnsuredBucket = destBucket as string
    const defaultRule: InReplicaRule = {
      id: 'Squals_DefaultRule_ReplicateAll',
      prefix: '',
      status: true,
      replicateEncData: true,
      dest: { bucket: complierEnsuredBucket }
    }
    let { rules } = { rules: defaultRule, ...params }

    rules = Array.isArray(rules) ? rules : new Array(rules)
    const complierEnsuredRules = rules as InReplicaRule[]

    return {
      ReplicationConfiguration: {
        Role: iamARN,
        Rules: complierEnsuredRules.map(r => replicationRule(r))
      }
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

// type InReplicaConfig = InReplicaConfig_destBucket | InReplicaConfig_rulesList

export interface InReplicaConfig {
  iamARN: string
  destBucket?: string
  rules?: InReplicaRule | InReplicaRule[]
}

export interface InReplicaConfig_destBucket {
  iamARN: string
  destBucket: string
}
export interface InReplicaConfig_rulesList {
  iamARN: string
  rules: InReplicaRule | InReplicaRule[]
}

export interface InReplicaRule {
  id?: string
  prefix?: string // output allows empty string - represents ALL - chosen as default
  status?: boolean
  dest: InReplicaDest
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
