/**
 * This is a Title.
 *
 * @description creates a valid CFM key
 * @param params - Asd.
 * @param params.saveLogsToBucket -Asd.
 * @param paramslogPrefix - Asd.
 * @example
 *  var lc = loggingConfg({saveLogsToBucket:'otherbucket', logPrefix:'logs/'})
 */
export const loggingConfg = (params: IbucketLoggingConfig = {}) => {
  const { saveLogsToBucket, logPrefix } = params
  const data: IBucketLogging = {}
  if (logPrefix) data['LogFilePrefix'] = logPrefix
  if (saveLogsToBucket) data['DestinationBucketName'] = saveLogsToBucket
  return {
    LoggingConfiguration: data
  }
}

export interface IbucketLoggingConfig {
  saveLogsToBucket?: string
  logPrefix?: string
}
export interface IBucketLogging {
  DestinationBucketName?: string // defaults to same bucket
  LogFilePrefix?: string // default to empty string
}

export interface IBucketLoggingConfig {
  LoggingConfiguration: IBucketLogging
}
