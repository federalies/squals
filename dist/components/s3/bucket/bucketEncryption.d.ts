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
export declare const bucketEncryption: (encRules: InParamSSRule | InParamSSRule[]) => OutBucketEnc;
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
export declare const serverSideEncryptionRule: (params: InParamSSRule) => OutServerSideEncRule;
export interface InParamSSRule {
    algo?: string;
    keyID?: string;
}
interface OutServerSideEncRule {
    ServerSideEncryptionByDefault: {
        SSEAlgorithm: string;
        KMSMasterKeyID?: string;
    };
}
interface OutBucketEnc {
    BucketEncryption: {
        ServerSideEncryptionConfiguration: Array<OutServerSideEncRule>;
    };
}
export {};
//# sourceMappingURL=bucketEncryption.d.ts.map