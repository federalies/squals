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
