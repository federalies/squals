import { parse } from '@sandfox/arn'

/** @module S3Bucket */

/**
 * Parse S3 Key/Notification Filter.
 *
 * @description the notification input syntax allows the objects to use a `*` delimiter to show prefix or suffix
 * @param filter - The filter string that includes a * or not.
 * @see <https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUTnotification.html#RESTBucketPUTnotification-requests-request-elements>
 * @example
 *  var {Name, Value} = parseFilter('*.jpg')
 *  console.log({Name, Value}) // {Name:'suffix', Value:'.jpg'}
 */
const parseFilter = (filter: string): OutNotifFilterRule => {
  let Name = ''
  let Value = ''

  if (filter.toString().startsWith('*')) {
    Name = 'suffix'
    Value = filter.slice(1)
  } else if (filter.toString().endsWith('*')) {
    Name = 'prefix'
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
 *                           arn:'arn:aws:lambda::123456789012:resourceA/division_abc',
 *                           filterList:'Yosem*'})
 *  var notif2 = notifConfig([{ event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['Yosem*', '*.jpg']},
 *                           { event:"s3:ObjectCreated:*",
 *                             arn:'aws:arn:lambda:somegreat.lambdafunc',
 *                             filters:['YellowSto*', '*.jpg', '*.png']}
 *                          ])
 */
export const notifConfig = (notifList: InNotifs | InNotifs[]) => {
  notifList = Array.isArray(notifList) ? notifList : new Array(notifList)

  const data: SeparatedReducer = notifList.reduce(
    (prior: SeparatedReducer, notif: InNotifs) => {
      const svc = parse(notif.arn).service
      switch (svc) {
        case 'lambda':
          prior.l.push(toAWSfmt('lambda', notif) as OutLambdaConfig)
          break
        case 'sqs':
          prior.q.push(toAWSfmt('sqs', notif) as OutQueueConfig)
          break
        case 'sns':
          prior.t.push(toAWSfmt('sns', notif) as OutTopicConfig)
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
 * `toAWSfmt` transforms simple ARN-based notification lists into segmetned various Service Type lists.
 *
 * @description parses ARN names and transforms them into OUTPUT values for CFM.
 * @note Bad `svc` names have already been filtered out in the ƒ.upstrea
 * @param item - A notification config.
 * @param svc - An abbreviate string of an AWS service name.
 * @see <https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#supported-notification-event-types>
 * @see <https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html#genref-aws-service-namespaces>
 * @example
 * var a = toAWSfmt({event:'', arn:'', filters:['*.jpg']}, 'lambda')
 */
const toAWSfmt = (
  svc: 'lambda' | 'sns' | 'sqs',
  item: InNotifs
): OutLambdaConfig | OutQueueConfig | OutTopicConfig => {
  //
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

  const filters = Array.isArray(item.filterList) ? item.filterList : new Array(item.filterList)
  let Rules = filters.map(filter => parseFilter(filter))

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
  }
}

export interface InNotifs {
  arn: string
  event: string
  filterList: string | string[]
}

interface SeparatedReducer {
  l: OutLambdaConfig[]
  q: OutQueueConfig[]
  t: OutTopicConfig[]
}

export interface OutSeparatedNotificationSets {
  LambdaConfigurations?: OutLambdaConfig[]
  QueueConfigurations?: OutQueueConfig[]
  TopicConfigurations?: OutTopicConfig[]
}

export interface OutLambdaConfig {
  Event: string
  Function: string
  Filter?: OutNotificationFilters
}

export interface OutQueueConfig {
  Event: string
  Queue: string
  Filter?: OutNotificationFilters
}

export interface OutTopicConfig {
  Event: string
  Topic: string
  Filter?: OutNotificationFilters
}

export interface OutNotificationFilters {
  S3Key: {
    Rules: OutNotifFilterRule[]
  }
}

export interface OutNotifFilterRule {
  Name: string
  Value: string
}

export interface OutNotificationConfiguration {
  NotificationConfiguration: OutSeparatedNotificationSets
}
