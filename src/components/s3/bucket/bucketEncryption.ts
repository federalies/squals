/**
 * Top Level Key Gen for S3 Bucket.
 *
 * @description default encryption for a bucket using server-side encryption with either Amazon S3-managed keys (SSE-S3) or AWS KMS-managed keys (SSE-KMS).
 * @param encRules - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-bucketencryption.html>
 * @example
 *   var a = bucketEncryption()
 *   var b = bucketEncryption({algo:'AES256'})
 *   var c = bucketEncryption([{algo:'AES256'}, {algo:'aws:kms',keyID:'1sf1f3fqws'}])
 */
export const encryptionConfig = (
  encRules: IbucketParamSSRule | IbucketParamSSRule[] = {}
): IBucketBucketEnc => {
  const bucketEnc = Array.isArray(encRules) ? encRules : new Array(encRules)
  return {
    BucketEncryption: {
      ServerSideEncryptionConfiguration: bucketEnc.map(item => serverSideEncryptionRule(item))
    }
  }
}

/**
 * Make a ss enc rule.
 *
 * @description helper to create server side Enc Rules
 * @param params - Input parameters.
 * @param params.algo - Valid values are `AES256` | `aws:kms`.
 * @param params.keyID - Only used when using `SSEAlgorithm == aws:kms`. Defaults to the aws/s3 AWS KMS master key - if this property is absent and `SSEAlgorithm == aws:kms`.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-serversideencryptionbydefault.html>
 * @example
 *   var a = serverSideEncryptionRule()
 */
export const serverSideEncryptionRule = (
  params: IbucketParamSSRule = {}
): IBucketServerSideEncRule => {
  const { algo, keyID } = { algo: 'aws:kms', keyID: null, ...params }
  if (!['aws:kms', 'AES256'].includes(algo)) {
    throw new Error(
      `ƒ.serverSideEncryptionRule needed an input algo of ['aws:kms', 'AES256'] - but instead got: ${algo}`
    )
  }

  // @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-serversideencryptionbydefault.html>
  if (algo === 'AES256' && 'keyID' in params) {
    throw new Error(
      `ƒ.serverSideEncryptionRule requies that KeyId is only used with aws:kms - and not using the default aws/s3 master key`
    )
  }

  const ret: IBucketServerSideEncRule = { ServerSideEncryptionByDefault: { SSEAlgorithm: algo } }
  if (keyID) ret.ServerSideEncryptionByDefault['KMSMasterKeyID'] = keyID
  return ret
}

export interface IbucketParamSSRule {
  algo?: string
  keyID?: string
}

export interface IBucketServerSideEncRule {
  ServerSideEncryptionByDefault: {
    SSEAlgorithm: string
    KMSMasterKeyID?: string
  }
}

export interface IBucketBucketEnc {
  BucketEncryption: { ServerSideEncryptionConfiguration: IBucketServerSideEncRule[] }
}
