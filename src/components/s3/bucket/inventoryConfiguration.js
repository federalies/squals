import { destination } from './destination'

/**
 *  Title.
 *
 * @description Descr.
 * @param {!inInventoryConfig } configs -
 * @returns {!outInventoryConfig} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @example
 *   var invCfg =   inventoryConfig([
 *         { id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' } },
 *         { id: 'myID2', dest: { arn: 'arn:aws:s3:bucket2' } }
 *   ])
 */
const inventoryConfig = configs => {
  return Array.isArray(configs)
    ? { InventoryConfigurations: configs.map(item => inventoryRule(item)) }
    : { InventoryConfigurations: [inventoryRule(configs)] }
}

/**
 * Title.
 *
 * @description asdf.
 * @param { !paramInventoryRule } params - Input variables to make an inventoryConfig.
 * @param { !string } params.id -
 * @param { ?string } [params.versions='All'] - 'All' or 'Current'.
 * @param { ?string } [params.frequency='Weekly'] - 'Daily' or 'Weekly'.
 * @see <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketInventoryConfiguration-property>
 * @param { ?Array<string> } params.optional - Valid values include: `Size` ,`LastModifiedDate` ,`StorageClass` ,`ETag` ,`IsMultipartUploaded` ,`ReplicationStatus` ,`EncryptionStatus` ,`ObjectLockRetainUntilDate` ,`ObjectLockMode` ,`ObjectLockLegalHoldStatus `.
 * @param { !inDestination } params.dest -
 * @param { !string } params.dest.arn -
 * @param { ?string } params.dest.acctId -
 * @param { ?string } params.dest.format - Default = 'CSV'.
 * @param { ?string } params.dest.prefix -
 * @returns { !outInventoryRule } - Asd.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @example
 *  var a = inventoryRule({ id: 'myID', dest: { arn: 'arn:aws:s3:bucket0' } })
 *  var b = inventoryRule([{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket1' }},{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket2' }} ] )
 */
const inventoryRule = params => {
  const { id, versions, frequency, dest, enabled, optionals, prefix } = {
    id: null,
    versions: 'All', // other value "Current"
    frequency: 'Weekly', // other value: 'Daily'
    dest: null,
    enabled: true,
    optionals: [],
    prefix: null,
    ...params
  }

  // assert data presence
  if (!id || !dest || !versions || !frequency) {
    let msg = 'ƒ.inventoryRule has missing required data: [ '
    if (!id) msg += ' id'
    if (!dest) msg += ' dest'
    if (!versions) msg += ' versions'
    if (!frequency) msg += ' frequency'
    msg += ' ]'
    throw new Error(msg)
  }

  // assert validity
  const validOptionals = [
    'Size',
    'LastModifiedDate',
    'StorageClass',
    'ETag',
    'IsMultipartUploaded',
    'ReplicationStatus',
    'EncryptionStatus',
    'ObjectLockRetainUntilDate',
    'ObjectLockMode',
    'ObjectLockLegalHoldStatus'
  ]

  if (!['All', 'Current'].includes(versions)) {
    throw new Error(
      `ƒ.inventoryRule versions only has two valid values: 'All' + 'Current' - found the value: ${versions}`
    )
  }

  if (!['Daily', 'Weekly'].includes(frequency)) {
    throw new Error(
      `ƒ.inventoryRule frequency only has two valid values: 'Daily' + 'Weekly' - found the value: ${frequency}`
    )
  }
  if (
    !optionals.every(elem => {
      validOptionals.includes(elem)
    })
  ) {
    throw new Error(
      `ƒ.inventoryRule param: optionals have a defined of properties that can be requested as included in invetory analysis - found: ${optionals}`
    )
  }

  // construct return obj
  const ret = {
    ...destination(dest),
    Id: id,
    Enabled: enabled,
    IncludedObjectVersions: versions,
    ScheduleFrequency: frequency
  }

  if (optionals && optionals.length > 0) ret['OptionalFields'] = optionals
  if (prefix) ret['Prefix'] = prefix
  return ret
}

// const log = data => {
//   console.log(JSON.stringify(data, null, 2))
// }

// log()

/**
 * @typedef paramInventoryRule
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
 * @type {!paramInventoryRule|!Array<paramInventoryRule>}
 */

/**
 * @typedef outInventoryConfig
 * @type {!Array<outInventoryRule>}
 */

export { inventoryConfig, inventoryRule }
