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
        define(["require", "exports", "./destination", "lodash-es"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var destination_1 = require("./destination");
    var lodash_es_1 = require("lodash-es");
    /** @module S3Bucket */
    // * @param {string} configs.id -
    //  * @param {inDestination} configs.dest -
    //  * @param {!string} configs.dest.arn -
    /**
     *  Amazon S3 bucket inventory configuration.
     *
     * @description The inventory configuration for an Amazon S3 bucket. Duplicate rules not allowed.
     * @param {inInventoryConfig } configs -
     * @returns {outInventoryConfig} -
     * @todo Validate no duplicates.
     * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
     * @example
     *   var invCfg1 = inventoryConfig({ id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' }})
     *   var invCfg2 = inventoryConfig([
     *        { id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' } },
     *        { id: 'myID2', dest: { arn: 'arn:aws:s3:bucket2' } }
     *   ])
     */
    exports.inventoryConfig = function (configs) {
        return Array.isArray(configs)
            ? { InventoryConfigurations: configs.map(function (item) { return exports.inventoryRule(item); }) }
            : { InventoryConfigurations: [exports.inventoryRule(configs)] };
    };
    /**
     * Make an invetory analysis rule.
     *
     * @description make on inventory configuration rule for the inventory config.
     * @param { !inInventoryRule } params - Input variables to make an inventoryConfig.
     * @returns { !outInventoryRule } - Asd.
     * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
     * @see <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketInventoryConfiguration-property>
     * @example
     *  var a = inventoryRule({ id: 'myID', dest: { arn: 'arn:aws:s3:bucket0' } })
     *  var b = inventoryRule([{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket1' }},{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket2' }} ] )
     */
    exports.inventoryRule = function (params) {
        // @ts-ignore
        var _a = __assign({ id: null, versions: 'All', frequency: 'Weekly', dest: null, enabled: true, optionals: [], prefix: null }, params), id = _a.id, versions = _a.versions, frequency = _a.frequency, dest = _a.dest, enabled = _a.enabled, optionals = _a.optionals, prefix = _a.prefix;
        // assert data presence
        if (!id || !dest || !versions || !frequency) {
            var msg = 'ƒ.inventoryRule has missing required data: [ ';
            if (!id)
                msg += ' id';
            if (!dest)
                msg += ' dest';
            if (!versions)
                msg += ' versions';
            if (!frequency)
                msg += ' frequency';
            msg += ' ]';
            throw new Error(msg);
        }
        // assert validity
        var validOptionals = [
            'Size',
            'LastModifiedDate',
            'StorageClass',
            'ETag',
            'IsMultipartUploaded',
            'ReplicationStatus',
            'EncryptionStatus',
            'ObjectLockRetainUntilDate',
            'ObjectLockMode',
            'ObjectLockLegalHoldStatus'
        ];
        if (!['All', 'Current'].includes(versions)) {
            throw new Error("\u0192.inventoryRule versions only has two valid values: 'All' + 'Current' - found the value: " + versions);
        }
        if (!['Daily', 'Weekly'].includes(frequency)) {
            throw new Error("\u0192.inventoryRule frequency only has two valid values: 'Daily' + 'Weekly' - found the value: " + frequency);
        }
        if (lodash_es_1.difference(optionals, validOptionals).length > 1) {
            throw new Error("\u0192.inventoryRule param: optionals have a defined of properties that can be requested as included in invetory analysis - found: " + optionals);
        }
        // construct return obj
        var ret = __assign({}, destination_1.destination(dest), { Id: id, Enabled: enabled, IncludedObjectVersions: versions, ScheduleFrequency: frequency });
        if (optionals && optionals.length > 0)
            ret['OptionalFields'] = optionals;
        if (prefix)
            ret['Prefix'] = prefix;
        return ret;
    };
});
