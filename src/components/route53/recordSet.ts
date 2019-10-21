// import Url from 'url'
import { CountryCodes_ISO3166 } from '../cloudFront'
import {
  validRoute53HostId,
  validRecordSetTypes,
  validRecordSetStrings,
  validAbbrevUnitedStateStrings
} from './enums'

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

import { Route53HostedZone } from './hostedZone'

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
    // #region Region union_type
    Region?:
      | 'ap-east-1'
      | 'ap-northeast-1'
      | 'ap-northeast-2'
      | 'ap-northeast-3'
      | 'ap-south-1'
      | 'ap-southeast-1'
      | 'ap-southeast-2'
      | 'ca-central-1'
      | 'cn-north-1'
      | 'cn-northwest-1'
      | 'eu-central-1'
      | 'eu-north-1'
      | 'eu-west-1'
      | 'eu-west-2'
      | 'eu-west-3'
      | 'me-south-1'
      | 'sa-east-1'
      | 'us-east-1'
      | 'us-east-2'
      | 'us-west-1'
      | 'us-west-2'
    // #endregion Region union_type
    AliasTarget?: IRecordSetAliasTargetData
    GeoLocation?: IRecordSetGeoLocationData
    Comment?: string
    Failover?: 'PRIMARY' | 'SECONDARY'
    HealthCheckId?: string
    HostedZoneId?: string
    HostedZoneName?: string
    MultiValueAnswer?: boolean
    SetIdentifier?: string
    TTL?: string
    Weight?: number
  }

  constructor(props: IdnsSimple) {
    this.Type = 'AWS::Route53::RecordSet'
    this.name = genComponentName(props.name)
    const { Type, Name, TTL, ResourceRecords } = normalizeInputs(props)
    this.Properties = { Type, Name, ResourceRecords, TTL }
  }

  toJSON(): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }

  Ref() {
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
  healthCheckid?: IStrRefGetAtt
  zoneId?: IStrRefGetAtt
  zoneName?: IStrRefGetAtt
  comment?: IStrRefGetAtt
  name?: string
}

export type IezDnsRecord =
  | IdnsRecord
  | IdnsReorcd_Failover
  | IdnsReorcd_Geo
  | IdnsReorcd_Multianswer
  | IdnsReorcd_Latency
// | IdnsReorcd_Weighted

export type IdnsSimple = { name?: string } & IdnsSimple_union

export type IdnsSimple_union =
  | { a: IezDnsInput } // location , value , ttl
  | { aaaa: IezDnsInput }
  | { caa: IezDnsInput }
  | { cname: IezDnsInput }
  | { mx: IdnsRecord_MX | [IStrRefGetAtt, IStrRefGetAtt, number, number?] } // location , value, priority, ttl=300,
  | { naptr: IezDnsInput }
  | { ns: IezDnsInput }
  | { ptr: IezDnsInput }
  | { soa: IezDnsInput }
  | { spf: IezDnsInput }
  | { srv: IezDnsInput }
  | { txt: IezDnsInput }
