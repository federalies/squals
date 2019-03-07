"use strict";
/** @module S3Bucket */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.bucketEncryption = function (encRules) {
    return Array.isArray(encRules)
        ? {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: encRules.map(function (item) { return exports.serverSideEncryptionRule(item); })
            }
        }
        : {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: [exports.serverSideEncryptionRule(encRules)]
            }
        };
};
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
exports.serverSideEncryptionRule = function (params) {
    var _a = __assign({ algo: 'aws:kms', keyID: null }, params), algo = _a.algo, keyID = _a.keyID;
    var ret = { ServerSideEncryptionByDefault: { SSEAlgorithm: algo } };
    if (keyID)
        ret.ServerSideEncryptionByDefault['KMSMasterKeyID'] = keyID;
    return ret;
};
