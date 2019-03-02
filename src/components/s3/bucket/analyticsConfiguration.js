import { destination } from './destination'
import { TagFilters } from './tags'

/** @module S3Bucket */

/**
 * AWS:S3:: Analytics Configuration.
 *
 * @description specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.
 * @param {Array<inAnalyticsConfigItem>|inAnalyticsConfigItem} config - Object or array of objects.
 * @returns {outAnalyticsConfig} Cloudformation Object.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-analyticsconfiguration.html>
 * @example
 *  var analyticsItem1 = analyticsConfig([
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

  const item = tagList
    ? {
      Id: id,
      StorageClassAnalysis: {
        DataExport: {
          OutputSchemaVersion: 'V_1',
          ...destination(dest)
        }
      },
      ...TagFilters(tagList)
    }
    : {
      Id: id,
      StorageClassAnalysis: {
        DataExport: { OutputSchemaVersion: 'V_1', ...destination(dest) }
      }
    }

  if (prefix) item['Prefix'] = prefix
  return item
}

/**
 * {
{

"Type '{ TagFilters: any[]; Id: string; StorageClassAnalysis: { DataExport: { OutputSchemaVersion: string; Destination: outDestination; }; }; }
| { Id: string; StorageClassAnalysis: { DataExport: { BucketArn: string; ... 4 more ...; Destination?: undefined; }; }; }'

is not assignable to type 'outAnalyticsItem'.

Type '{ Id: string; StorageClassAnalysis: { DataExport: { BucketArn: string; Format: string; BucketAccountId: string; Prefix: string; OutputSchemaVersion: string; Destination?: undefined; }; }; }' is not assignable to type 'outAnalyticsItem'.\n    Types of property 'StorageClassAnalysis' are incompatible.\n      Type '{ DataExport: { BucketArn: string; Format: string; BucketAccountId: string; Prefix: string; OutputSchemaVersion: string; Destination?: undefined; }; }' is not assignable to type '{ DataExport: { OutputSchemaVersion?: string; Destination: Destination; }; }'.\n        Types of property 'DataExport' are incompatible.\n          Type '{ BucketArn: string; Format: string; BucketAccountId: string; Prefix: string; OutputSchemaVersion: string; Destination?: undefined; }' is not assignable to type '{ OutputSchemaVersion?: string; Destination: Destination; }'.\n            Property 'Destination' is optional in type '{ BucketArn: string; Format: string; BucketAccountId: string; Prefix: string; OutputSchemaVersion: string; Destination?: undefined; }' but required in type '{ OutputSchemaVersion?: string; Destination: Destination; }'.",

}
 */

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
 * @typedef inAnalyticsConfigItem
 * @type {Object}
 * @property {!string} id - asd
 * @property {?string} prefix - asd
 * @property {?Array<Object>} tagList - asd
 * @property {?DestInputParam} dest - asd
 *
 */

/**
 *
 * @typedef outAnalyticsItem
 * @type {Object}
 * @property {!string} Id - identifies the analytics configuration.
 * @property {?string} [Prefix=null] - a require prefix for objects to be analyzed - (none implies ALL objects)
 * @property {?Array<Tags>} [TagFilter=[]] - The tags to use when evaluating an analytics filter.
 * @property {Object} StorageClassAnalysis - An analysis of tradeoffs between different storage classes will have results to be store somewhere.
 * @property {Object} StorageClassAnalysis.DataExport - How should analysis should be exported.
 * @property {!string} [StorageClassAnalysis.DataExport.OutputSchemaVersion='V_1'] - Version num of the output schema when exporting data. (only valid value='V_1'.)
 * @property {Destination} StorageClassAnalysis.DataExport.Destination - Where to publish analysis or configuration results for an Amazon S3 bucket.
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

// {
// "message": "Type '{ TagFilters: any[]; Id: string; } | { Id: string; }' is not assignable
// to type 'AnalyticsItemOutput'.\n  Type '{ TagFilters: any[]; Id: string; }'
// is missing the following properties from type 'AnalyticsItemOutput':
// Prefix, TagFilter, StorageClassAnalysis, DataExport, Destination",
// "startLineNumber": 77,
// "startColumn": 3,
// "endLineNumber": 77,
// "endColumn": 14
// }
