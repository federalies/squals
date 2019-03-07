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
Object.defineProperty(exports, "__esModule", { value: true });
var destination_1 = require("./destination");
var tags_1 = require("./tags");
/** @module S3Bucket */
/**
 * AWS:S3:: Analytics Configuration.
 *
 * @description specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.
 * @param config - Object or array of objects.
 * @todo work on a way to imply the ID from the prefix, bucketname, date created, etc.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-analyticsconfiguration.html>
 * @example
 *  var analyticsItem = analyticsConfig([
 *    { id: 'testA', prefix: 'doc/', tagList: [{ keyy: 'value' }] },
 *    {
 *      id: 'testB',
 *      prefix: 'docs/',
 *      tagList: [{ k: 'val' }],
 *      dest: {
 *        arn: 'aws:arn:s3::asd.asdf',
 *        savePrefix: 'docs/',
 *        acctId: 'someOtherAccount'
 *      },
 *    }
 *  ])
 */
exports.analyticsConfig = function (config) {
    return Array.isArray(config)
        ? { AnalyticsConfigurations: config.map(function (item) { return makeItem(item); }) }
        : { AnalyticsConfigurations: [makeItem(config)] };
};
/**
 * Support the Item Declarations for the top-level array.
 *
 * @description Packages the item level config for bucket analysis
 * @param config - The required config baed on required field desinations in AWS docs.
 * @todo work on a way to imply the ID from the prefix, bucketname, date created, etc - do it here first - and see if we can just make it not required first
 * @example
 *   var v = makeItem({ id:'heyThere', prefix:'myPrefix', tagList:[{key1:'val1'},{key1:'val2'}] })
 */
var makeItem = function (config) {
    var _a = __assign({ 
        // id*
        dest: null, prefix: null, tagList: null }, config), id = _a.id, prefix = _a.prefix, dest = _a.dest, tagList = _a.tagList;
    var item = tagList
        ? {
            Id: id,
            Prefix: '',
            StorageClassAnalysis: {
                DataExport: __assign({ OutputSchemaVersion: 'V_1' }, destination_1.destination(dest))
            }
        }
        : __assign({ Id: id, Prefix: '' }, tags_1.TagFilters(tagList), { StorageClassAnalysis: {
                DataExport: __assign({ OutputSchemaVersion: 'V_1' }, destination_1.destination(dest))
            } });
    if (prefix)
        item['Prefix'] = prefix;
    return item;
};
