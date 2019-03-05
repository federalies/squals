import { destination } from './destination'
import { TagFilters } from './tags'

/** @module S3Bucket */

/**
 * AWS:S3:: Analytics Configuration.
 *
 * @description specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.
 * @param {inAnalyticsConfigItem|Array<inAnalyticsConfigItem>} config - Object or array of objects.
 * @returns {outAnalyticsConfig} Cloudformation Object.
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
const analyticsConfig = config => {
  return Array.isArray(config)
    ? { AnalyticsConfigurations: config.map(item => makeItem(item)) }
    : { AnalyticsConfigurations: [makeItem(config)] }
}

/**
 * Support the Item Declarations for the top-level array.
 *
 * @description Packages the item level config for bucket analysis
 * @param {inAnalyticsConfigItem} config - The required config baed on required field desinations in AWS docs.
 * @returns {outAnalyticsItem} - The AWS model of what is passed into the AWS Template.Resources.
 * @example
 *   var v = makeItem({ id:'heyThere', prefix:'myPrefix', tagList:[{key1:'val1'},{key1:'val2'}] })
 */
const makeItem = config => {
  const { id, prefix, dest, tagList } = {
    // id*
    dest: null,
    prefix: null,
    tagList: null,
    ...config
  }
  // Can I imply the ID from the prefix + dateCreated + bucketName

  let item = tagList
    ? {
      Id: id,
      Prefix: '',
      StorageClassAnalysis: {
        DataExport: { OutputSchemaVersion: 'V_1', ...destination(dest) }
      }
    }
    : {
      Id: id,
      Prefix: '',
      ...TagFilters(tagList),
      StorageClassAnalysis: {
        DataExport: { OutputSchemaVersion: 'V_1', ...destination(dest) }
      }
    }

  if (prefix) item['Prefix'] = prefix
  return item
}

/**
 *
 * @typedef inDestination
 * @type {Object}
 * @property {!string} arn - asdf.
 * @property {?string} [savePrefix] - asdf.
 * @property {?string} [format] - asdf.
 * @property {?string} [acctId] - asdf.
 *
 */

/**
 * @typedef outDestination
 * @type {Object}
 * @property {string} BucketArn - asdf.
 * @property {string} Format - asdf.
 * @property {string} [Prefix] - asdf.
 * @property {string} [BucketAccountId] - asdf.
 *
 */

/**
 * @typedef inTags
 * @type {Object<string, string>} - asd
 */

/**
 * @typedef outTags
 * @type {Object}
 * @property {string} Key - Asd.
 * @property {string} Value - Asd.
 *
 */

/**
 *
 * @typedef inAnalyticsConfigItem
 * @type {Object}
 * @property {!string} id - asd
 * @property {?inDestination} dest - asd
 * @property {?string} [prefix] - asd
 * @property {?Array<{string: string}>} [tagList] - asd
 *
 */

/**
 *
 * @typedef outAnalyticsItem
 * @type {Object}
 * @property {string} Id - identifies the analytics configuration.
 * @property {string} [Prefix] - a require prefix for objects to be analyzed - (none implies ALL objects)
 * @property {Array<{Key:string, Value:string}>} [TagFilter] - The tags to use when evaluating an analytics filter.
 * @property {DataExport} StorageClassAnalysis - An analysis of tradeoffs between different storage classes will have results to be store somewhere.
 *
 */

/**
 * @typedef DataExport
 * @type {Object}
 * @property {Object} DataExport - How should analysis should be exported.
 * @property {string} DataExport.OutputSchemaVersion - Version num of the output schema when exporting data. (only valid value='V_1'.)
 * @property {outDestination} DataExport.Destination - Where to publish analysis or configuration results for an Amazon S3 bucket.
 *
 */

/**
 *
 * @typedef outAnalyticsConfig
 * @type {Object}
 * @property {Array<outAnalyticsItem>} AnalyticsConfigurations - asd.
 *
 */

export { analyticsConfig }
