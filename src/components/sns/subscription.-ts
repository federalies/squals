// @todo post-code-generation
//
// 1. Go through and remove all refs of object
// 2. Look for enums in the documentation
// 3. Flatten deep structures in the _min interface
// 4. finish the constructor that maps the _min inputs to the _props outputs
// 5. Look at the relationship between objects - consider if there would be a need for a _linkedData = {stringKey: object[] }
// 6. Look for MultiMode, All-optional sections - and teas out if that should be a required union type Ex: LmabdaFunction:Code
// 7. Chop Up Mega interfaces to make them more apprachable Ex: S3-Bucket
// 8. Deal with remaining typescript warnings
//
import {
  squals,
  struct,
  baseSchemas,
  validatorGeneric,
  genComponentName,
  IStrRefGetAtt,
  IGetAtt,
  ITags,
  Itags,
  IRef
} from '../Template'
import {
  verifyIfThen,
  ifHas,
  multipleOf,
  stringNotEqual,
  ifType
} from '../../utils/validations/objectCheck'
class SNSSubscription implements squals {
  name: string
  Type = 'AWS::SNS::Subscription'
  Properties: ISNSSubscription_props

  constructor () {
    this.name = genComponentName()
    this.Properties = {}
    // finish the constructor
  }

  static fromString (s: string) {
    return SNSSubscription.validate(JSON.parse(s))
  }

  static fromJSON (i: object) {
    return SNSSubscription.validateJSON(i as ISNSSubscription_json)
  }

  static fromJS (i: object) {
    return SNSSubscription.validateJS(i as ISNSSubscription_min)
  }

  static from (i: string | object) {
    return SNSSubscription.validate(i)
  }

  static validate (i: string | object) {
    return validatorGeneric<SNSSubscription>(i)
  }

  static validateJS (i: ISNSSubscription_min) {
    throw new Error('not implemented yet')
  }

  static validateJSON (i: ISNSSubscription_json) {
    throw new Error('not implemented yet')
  }

  _name (s: string) {
    this.name = s
    return this
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SNS::Subscription',
        Properties: this.Properties
      }
    }
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-subscription-deliverypolicy>
   */
  deliveryPolicy (i: { [str: string]: object }) {
    this.Properties.DeliveryPolicy = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-endpoint>
   */
  endpoint (i: IStrRefGetAtt) {
    this.Properties.Endpoint = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-subscription-filterpolicy>
   */
  filterPolicy (i: { [str: string]: object }) {
    this.Properties.FilterPolicy = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-protocol>
   */
  protocol (i: IStrRefGetAtt) {
    this.Properties.Protocol = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-subscription-rawmessagedelivery>
   */
  rawMessageDelivery (i: boolean) {
    this.Properties.RawMessageDelivery = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#cfn-sns-subscription-region>
   */
  region (i: IStrRefGetAtt) {
    this.Properties.Region = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html#topicarn>
   */
  topicArn (i: IStrRefGetAtt) {
    this.Properties.TopicArn = i
    return this
  }
}

// # region interfaces
interface ISNSSubscription_min {
  deliveryPolicy?: { [str: string]: object }
  endpoint?: IStrRefGetAtt
  filterPolicy?: { [str: string]: object }
  protocol: IStrRefGetAtt
  rawMessageDelivery?: boolean
  region?: IStrRefGetAtt
  topicArn: IStrRefGetAtt
}

interface ISNSSubscription_props {
  DeliveryPolicy?: { [str: string]: object }
  Endpoint?: IStrRefGetAtt
  FilterPolicy?: { [str: string]: object }
  Protocol: IStrRefGetAtt
  RawMessageDelivery?: boolean
  Region?: IStrRefGetAtt
  TopicArn: IStrRefGetAtt
}

interface ISNSSubscription_json {
  [n: string]: {
    Type: 'AWS::SNS::Subscription'
    Properties: ISNSSubscription_props
  }
}
// # endregion interfaces
