import { ITags } from '../../Template'

export class Route53ResolverResolverEndpoint {
  readonly Type: 'AWS::Route53Resolver::ResolverEndpoint'
  Properties?: {
    // @todo remove ? since there are sub-keys that are required
    Name: string
    Direction: string
    SecurityGroupIds: string[]
    IpAddresses: [
      {
        Ip: string
        SubnetId: string
      }
    ]
    Tags: ITags[]
  }

  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverEndpoint'
  }
}
