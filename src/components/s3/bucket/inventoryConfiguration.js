import { destination } from './destination'

/**
 *  Title.
 *
 * @description Descr.
 * @param {Array<Array<{id:string,versions:string },{arn:string, acctId:string},{enabled:boolean}>> } configs - Asdf.
 * @returns {Object} - Asdf.
 * @example
 *  var inv = inventoryConfig([
 *               [{id:ai, versions:av, frequency:af},{arn:ar1, acctId:a, format:f, prefix:p},null],
 *               [{id:bi, versions:bv, frequency:bf},{arn:br2, acctId:a, format:f, prefix:p},null]
 *            ])
 */
const inventoryConfig = configs => {
  return {
    InventoryConfigurations: configs.map(([reqd, Destination, defaulted]) =>
      inventoryRule(reqd, Destination, defaulted)
    )
  }
}

/**
 * Title.
 *
 * @description asdf.
 * @param { Object } Reqd - * Asdf.
 * @param { string } Reqd.id - * Asdf.
 * @param { string } Reqd.versions - * Asdf.
 * @param { string } Reqd.frequency - * Asdf.
 * @param { Object } Destination - Adsf.
 * @param { string } Destination.arn - Adsf.
 * @param { string } Destination.acctId - Adsf.
 * @param { string } Destination.format - Adsf.
 * @param { string } Destination.prefix - Adsf.
 * @param { Object } defaults - Asdf.
 * @param { boolean } defaults.enabled - Asdf.
 * @param { Array<string> } defaults.optional - Asdf.
 * @param { string } defaults.prefix - Asdf.
 * @returns { Object } - Asd.
 * @example
 *  var c = getConfigs()
 *  var a = inventoryRule({id:c.id, versions:c.versions, frequency:c.frequency})
 */
const inventoryRule = (
  { id, versions, frequency },
  Destination,
  { enabled, optional, prefix } = {
    enabled: true,
    optional: null,
    prefix: null
  }
) => {
  const { arn, acctId, format } = Destination
  const destPrefix = Destination.prefix
  return {
    ...destination({ arn, acctId, format, prefix: destPrefix }),
    Id: id,
    Enabled: enabled,
    OptionalFields: optional,
    Prefix: prefix,
    IncludedObjectVersions: versions,
    ScheduleFrequency: frequency
  }
}

export { inventoryConfig, inventoryRule }
