import { TagFilters } from './tags'
import { destination, IBucketDestinationItem, IbucketDestination } from './destination'
import { Itags, ITags } from '../../Template'

/**
 * AWS:S3:: Analytics Configuration.
 *
 * @description specifies the configuration and any analyses for the analytics filter of an Amazon S3 bucket.
 * @param config - Object or array of objects.
 * @todo work on a way to imply the ID from the prefix, bucketname, date created, etc.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-analyticsconfiguration.html>
 * @example
 *  var analyticsCfg = analyticsConfig([
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
export const analyticsConfig = (
  config: IbucketAnalyticsConfigItem | IbucketAnalyticsConfigItem[]
): IBucketAnalyticsConfig => {
  return Array.isArray(config)
    ? { AnalyticsConfigurations: config.map(item => analyticsItem(item)) }
    : { AnalyticsConfigurations: [analyticsItem(config)] }
}

/**
 * Support the Item Declarations for the top-level array.
 *
 * @description Packages the item level config for bucket analysis
 * @param config - The required config baed on required field desinations in AWS docs.
 * @todo work on a way to imply the ID from the prefix, bucketname, date created, etc - do it here first - and see if we can just make it not required first
 * @example
 *   var v = analyticsItem({ id:'heyThere', prefix:'myPrefix', tagList:[{key1:'val1'},{key1:'val2'}] })
 */
const analyticsItem = (config: IbucketAnalyticsConfigItem): IBucketAnalyticsItem => {
  const { id, prefix, dest, tagList } = {
    // id*
    dest: null,
    prefix: null,
    tagList: null,
    ...config
  }

  let item = tagList
    ? {
      Id: id,
      Prefix: '',
      ...TagFilters(tagList),
      StorageClassAnalysis: dest
        ? {
          DataExport: { OutputSchemaVersion: 'V_1', ...destination(dest) }
        }
        : {}
    }
    : {
      Id: id,
      Prefix: '',
      StorageClassAnalysis: dest
        ? {
          DataExport: { OutputSchemaVersion: 'V_1', ...destination(dest) }
        }
        : {}
    }

  if (prefix) item['Prefix'] = prefix
  return item
}

/**
 * @todo make ID not required
 */
export interface IbucketAnalyticsConfigItem {
  id: string
  dest?: IbucketDestination
  prefix?: string
  tagList?: Itags | Itags[]
}

export interface IBucketAnalyticsItem {
  Id: string
  Prefix?: string
  TagFilters?: ITags[]
  StorageClassAnalysis: {
    DataExport?: {
      OutputSchemaVersion: string
      Destination: IBucketDestinationItem
    }
  }
}

export interface IBucketAnalyticsConfig {
  AnalyticsConfigurations: IBucketAnalyticsItem[]
}
