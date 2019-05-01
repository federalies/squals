import { Route53HostedZone } from '../hostedZone'
import {
  Route53Record,
  // IdnsSimple,
  // IdnsRecord
  IezDnsInput,
  IdnsRecord_MX
} from '../recordSet'
import randomWord from 'random-word'
import Randoma from 'randoma'
import { IRef, IGetAtt } from '../../Template'
import { validRoute53HostId } from '../enums'
// import { CountryCodes_ISO3166 } from '../../cloudFront/distribution/restriction_enums'
import { IdnsRecord } from '../recordSet/recordSet'

export class Route53RecordSetGroup {
  name: string
  readonly Type: 'AWS::Route53::RecordSetGroup'
  _connectedHostedZone: Route53HostedZone
  Properties: {
    // @todo remove the ? since the ReocrdSets are reqd
    Comment?: string
    HostedZoneId?: string | IRef
    HostedZoneName?: string // pick one id or name
    RecordSets: Route53Record[]
  }

  constructor (props: Route53HostedZone) {
    this.Type = 'AWS::Route53::RecordSetGroup'
    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`
    this.name = { name: defaultName, ...props }.name
    this.Properties = { HostedZoneId: props.Ref(), RecordSets: [] }
    this._connectedHostedZone = props
  }

  A (input: IezDnsInput): Route53RecordSetGroup {
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
  AAAA (input: IezDnsInput): Route53RecordSetGroup {
    return this
  }
  CNAME (input: IezDnsInput): Route53RecordSetGroup {
    if ('Fn::GetAtt' in input) {
      this.Properties.RecordSets.push(new Route53Record({ cname: input }))
    } else {
      this.Properties.RecordSets.push(new Route53Record({ cname: input }))
    }

    return this
  }
  MX (input: IdnsRecord_MX | [string, string, number, number?]): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ mx: input }))
    return this
  }
  NAPTR (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ naptr: input }))
    return this
  }
  NS (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ ns: input }))
    return this
  }
  SOA (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ soa: input }))
    return this
  }
  SPF (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ spf: input }))
    return this
  }
  SRV (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ srv: input }))
    return this
  }
  TXT (input: IezDnsInput): Route53RecordSetGroup {
    this.Properties.RecordSets.push(new Route53Record({ txt: input }))
    return this
  }

  toJSON (): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }
  // simpleRecords (input: IdomainInput): Route53RecordSetGroup {
  //   return this
  // }
}

export interface IRecordSetAliasTarget {
  AliasTarget?: IRecordSetAliasTargetData
}

export interface IRecordSetAliasTargetData {
  DNSName?: string
  HostedZoneId: validRoute53HostId
  EvaluateTargetHealth?: boolean
}
