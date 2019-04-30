import { ITags, IGetAtt, IRef, Itags, tags } from '../../Template'
import randomWord from 'random-word'
import Randoma from 'randoma'

export class Route53HostedZone {
  name: string
  Type: 'AWS::Route53::HostedZone'
  Properties: {
    Name: string
    HostedZoneConfig?: { Comment: string }
    HostedZoneTags?: ITags[]
    QueryLoggingConfig?: {
      CloudWatchLogsLogGroupArn: string
    }
    VPCs?: { VPCId: string; VPCRegion: string }[]
  }
  /**
   *
   * @param props
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-route53-hostedzone.html
   */
  constructor (props: IdomainInput) {
    this.Type = 'AWS::Route53::HostedZone'

    let defaultName = `${randomWord()}${new Randoma({
      seed: new Date().getTime()
    }).integer()}`

    if (typeof props === 'string') {
      this.name = defaultName
      this.Properties = { Name: props } // input = domain name
      // optionals = NONE
    } else if ('domain' in props) {
      let defaultName = `${randomWord()}-${randomWord()}-${new Randoma({
        seed: new Date().getTime()
      }).integer()}`
      this.name = { name: defaultName, ...props }.name
      this.Properties = { Name: props.domain } // input = domain name
      // optionals
      if (props.comment) this.Properties.HostedZoneConfig = { Comment: props.comment }
      if (props.tags) this.Properties.HostedZoneTags = tags(props.tags)
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

  toJSON (): object {
    return {
      [this.name]: {
        Type: this.Type,
        Properties: this.Properties
      }
    }
  }
  Ref (): IRef {
    return { Ref: this.name }
  }
  /**
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html
   */
  NameServers (): IGetAtt {
    return { 'Fn::GetAtt': [this.name, 'NameServers'] }
  }
}

export type IdomainInput = string | IdomainHostedZone

export interface IdomainHostedZone {
  name?: string
  domain: string
  comment?: string
  tags?: Itags | Itags[]
  loggingArn?: string
  vpcs?: { [id: string]: string } // {idA: regionA, idB: regionB }
}
