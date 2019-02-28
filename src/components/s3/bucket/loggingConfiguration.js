const loggingConfg = (saveLogsToBucket = null, logPrefix = 'logs/') => {
  const LoggingConfiguration = {}
  LoggingConfiguration['LogFilePrefix'] = logPrefix
  LoggingConfiguration['DestinationBucketName'] = saveLogsToBucket
  return {
    LoggingConfiguration
  }
}

export { loggingConfg }
