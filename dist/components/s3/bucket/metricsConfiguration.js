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
var tags_1 = require("./tags");
/** @module S3Bucket */
exports.metricsConfig = function (meterThese) {
    return Array.isArray(meterThese)
        ? {
            MetricsConfigurations: meterThese.map(function (v) { return exports.metricsRule(v); })
        }
        : {
            MetricsConfigurations: exports.metricsRule(meterThese)
        };
};
exports.metricsRule = function (params) {
    var _a = __assign({ prefix: null, tagList: [] }, params), id = _a.id, prefix = _a.prefix, tagList = _a.tagList;
    var ret = __assign({ Id: id.toString() }, tags_1.TagFilters(tagList));
    if (prefix)
        ret['Prefix'] = prefix.toString();
    return ret;
};
