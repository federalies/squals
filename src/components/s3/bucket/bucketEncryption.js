/**
 * Make a ss enc rule.
 *
 * @description server side Enc Rule
 * @param {*} [algo='aws:kms'] - Valid values are `AES256` | `aws:kms`.
 * @param {*} KeyID - Only used when using `SSEAlgorithm == aws:kms`. Defaults to the aws/s3 AWS KMS master key - if this property is absent and `SSEAlgorithm == aws:kms`.
 * @returns {Object} - Asdf.
 * @example
 *   var a = serverSideEncryptionRule()
 */
const serverSideEncryptionRule = (algo = 'aws:kms', KeyID = null) => {
  const ServerSideEncryptionByDefault = {
    SSEAlgorithm: algo
  }
  if (KeyID) ServerSideEncryptionByDefault['KMSMasterKeyID'] = KeyID
  return ServerSideEncryptionByDefault
}

const bucketEncryption = encRules => {
  const [...ssEncrRules] = encRules
  return {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: ssEncrRules.map(v =>
        serverSideEncryptionRule(v)
      )
    }
  }
}

export { bucketEncryption, serverSideEncryptionRule }
