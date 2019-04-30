// import Url from 'url'
import { CountryCodes_ISO3166 } from '../../cloudFront'
import {
  validRoute53HostId,
  validRecordSetTypes,
  validRecordSetStrings,
  validAbbrevUnitedStateStrings
} from '../enums'
import { IRef, IGetAtt } from '../../Template'
import Randoma from 'randoma'
import randomWord = require('random-word')
// import Joi, { JoiObject } from 'joi'

/**
 * @descrition asdasd
 * @see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html
 * @example
 * var a = new Route53Record('asdf')
 */
export class Route53Record {
  readonly Type: 'AWS::Route53::RecordSet'
  name: string
  // _keyRespones: { [prop: string]: StackChangeBehaviors }
  Properties: {
    Type: validRecordSetTypes // DNS type
    Name: string
    ResourceRecords?: (string | IGetAtt | IRef)[]
    Region?: string
    AliasTarget?: IRecordSetAliasTargetData
    GeoLocation?: IRecordSetGeoLocationData
    Comment?: string
    Failover?: string
    HealthCheckId?: string
    HostedZoneId?: string
    HostedZoneName?: string
    MultiValueAnswer?: boolean
    SetIdentifier?: string
    TTL?: string
    Weight?: number
  }
  constructor (props: IdnsSimple) {
    this.Type = 'AWS::Route53::RecordSet'
    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`
    this.name = { name: defaultName, ...props }.name
    const { Type, Name, TTL, ResourceRecords } = normalizeInputs(props)
    this.Properties = { Type, Name, ResourceRecords, TTL }
  }
  toJSON (): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }

  Ref () {
    return { Ref: this.name }
  }
}

type normalizeData = IezDnsInput | IdnsRecord_MX | [string, string, number, number?]

/**
 *
 * @param input
 */
export const normalizeInputs = (input: IdnsSimple): IDnsNormalized => {
  let Type = Object.keys(input)[0].toUpperCase() as validRecordSetTypes
  let data = Object.values(input)[0] as normalizeData

  switch (Type) {
    case 'MX' as validRecordSetStrings:
      return handleMXRecords(Type, data)
    default:
      return handleOtherStdRecords(Type, data)
  }
}

export interface IDnsNormalized {
  Type: validRecordSetStrings
  Name: string
  TTL: string
  ResourceRecords: (string | IGetAtt)[]
  Priority?: number
}

export const handleOtherStdRecords = (
  Type: validRecordSetStrings,
  data: normalizeData
): IDnsNormalized => {
  if (Array.isArray(data)) {
    return {
      Type,
      Name: data[0],
      ResourceRecords: [data[1]],
      TTL: data[2] ? data[2].toString() : '300'
    }
  } else {
    return {
      Type,
      Name: data.sub,
      ResourceRecords: [data.loc],
      TTL: data.ttl ? data.ttl.toString() : '300'
    }
  }
}

export const handleMXRecords = (
  Type: validRecordSetStrings = 'MX',
  data: normalizeData
): IDnsNormalized => {
  if (Array.isArray(data)) {
    return {
      Type,
      Name: data[0],
      ResourceRecords: [data[1]],
      Priority: data[2],
      TTL: data[3] ? data[3].toString() : '300'
    }
  } else {
    return {
      Type,
      Name: data.sub,
      ResourceRecords: [data.loc],
      Priority: (data as IdnsRecord_MX).priority,
      TTL: data.ttl ? data.ttl.toString() : '300'
    }
  }
}

// const resourceOnChangeBehaviorsConfig = () => {
//   return {
//     Name: StackChangeBehaviors.replacement,
//     Type: StackChangeBehaviors.noInteruption,
//     Region: StackChangeBehaviors.noInteruption,
//     AliasTarget: StackChangeBehaviors.noInteruption,
//     GeoLocation: StackChangeBehaviors.noInteruption,
//     Comment: StackChangeBehaviors.noInteruption,
//     Failover: StackChangeBehaviors.noInteruption,
//     HealthCheckId: StackChangeBehaviors.noInteruption,
//     HostedZoneId: StackChangeBehaviors.noInteruption,
//     HostedZoneName: StackChangeBehaviors.noInteruption,
//     MultiValueAnswer: StackChangeBehaviors.noInteruption,
//     ResourceRecords: StackChangeBehaviors.noInteruption,
//     SetIdentifier: StackChangeBehaviors.noInteruption,
//     TTL: StackChangeBehaviors.noInteruption,
//     Weight: StackChangeBehaviors.noInteruption
//   }
// }

// const geoLocationConfig = () => {}

// export const aliasIFNeeded = (
//   DNSName: string,
//   healthCheck: boolean = true,
//   networkLoadbalancer: boolean = false
// ) => {
//   const isAliasable = ['apigateway', 'elasticbeanstalk', 'elasticloadbalancing', 's3-website']
//     .map((svcName: string) => {
//       return new RegExp(`(.)+\.[${svcName}]+\.[-\w]+\.amazonaws.com`)
//     })
//     .some((pattern: RegExp) => {
//       return pattern.test(DNSName)
//     })
//   if (isAliasable) {
//     const a = validRoute53HostId['apigateway.ap-northeast-1.amazonaws.com']
//   } else {
//     throw new Error('this DNS is not aliasable')
//   }
// }

export interface IdnsRecord_MX extends IdnsRecord {
  priority: number
}

export interface IdnsReorcd_Failover extends IdnsRecord {
  failover: IdnsRecord
}

export interface IdnsReorcd_Geo extends IdnsRecord {
  geo: {
    county: string
    continent: string
    state: string
  }
}

export interface IdnsReorcd_Latency extends IdnsRecord {
  region: IdnsRecord
}

export interface IdnsReorcd_Multianswer extends IdnsRecord {
  also: string[]
}

export interface IRecordSetAliasTarget {
  AliasTarget?: IRecordSetAliasTargetData
}

export interface IRecordSetAliasTargetData {
  DNSName?: string
  HostedZoneId: validRoute53HostId
  EvaluateTargetHealth?: boolean
}

export interface IRecordSetGeoLocation {
  GeoLocation?: IRecordSetGeoLocationData
}

export interface IRecordSetGeoLocationData {
  ContinentCode?: 'AF' | 'AN' | 'AS' | 'EU' | 'OC' | 'NA' | 'SA'
  CountryCode?: CountryCodes_ISO3166
  SubdivisionCode?: validAbbrevUnitedStateStrings
}

export type IezDnsInput =
  | [string, string, number?] // sub, loc ttl=300
  | [string, IGetAtt, number?]
  | IezDnsRecord

export interface IdnsRecord {
  sub: string
  loc: string
  ttl?: number
  // ___
  healthCheckid?: string | IRef
  zoneId?: string | IRef
  zoneName?: string
  comment?: string
  name?: string
}

export type IezDnsRecord =
  | IdnsRecord
  | IdnsReorcd_Failover
  | IdnsReorcd_Geo
  | IdnsReorcd_Multianswer
  | IdnsReorcd_Latency
// | IdnsReorcd_Weighted

export type IdnsSimple =
  | { a: IezDnsInput } // location , value , ttl
  | { aaaa: IezDnsInput }
  | { caa: IezDnsInput }
  | { cname: IezDnsInput }
  | { mx: IdnsRecord_MX | [string, string, number, number?] } // location , value includes, priority, ttl=300,
  | { naptr: IezDnsInput }
  | { ns: IezDnsInput }
  | { ptr: IezDnsInput }
  | { soa: IezDnsInput }
  | { spf: IezDnsInput }
  | { srv: IezDnsInput }
  | { txt: IezDnsInput }
