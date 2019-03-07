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
declare const inventoryConfig: (configs: any) => {
    InventoryConfigurations: {
        Id: any;
        Enabled: any;
        IncludedObjectVersions: any;
        ScheduleFrequency: any;
        Destination: import("./destination").OutDestinationItem;
    }[];
};
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
declare const inventoryRule: (params: any) => {
    Id: any;
    Enabled: any;
    IncludedObjectVersions: any;
    ScheduleFrequency: any;
    Destination: import("./destination").OutDestinationItem;
};
/**
 * @typedef inInventoryRule
 * @type {!Object}
 * @property {!string} id - The ID that identifies the inventory configuration.
 * @property {!Object} dest - Information about where to publish the inventory results.
 * @property {?boolean} enabled - Specifies whether the inventory is enabled or disabled. If set to True, an inventory list is generated. If set to False, no inventory list is generated.
 * @property {?string} versions - Object versions to include in the inventory list. If set to All, the list includes all the object versions, which adds the version related fields VersionId, IsLatest, and DeleteMarker to the list. If set to Current, the list does not contain these version related fields.
 * @property {?string} frequency - The frequency of inventory results generation.
 * @property {?Array<string>} optionals - The optional fields that are included in the inventory results.
 * @property {?string} prefix - The prefix that is prepended to all inventory results.
 */
/**
 * @typedef outInventoryRule
 * @type {!Object}
 * @property {!string} Id - The ID that identifies the inventory configuration.
 * @property {!boolean} Enabled - Specifies whether the inventory is enabled or disabled. If set to True, an inventory list is generated. If set to False, no inventory list is generated.
 * @property {!string} IncludedObjectVersions - Object versions to include in the inventory list. If set to All, the list includes all the object versions, which adds the version related fields VersionId, IsLatest, and DeleteMarker to the list. If set to Current, the list does not contain these version related fields.
 * @property {!string} ScheduleFrequency - The frequency of inventory results generation.
 * @property {!Object} Destination - Information about where to publish the inventory results.
 * @property {?Array<string>} OptionalFields - The optional fields that are included in the inventory results.
 * @property {?string} Prefix - The prefix that is prepended to all inventory results.
 */
/**
 * @typedef inInventoryConfig
 * @type {!inInventoryRule|!Array<inInventoryRule>}
 */
/**
 * @typedef outInventoryConfig
 * @type {Object}
 * @property {Array<outInventoryRule>} InventoryConfigurations - asd.
 */
export { inventoryConfig, inventoryRule };
//# sourceMappingURL=inventoryConfiguration.d.ts.map