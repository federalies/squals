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
