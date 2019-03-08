/** @module S3Bucket */
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
});
