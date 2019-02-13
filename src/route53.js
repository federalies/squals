export class Route53HealthCheck {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::HealthCheck'
    this.Properties = {
      HealthCheckConfig: {
        AlarmIdentifier: {
          Name: String,
          Region: String
        },
        ChildHealthChecks: [String],
        EnableSNI: Boolean,
        FailureThreshold: 'Integer',
        FullyQualifiedDomainName: String,
        HealthThreshold: 'Integer',
        InsufficientDataHealthStatus: String,
        Inverted: Boolean,
        IPAddress: String,
        MeasureLatency: Boolean,
        Port: 'Integer',
        Regions: [String],
        RequestInterval: 'Integer',
        ResourcePath: String,
        SearchString: String,
        Type: String
      },
      HealthCheckTags: [
        {
          Key: String,
          Value: String
        }
      ]
    }
  }
}
export class Route53HostedZone {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::HostedZone'
    this.Properties = {
      Name: String,
      HostedZoneConfig: {
        Comment: String
      },
      HostedZoneTags: [
        {
          Key: String,
          Value: String
        }
      ],
      QueryLoggingConfig: {
        CloudWatchLogsLogGroupArn: String
      },
      VPCs: [
        {
          VPCId: String,
          VPCRegion: String
        }
      ]
    }
  }
}

export class Route53RecordSet {
  constructor (props = {}) {
    this.Type = 'AWS::Route53::RecordSet'
    this.Properties = {
      Name: '',
      AliasTarget: {
        DNSName: '',
        EvaluateTargetHealth: true,
        HostedZoneId: String
      },
      Comment: String,
      Failover: String,
      GeoLocation: {
        ContinentCode: String,
        CountryCode: String,
        SubdivisionCode: String
      },
      HealthCheckId: String,
      HostedZoneId: String,
      HostedZoneName: String,
      MultiValueAnswer: Boolean,
      Region: String,
      ResourceRecords: [String],
      SetIdentifier: String,
      TTL: String,
      Type: String,
      Weight: 'Integer'
    }
  }
}
export class Route53RecordSetGroup {
  constructor (props = {}) {
    const { RecordSets } = props
    this.Type = 'AWS::Route53::RecordSetGroup'
    this.Properties = {
      Comment: String,
      HostedZoneId: String,
      HostedZoneName: String,
      RecordSets
    }
  }
}
export class Route53ResolverResolverEndpoint {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverEndpoint'
    this.Properties = {
      Name: String,
      Direction: String,
      SecurityGroupIds: [String],
      IpAddresses: [
        {
          Ip: String,
          SubnetId: String
        }
      ],
      Tags: [
        {
          Key: String,
          Value: String
        }
      ]
    }
  }
}
export class Route53ResolverResolverRule {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRule'
    this.Properties = {
      Name: String,
      DomainName: String,
      ResolverEndpointId: String,
      RuleType: String,
      Tags: [
        {
          Key: String,
          Value: String
        }
      ],
      TargetIps: [
        {
          Ip: String,
          Port: String
        }
      ]
    }
  }
}
export class Route53ResolverResolverRuleAssociation {
  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRuleAssociation'
    this.Properties = {
      Name: String,
      ResolverRuleId: String,
      VPCId: String
    }
  }
}
