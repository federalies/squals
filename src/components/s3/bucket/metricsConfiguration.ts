import { InTags, OutTags, TagFilters } from './tags'

/** @module S3Bucket */

export const metricsConfig = (meterThese: InMetricsRule | InMetricsRule[]) => {
  return Array.isArray(meterThese)
    ? {
      MetricsConfigurations: meterThese.map(v => metricsRule(v))
    }
    : {
      MetricsConfigurations: metricsRule(meterThese)
    }
}

export const metricsRule = (params: InMetricsRule): OutMetricsRule => {
  const { id, prefix, tagList } = { prefix: null, tagList: [], ...params }
  const ret: OutMetricsRule = {
    Id: id.toString(),
    ...TagFilters(tagList)
  }
  if (prefix) ret['Prefix'] = prefix.toString()
  return ret
}

export interface InMetricsRule {
  id: string
  prefix?: string
  tagList?: InTags[]
}
export interface OutMetricsRule {
  Id: string
  Prefix?: string
  TagFilters?: OutTags[]
}
export interface OutMetricsConfig {
  MetricsConfigurations: OutMetricsRule[]
}
