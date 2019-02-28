import { TagFilters } from './tags'

const metricsConfig = meterThese => {
  return {
    MetricsConfigurations: meterThese.map(v => metricsRule(v))
  }
}

const metricsRule = params => {
  const { id, prefix, taglist } = { prefix: null, taglist: [], ...params }
  return {
    Id: id.toString(),
    Prefix: prefix.toString(),
    ...TagFilters(taglist)
  }
}

export { metricsConfig, metricsRule }
