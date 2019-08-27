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
class SQSQueue implements squals {
  name: string
  Type = 'AWS::SQS::Queue'
  Properties: ISQSQueue_props

  constructor () {
    this.name = genComponentName()
    this.Properties = {}
    // finish the constructor
  }

  static fromString (s: string) {
    return SQSQueue.validate(JSON.parse(s))
  }

  static fromJSON (i: object) {
    return SQSQueue.validateJSON(i as ISQSQueue_json)
  }

  static fromJS (i: object) {
    return SQSQueue.validateJS(i as ISQSQueue_min)
  }

  static from (i: string | object) {
    return SQSQueue.validate(i)
  }

  static validate (i: string | object) {
    return validatorGeneric<SQSQueue>(i)
  }

  static validateJS (i: ISQSQueue_min) {
    throw new Error('not implemented yet')
  }

  static validateJSON (i: ISQSQueue_json) {
    throw new Error('not implemented yet')
  }

  _name (s: string) {
    this.name = s
    return this
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SQS::Queue',
        Properties: this.Properties
      }
    }
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-contentbaseddeduplication>
   */
  contentBasedDeduplication (i: boolean) {
    this.Properties.ContentBasedDeduplication = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-delayseconds>
   */
  delaySeconds (i: number) {
    this.Properties.DelaySeconds = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-fifoqueue>
   */
  fifoQueue (i: boolean) {
    this.Properties.FifoQueue = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-kmsdatakeyreuseperiodseconds>
   */
  kmsDataKeyReusePeriodSeconds (i: number) {
    this.Properties.KmsDataKeyReusePeriodSeconds = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-kmsmasterkeyid>
   */
  kmsMasterKeyId (i: IStrRefGetAtt) {
    this.Properties.KmsMasterKeyId = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-maxmesgsize>
   */
  maximumMessageSize (i: number) {
    this.Properties.MaximumMessageSize = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-msgretentionperiod>
   */
  messageRetentionPeriod (i: number) {
    this.Properties.MessageRetentionPeriod = i
    return this
  }

  QueueName () {
    return { 'Fn::GetAtt': [this.name, 'QueueName'] }
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-receivemsgwaittime>
   */
  receiveMessageWaitTimeSeconds (i: number) {
    this.Properties.ReceiveMessageWaitTimeSeconds = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-redrive>
   */
  redrivePolicy (i: { [str: string]: object }) {
    this.Properties.RedrivePolicy = i
    return this
  }

  /**
   * @param i - Object[].
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#cfn-sqs-queue-tags>
   */
  tags (i: object[]) {
    this.Properties.Tags = i
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-sqs-queues.html#aws-sqs-queue-visiblitytimeout>
   */
  visibilityTimeout (i: number) {
    this.Properties.VisibilityTimeout = i
    return this
  }

  Arn () {
    return { 'Fn::GetAtt': [this.name, 'Arn'] }
  }
}

// # region interfaces
interface ISQSQueue_min {
  contentBasedDeduplication?: boolean
  delaySeconds?: number
  fifoQueue?: boolean
  kmsDataKeyReusePeriodSeconds?: number
  kmsMasterKeyId?: IStrRefGetAtt
  maximumMessageSize?: number
  messageRetentionPeriod?: number
  queueName?: IStrRefGetAtt
  receiveMessageWaitTimeSeconds?: number
  redrivePolicy?: { [str: string]: object }
  tags?: Itags[]
  visibilityTimeout?: number
}

interface ISQSQueue_props {
  ContentBasedDeduplication?: boolean
  DelaySeconds?: number
  FifoQueue?: boolean
  KmsDataKeyReusePeriodSeconds?: number
  KmsMasterKeyId?: IStrRefGetAtt
  MaximumMessageSize?: number
  MessageRetentionPeriod?: number
  QueueName?: IStrRefGetAtt
  ReceiveMessageWaitTimeSeconds?: number
  RedrivePolicy?: { [str: string]: object }
  VisibilityTimeout?: number
  Tags?: ITags[]
}

interface ISQSQueue_json {
  [n: string]: {
    Type: 'AWS::SQS::Queue'
    Properties: ISQSQueue_props
  }
}
// # endregion interfaces
