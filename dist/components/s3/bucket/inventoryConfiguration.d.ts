import { InDestination } from './destination';
/** @module S3Bucket */
/**
 *  Amazon S3 bucket inventory configuration.
 *
 * @description The inventory configuration for an Amazon S3 bucket. Duplicate rules not allowed.
 * @param {inInventoryConfig } configs -
 * @returns {outInventoryConfig} -
 * @todo Validate no duplicates.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @example
 *   var invCfg1 = inventoryConfig({ id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' }})
 *   var invCfg2 = inventoryConfig([
 *        { id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' } },
 *        { id: 'myID2', dest: { arn: 'arn:aws:s3:bucket2' } }
 *   ])
 */
export declare const inventoryConfig: (configs: InInventoryRule | InInventoryRule[]) => OutInventoryConfig;
/**
 * Make an invetory analysis rule.
 *
 * @description make on inventory configuration rule for the inventory config.
 * @param { !inInventoryRule } params - Input variables to make an inventoryConfig.
 * @returns { !outInventoryRule } - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @see <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketInventoryConfiguration-property>
 * @example
 *  var a = inventoryRule({ id: 'myID', dest: { arn: 'arn:aws:s3:bucket0' } })
 *  var b = inventoryRule([{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket1' }},{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket2' }} ] )
 */
export declare const inventoryRule: (params: InInventoryRule) => OutInventoryRule;
export interface InInventoryRule {
    id: string;
    dest: InDestination;
    enabled?: boolean;
    versions?: string;
    frequency?: string;
    optionals?: Array<string>;
    prefix?: string;
}
export interface OutInventoryRule {
    Id: string;
    Enabled: boolean;
    Destination: Object;
    ScheduleFrequency: string;
    IncludedObjectVersions: string;
    Prefix?: string;
    OptionalFields?: string[];
}
export interface OutInventoryConfig {
    InventoryConfigurations: OutInventoryRule[];
}
//# sourceMappingURL=inventoryConfiguration.d.ts.map