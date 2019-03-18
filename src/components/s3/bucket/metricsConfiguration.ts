import { Itags, ITags } from '../../Template'
import { TagFilters } from './tags'

export const metricsConfig = (
  meterThese: IbucketMetricsRule | IbucketMetricsRule[]
): IBucketMetricsConfig => {
  meterThese = Array.isArray(meterThese) ? meterThese : new Array(meterThese)
  return {
    MetricsConfigurations: meterThese.map(v => metricsItem(v))
  }
}

// function isOutReady(rule: ibucketMetricsRule | IBucketMetricsRule): rule is IBucketMetricsRule {
//   return (<IBucketMetricsRule>rule).Id !== undefined
// }

export const metricsItem = (params: IbucketMetricsRule): IBucketMetricsRule => {
  // if (isOutReady(params)) {
  //   return params
  // }
  const { id, prefix, tagList } = { prefix: null, tagList: null, ...params }
  const ret: IBucketMetricsRule = tagList
    ? {
      Id: id.toString(),
      ...TagFilters(tagList)
    }
    : {
      Id: id.toString()
    }

  if (prefix) ret['Prefix'] = prefix.toString()
  return ret
}

export interface IbucketMetricsRule {
  id: string
  prefix?: string
  tagList?: Itags | Itags[]
}
export interface IBucketMetricsRule {
  Id: string
  Prefix?: string
  TagFilters?: ITags[]
}
export interface IBucketMetricsConfig {
  MetricsConfigurations: IBucketMetricsRule[]
}
