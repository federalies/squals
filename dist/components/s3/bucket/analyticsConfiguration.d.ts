import { InDestination, OutDestinationItem } from './destination';
import { OutTags, InTags } from './tags';
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
export declare const analyticsConfig: (config: InAnalyticsConfigItem | Array<InAnalyticsConfigItem>) => OutAnalyticsConfig;
interface InAnalyticsConfigItem {
    id: string;
    dest: InDestination;
    prefix?: string;
    tagList: Array<InTags>;
}
export interface OutAnalyticsItem {
    Id: string;
    Prefix?: string;
    TagFilter?: Array<OutTags>;
    StorageClassAnalysis: {
        DataExport: {
            OutputSchemaVersion: string;
            Destination: OutDestinationItem;
        };
    };
}
export interface OutAnalyticsConfig {
    AnalyticsConfigurations: Array<OutAnalyticsItem>;
}
export {};
//# sourceMappingURL=analyticsConfiguration.d.ts.map