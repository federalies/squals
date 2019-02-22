/* eslint no-unused-vars: ["error", { "args": "none" }] */

export class Route53HealthCheck {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::HealthCheck'
    this.Properties = {
      HealthCheckConfig: {
        AlarmIdentifier: {
          Name: null, // String,
          Region: null // String
        },
        ChildHealthChecks: null, // [String],
        EnableSNI: null, // Boolean,
        FailureThreshold: null, // 0,
        FullyQualifiedDomainName: null, // String,
        HealthThreshold: null, // 0,
        InsufficientDataHealthStatus: null, // String,
        Inverted: null, // Boolean,
        IPAddress: null, // String,
        MeasureLatency: null, // Boolean,
        Port: null, // 80
        Regions: null, // [String],
        RequestInterval: null, // 300
        ResourcePath: null, // String,
        SearchString: null, // String,
        Type: null // String
      },
      HealthCheckTags: [
        {
          Key: null, // String,
          Value: null // String
        }
      ]
    }
  }
}

export class Route53HostedZone {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::HostedZone'
    this.Properties = {
      Name: null, //  String,
      HostedZoneConfig: {
        Comment: null // String
      },
      HostedZoneTags: [
        {
          Key: null, // String,
          Value: null // String
        }
      ],
      QueryLoggingConfig: {
        CloudWatchLogsLogGroupArn: null // String
      },
      VPCs: [
        {
          VPCId: null, // String,
          VPCRegion: null // String
        }
      ]
    }
  }
}

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

export class Route53RecordSetGroup {
  constructor (props = {}) {
    const { RecordSets } = props
    this.Type = 'AWS::Route53::RecordSetGroup'
    this.Properties = {
      Comment: null, // String,
      HostedZoneId: null, // String,
      HostedZoneName: null, // String,
      RecordSets //  RecordSet is required
    }
  }
}

export class Route53ResolverResolverEndpoint {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverEndpoint'
    this.Properties = {
      Name: null, // String,
      Direction: null, // String,
      SecurityGroupIds: null, // [String],
      IpAddresses: [
        {
          Ip: null, // String,
          SubnetId: null // String
        }
      ],
      Tags: [
        {
          Key: null, // String,
          Value: null // String
        }
      ]
    }
  }
}

export class Route53ResolverResolverRule {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRule'
    this.Properties = {
      Name: null, // String,
      DomainName: null, // String,
      ResolverEndpointId: null, // String,
      RuleType: null, // String,
      Tags: [
        {
          Key: null, // String,
          Value: null // String
        }
      ],
      TargetIps: [
        {
          Ip: null, // String,
          Port: null // String
        }
      ]
    }
  }
}

export class Route53ResolverResolverRuleAssociation {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRuleAssociation'
    this.Properties = {
      Name: null, // String,
      ResolverRuleId: null, // String,
      VPCId: null // String
    }
  }
}
