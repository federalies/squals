import { OutTags } from './tags.js';
import { OutVersioning } from './versioningConfiguration.js';
import { OutAnalyticsItem } from './analyticsConfiguration';
import { OutServerSideEncRule } from './bucketEncryption';
import { OutCorsRule } from './corsConfiguration';
import { OutInventoryRule } from './inventoryConfiguration';
import { OutLifecycleRule } from './lifecycleConfiguration';
import { OutLogging } from './loggingConfiguration';
import { OutMetricsRule } from './metricsConfiguration';
import { OutSeparatedNotificationSets } from './notificationConfiguration';
import { OutPublicAccessConfig } from './publicAccessBlockConfiguration';
import { OutReplicationRule } from './replicationConfiguration';
declare class S3Bucket {
    name: string;
    Type: 'AWS::S3::Bucket';
    Properties?: {
        BucketName?: string;
        AccessControl?: string;
        AccelerateConfiguration?: {
            AccelerationStatus: 'Enabled' | 'Suspended';
        };
        AnalyticsConfigurations?: OutAnalyticsItem[];
        BucketEncryption?: {
            ServerSideEncryptionConfiguration: OutServerSideEncRule[];
        };
        CorsConfiguration?: {
            CorsRules: OutCorsRule[];
        };
        InventoryConfigurations?: OutInventoryRule[];
        LifecycleConfiguration?: {
            Rules: OutLifecycleRule[];
        };
        LoggingConfiguration?: OutLogging;
        MetricsConfigurations?: OutMetricsRule[];
        NotificationConfiguration?: OutSeparatedNotificationSets;
        PublicAccessBlockConfiguration?: OutPublicAccessConfig;
        ReplicationConfiguration?: {
            Role: string;
            Rules: OutReplicationRule[];
        };
        Tags?: OutTags;
        VersioningConfiguration?: OutVersioning;
        WebsiteConfiguration?: 'OutWebsiteConfig';
    };
    /**
     * S3Bucket Class that models info needed for Cloudformation.
     *
     * @description S3 Object maker
     * @example
     *  // #! node myExample.js
     *  var ImportESM = require('esm')(module)
     *  var S3Bucket = ImportESM('./src/s3/bucket.js')
     *  var myBucket = new S3Bucket()
     *  console.log({myBucket})
     */
    constructor(props?: IInS3Bucket, name?: string);
    website(config: IInS3Bucket): this;
    toJSON(): {
        [x: string]: {
            Type: "AWS::S3::Bucket";
            Properties: any;
        };
    };
    Ref(): {
        Ref: string;
    };
    Arn(): {
        'Fn::GetAtt': string[];
    };
    DomainName(): {
        'Fn::GetAtt': string[];
    };
    RegionalDomainName(): {
        'Fn::GetAtt': string[];
    };
    WebsiteURL(): {
        'Fn::GetAtt': string[];
    };
    outputs(existingOutputs: any): any;
    validate(): {
        passes: any;
        failMsgs: any;
    };
}
export { S3Bucket };
interface IInS3Bucket {
}
//# sourceMappingURL=bucket.d.ts.map