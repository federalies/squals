import { destination } from './destination'

/**
 * Make an analyticsConfig ITEM.
 *
 * @description Give it some config.
 *
 * @param {string} setup - The Setup Obj.
 * @param {string} setup.id - What is the Name or ID of this analysis rule.
 * @param {string} setup.Prefix - Which Prefix filter for which objects shoudl be analyzed.
 * @param {Object} destCfg - Destination Object.
 * @param {Object} destCfg.arn - The ARN Identifier of the destination Bucket.
 * @param {Object} destCfg.acctId - Account ID of who owns the bucket.
 * @param {Object} destCfg.prefix - Destination Bucket key prefix.
 * @param {Array<Object>} taglist - Each JS object will be upacked into a Cloudformation Key:k, Value:v.
 * @returns {Object} Cloudformation Object.
 * @example
 *  var analyticsItem1 = analyticsConfig('myID1', {arn:'arn:asdf', acctId: "acct::eric"})
 *  var analyticsItem2 = analyticsConfig({id: 'myID2', Prefix:"someKey/"}, {arn:'arn:asdf', acctId: "acct::eric"}, [{myKey:"some Value"}, {otherKey:"other Value"}])
 */
const analyticsConfig = (setup, destCfg, taglist) => {
  // handle defaults
  let tags
  const { id, Prefix } = { Prefix: null, ...setup }
  const { arn, acctId, prefix } = { acctId: null, prefix: null, ...destCfg }
  if (taglist) tags = [...taglist]
  // validate id
  const idPattern = /[_.-\w0-9]+/g
  const cleanID = idPattern.exec(id)[0]
  if (cleanID) {
    const item = {
      /* REQd */ Id: cleanID,
      /* REQd */ StorageClassAnalysis: {
        DataExport: {
          OutputSchemaVersion: 'V_1',
          ...destination({ arn, acctId, prefix })
        }
      }
    }
    if (Prefix) item['Prefix'] = Prefix
    console.log({ taglist, tags })
    if (taglist && tags) {
      item['TagFilters'] = tags.map(obj => ({
        Key: Object.keys(obj)[0].toString(),
        Value: Object.values(obj)[0].toString()
      }))
    }
    return item
  } else {
    console.error(
      `AnalyticsConfiguration.Id is a required filed -and it was not a valid input ` +
        `- please give an input that passes the regex: "/[_.-\w0-9]+/g" ` //eslint-disable-line
    )
    return {}
  }
}

export { analyticsConfig }
