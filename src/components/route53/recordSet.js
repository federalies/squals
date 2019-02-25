export class Route53RecordSet {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::RecordSet'
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
}
