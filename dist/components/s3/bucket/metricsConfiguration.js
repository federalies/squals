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
var metricsConfig = function (meterThese) {
    return {
        MetricsConfigurations: meterThese.map(function (v) { return metricsRule(v); })
    };
};
exports.metricsConfig = metricsConfig;
var metricsRule = function (params) {
    // @ts-ignore
    var _a = __assign({ prefix: null, tagList: [] }, params), id = _a.id, prefix = _a.prefix, tagList = _a.tagList;
    return __assign({ Id: id.toString(), Prefix: prefix.toString() }, tags_1.TagFilters(tagList));
};
exports.metricsRule = metricsRule;
