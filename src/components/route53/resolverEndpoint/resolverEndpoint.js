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
