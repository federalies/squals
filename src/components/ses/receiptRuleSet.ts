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
import { ISESReceiptRule_min, SESReceiptRule } from './receiptRule'
// import { cloneDeep } from 'lodash-es'

/**
 * @description hacky object clone - that does not like dates
 * @param input
 * @techdebt
 */
const cloneDeep = function<T> (input: T): T {
  // warning this is because
  // I can not figure out the tsconfig
  // so that jest/ts-node/ and lodash can all play nice
  //
  // WARNING
  // this kills dates, methods, and other things I bet
  return JSON.parse(JSON.stringify(input)) as T
}

export class SESReceiptRuleSet implements squals {
  name: string
  Type = 'AWS::SES::ReceiptRuleSet'
  Properties: ISESReceiptRuleSet_props
  private _linkedRules = [] as SESReceiptRule[]

  constructor (i: ISESReceiptRuleSet_min) {
    this.name = genComponentName(i.name)
    this.Properties = {}
    // finish the constructor
  }

  static fromString (s: string): SESReceiptRuleSet {
    return SESReceiptRuleSet.validate(JSON.parse(s))
  }

  static fromJSON (i: object): SESReceiptRuleSet {
    return SESReceiptRuleSet.validateJSON(i as ISESReceiptRuleSet_json)
  }

  static fromJS (i: object): SESReceiptRuleSet {
    return SESReceiptRuleSet.validateJS(i as ISESReceiptRuleSet_min)
  }

  static from (i: string | object): SESReceiptRuleSet {
    return SESReceiptRuleSet.validate(i)
  }

  static validate (i: string | object): SESReceiptRuleSet {
    return validatorGeneric<SESReceiptRuleSet>(i as squals, SESReceiptRuleSet)
  }

  static validateJS (i: ISESReceiptRuleSet_min): SESReceiptRuleSet {
    // validation logic here
    return new SESReceiptRuleSet(i)
  }

  static validateJSON (i: ISESReceiptRuleSet_json): SESReceiptRuleSet {
    // validation logic here then...
    const ret = new SESReceiptRuleSet({})
    ret.name = Object.keys(i)[0]
    ret.Properties = i[ret.name].Properties
    return ret
  }

  /**
   * @description standard to JSON output
   */
  toJSON () {
    return {
      [this.name]: {
        Type: 'AWS::SES::ReceiptRuleSet',
        Properties: this.Properties
      }
    }
  }

  /**
   * @description this has a _linked data set so to get it out - use the toJsonCollection, data comes in via `linkRules`
   *
   */
  toJsonCollection (): object[] {
    return [this.toJSON(), ...this._linkedRules.map(i => i.toJSON())]
  }

  /**
   * @param i
   * @see: <http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ses-receiptruleset.html#cfn-ses-receiptruleset-rulesetname>
   */
  ruleSetName (i: IStrRefGetAtt): SESReceiptRuleSet {
    this.Properties.RuleSetName = i
    return this
  }

  _name (s: string): SESReceiptRuleSet {
    this.name = s
    return this
  }

  /**
   *
   * @param i - Is either an SESRule Input or preconstructed Rule.
   */
  linkRules (...i: (ISESReceiptRule_min | SESReceiptRule)[]): SESReceiptRuleSet {
    this._linkedRules = i.map(v => {
      return v instanceof SESReceiptRule
        ? cloneDeep(v).linktoRuleSet(this.Ref()) // do not change state of i (which becaomes v)
        : new SESReceiptRule(v).linktoRuleSet(this.Ref())
    })
    return this
  }

  Ref (): IRef {
    return { Ref: this.name }
  }
}

// # region interfaces
interface ISESReceiptRuleSet_min {
  name?: string
  ruleSetName?: IStrRefGetAtt
}

interface ISESReceiptRuleSet_props {
  RuleSetName?: IStrRefGetAtt
}

interface ISESReceiptRuleSet_json {
  [name: string]: {
    Type: 'AWS::SES::ReceiptRuleSet'
    Properties: ISESReceiptRuleSet_props
  }
}
// # endregion interfaces
