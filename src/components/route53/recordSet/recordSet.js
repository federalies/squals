/* eslint no-unused-vars: ["error", { "args": "none" }] */
import randomWord from 'random-word'
import Randoma from 'randoma'

export class Route53RecordSet {
  constructor (props = {}, name = null) {
    this.Type = 'AWS::Route53::RecordSet'
    this.name =
      name ||
      `${randomWord()}-${randomWord()}-${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
    this.Properties = {
      Name: null, // String
      AliasTarget: {
        DNSName: null, // String
        EvaluateTargetHealth: true,
        HostedZoneId: null // String
      },
      Comment: null, // String,
      Failover: null, // String,
      GeoLocation: {
        ContinentCode: null, // String,
        CountryCode: null, // String,
        SubdivisionCode: null // String
      },
      HealthCheckId: null, // String,
      HostedZoneId: null, // String,
      HostedZoneName: null, // String,
      MultiValueAnswer: null, // Boolean,
      Region: null, // String,
      ResourceRecords: null, // [String],
      SetIdentifier: null, // String,
      TTL: null, // String,
      Type: null, // String,
      Weight: null // 'Integer'
    }
  }
  addCNAMEs (subdomain, FQDN) {
    return this
  }
}
