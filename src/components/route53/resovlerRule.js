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
