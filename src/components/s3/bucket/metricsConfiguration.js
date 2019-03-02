import { TagFilters } from './tags'

/** @module S3Bucket */

const metricsConfig = meterThese => {
  return {
    MetricsConfigurations: meterThese.map(v => metricsRule(v))
  }
}

const metricsRule = params => {
  // @ts-ignore
  const { id, prefix, tagList } = { prefix: null, tagList: [], ...params }
  return {
    Id: id.toString(),
    Prefix: prefix.toString(),
    ...TagFilters(tagList)
  }
}

export { metricsConfig, metricsRule }
