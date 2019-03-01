import { destination } from './destination'
import { TagFilters } from './tags'

/**
 * AWS:S3:: Analytics Configuration.
 *
 * @description specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.
 * @param {!Array<AnalyticsConfigItem>|!AnalyticsConfigItem} config - Object or array of objects.
 * @returns {!AnalyticsConfigOutput} Cloudformation Object.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-analyticsconfiguration.html>
 * @example
 *  var analyticsItem1 = analyticsConfig([
 *    { id: 'testA', prefix: 'doc/', taglist: [{ keyy: 'value' }] },
 *    {
 *      id: 'testB',
 *      prefix: 'docs/',
 *      taglist: [{ k: 'val' }],
 *      dest: {
 *        arn: 'aws:arn:s3::asd.asdf',
 *        savePrefix: 'docs/',
 *        acctId: 'someOtherAccount'
 *      },
 *    }
 *  ])
 */
const analyticsConfig = config => {
  return Array.isArray(config)
    ? { AnalyticsConfigurations: config.map(item => makeItem(item)) }
    : { AnalyticsConfigurations: [makeItem(config)] }
}

/**
 * Support the Item Declarations for the top-level array.
 *
 * @description Packages the item level config for bucket analysis
 * @param {!AnalyticsConfigItem} config - The required config baed on required field desinations in AWS docs.
 * @returns {!AnalyticsItemOutput} - The AWS model of what is passed into the AWS Template.Resources.
 * @example
 *   var v = makeItem({ id:'heyThere', prefix:'myPrefix', taglist:[{key1:'val1'},{key1:'val2'}] })
 */
const makeItem = config => {
  const { id, prefix, dest, taglist } = {
    // id*
    dest: null,
    prefix: null,
    taglist: null,
    ...config
  }

  const item = taglist ? { Id: id, ...TagFilters(taglist) } : { Id: id }
  if (prefix) item['Prefix'] = prefix

  if (dest) {
    const { arn, savePrefix, format, acctId } = {
      // arn*
      format: 'CSV',
      savePrefix: null,
      acctId: null,
      ...dest
    }

    item['StorageClassAnalysis'] = {
      DataExport: {
        OutputSchemaVersion: 'V_1',
        ...destination({ arn, format, acctId, prefix: savePrefix })
      }
    }
  } else {
    item['StorageClassAnalysis'] = {
      DataExport: {
        OutputSchemaVersion: 'V_1'
      }
    }
  }
  return item
}

/**
 *
 * @typedef DestInputParam
 * @type {Object}
 * @property {!string} arn - asdf.
 * @property {?string} savePrefix - asdf.
 * @property {?string} format - asdf.
 * @property {?string} acctId - asdf.
 *
 */

/**
 * @typedef Destination
 * @type {Object}
 * @property {!string} BucketArn - asdf.
 * @property {?string} Prefix - asdf.
 * @property {?string} Format - asdf.
 * @property {?string} BucketAccountId - asdf.
 *
 */

/**
 * @typedef Tags
 * @type {Object}
 * @property {!string} Name - Asd.
 * @property {!string} Value - Asd.
 *
 */

/**
 *
 * @typedef AnalyticsConfigItem
 * @type {Object}
 * @property {!string} id - asd
 * @property {?string} prefix - asd
 * @property {?Array<Object>} taglist - asd
 * @property {?DestInputParam} dest - asd
 *
 */

/**
 *
 * @typedef AnalyticsItemOutput
 * @type {Object}
 * @property {!string} Id - identifies the analytics configuration.
 * @property {?string} Prefix - a require prefix for objects to be analyzed - (none implies ALL objects)
 * @property {?Array<Tags>} TagFilter - The tags to use when evaluating an analytics filter.
 * @property {!Object} StorageClassAnalysis - An analysis of tradeoffs between different storage classes will have results to be store somewhere.
 * @property {?Object} StorageClassAnalysis.DataExport - How should analysis should be exported.
 * @property {!string} [StorageClassAnalysis.DataExport.OutputSchemaVersion='V_1'] - Version num of the output schema when exporting data. (only valid value='V_1'.)
 * @property {!Destination} StorageClassAnalysis.DataExport.Destination - Where to publish analysis or configuration results for an Amazon S3 bucket.
 *
 */

/**
 *
 * @typedef AnalyticsConfigOutput
 * @type {Object}
 * @property {!Array<AnalyticsItemOutput>} AnalyticsConfigurations - asd.
 *
 */

export { analyticsConfig }
