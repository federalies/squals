import { InDestination, destination, OutDestinationItem } from './destination'

const difference = (setA: any[], setB: any[]) => {
  return Array.from(
    setB.reduce((_difference, elem: any) => {
      _difference.delete(elem)
      return _difference
    }, new Set(setA))
  )
}

/**
 *  Amazon S3 bucket inventory configuration.
 *
 * @description The inventory configuration for an Amazon S3 bucket. Duplicate rules not allowed.
 * @param configs -
 * @todo Validate no duplicates.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @example
 *   var invCfg1 = inventoryConfig({ id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' }})
 *   var invCfg2 = inventoryConfig([
 *        { id: 'myID1', dest: { arn: 'arn:aws:s3:bucket1' } },
 *        { id: 'myID2', dest: { arn: 'arn:aws:s3:bucket2' } }
 *   ])
 */
export const inventoryConfig = (
  configs: InInventoryRule | InInventoryRule[]
): OutInventoryConfig => {
  return Array.isArray(configs)
    ? { InventoryConfigurations: configs.map(item => inventoryRule(item)) }
    : { InventoryConfigurations: [inventoryRule(configs)] }
}

/**
 * Make an invetory analysis rule.
 *
 * @description make on inventory configuration rule for the inventory config.
 * @param { !inInventoryRule } params - Input variables to make an inventoryConfig.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-inventoryconfiguration.html>
 * @see <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketInventoryConfiguration-property>
 * @example
 *  var a = inventoryRule({ id: 'myID', dest: { arn: 'arn:aws:s3:bucket0' } })
 *  var b = inventoryRule([{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket1' }},{ id: 'myID', dest: { arn: 'arn:aws:s3:bucket2' }} ] )
 */
export const inventoryRule = (params: InInventoryRule): OutInventoryRule => {
  // @ts-ignore
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

  // assert data presence for js callers
  if (!id || !dest) {
    throw new Error(`ƒ.inventoryRule has missing required data: id:string + dest:{}`)
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

  if (difference(optionals, validOptionals).length > 0) {
    throw new Error(
      `ƒ.inventoryRule param: optionals have a defined of properties that can be requested as included in invetory analysis - found: ${optionals}`
    )
  }

  // construct return obj
  const ret: OutInventoryRule = {
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

export interface InInventoryRule {
  id: string
  dest: InDestination
  enabled?: boolean
  prefix?: string
  versions?: string
  frequency?: string
  optionals?: string[]
}

export interface OutInventoryRule {
  Id: string
  Enabled: boolean
  Destination: OutDestinationItem
  ScheduleFrequency: string
  IncludedObjectVersions: string
  Prefix?: string
  OptionalFields?: string[]
}

export interface OutInventoryConfig {
  InventoryConfigurations: OutInventoryRule[]
}
