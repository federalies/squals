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
var arn_1 = require("@sandfox/arn");
/** @module S3Bucket */
var parseFilter = function (filter) {
    var Name = null;
    var Value = null;
    if (filter.toString().startsWith('*')) {
        Name = 'prefix';
        Value = filter.slice(1);
    }
    else if (filter.toString().endsWith('*')) {
        Name = 'suffix';
        Value = filter.slice(0, -1);
    }
    else {
        throw new Error("the notification filter should have a '*' at the beginning or end of the token like: [*.jpg] or [Mr*]");
    }
    return { Name: Name, Value: Value };
};
var notifConfig = function (notifList) {
    // notifList = Array
    // where items = {}
    // notifList = [{},{}]
    var NotificationConfiguration = {};
    var LambdaConfigurations = [];
    var QueueConfigurations = [];
    var TopicConfigurations = [];
    notifList.map(function (item) {
        var svc = arn_1.parse(item.arn).service;
        switch (svc) {
            case 'lambda':
                LambdaConfigurations.push(toAWSfmt(item, svc));
                break;
            case 'sqs':
                QueueConfigurations.push(toAWSfmt(item, svc));
                break;
            case 'sns':
                TopicConfigurations.push(toAWSfmt(item, svc));
                break;
            default:
                throw new Error("the ARN type of the service receiving a notification should be lambda|sqs|sns ");
        }
    });
    if (LambdaConfigurations.length > 0) {
        NotificationConfiguration = __assign({}, NotificationConfiguration, { LambdaConfigurations: LambdaConfigurations });
    }
    if (QueueConfigurations.length > 0) {
        NotificationConfiguration = __assign({}, NotificationConfiguration, { QueueConfigurations: QueueConfigurations });
    }
    if (TopicConfigurations.length > 0) {
        NotificationConfiguration = __assign({}, NotificationConfiguration, { TopicConfigurations: TopicConfigurations });
    }
    return NotificationConfiguration;
};
exports.notifConfig = notifConfig;
var toAWSfmt = function (item, svc) { return function () {
    // where items = {event: String, arn: String, filters=['*.jpg', 'Mrs.*']}
    // where items.filters MUST have a `*` denoting the filter is a `prefix` or `suffix`
    // where lambdaList(items).event = enum
    // where s3 notifcation validValues actually live @ <https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#supported-notification-event-types>
    // where aws service name abbreviateions actually live @ <https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#genref-aws-service-namespaces>
    var validValues = [
        's3:ObjectCreated:*',
        's3:ObjectCreated:Put',
        's3:ObjectCreated:Post',
        's3:ObjectCreated:Copy',
        's3:ObjectCreated:CompleteMultipartUpload',
        's3:ObjectRemoved:*',
        's3:ObjectRemoved:Delete',
        's3:ObjectRemoved:DeleteMarkerCreated',
        's3:ObjectRestore:Post',
        's3:ObjectRestore:Completed',
        's3:ReducedRedundancyLostObject'
    ];
    var ret = {};
    if (validValues.includes(item.event)) {
        ret['Event'] = item.event;
    }
    else {
        throw new Error('lambda naotification list');
    }
    var Rules = item.filters
        ? item.filters.map(function (filter) { return parseFilter(filter); })
        : [];
    if (Rules.length > 0)
        ret['Filter'] = { S3Key: { Rules: Rules } };
    if (svc === 'lambda')
        ret['Function'] = item.arn;
    if (svc === 'sqs')
        ret['Queue'] = item.arn;
    if (svc === 'sns')
        ret['Topic'] = item.arn;
    return ret;
}; };
