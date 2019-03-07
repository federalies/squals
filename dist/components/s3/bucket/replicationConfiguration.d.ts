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
declare const replicationConfig: (params: InReplicaConfig) => OutReplicaConfig;
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
declare const replicationRule: (params?: InReplicaRule) => OutReplicationRule;
export interface InReplicaRule {
    dest: InReplicaDest;
    prefix: string;
    status?: boolean;
    replicateEncData?: boolean;
    id?: string;
}
interface OutReplicationRule {
    Destination: OutReplicaDestination;
    Prefix: string;
    Id?: string;
    Status: 'Enabled' | 'Disabled';
    SourceSelectionCriteria?: {
        SseKmsEncryptedObjects: {
            Status: 'Enabled' | 'Disabled';
        };
    };
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
declare const replicationDest: (params: InReplicaDest) => OutReplicaDestination;
export interface InReplicaDest {
    bucket: string;
    account?: string;
    storageClass?: string;
    owner?: string;
    kmsId?: string;
}
interface OutReplicaDestination {
    Bucket: string;
    StorageClass?: string;
    Account?: string;
    AccessControlTranslation?: {
        Owner: string;
    };
    EncryptionConfiguration?: {
        ReplicaKmsKeyID: string;
    };
}
export interface InReplicaConfig {
    iamARN: string;
    rules: InReplicaRule | Array<InReplicaRule>;
}
interface OutReplicaConfig {
    ReplicationConfiguration: {
        Role: string;
        Rules: Array<OutReplicationRule>;
    };
}
export { replicationConfig, replicationRule, replicationDest };
//# sourceMappingURL=replicationConfiguration.d.ts.map