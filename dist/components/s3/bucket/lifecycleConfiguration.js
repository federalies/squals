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
 * @param {inRule | Array<inRule>} rules -
 * @returns {Object} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig.html>
 * @example
 *  var lifeCycle1 = lifecycleConfig({})
 *  var lifeCycle2 = lifecycleConfig([{},{}])
 */
var lifecycleConfig = function (rules) {
    return Array.isArray(rules)
        ? {
            LifecycleConfiguration: {
                Rules: rules.map(function (item) { return lifecyleRule(item); })
            }
        }
        : {
            LifecycleConfiguration: {
                Rules: [lifecyleRule(rules)]
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
 * @todo Add more validations to cover the covariance requirements on input variable
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
     * 1. { quiteMultipartsAfterDays: Number }
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
     *
     *
     * Do NOTE:
     * c = conditions
     * o = options
     */
    var ret = __assign({ Status: status ? 'Enabled' : 'Disabled' }, transformtoAWSfmt(inRuleConfig));
    if (id)
        ret['Id'] = id;
    if (prefix)
        ret['Prefix'] = prefix;
    if (tagList.length > 0)
        ret['TagFilters'] = tags_1.tags(tagList);
    return ret;
};
exports.lifecyleRule = lifecyleRule;
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
var conditionAbortIncompleteMultipartUpload = function (_a) {
    var quiteMultipartsAfterDays = _a.quiteMultipartsAfterDays;
    return {
        AbortIncompleteMultipartUpload: {
            DaysAfterInitiation: quiteMultipartsAfterDays
        }
    };
};
/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!string} input.expiryDate -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionExpirationDate()
 */
var conditionExpirationDate = function (_a) {
    var expiryDate = _a.expiryDate;
    return { ExpirationDate: expiryDate };
};
/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.expiryDays -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionExpirationInDays()
 */
var conditionExpirationInDays = function (_a) {
    var expiryDays = _a.expiryDays;
    return { ExpirationInDays: expiryDays };
};
/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.keepOldVersionForDays -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionExpirationInDays()
 */
var conditionNoncurrentVersionExpirationInDays = function (_a) {
    var keepOldVersionForDays = _a.keepOldVersionForDays;
    return { NoncurrentVersionExpirationInDays: keepOldVersionForDays };
};
/**
 * Title.
 *
 * @description descrip.
 * @param {Array<{storage:?string, daysTillSlowDown:!number}>} trans -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionTransitions()
 */
var conditionNoncurrentVersionTransitions = function (trans) {
    return {
        NoncurrentVersionTransitions: trans.map(function (v) { return ({
            StorageClass: v.storage,
            TransitionInDays: v.daysTillSlowDown
        }); })
    };
};
/**
 * Title.
 *
 * @description descrip.
 * @param {Array<inTransitionItem>} trans -
 * @returns {Object} Cloudformation S3::AbortIncompleteMultipartUpload property.
 * @example
 * var v = conditionTransitions()
 */
var conditionTransitions = function (trans) {
    return {
        Transitions: trans.map(function (v) {
            var ret = { StorageClass: v.storage };
            if (v.atDate)
                ret['TransitionDate'] = v.atDate;
            if (v.daysTillSlowDown)
                ret['TransitionInDays'] = v.daysTillSlowDown;
            return ret;
        })
    };
};
var transformtoAWSfmt = function (input) {
    /**
     * Condtion Options:
     * 1. { quiteMultipartsAfterDays: Number }
     * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
     * 3. { expiryDays: Number }
     * 4. { keepOldVersionForDays: Number }
     * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
     * 6. { transitions: [{storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}] }
     */
    if (input.quiteMultipartsAfterDays) {
        return conditionAbortIncompleteMultipartUpload(input);
    }
    else if (input.expiryDate) {
        return conditionExpirationDate(input);
    }
    else if (input.expiryDays) {
        return conditionExpirationInDays(input);
    }
    else if (input.keepOldVersionForDays) {
        return conditionNoncurrentVersionExpirationInDays(input);
    }
    else if (input.moveOldVersion) {
        // the next two (with transition conditions) expect arrays
        return conditionNoncurrentVersionTransitions(input.moveOldVersion);
    }
    else if (input.transitions) {
        return conditionTransitions(input.transitions);
    }
    else {
        return new Error('poorly formed inputs in the lifecycleConfig function');
    }
};
