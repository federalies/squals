"use strict";
/** @module S3Bucket */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param tagList - TagList  * asdasd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
exports.tags = function (tagList) {
    var handleArray = function (tagList) {
        return tagList.map(function (v) { return ({
            Key: Object.keys(v)[0],
            Value: Object.keys(v)[0]
        }); });
    };
    var handleItem = function (tagList) {
        return Object.entries(tagList).reduce(function (p, _a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return __spread(p, [{ Key: k, Value: v }]);
        }, []);
    };
    return Array.isArray(tagList) ? handleArray(tagList) : handleItem(tagList);
};
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string:string}>} tagList - * asdasd.
 * @returns {{Tags:Array<{Key:string,Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
exports.Tags = function (tagList) {
    return {
        Tags: exports.tags(tagList)
    };
};
/**
 * AWS::S3:Bucket Tags.
 *
 * @description Transform JS Array of Object Key:values ot the AWS Cloudformation representation
 * @param {Array<{string: string}>} tagList - Incoming tagList.
 * @returns {{TagFilters:Array<{Key: string, Value:string}>}} - Asd.
 * @example
 *  var cloudformationArr = tags([{key1:'value1'},{key2:'value2'}])
 */
exports.TagFilters = function (tagList) {
    return {
        TagFilters: exports.tags(tagList)
    };
};
