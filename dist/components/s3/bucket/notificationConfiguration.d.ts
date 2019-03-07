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
export declare const notifConfig: (notifList: InNotifs | InNotifs[]) => OutNotificationConfiguration;
/**
 * Title.
 *
 * @description this is a description
 * @param item - A notification config.
 * @param svc - An abbreviate string of an AWS service name.
 * @example
 * var a = toAWSfmt({event:'', arn:'', filters:['*.jpg']}, 'lambda')
 */
export declare const toAWSfmt: (item: InNotifs, svc: string) => OutLambdaConfig | OutQueueConfig | OutTopicConfig;
export interface InNotifs {
    arn: string;
    event: string;
    filters: string[];
}
export interface OutSeparatedNotificationSets {
    LambdaConfigurations?: OutLambdaConfig[];
    QueueConfigurations?: OutQueueConfig[];
    TopicConfigurations?: OutTopicConfig[];
}
export interface OutLambdaConfig {
    Event: string;
    Function: string;
    Filter?: OutNotificationFilters;
}
export interface OutQueueConfig {
    Event: string;
    Queue: string;
    Filter?: OutNotificationFilters;
}
export interface OutTopicConfig {
    Event: string;
    Topic: string;
    Filter?: OutNotificationFilters;
}
export interface OutNotificationFilters {
    S3Key: {
        Rules: OutNotifFilterRule[];
    };
}
export interface OutNotifFilterRule {
    Name: string;
    Value: string;
}
export interface OutNotificationConfiguration {
    NotificationConfiguration: OutSeparatedNotificationSets;
}
//# sourceMappingURL=notificationConfiguration.d.ts.map