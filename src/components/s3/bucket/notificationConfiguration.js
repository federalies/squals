import { parse } from '@sandfox/arn'

/** @module S3Bucket */

const parseFilter = filter => {
  let Name = null
  let Value = null

  if (filter.toString().startsWith('*')) {
    Name = 'prefix'
    Value = filter.slice(1)
  } else if (filter.toString().endsWith('*')) {
    Name = 'suffix'
    Value = filter.slice(0, -1)
  } else {
    throw new Error(
      `the notification filter should have a '*' at the beginning or end of the token like: [*.jpg] or [Mr*]`
    )
  }
  return { Name, Value }
}

const notifConfig = notifList => {
  // notifList = Array
  // where items = {}
  // notifList = [{},{}]
  let NotificationConfiguration = {}
  const LambdaConfigurations = []
  const QueueConfigurations = []
  const TopicConfigurations = []

  notifList.map(item => {
    const svc = parse(item.arn).service
    switch (svc) {
      case 'lambda':
        LambdaConfigurations.push(toAWSfmt(item, svc))
        break
      case 'sqs':
        QueueConfigurations.push(toAWSfmt(item, svc))
        break
      case 'sns':
        TopicConfigurations.push(toAWSfmt(item, svc))
        break
      default:
        throw new Error(
          `the ARN type of the service receiving a notification should be lambda|sqs|sns `
        )
    }
  })

  if (LambdaConfigurations.length > 0) {
    NotificationConfiguration = {
      ...NotificationConfiguration,
      LambdaConfigurations
    }
  }
  if (QueueConfigurations.length > 0) {
    NotificationConfiguration = {
      ...NotificationConfiguration,
      QueueConfigurations
    }
  }
  if (TopicConfigurations.length > 0) {
    NotificationConfiguration = {
      ...NotificationConfiguration,
      TopicConfigurations
    }
  }

  return NotificationConfiguration
}

const toAWSfmt = (item, svc) => () => {
  // where items = {event: String, arn: String, filters=['*.jpg', 'Mrs.*']}
  // where items.filters MUST have a `*` denoting the filter is a `prefix` or `suffix`
  // where lambdaList(items).event = enum
  // where s3 notifcation validValues actually live @ <https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#supported-notification-event-types>
  // where aws service name abbreviateions actually live @ <https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#genref-aws-service-namespaces>
  const validValues = [
    's3:ObjectCreated:*',
    's3:ObjectCreated:Put',
    's3:ObjectCreated:Post',
    's3:ObjectCreated:Copy',
    's3:ObjectCreated:CompleteMultipartUpload',
    's3:ObjectRemoved:*',
    's3:ObjectRemoved:Delete',
    's3:ObjectRemoved:DeleteMarkerCreated',
    's3:ObjectRestore:Post',
    's3:ObjectRestore:Completed',
    's3:ReducedRedundancyLostObject'
  ]

  const ret = {}
  if (validValues.includes(item.event)) {
    ret['Event'] = item.event
  } else {
    throw new Error('lambda naotification list')
  }

  let Rules = item.filters
    ? item.filters.map(filter => parseFilter(filter))
    : []

  if (Rules.length > 0) ret['Filter'] = { S3Key: { Rules } }
  if (svc === 'lambda') ret['Function'] = item.arn
  if (svc === 'sqs') ret['Queue'] = item.arn
  if (svc === 'sns') ret['Topic'] = item.arn
  return ret
}

export { notifConfig }
