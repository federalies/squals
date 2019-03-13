import { InTags, OutTags, TagFilters } from './tags'

/** @module S3Bucket */

export const metricsConfig = (meterThese: InMetricsRule | InMetricsRule[]) => {
  meterThese = Array.isArray(meterThese) ? meterThese : new Array(meterThese)
  return {
    MetricsConfigurations: meterThese.map(v => metricsItem(v))
  }
}

// function isOutReady(rule: InMetricsRule | OutMetricsRule): rule is OutMetricsRule {
//   return (<OutMetricsRule>rule).Id !== undefined
// }

export const metricsItem = (params: InMetricsRule): OutMetricsRule => {
  // if (isOutReady(params)) {
  //   return params
  // }
  const { id, prefix, tagList } = { prefix: null, tagList: null, ...params }
  const ret: OutMetricsRule = tagList
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

export interface InMetricsRule {
  id: string
  prefix?: string
  tagList?: InTags | InTags[]
}
export interface OutMetricsRule {
  Id: string
  Prefix?: string
  TagFilters?: OutTags[]
}
export interface OutMetricsConfig {
  MetricsConfigurations: OutMetricsRule[]
}
