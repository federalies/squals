import { OutTags, InTags } from './tags';
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
 * @param rules -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig.html>
 * @example
 *  var lifeCycle1 = lifecycleConfig({})
 *  var lifeCycle2 = lifecycleConfig([{},{}])
 */
declare const lifecycleConfig: (rules: InRule | InRule[]) => OutLifecycleConfig;
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
 * @todo Add more validations to cover the covariance requirements on input variable -namely choose a unit and stick with it
 * @example
 *  var rulesA = lifecyleRule({opt:1})
 *  var rulesB = lifecyleRule([{opt:1},{opt:1}])
 */
declare const lifecyleRule: (rule: InRule) => OutValidLifeCycleRule;
interface InRule {
    id?: string;
    prefix?: string;
    status?: boolean;
    tagList?: InTags;
}
interface OutMoveOldVersionsItem {
    StorageClass: string;
    TransitionInDays: number;
}
interface OutTransitionItem {
    StorageClass: string;
    TransitionDate?: string;
    TransitionInDays?: number;
}
declare type OutValidLifeCycleRule = OutMultiPartCancel | OutExpirationDate | OutExpirationInDays | OutNoncurrentVer | OutNonCurrentTrans | OutTransitions;
interface OutMultiPartCancel extends OutLifecycleRule {
    AbortIncompleteMultipartUpload: {
        DaysAfterInitiation: number;
    };
}
interface OutExpirationDate extends OutLifecycleRule {
    ExpirationDate: string;
}
interface OutExpirationInDays extends OutLifecycleRule {
    ExpirationInDays: number;
}
interface OutNoncurrentVer extends OutLifecycleRule {
    NoncurrentVersionExpirationInDays?: number;
}
interface OutNonCurrentTrans extends OutLifecycleRule {
    NoncurrentVersionTransitions: OutMoveOldVersionsItem[];
}
interface OutTransitions extends OutLifecycleRule {
    Transitions: OutTransitionItem[];
}
export interface OutLifecycleRule {
    Status: 'Enabled' | 'Disabled';
    Id?: string;
    Prefix?: string;
    TagFilters?: OutTags;
}
export interface OutLifecycleConfig {
    LifecycleConfiguration: {
        Rules: OutLifecycleRule[];
    };
}
export { lifecycleConfig, lifecyleRule };
//# sourceMappingURL=lifecycleConfiguration.d.ts.map