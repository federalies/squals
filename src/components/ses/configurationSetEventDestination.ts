/**
 * @todo update this whenn the `SNS` events come out
 */

import { SESConfigurationSet } from './configurationSet'
import {
  squals,
  struct,
  baseSchemas,
  validatorGeneric,
  genComponentName,
  IStrRefGetAtt,
  IGetAtt,
  ITags,
  Itags,
  IRef
} from '../Template'
import {
  verifyIfThen,
  ifHas,
  multipleOf,
  stringNotEqual,
  ifType
} from '../../utils/validations/objectCheck'

export class SESConfigurationSetEventDestination implements squals {
  name: string
  Type = 'AWS::SES::ConfigurationSetEventDestination'
  Properties: ISESConfigurationSetEventDestination_props

  constructor (i: ISESConfigurationSetEventDestination_min) {
    this.name = genComponentName(i.name)
    this.Properties = {
      ConfigurationSetName: i.confgSet
        ? i.confgSet
        : `< PLACEHOLDER: MAKE SURE TO LINK TO A CONFIGSET >`,
      EventDestination: {
        MatchingEventTypes:
          'eventMatchRefs' in i && i.eventMatchRefs ? i.eventMatchRefs : (i as any).eventTypes,
        ...(i.name ? { Name: i.name } : {}),
        ...('enabled' in i ? { Enabled: i.enabled } : { Enabled: true }),
        ...('fh' in i
          ? {
            KinesisFirehoseDestination: {
              IAMRoleARN: i.fh.IAMRoleARN,
              DeliveryStreamARN: i.fh.DeliveryStreamARN
            }
          }
          : {
            CloudWatchDestination: {
              DimensionConfigurations: i.cwDims.map(v => ({
                DimensionValueSource: v.source,
                DefaultDimensionValue: v.value,
                DimensionName: v.name
              }))
            }
          })
      }
    }
  }
  /* istanbul ignore next */
  static fromString (s: string): SESConfigurationSetEventDestination {
    return SESConfigurationSetEventDestination.validate(JSON.parse(s))
  }
  /* istanbul ignore next */
  static fromJSON (i: object): SESConfigurationSetEventDestination {
    return SESConfigurationSetEventDestination.validateJSON(
      i as ISESConfigurationSetEventDestination_json
    )
  }
  /* istanbul ignore next */
  static fromJS (i: object): SESConfigurationSetEventDestination {
    return SESConfigurationSetEventDestination.validateJS(
      i as ISESConfigurationSetEventDestination_min
    )
  }
  /* istanbul ignore next */
  static from (i: string | object): SESConfigurationSetEventDestination {
    return SESConfigurationSetEventDestination.validate(i)
  }
  /* istanbul ignore next */
  static validate (i: string | object): SESConfigurationSetEventDestination {
    return validatorGeneric<SESConfigurationSetEventDestination>(
      i as squals,
      SESConfigurationSetEventDestination
    )
  }

  static validateJS (
    i: ISESConfigurationSetEventDestination_min
  ): SESConfigurationSetEventDestination {
    // basic destination Config
    const Common = struct(
      struct.interface({
        name: 'string?', // component name
        destinationName: 'StrRefGetAtt?',
        enabled: 'boolean?', // deafults to  true
        confgSet: 'StrRefGetAtt?' //  lazy add
      })
    )

    const EventEnums = struct(
      struct.interface({
        eventTypes: struct.list([
          struct.enum([
            'send',
            'reject',
            'bounce',
            'complaint',
            'delivery',
            'open',
            'click',
            'renderingFailure'
          ])
        ])
      })
    )

    const EventRefs = struct(
      struct.interface({
        eventMatchRefs: struct.list(['StrRefGetAtt'])
      })
    )

    const CommonEventUnion = struct(
      struct.union([
        struct.intersection([Common, EventEnums]),
        struct.intersection([Common, EventRefs])
      ])
    )

    // const JuestIntersect = struct(struct.intersection([Common, EventEnums]))

    const FireHoseConfig = struct(
      struct.interface({
        fh: struct({
          IAMRoleARN: 'StrRefGetAtt',
          DeliveryStreamARN: 'StrRefGetAtt'
        })
      })
    )

    const CloudwatchConfig = struct(
      struct.interface({
        cwDims: struct.list([
          struct({
            source: 'StrRefGetAtt',
            name: 'StrRefGetAtt',
            value: 'StrRefGetAtt'
          })
        ])
      })
    )

    struct(
      struct.union([
        struct.intersection([CommonEventUnion, FireHoseConfig]),
        struct.intersection([CommonEventUnion, CloudwatchConfig])
      ])
    )(i)

    return new SESConfigurationSetEventDestination(i)
  }

  static validateJSON (
    i: ISESConfigurationSetEventDestination_json
  ): SESConfigurationSetEventDestination {
    struct(
      struct.dict([
        'string',
        struct.interface({
          Type: struct.literal('AWS::SES::ConfigurationSetEventDestination'),
          Properties: struct({
            ConfigurationSetName: 'StrRefGetAtt',
            EventDestination: {
              Enabled: 'boolean?',
              Name: 'StrRefGetAtt?',
              MatchingEventTypes: struct.list([
                struct.union([
                  'StrRefGetAtt',
                  struct.enum([
                    'send',
                    'reject',
                    'bounce',
                    'complaint',
                    'delivery',
                    'open',
                    'click',
                    'renderingFailure'
                  ])
                ])
              ]),
              KinesisFirehoseDestination: struct.optional(
                struct({
                  IAMRoleARN: 'StrRefGetAtt',
                  DeliveryStreamARN: 'StrRefGetAtt'
                })
              ),
              CloudWatchDestination: struct.optional(
                struct({
                  DimensionConfigurations: struct.list([
                    struct({
                      DimensionValueSource: 'StrRefGetAtt',
                      DefaultDimensionValue: 'StrRefGetAtt',
                      DimensionName: 'StrRefGetAtt'
                    })
                  ])
                })
              )
            }
          })
        })
      ])
    )(i)

    // dummy return type
    const ret = new SESConfigurationSetEventDestination({
      fh: { DeliveryStreamARN: '', IAMRoleARN: '' },
      eventTypes: ['bounce', 'click']
    })
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  toJSON (): ISESConfigurationSetEventDestination_json {
    return {
      [this.name]: {
        Type: 'AWS::SES::ConfigurationSetEventDestination',
        Properties: this.Properties
      }
    }
  }

  _name (s: string): SESConfigurationSetEventDestination {
    this.name = s
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-configurationseteventdestination.html#cfn-ses-configurationseteventdestination-configurationsetname>
   */
  linkConfigurationSet (
    i: IStrRefGetAtt | SESConfigurationSet
  ): SESConfigurationSetEventDestination {
    if (i instanceof SESConfigurationSet) {
      this.Properties.ConfigurationSetName = i.Ref()
    } else {
      this.Properties.ConfigurationSetName = i
    }
    return this
  }

  /**
   * @description BasicEvent must always go with a CW, FH, or SNS
   * @param MatchingEventTypes
   * @param Name - Optional.
   * @param Enabled - Default: true.
   */
  event (MatchingEventTypes: IStrRefGetAtt[], Name?: IStrRefGetAtt, Enabled: boolean = true) {
    this.Properties.EventDestination = {
      ...this.Properties.EventDestination,
      Name,
      Enabled,
      MatchingEventTypes
    }
    return this
  }

  /**
   *
   * @description finish the event details where the transport is using kinesis firehose
   * @param IAMRoleARN
   * @param DeliveryStreamARN
   */
  usingFirehose (
    IAMRoleARN: IStrRefGetAtt,
    DeliveryStreamARN: IStrRefGetAtt
  ): SESConfigurationSetEventDestination {
    this.Properties.EventDestination.KinesisFirehoseDestination = { DeliveryStreamARN, IAMRoleARN }
    return this
  }

  /**
   * @description finish the event details where the transport is using cloudwatch
   * @param i
   */
  usingcCloudwatch (
    ...i: {
    name: IStrRefGetAtt
    source: IStrRefGetAtt
    value: IStrRefGetAtt
    }[]
  ): SESConfigurationSetEventDestination {
    this.Properties.EventDestination.CloudWatchDestination = {
      DimensionConfigurations: i.map(v => ({
        DimensionValueSource: v.source,
        DefaultDimensionValue: v.value,
        DimensionName: v.name
      }))
    }
    return this
  }

  /**
   * @todo add this and remove private when SNS is compat with CFM
   *
   * istabul ignore next */
  usingSNS (TopicAARN: IStrRefGetAtt) {
    console.warn(
      `AWS does not yet support this inside of cloudformation yet. `,
      `Please vote on this issue here:`
    )
    return this
  }
}

// # region interfaces

export type ISESConfigurationSetEventDestination_min =
  | ISESeventDestination_fh &
      ISESConfigurationSetEventDestination_base &
      ISESeventDestination_common
  | ISESeventDestination_cw &
      ISESConfigurationSetEventDestination_base &
      ISESeventDestination_common

interface ISESConfigurationSetEventDestination_base {
  name?: string
  enabled?: boolean
  confgSet?: IStrRefGetAtt // linkage property
  destinationName?: IStrRefGetAtt
}

interface ISESeventDestination_cw {
  cwDims: {
    source: IStrRefGetAtt
    name: IStrRefGetAtt
    value: IStrRefGetAtt
  }[]
}

interface ISESeventDestination_fh {
  fh: {
    IAMRoleARN: IStrRefGetAtt
    DeliveryStreamARN: IStrRefGetAtt
  }
}

type EmailEventType =
  | 'send'
  | 'reject'
  | 'bounce'
  | 'complaint'
  | 'delivery'
  | 'open'
  | 'click'
  | 'renderingFailure'
// | string // create some suggested members in an open set...

type ISESeventDestination_common =
  | ISESeventDestination_basic_eventEnum
  | ISESeventDestination_basic_ref

type ISESeventDestination_basic_eventEnum = ISESEventCommon & { eventTypes?: EmailEventType[] }
type ISESeventDestination_basic_ref = ISESEventCommon & { eventMatchRefs?: IStrRefGetAtt[] }

interface ISESEventCommon {
  enabled?: boolean
  destinationName?: IStrRefGetAtt
}

export interface ISESConfigurationSetEventDestination_props {
  ConfigurationSetName: IStrRefGetAtt
  EventDestination: {
    Enabled?: boolean
    MatchingEventTypes: (EmailEventType | IStrRefGetAtt)[]
    Name?: IStrRefGetAtt
    KinesisFirehoseDestination?: {
      IAMRoleARN: IStrRefGetAtt
      DeliveryStreamARN: IStrRefGetAtt
    }
    CloudWatchDestination?: {
      DimensionConfigurations?: {
        DimensionValueSource: IStrRefGetAtt
        DefaultDimensionValue: IStrRefGetAtt
        DimensionName: IStrRefGetAtt
      }[]
    }
  }
}

export interface ISESConfigurationSetEventDestination_json {
  [name: string]: {
    Type: 'AWS::SES::ConfigurationSetEventDestination'
    Properties: ISESConfigurationSetEventDestination_props
  }
}
// # endregion interfaces
