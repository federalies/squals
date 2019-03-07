import { parse } from '@sandfox/arn'

/** @module S3Bucket */

const parseFilter = (filter: string): OutNotifFilterRule => {
  let Name = ''
  let Value = ''

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

/**
 * Title.
 *
 * @description asdasd.
 * @param notifList - Asd.
 * @todo add functionality and testing to deal with ARN REFS so that you notifiucation rule can incorporate newly created funcs
 * @example
 *  var notif1 = notifConfig({event:"s3:ObjectCreated:*",
 *                           arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                           filters:['Yosem*', '*.jpg']})
 *  var notif2 = notifConfig([{ event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['Yosem*', '*.jpg']},
 *                           { event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['YellowSto*', '*.jpg', '*.png']}
 *                          ])
 */
const notifConfig = (notifList: InNotifs | InNotifs[]) => {
  notifList = Array.isArray(notifList) ? notifList : new Array(notifList)

  const data: SeparatedReducer = notifList.reduce(
    (prior: SeparatedReducer, notif: InNotifs) => {
      const svc = parse(notif.arn).service
      switch (svc) {
        case 'lambda':
          prior.l.push(toAWSfmt(notif, svc) as OutLambdaConfig)
          break
        case 'sqs':
          prior.q.push(toAWSfmt(notif, svc) as OutQueueConfig)
          break
        case 'sns':
          prior.t.push(toAWSfmt(notif, svc) as OutTopicConfig)
          break
        default:
          throw new Error(
            `the ARN type of the service receiving a notification should be lambda|sqs|sns `
          )
      }
      return prior
    },
    { l: [], t: [], q: [] }
  )

  let ret: OutNotificationConfiguration = { NotificationConfiguration: {} }

  if (data.l.length > 0) {
    ret.NotificationConfiguration['LambdaConfigurations'] = data.l
  }
  if (data.q.length > 0) {
    ret.NotificationConfiguration['QueueConfigurations'] = data.q
  }
  if (data.t.length > 0) {
    ret.NotificationConfiguration['TopicConfigurations'] = data.t
  }

  return ret
}

/**
 * Title.
 *
 * @description this is a description
 * @param item - A notification config.
 * @param svc - An abbreviate string of an AWS service name.
 * @example
 * var a = toAWSfmt({event:'', arn:'', filters:['*.jpg']}, 'lambda')
 */
const toAWSfmt = (item: InNotifs, svc: string): OutAllNotificationConfigs => {
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

  if (!validValues.includes(item.event)) {
    throw new Error('invalid notification event type')
  }

  let Rules = item.filters ? item.filters.map(filter => parseFilter(filter)) : []

  switch (svc) {
    case 'lambda':
      return Rules.length > 0
        ? {
          Event: item.event,
          Function: item.arn,
          Filter: { S3Key: { Rules } }
        }
        : {
          Event: item.event,
          Function: item.arn
        }

    case 'sqs':
      return Rules.length > 0
        ? {
          Event: item.event,
          Queue: item.arn,
          Filter: { S3Key: { Rules } }
        }
        : {
          Event: item.event,
          Queue: item.arn
        }

    case 'sns':
      return Rules.length > 0
        ? {
          Event: item.event,
          Topic: item.arn,
          Filter: { S3Key: { Rules } }
        }
        : {
          Event: item.event,
          Topic: item.arn
        }
    default:
      throw new Error('invalid notification event type')
  }
}

interface OutNotificationConfiguration {
  NotificationConfiguration: SeparatedNotificationSets
}

interface InNotifs {
  arn: string
  event: string
  filters: string[]
}

interface SeparatedReducer {
  l: OutLambdaConfig[]
  q: OutQueueConfig[]
  t: OutTopicConfig[]
}

interface SeparatedNotificationSets {
  LambdaConfigurations?: OutLambdaConfig[]
  QueueConfigurations?: OutQueueConfig[]
  TopicConfigurations?: OutTopicConfig[]
}

type OutAllNotificationConfigs = OutLambdaConfig | OutQueueConfig | OutTopicConfig

interface OutLambdaConfig {
  Event: string
  Function: string
  Filter?: OutNotificationFilters
}

interface OutQueueConfig {
  Event: string
  Queue: string
  Filter?: OutNotificationFilters
}

interface OutTopicConfig {
  Event: string
  Topic: string
  Filter?: OutNotificationFilters
}

interface OutNotificationFilters {
  S3Key: {
    Rules: OutNotifFilterRule[]
  }
}

interface OutNotifFilterRule {
  Name: string
  Value: string
}

export { notifConfig }
