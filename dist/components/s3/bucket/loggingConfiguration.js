"use strict";
/** @module S3Bucket */
Object.defineProperty(exports, "__esModule", { value: true });
var loggingConfg = function (saveLogsToBucket, logPrefix) {
    if (saveLogsToBucket === void 0) { saveLogsToBucket = null; }
    if (logPrefix === void 0) { logPrefix = 'logs/'; }
    var LoggingConfiguration = {};
    LoggingConfiguration['LogFilePrefix'] = logPrefix;
    LoggingConfiguration['DestinationBucketName'] = saveLogsToBucket;
    return {
        LoggingConfiguration: LoggingConfiguration
    };
};
exports.loggingConfg = loggingConfg;
