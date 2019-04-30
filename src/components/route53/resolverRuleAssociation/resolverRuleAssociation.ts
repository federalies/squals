import { string } from 'joi'

export class Route53ResolverResolverRuleAssociation {
  readonly Type = 'AWS::Route53Resolver::ResolverRuleAssociation'
  Properties?: {
    Name?: string
    ResolverRuleId?: string
    VPCId?: string
  }

  constructor (props = {}) {
    this.Type = 'AWS::Route53Resolver::ResolverRuleAssociation'
  }
}
