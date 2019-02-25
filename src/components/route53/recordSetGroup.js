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
