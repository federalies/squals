"use strict";
/** @module S3Bucket */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is a Title.
 *
 * @description creates a valid CFM key
 * @param params - Asd.
 * @param params.saveLogsToBucket -Asd.
 * @param paramslogPrefix - Asd.
 * @example
 *  var lc = loggingConfg({saveLogsToBucket:'otherbucket', logPrefix:'logs/'})
 */
exports.loggingConfg = function (params) {
    var saveLogsToBucket = params.saveLogsToBucket, logPrefix = params.logPrefix;
    var data = {};
    if (logPrefix)
        data['LogFilePrefix'] = logPrefix;
    if (saveLogsToBucket)
        data['DestinationBucketName'] = saveLogsToBucket;
    return {
        LoggingConfiguration: data
    };
};
