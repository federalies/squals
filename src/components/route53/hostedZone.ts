import { genComponentName, ITags, IGetAtt, IRef, Itags, tags } from '../Template'

export class Route53HostedZone {
  name: string
  Type: 'AWS::Route53::HostedZone'
  Properties: {
    Name: string
    HostedZoneConfig?: {
      Comment: string
    }
    HostedZoneTags?: ITags[]
    QueryLoggingConfig?: {
      CloudWatchLogsLogGroupArn: string
    }
    VPCs?: {
      VPCId: string
      VPCRegion: string
    }[]
  }

  /**
   * @description makes a new HostedZone
   * @param props
   * @see [AWS Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-hostedzone.html)
   * @example
   * ```js
   * const min = new Route53HostedZone('mydomain.com')
   * const full = new Route53HostedZone({ name:'zoneComponent', domain:'mydomain.com', comment:'comment', tags:{key1:'value1'} })
   * ```
   */
  constructor(props: IdomainInput) {
    this.Type = 'AWS::Route53::HostedZone'
    if (typeof props === 'string') {
      this.name = genComponentName(props)
      this.Properties = { Name: props } // input = domain name
      // optionals = NONE
    } else if ('domain' in props) {
      this.name = genComponentName(props.name)
      this.Properties = { Name: props.domain } // input = domain name
      // optionals
      if (props.comment) this.Properties.HostedZoneConfig = { Comment: props.comment }
      if (props.tags) this.Properties.HostedZoneTags = tags(...props.tags)
      if (props.vpcs) {
        this.Properties.VPCs = Object.entries(props.vpcs).map(([VPCId, VPCRegion]) => ({
          VPCId,
          VPCRegion
        }))
      }
      if (props.loggingArn) {
        this.Properties.QueryLoggingConfig = { CloudWatchLogsLogGroupArn: props.loggingArn }
      }
    } else {
      throw new Error('Hosted Zone got a bad input param')
    }
  }

  toJSON(): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }
  Ref(): IRef {
    return { Ref: this.name }
  }
  /**
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html
   */
  NameServers(): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'NameServers'] }
  }
}

export type IdomainInput = string | IdomainHostedZone

export interface IdomainHostedZone {
  name?: string
  domain: string
  comment?: string
  tags?: Itags[]
  loggingArn?: string
  vpcs?: { [id: string]: string } // {idA: regionA, idB: regionB }
}
