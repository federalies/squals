"use strict";
exports.__esModule = true;
var arn_1 = require("@sandfox/arn");
console.error(arn_1.parse('arn:aws:lambda::123456789012:resourceA/division_abcÀ/subdivision_xyz/ProdServerCert'));
/** @module S3Bucket */
var parseFilter = function (filter) {
    var Name = '';
    var Value = '';
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
/**
 * Title.
 *
 * @description asdasd.
 * @param notifList - Asd.
 * @todo add functionality and testing to deal with ARN REFS so that you notifiucation rule can incorporate newly created funcs
 * @example
 *  var notif1 = notifConfig({event:"s3:ObjectCreated:*",
 *                           arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                           filters:['Yosem*', '*.jpg']})
 *  var notif2 = notifConfig([{ event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['Yosem*', '*.jpg']},
 *                           { event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['YellowSto*', '*.jpg', '*.png']}
 *                          ])
 */
exports.notifConfig = function (notifList) {
    notifList = Array.isArray(notifList) ? notifList : new Array(notifList);
    var data = notifList.reduce(function (prior, notif) {
        var svc = arn_1.parse(notif.arn).service;
        console.error({ svc: svc });
        switch (svc) {
            case 'lambda':
                prior.l.push(exports.toAWSfmt(notif, svc));
                break;
            case 'sqs':
                prior.q.push(exports.toAWSfmt(notif, svc));
                break;
            case 'sns':
                prior.t.push(exports.toAWSfmt(notif, svc));
                break;
            default:
                throw new Error("the ARN type of the service receiving a notification should be lambda|sqs|sns ");
        }
        return prior;
    }, { l: [], t: [], q: [] });
    var ret = { NotificationConfiguration: {} };
    if (data.l.length > 0) {
        ret.NotificationConfiguration['LambdaConfigurations'] = data.l;
    }
    if (data.q.length > 0) {
        ret.NotificationConfiguration['QueueConfigurations'] = data.q;
    }
    if (data.t.length > 0) {
        ret.NotificationConfiguration['TopicConfigurations'] = data.t;
    }
    return ret;
};
/**
 * Title.
 *
 * @description this is a description
 * @param item - A notification config.
 * @param svc - An abbreviate string of an AWS service name.
 * @example
 * var a = toAWSfmt({event:'', arn:'', filters:['*.jpg']}, 'lambda')
 */
exports.toAWSfmt = function (item, svc) {
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
    if (!validValues.includes(item.event)) {
        throw new Error('invalid notification event type');
    }
    var Rules = item.filters ? item.filters.map(function (filter) { return parseFilter(filter); }) : [];
    switch (svc) {
        case 'lambda':
            return Rules.length > 0
                ? {
                    Event: item.event,
                    Function: item.arn,
                    Filter: { S3Key: { Rules: Rules } }
                }
                : {
                    Event: item.event,
                    Function: item.arn
                };
        case 'sqs':
            return Rules.length > 0
                ? {
                    Event: item.event,
                    Queue: item.arn,
                    Filter: { S3Key: { Rules: Rules } }
                }
                : {
                    Event: item.event,
                    Queue: item.arn
                };
        case 'sns':
            return Rules.length > 0
                ? {
                    Event: item.event,
                    Topic: item.arn,
                    Filter: { S3Key: { Rules: Rules } }
                }
                : {
                    Event: item.event,
                    Topic: item.arn
                };
        default:
            throw new Error('invalid notification event type');
    }
};
