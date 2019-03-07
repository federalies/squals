"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tags_1 = require("./tags");
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
var lifecycleConfig = function (rules) {
    rules = Array.isArray(rules) ? rules : new Array(rules);
    return {
        LifecycleConfiguration: {
            Rules: rules.map(function (item) { return lifecyleRule(item); })
        }
    };
};
exports.lifecycleConfig = lifecycleConfig;
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
var lifecyleRule = function (rule) {
    var _a = __assign({ status: true, id: null, prefix: null, tagList: [] }, rule), status = _a.status, id = _a.id, prefix = _a.prefix, tagList = _a.tagList, inRuleConfig = __rest(_a, ["status", "id", "prefix", "tagList"]);
    /**
     * At least ONE of is required
     * 1. AbortIncompleteMultipartUpload
     * 2. ExpirationDate
     * 3. ExpirationInDays
     * 4. NoncurrentVersionExpirationInDays
     * 5. NoncurrentVersionTransitions
     * 6. Transitions.
     *
     * Condtion Options:
     * 1. { quitMultipartsAfterDays: Number }
     * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
     * 3. { expiryDays: Number }
     * 4. { keepOldVersionForDays: Number }
     * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
     * 6. { transitions: {storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}}
     *
     * More Constraints:
     * 1. use relative dates "daysFromCreated" or absoluteDates and stick to it
     * 2. lifecycle options can only reduce availability of objects
     * 3. Don't use 'transition' if you are using - 'expiryDays'|'keepOldVersionForDays'
     */
    var ruleConfig = inRuleConfig;
    var ret = __assign({ Status: status ? 'Enabled' : 'Disabled' }, transformtoAWSfmt(ruleConfig), tags_1.TagFilters(tagList));
    if (id)
        ret['Id'] = id;
    if (prefix)
        ret['Prefix'] = prefix;
    return ret;
};
exports.lifecyleRule = lifecyleRule;
/*
 * "Type '{
      Status: \"Enabled\" | \"Disabled\";
      TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
    }
   | {
     TagFilters: OutTags[];
     ExpirationDate: string | undefined;
     Status: \"Enabled\" | \"Disabled\";
    }
    | ... 4 more ... | { ...; }'

    is not assignable to type 'OutValidLifeCycleRule'.

    Type '{ TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
      Status: \"Enabled\" | \"Disabled\"; }' is not assignable to type 'OutValidLifeCycleRule'.

    Type '{ TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
      Status: \"Enabled\" | \"Disabled\"; }' is not assignable to type 'OutMultiPartCancel'

      Types of property 'TagFilters' are incompatible.\n

      Type 'OutTags[]' is missing the following properties from type 'OutTags': Key, Value",
 *
 */
/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.quiteMultipartsAfterDays -
 * @returns {Object} Cloudformation S3::AbortIncompleteMultipartUpload property.
 * @example
 * var v = conditionAbortIncompleteMultipartUpload()
 */
var conditionAbortIncompleteMultipartUpload = function (params) {
    var quitMultipartsAfterDays = params.quitMultipartsAfterDays;
    return {
        AbortIncompleteMultipartUpload: {
            DaysAfterInitiation: quitMultipartsAfterDays
        }
    };
};
/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.expiryDate -
 * @example
 * var v = conditionExpirationDate()
 */
var conditionExpirationDate = function (params) {
    var expiryDate = params.expiryDate;
    return { ExpirationDate: expiryDate };
};
/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.expiryDays -
 * @example
 * var v = conditionExpirationInDays()
 */
var conditionExpirationInDays = function (params) {
    var expiryDays = params.expiryDays;
    return { ExpirationInDays: expiryDays };
};
/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.keepOldVersionForDays -
 * @returns Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionExpirationInDays()
 */
var conditionNoncurrentVersionExpirationInDays = function (params) {
    var keepOldVersionForDays = params.keepOldVersionForDays;
    return { NoncurrentVersionExpirationInDays: keepOldVersionForDays };
};
/**
 * Title.
 *
 * @description descrip.
 * @param  trans -
 * @example
 * var v = conditionNoncurrentVersionTransitions()
 */
var conditionNoncurrentVersionTransitions = function (trans) {
    var transitionList = Array.isArray(trans.moveOldVersionRules)
        ? trans.moveOldVersionRules
        : new Array(trans.moveOldVersionRules);
    return {
        NoncurrentVersionTransitions: transitionList.map(function (v) { return ({
            StorageClass: v.storage,
            TransitionInDays: v.daysTillSlowDown
        }); })
    };
};
/**
 * Title.
 *
 * @description descrip.
 * @param trans - Param.
 * @example
 * var v = conditionTransitions()
 */
var conditionTransitions = function (input) {
    var transitionList = Array.isArray(input.transitions)
        ? input.transitions
        : new Array(input.transitions);
    var ret;
    return {
        Transitions: transitionList.map(function (v) {
            if (v.atDate) {
                var complierHelp = v;
                ret = {
                    StorageClass: complierHelp.storage,
                    TransitionDate: complierHelp.atDate
                };
            }
            else {
                var complierHelp = v;
                ret = {
                    StorageClass: complierHelp.storage,
                    TransitionInDays: complierHelp.daysTillSlowDown
                };
            }
            return ret;
        })
    };
};
var transformtoAWSfmt = function (input) {
    /**
     * Condtion Options:
     * 1. { quitMultipartsAfterDays: Number }
     * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
     * 3. { expiryDays: Number }
     * 4. { keepOldVersionForDays: Number }
     * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
     * 6. { transitions: [{storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}] }
     */
    switch (input.ruleName) {
        case 'AbortIncompleteMultipartUpload':
            return conditionAbortIncompleteMultipartUpload(input);
        case 'ExpirationDate':
            return conditionExpirationDate(input);
        case 'ExpirationInDays':
            return conditionExpirationInDays(input);
        case 'NoncurrentVersionExpirationInDays':
            return conditionNoncurrentVersionExpirationInDays(input);
        case 'NoncurrentVersionTransitions':
            return conditionNoncurrentVersionTransitions(input);
        case 'Transitions':
            return conditionTransitions(input);
        default:
            var shouldNeverGetHere = void 0;
            return new Error('poorly formed inputs in the lifecycleConfig function');
    }
};
