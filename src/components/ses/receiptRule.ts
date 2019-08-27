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
import { SESReceiptRuleSet } from './receiptRuleSet'
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

// import {
//   verifyIfThen,
//   ifHas,
//   multipleOf,
//   stringNotEqual,
//   ifType
// } from '../../utils/validations/objectCheck'

export class SESReceiptRule implements squals {
  name: string
  Type = 'AWS::SES::ReceiptRule'
  Properties: ISESReceiptRule_props
  private _inputs?: ISESReceiptRule_min

  /**
   *
   * @param i
   * @example
   * const a = new SESReceiptRule()
   *
   */
  constructor (i?: ISESReceiptRule_min) {
    this.name = genComponentName(i ? i.name : undefined)
    // this._inputs = i
    this.Properties = {
      RuleSetName: i && i.ruleSetName ? i.ruleSetName : '< PLACEHOLDER:: LINK TO RULESET >',
      ...(i && i.after ? { After: i.after } : {}),
      Rule: {
        ...(i && 'enabled' in i ? { Enabled: i.enabled } : { Enabled: true }),
        ...(i && 'scan' in i ? { ScanEnabled: i.scan } : { ScanEnabled: true }),
        ...(i && 'useTls' in i
          ? { TlsPolicy: i.useTls ? 'Require' : 'Optional' }
          : { TlsPolicy: 'Optional' }),
        ...(i && i.rulename ? { Name: i.rulename } : i && i.name ? { Name: i.rulename } : {}),
        ...(i && i.recipients ? { Recipients: i.recipients } : {}),
        ...(i && i.actions ? { Actions: this.__actions(...i.actions) } : {})
      }
    }
  }

  static fromString (s: string): SESReceiptRule {
    return SESReceiptRule.validate(JSON.parse(s))
  }

  static fromJSON (i: object): SESReceiptRule {
    return SESReceiptRule.validateJSON(i as ISESReceiptRule_json)
  }

  static fromJS (i: object): SESReceiptRule {
    return SESReceiptRule.validateJS(i as ISESReceiptRule_min)
  }

  static from (i: string | object): SESReceiptRule {
    return SESReceiptRule.validate(i)
  }

  static validate (i: string | object): SESReceiptRule {
    return validatorGeneric<SESReceiptRule>(i as squals, SESReceiptRule)
  }

  static validateJS (i: ISESReceiptRule_min): SESReceiptRule {
    const Actions = struct.optional(
      struct.list([
        struct.union([
          struct({
            bounce: struct({
              sender: 'StrRefGetAtt',
              msg: 'StrRefGetAtt',
              smtpcode: struct.tuple(['number', 'number', 'number']),
              topicArn: 'StrRefGetAtt?',
              smtpstatus: struct.optional(struct.tuple(['number', 'number', 'number']))
            })
          }),
          struct({
            s3: struct({
              bucket: 'StrRefGetAtt',
              prefix: 'StrRefGetAtt?',
              kmsKeyArn: 'StrRefGetAtt?',
              topicArn: 'StrRefGetAtt?'
            })
          }),
          struct({
            stop: struct({
              scope: struct.literal('RuleSet'),
              topicArn: 'StrRefGetAtt?'
            })
          }),
          struct({
            sns: struct({
              topicArn: 'StrRefGetAtt?',
              enc: struct.optional(struct.enum(['Base64', 'UTF-8']))
            })
          }),
          struct({
            workmail: struct({
              orgArn: 'StrRefGetAtt',
              topicArn: 'StrRefGetAtt'
            })
          }),
          struct({
            header: struct({
              name: 'StrRefGetAtt',
              value: 'StrRefGetAtt'
            })
          }),
          struct({
            lambda: struct({
              functionArn: 'StrRefGetAtt',
              topicArn: 'StrRefGetAtt?',
              type: struct.optional(struct.enum(['Event', 'RequestResponse']))
            })
          })
        ])
      ])
    )

    struct({
      name: 'string?',
      ruleSetName: 'StrRefGetAtt?',
      after: 'Ref?',
      rulename: 'StrRefGetAtt?',
      enabled: 'boolean?',
      scan: 'boolean?',
      recipients: struct.optional(struct.list(['StrRefGetAtt'])),
      useTls: 'boolean',
      actions: Actions
    })(i)
    return new SESReceiptRule(i)
  }

  static validateJSON (i: ISESReceiptRule_json): SESReceiptRule {
    // validation logic here then...
    const ret = new SESReceiptRule({})
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    throw new Error('not implemented yet')
    return ret
  }

  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SES::ReceiptRule',
        Properties: this.Properties
      }
    }
  }

  _name (s: string): SESReceiptRule {
    this.name = s
    return this
  }

  ruleName (s: string): SESReceiptRule {
    this.Properties.Rule.Name = s
    return this
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-after>
   */
  after (i: IRef | SESReceiptRule): SESReceiptRule {
    if (i instanceof SESReceiptRule) {
      this.Properties.After = i.Ref()
    } else {
      this.Properties.After = i
    }
    return this
  }

  recipients (...r: IStrRefGetAtt[]): SESReceiptRule {
    this.Properties.Rule.Recipients = r
    return this
  }

  enabled (b: boolean = true): SESReceiptRule {
    this.Properties.Rule.Enabled = b
    return this
  }

  scan (b: boolean = true): SESReceiptRule {
    this.Properties.Rule.ScanEnabled = b
    return this
  }

  useTLS (b: boolean = true): SESReceiptRule {
    this.Properties.Rule.TlsPolicy = b ? 'Require' : 'Optional'
    return this
  }

  /**
   *
   */
  linktoRuleSet (i: IStrRefGetAtt | SESReceiptRuleSet): SESReceiptRule {
    if (i instanceof SESReceiptRuleSet) {
      this.Properties.RuleSetName = { Ref: i.name }
    } else {
      this.Properties.RuleSetName = i
    }
    return this
  }

  /**
   * @param i - Accepts variadic input -.
   * @see <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptrule.html#cfn-ses-receiptrule-rule>
   */
  actions (...i: ISESReceiptRule_min_actions[]): SESReceiptRule {
    this.Properties.Rule.Actions = this.__actions(...i)
    // return new SESReceiptRule({ ...this._inputs, actions: i })
    return this
  }

  Ref (): IRef {
    return { Ref: this.name }
  }

  /**
   *
   * @description transform function from min to official aws RecieptRule Action
   * @param i - Variadic action_min objects.
   * @example
   * const outboudnAction1 = __actions( {s3:{bucket:'bk1', prefix:'some/path/' , kmsKeyArn:'arn::AWS::example', topicArn:'arn::AWS::example'}} )
   * const outboudnAction2 = __actions( {lambda:{functionArn:'arn::AWS::example', type:'Event', topicArn:'arn::AWS::example'}} )
   * const outboudnAction3 = __actions( {sns:{enc:'UTF-8', topicArn:'arn::AWS::example'}},  {stop:{topicArn:'arn::AWS::example'}} )
   * const outboudnAction4 = __actions( {header:{name:'',value:''}}, {workmail:{org:'arn::AWS::example'}} )
   * const final = outboudnAction1.concat( outboudnAction2, outboudnAction3, outboudnAction4 )
   */
  __actions (...i: ISESReceiptRule_min_actions[]): ISESReceiptRule_Actions[] {
    return i.map(elem => {
      if ('bounce' in elem) {
        return {
          BounceAction: {
            Message: elem.bounce.msg,
            Sender: elem.bounce.sender,
            SmtpReplyCode: elem.bounce.smtpcode.join(''),
            ...(elem.bounce.smtpstatus
              ? { StatusCode: elem.bounce.smtpstatus.join('').toString() }
              : {}),
            ...(elem.bounce.topicArn ? { TopicArn: elem.bounce.topicArn } : {})
          } as ISESReceiptRule_Action_Bounce
        } as ISESReceiptRule_Actions
      } else if ('s3' in elem) {
        return {
          S3Action: {
            BucketName: elem.s3.bucket,
            ...(elem.s3.kmsKeyArn ? { KmsKeyArn: elem.s3.kmsKeyArn } : {}),
            ...(elem.s3.prefix ? { ObjectKeyPrefix: elem.s3.prefix } : {}),
            ...(elem.s3.topicArn ? { TopicArn: elem.s3.topicArn } : {})
          } as ISESReceiptRule_Action_S3
        } as ISESReceiptRule_Actions
      } else if ('stop' in elem) {
        return {
          StopAction: {
            ...(elem.stop.scope ? { Scope: elem.stop.scope } : { Scope: 'RuleSet' }),
            ...(elem.stop.topicArn ? { TopicArn: elem.stop.topicArn } : {})
          } as ISESReceiptRule_Action_Stop
        } as ISESReceiptRule_Actions
      } else if ('sns' in elem) {
        return {
          SNSAction: {
            ...(elem.sns.enc ? { Encoding: elem.sns.enc } : { Encoding: 'UTF-8' }),
            ...(elem.sns.topicArn ? { TopicArn: elem.sns.topicArn } : {})
          } as ISESReceiptRule_Action_SNS
        } as ISESReceiptRule_Actions
      } else if ('workmail' in elem) {
        return {
          WorkmailAction: {
            OrganizationArn: elem.workmail.orgArn,
            ...(elem.workmail.topicArn ? { TopicArn: elem.workmail.topicArn } : {})
          } as ISESReceiptRule_Action_Workmail
        } as ISESReceiptRule_Actions
      } else if ('header' in elem) {
        return {
          AddHeaderAction: {
            HeaderName: elem.header.name,
            HeaderValue: elem.header.value
          } as ISESReceiptRule_Action_Header
        } as ISESReceiptRule_Actions
      } else if ('lambda' in elem) {
        return {
          LambdaAction: {
            FunctionArn: elem.lambda.functionArn,
            ...(elem.lambda.type
              ? { InvocationType: elem.lambda.type }
              : { InvocationType: 'Event' }),
            ...(elem.lambda.topicArn ? { TopicArn: elem.lambda.topicArn } : {})
          } as ISESReceiptRule_Action_Lambda
        } as ISESReceiptRule_Actions
      } else {
        throw new Error('the objects passed in must be of type: ISESReceiptRule_min_actions ')
      }
    })
  }
}

// #region interfaces
export interface ISESReceiptRule_min {
  name?: string
  ruleSetName?: IStrRefGetAtt // upstream parent object
  after?: IRef // insert after within the upstream parent
  rulename?: IStrRefGetAtt
  enabled?: boolean
  scan?: boolean
  recipients?: IStrRefGetAtt[]
  useTls?: boolean
  actions?: ISESReceiptRule_min_actions[]
}

type ISESReceiptRule_min_actions =
  | { bounce: ISESReceiptRule_Action_Bounce_min }
  | { s3: ISESReceiptRule_Action_S3_min }
  | { stop: ISESReceiptRule_Action_Stop_min }
  | { sns: ISESReceiptRule_Action_SNS_min }
  | { workmail: ISESReceiptRule_Action_Workmail_min }
  | { header: ISESReceiptRule_Action_Header_min }
  | { lambda: ISESReceiptRule_Action_Lambda_min }

interface ISESReceiptRule_Action_Bounce_min {
  sender: IStrRefGetAtt
  msg: IStrRefGetAtt
  smtpcode: ThreeDigitCode
  topicArn?: IStrRefGetAtt
  smtpstatus?: ThreeDigitCode
}
interface ISESReceiptRule_Action_S3_min {
  bucket: IStrRefGetAtt
  prefix?: IStrRefGetAtt
  kmsKeyArn?: IStrRefGetAtt
  topicArn?: IStrRefGetAtt // usually mail persisted to mailroom
}
interface ISESReceiptRule_Action_Stop_min {
  scope?: 'RuleSet'
  topicArn?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_SNS_min {
  topicArn?: IStrRefGetAtt
  enc?: 'Base64' | 'UTF-8' // UTF8 is default
}
interface ISESReceiptRule_Action_Workmail_min {
  orgArn: IStrRefGetAtt // not usallly required to use as Workmail add this on its own
  topicArn?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Header_min {
  name: IStrRefGetAtt
  value: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Lambda_min {
  functionArn: IStrRefGetAtt
  topicArn?: IStrRefGetAtt
  type?: 'Event' | 'RequestResponse' // default is event
}

export type ISESReceiptRule_Actions =
  | { BounceAction: ISESReceiptRule_Action_Bounce }
  | { S3Action: ISESReceiptRule_Action_S3 }
  | { StopAction: ISESReceiptRule_Action_Stop }
  | { SNSAction: ISESReceiptRule_Action_SNS }
  | { WorkmailAction: ISESReceiptRule_Action_Workmail }
  | { AddHeaderAction: ISESReceiptRule_Action_Header }
  | { LambdaAction: ISESReceiptRule_Action_Lambda }

interface ISESReceiptRule_Action_Bounce {
  Sender: IStrRefGetAtt
  SmtpReplyCode: IStrRefGetAtt
  Message: IStrRefGetAtt
  TopicArn?: IStrRefGetAtt
  StatusCode?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_S3 {
  BucketName: IStrRefGetAtt
  KmsKeyArn?: IStrRefGetAtt
  TopicArn?: IStrRefGetAtt
  ObjectKeyPrefix?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Stop {
  Scope: 'RuleSet'
  TopicArn?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_SNS {
  TopicArn?: IStrRefGetAtt
  Encoding?: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Workmail {
  TopicArn?: IStrRefGetAtt
  OrganizationArn: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Header {
  HeaderValue: IStrRefGetAtt
  HeaderName: IStrRefGetAtt
}
interface ISESReceiptRule_Action_Lambda {
  FunctionArn: IStrRefGetAtt
  TopicArn?: IStrRefGetAtt
  InvocationType?: IStrRefGetAtt
}

interface ISESReceiptRule_props {
  RuleSetName: IStrRefGetAtt
  After?: IStrRefGetAtt
  Rule: {
    Name?: IStrRefGetAtt
    ScanEnabled?: boolean
    Enabled?: boolean
    Recipients?: IStrRefGetAtt[]
    TlsPolicy?: 'Optional' | 'Require'
    Actions?: ISESReceiptRule_Actions[]
  }
}

interface ISESReceiptRule_json {
  [name: string]: {
    Type: 'AWS::SES::ReceiptRule'
    Properties: ISESReceiptRule_props
  }
}

type ThreeDigitCode = [number, number, number]

// #endregion interfaces
