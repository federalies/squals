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
const replicationConfig = ({ iamARN, rules }) => {
  return {
    ReplicationConfiguration: {
      Role: iamARN,
      Rules: rules
    }
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} params - Asd.
 * @param {Object} params.dest - Asd.
 * @param {string} params.prefix - Asd.
 * @param {string} [params.id] - Asd.
 * @param {boolean} [params.status=true] - Asd.
 * @param {boolean} [params.replicateEncData] - Asd.
 * @returns {Object} - Asd.
 * @example
 *  var r = replicationRule()
 */
const replicationRule = params => {
  const { dest, id, prefix, replicateEncData, status } = {
    // dest*
    // prefix*
    status: true,
    replicateEncData: null,
    id: null,
    ...params
  }
  const ret = {}

  ret['Destination'] = replicationDest(dest)
  ret['Prefix'] = prefix
  ret['Status'] = status ? 'Enabled' : 'Disabled'
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
 * @param {Object} params - Asd.
 * @param {string} params.bucket - Asd.
 * @param {string} [params.account] - Asd.
 * @param {string} [params.kmsId] - Asd.
 * @param {string} [params.storageClass] - Asd.
 * @returns {Object} - Asd.
 * @example
 *  var d = replicationDest({bucket: 'myBucket'})
 */
const replicationDest = params => {
  // @see <https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTreplication.html#RESTBucketPUTreplication-requests-request-elements>
  const { bucket, account, kmsId, storageClass } = {
    // bucket*
    account: null,
    kmsId: null,
    storageClass: null,
    ...params
  }

  const validStorageClass = [
    'STANDARD',
    'STANDARD_IA',
    'ONEZONE_IA',
    'REDUCED_REDUNDANCY'
  ]

  if (storageClass && !validStorageClass.includes(storageClass)) {
    throw new Error('replicationDest has an invalid storageClass')
  }

  const ret = {
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

export { replicationConfig, replicationRule, replicationDest }
