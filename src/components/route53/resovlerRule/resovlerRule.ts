import { ITags } from '../../Template'

export class Route53ResolverResolverRule {
  readonly Type: 'AWS::Route53Resolver::ResolverRule'
  Properties?: {
    // @todo remove the ?
    Name: string
    DomainName: string
    ResolverEndpointId: string
    RuleType: string
    TargetIps: [
      {
        Ip: string
        Port: string
      }
    ]
    Tags: ITags
  }

  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRule'
  }
}
