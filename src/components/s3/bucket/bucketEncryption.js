/** @module S3Bucket */

/**
 * Top Level Key Gen for S3 Bucket.
 *
 * @description default encryption for a bucket using server-side encryption with either Amazon S3-managed keys (SSE-S3) or AWS KMS-managed keys (SSE-KMS).
 * @param {!Array<paramSSRule>|paramSSRule}  encRules - Asd.
 * @returns {!BucketEncOutput} - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-bucketencryption.html>
 * @example
 *   var a = bucketEncryption()
 *   var b = bucketEncryption({algo:'AES256'})
 *   var c = bucketEncryption([{algo:'AES256'}, {algo:'aws:kms',keyID:'1sf1f3fqws'}])
 */
const bucketEncryption = encRules => {
  return Array.isArray(encRules)
    ? {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: encRules.map(item =>
          serverSideEncryptionRule(item)
        )
      }
    }
    : {
      BucketEncryption: {
        ServerSideEncryptionConfiguration: [
          serverSideEncryptionRule(encRules)
        ]
      }
    }
}

/**
 * Make a ss enc rule.
 *
 * @description helper to create server side Enc Rules
 * @param {Object} params - Input parameters.
 * @param {?string} [params.algo='aws:kms'] - Valid values are `AES256` | `aws:kms`.
 * @param {?string} [params.keyID=null] - Only used when using `SSEAlgorithm == aws:kms`. Defaults to the aws/s3 AWS KMS master key - if this property is absent and `SSEAlgorithm == aws:kms`.
 * @returns {ServerSideConfigRuleOutput}  - Cloudformation ready output.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-serversideencryptionbydefault.html>
 * @example
 *   var a = serverSideEncryptionRule()
 */
const serverSideEncryptionRule = params => {
  const { algo, keyID } = { algo: 'aws:kms', keyID: null, ...params }
  const ret = { ServerSideEncryptionByDefault: { SSEAlgorithm: algo } }
  if (keyID) ret.ServerSideEncryptionByDefault['KMSMasterKeyID'] = keyID
  return ret
}

//
// const log = data => console.log(JSON.stringify(data, null, 2))
// // log(serverSideEncryptionRule())
// // log(bucketEncryption({ algo: 'MD5' }))

// log({ a: bucketEncryption({}) })
// var b = bucketEncryption({ algo: 'AES256' })
// var c = bucketEncryption([
//   { algo: 'AES256' },
//   { algo: 'aws:kms', keyID: '1sf1f3fqws' }
// ])

// log({ a, b, c })

/**
 * @typedef paramSSRule
 * @type {Object}
 * @property {?string} [algo="aws:kms"] - asd.
 * @property {?string} [keyID=null] - asd.
 */

/**
 * @typedef ServerSideConfigRuleOutput
 * @type {Object}
 * @property {Object} ServerSideEncryptionByDefault - Sets server-side encryption by default.
 * @property {!string} ServerSideEncryptionByDefault.SSEAlgorithm - The server-side encryption algorithm to use. Valid values include AES256 and aws:kms.
 * @property {string} [ServerSideEncryptionByDefault.KMSMasterKeyID=null] - The AWS KMS master key ID used for the SSE-KMS encryption.
 */

/**
 * @typedef BucketEncOutput
 * @type {Object}
 * @property {Object} BucketEncryption - default encryption for a bucket using server-side encryption with either Amazon S3-managed keys (SSE-S3) or AWS KMS-managed keys (SSE-KMS).
 * @property {!Array<ServerSideConfigRuleOutput>} BucketEncryption.ServerSideEncryptionConfiguration- asd.
 */

export { bucketEncryption, serverSideEncryptionRule }
