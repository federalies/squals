/** @module S3Bucket */
/**
 * @typeDef outLifecycleConfig
 * @type {Object}
 * @property {Object} LifecycleConfiguration - asd
 * @property {Array<outRule>} LifecycleConfiguration.Rules - asd
 */
/**
 * Config the Lifecycle Rules.
 *
 * @description  Collection of S3 Bucket Rules that govern the process of fading to longterm/cold storage
 * @param {inRule | Array<inRule>} rules -
 * @returns {Object} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig.html>
 * @example
 *  var lifeCycle1 = lifecycleConfig({})
 *  var lifeCycle2 = lifecycleConfig([{},{}])
 */
declare const lifecycleConfig: (rules: any) => {
    LifecycleConfiguration: {
        Rules: ({
            name: string;
            message: string;
            stack?: string | undefined;
            Status: string;
        } | {
            AbortIncompleteMultipartUpload: {
                DaysAfterInitiation: any;
            };
            Status: string;
        } | {
            ExpirationDate: any;
            Status: string;
        } | {
            ExpirationInDays: any;
            Status: string;
        } | {
            NoncurrentVersionExpirationInDays: any;
            Status: string;
        } | {
            NoncurrentVersionTransitions: any;
            Status: string;
        } | {
            Transitions: any;
            Status: string;
        })[];
    };
};
/**
 * Title.
 *
 * @description description.
 * @param {Object<string, boolean|string|Array<string>>} rule -
 * @param {?boolean} [rule.status] -
 * @param {?string} [rule.id] -
 * @param {?string} [rule.prefix] -
 * @param {?Array<{string:string}>} [rule.tagList]-.
 * @returns {Object} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html>
 * @todo Add more validations to cover the covariance requirements on input variable
 * @example
 *  var rulesA = lifecyleRule({opt:1})
 *  var rulesB = lifecyleRule([{opt:1},{opt:1}])
 */
declare const lifecyleRule: (rule: any) => {
    name: string;
    message: string;
    stack?: string | undefined;
    Status: string;
} | {
    AbortIncompleteMultipartUpload: {
        DaysAfterInitiation: any;
    };
    Status: string;
} | {
    ExpirationDate: any;
    Status: string;
} | {
    ExpirationInDays: any;
    Status: string;
} | {
    NoncurrentVersionExpirationInDays: any;
    Status: string;
} | {
    NoncurrentVersionTransitions: any;
    Status: string;
} | {
    Transitions: any;
    Status: string;
};
/**
 * @typedef inMoveOldVersionsItem
 * @type {Object}
 * @property {!string} storage - The storage class to which you want the object to transition, such as GLACIER. For valid values, see the StorageClass request element of the PUT Bucket lifecycle action in the Amazon Simple Storage Service API Reference.
 * @property {!number} daysTillSlowDown - The number of days between the time that a new version of the object is uploaded to the bucket and when old versions of the object are transitioned to the specified storage class.
 */
/**
 * @typedef inRuleMoveOldVersions
 * @type {Object}
 * @property {*} moveOldVersion - For buckets with versioning enabled (or suspended), one or more transition rules that specify when non-current objects transition to a specified storage class. If you specify a transition and expiration time, the expiration time must be later than the transition time. If you specify this property, don't specify the NoncurrentVersionTransition property
 */
/**
 * @typedef outMoveOldVersionsItem
 * @type {Object}
 * @property {!string} StorageClass - The storage class to which you want the object to transition, such as GLACIER. For valid values, see the StorageClass request element of the PUT Bucket lifecycle action in the Amazon Simple Storage Service API Reference.
 * @property {!number} TransitionInDays - The number of days between the time that a new version of the object is uploaded to the bucket and when old versions of the object are transitioned to the specified storage class.
 */
/**
 * @typedef inTransitionItem
 * @type {Object}
 * @property {!string} storage - The storage class to which you want the object to transition, such as GLACIER.
 * @property {?string} atDate - Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.
 * @property {?number} daysTillSlowDown - Indicates the number of days after creation when objects are transitioned to the specified storage class.
 */
/**
 * @typedef outTransitionItem
 * @type {Object}
 * @property {!string} StorageClass - The storage class to which you want the object to transition, such as GLACIER.
 * @property {?string} TransitionDate - Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.
 * @property {?number} TransitionInDays - Indicates the number of days after creation when objects are transitioned to the specified storage class.
 */
/**
 * @typedef inRule
 * @type {Object}
 * @property {?string} id - A unique identifier for this rule. The value cannot be more than 255 characters.
 * @property {?string} prefix - Object key prefix that identifies one or more objects to which this rule applies.
 * @property {?boolean} [status=true] - [Enabled | Disabled] Specify either Enabled or Disabled. If you specify Enabled, Amazon S3 executes this rule as scheduled. If you specify Disabled, Amazon S3 ignores this rule.
 * @property {?Array} tagList - Tags to use to identify a subset of objects to which the lifecycle rule applies.
 * @property {?number} expiryDays - Indicates the number of days after creation when objects are deleted from Amazon S3 and Glacier. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.
 * @property {?string} expiryDate - Indicates when objects are deleted from Amazon S3 and Glacier. The date value must be in ISO 8601 format. The time is always midnight UTC. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.
 * @property {?number} keepOldVersionForDays - For buckets with versioning enabled (or suspended), specifies the time, in days, between when a new version of the object is uploaded to the bucket and when old versions of the object expire. When object versions expire, Amazon S3 permanently deletes them. If you specify a transition and expiration time, the expiration time must be later than the transition time.
 * @property {?number} quiteMultipartsAfterDays - Specifies a lifecycle rule that aborts incomplete multipart uploads to an Amazon S3 bucket.
 * @property {?inRuleMoveOldVersions|?Array<inRuleMoveOldVersions>} moveOldVersion -
 * @property {?inTransitionItem | ?Array<inTransitionItem>} transitions -
 */
/**
 * @typedef outRule
 * @type {Object}
 * @property {?string} Id - A unique identifier for this rule. The value cannot be more than 255 characters.
 * @property {?string} Prefix - Object key prefix that identifies one or more objects to which this rule applies.
 * @property {?string} Status - [Enabled | Disabled] Specify either Enabled or Disabled. If you specify Enabled, Amazon S3 executes this rule as scheduled. If you specify Disabled, Amazon S3 ignores this rule.
 * @property {?Array} TagFilters - Tags to use to identify a subset of objects to which the lifecycle rule applies.
 * @property {?number} ExpirationInDays
 * @property {?string} ExpirationDate -
 * @property {?number} NoncurrentVersionExpirationInDays -
 * @property {?Object} AbortIncompleteMultipartUpload -
 * @property {?Array<outMoveOldVersionsItem>} NoncurrentVersionTransitions -
 * @property {?Array<outTransitionItem>} Transitions -
 */
export { lifecycleConfig, lifecyleRule };
//# sourceMappingURL=lifecycleConfiguration.d.ts.map