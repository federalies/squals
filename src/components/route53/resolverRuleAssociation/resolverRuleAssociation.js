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
