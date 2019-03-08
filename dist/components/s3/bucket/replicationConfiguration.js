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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.replicationConfig = function (params) {
        var iamARN = params.iamARN, rules = params.rules;
        return Array.isArray(rules)
            ? {
                ReplicationConfiguration: {
                    Role: iamARN,
                    Rules: rules.map(function (r) { return exports.replicationRule(r); })
                }
            }
            : {
                ReplicationConfiguration: {
                    Role: iamARN,
                    Rules: [exports.replicationRule(rules)]
                }
            };
    };
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
    exports.replicationRule = function (params) {
        if (params === void 0) { params = {
            dest: { bucket: '' },
            prefix: '',
            id: '',
            replicateEncData: false,
            status: true
        }; }
        var _a = __assign({ 
            // dest*
            prefix: '', status: true, replicateEncData: false, id: null }, params), id = _a.id, prefix = _a.prefix, replicateEncData = _a.replicateEncData, status = _a.status;
        var ret = {
            Destination: exports.replicationDest(params.dest),
            Prefix: prefix,
            Status: status ? 'Enabled' : 'Disabled'
        };
        if (replicateEncData) {
            ret['SourceSelectionCriteria'] = {
                SseKmsEncryptedObjects: {
                    Status: replicateEncData ? 'Enabled' : 'Disabled'
                }
            };
        }
        if (id)
            ret['Id'] = id;
        return ret;
    };
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
    exports.replicationDest = function (params) {
        var _a = __assign({ account: null, kmsId: null, storageClass: 'STANDARD' }, params), bucket = _a.bucket, account = _a.account, kmsId = _a.kmsId, storageClass = _a.storageClass;
        var validStorageClass = ['STANDARD', 'STANDARD_IA', 'ONEZONE_IA', 'REDUCED_REDUNDANCY'];
        if (storageClass && !validStorageClass.includes(storageClass)) {
            throw new Error("\u0192.replicationDest has an invalid storageClass of: " + storageClass + " see: " + {
                validStorageClass: validStorageClass
            });
        }
        var ret = {
            Bucket: bucket
        };
        if (account) {
            ret['Account'] = account;
            ret['AccessControlTranslation'] = { Owner: 'Destination' };
        }
        if (storageClass)
            ret['StorageClass'] = storageClass;
        if (kmsId)
            ret['EncryptionConfiguration'] = { ReplicaKmsKeyID: kmsId };
        return ret;
    };
});
