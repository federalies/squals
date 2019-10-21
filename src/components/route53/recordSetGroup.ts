import { Route53HostedZone } from './hostedZone'
import {
  Route53Record,
  IezDnsInput,
  IdnsRecord_MX,
  IdnsRecord
  // IdnsSimple,
} from './recordSet'
import { IRef, IGetAtt, genComponentName, IStrRefGetAtt } from '../Template'
import { validRoute53HostId } from './enums'
// import { CountryCodes_ISO3166 } from '../../cloudFront/distribution/restriction_enums'

export class Route53RecordSetGroup {
  name: string
  Type = 'AWS::Route53::RecordSetGroup'
  _connectedHostedZone: Route53HostedZone
  Properties: {
    Comment?: string
    HostedZoneId?: string | IRef
    HostedZoneName?: string // pick one id or name
    RecordSets: (Route53Record | IRoute53RecordSetGroup_records)[]
  }

  /**
   * @description
   * @see [Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-recordsetgroup.html)
   * @param props includes component name and comment - minimum acceptable: {}
   * @param _linkHostedZone
   * @param records
   * @example
   * const zone = new Route53HostedZone('mydomain.com')
   * const recordGroup = new Route53RecordSetGroup({}, zone)
   */
  constructor(
    props: { name?: string; comment?: string },
    _linkHostedZone: Route53HostedZone,
    ...records: Route53Record[]
  ) {
    this.name = genComponentName()
    this._connectedHostedZone = _linkHostedZone
    this.Properties = {
      Comment: props.comment,
      HostedZoneId: _linkHostedZone.Ref(),
      RecordSets: records
    }
  }

  A(input: IezDnsInput): Route53RecordSetGroup {
    if (Array.isArray(input)) {
      if (typeof input[1] === 'string') {
        this.Properties.RecordSets.push(
          new Route53Record({ a: input as [string, string, number?] })
        )
      } else if ('Fn::GetAtt' in input[1]) {
        this.Properties.RecordSets.push(
          new Route53Record({ a: input as [string, IGetAtt, number?] })
        )
      }
    } else if ('loc' in input) {
      this.Properties.RecordSets.push(new Route53Record({ a: input as IdnsRecord }))
    } else {
      throw new Error('something bad')
    }
    return this
  }
  AAAA(input: IezDnsInput): Route53RecordSetGroup {
    return this
  }
  CNAME(input: IezDnsInput): Route53RecordSetGroup {
    if ('Fn::GetAtt' in input) {
      this.Properties.RecordSets.push(new Route53Record({ cname: input }))
    } else {
      this.Properties.RecordSets.push(new Route53Record({ cname: input }))
    }

    return this
  }
  MX(input: IdnsRecord_MX | [string, string, number, number?]): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ mx: input }))
    return this
  }
  NAPTR(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ naptr: input }))
    return this
  }
  NS(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ ns: input }))
    return this
  }
  SOA(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ soa: input }))
    return this
  }
  SPF(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ spf: input }))
    return this
  }
  SRV(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ srv: input }))
    return this
  }
  TXT(input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ txt: input }))
    return this
  }

  toJSON(): IRoute53RecordSetGroup_json {
    return {
      [this.name]: {
        Type: 'AWS::Route53::RecordSetGroup',
        Properties: {
          ...this.Properties,
          RecordSets: this.Properties.RecordSets.map(v => {
            return v instanceof Route53Record ? { ...v.Properties } : v
          })
        }
      }
    }
  }
}

export interface IRoute53RecordSetGroup_json {
  [name: string]: {
    Type: 'AWS::Route53::RecordSetGroup'
    Properties: {
      Comment?: string
      HostedZoneId?: string | IRef
      HostedZoneName?: string
      RecordSets: IRoute53RecordSetGroup_records[]
    }
  }
}

interface IRoute53RecordSetGroup_records {
  Name: string
  HealthCheckId?: string
  HostedZoneId?: string
  HostedZoneName?: string
  Comment?: string
  TTL?: string
  SetIdentifier?: string
  MultiValueAnswer?: boolean
  Failover?: 'PRIMARY' | 'SECONDARY'
  Weight?: number
  ResourceRecords?: IStrRefGetAtt[]
  // #region Type union_type
  Type:
    | 'A'
    | 'AAAA'
    | 'CAA'
    | 'CNAME'
    | 'MX'
    | 'NAPTR'
    | 'NS'
    | 'PTR'
    | 'SOA'
    | 'SPF'
    | 'SRV'
    | 'TXT'
  // #endregion Type union_type
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
  AliasTarget?: {
    DNSName?: string
    HostedZoneId: string
    EvaluateTargetHealth?: boolean
  }
  GeoLocation?: {
    ContinentCode?: string
    CountryCode?: string
    SubdivisionCode?: string
  }
}
