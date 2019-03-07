import { TagFilters, tags, OutTags, InTags } from './tags'

/** @module S3Bucket */

/**
 * @typeDef outLifecycleConfig
 * @type {Object}
 * @property {Object} LifecycleConfiguration - asd
 * @property {Array<outRule>} LifecycleConfiguration.Rules - asd
 */

/**
 * Config the Lifecycle Rules.
 *
 * @description  Collection of S3 Bucket Rules that govern the process of fading to longterm/cold storage
 * @param rules -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig.html>
 * @example
 *  var lifeCycle1 = lifecycleConfig({})
 *  var lifeCycle2 = lifecycleConfig([{},{}])
 */
const lifecycleConfig = (rules: InRule | InRule[]): OutLifecycleConfig => {
  rules = Array.isArray(rules) ? rules : new Array(rules)
  return {
    LifecycleConfiguration: {
      Rules: rules.map(item => lifecyleRule(item))
    }
  }
}

/**
 * Title.
 *
 * @description description.
 * @param {Object<string, boolean|string|Array<string>>} rule -
 * @param {?boolean} [rule.status] -
 * @param {?string} [rule.id] -
 * @param {?string} [rule.prefix] -
 * @param {?Array<{string:string}>} [rule.tagList]-.
 * @returns {Object} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html>
 * @todo Add more validations to cover the covariance requirements on input variable -namely choose a unit and stick with it
 * @example
 *  var rulesA = lifecyleRule({opt:1})
 *  var rulesB = lifecyleRule([{opt:1},{opt:1}])
 */
const lifecyleRule = (rule: InRule): OutValidLifeCycleRule => {
  const { status, id, prefix, tagList, ...inRuleConfig } = {
    status: true,
    id: null,
    prefix: null,
    tagList: [],
    ...rule
  }

  /**
   * At least ONE of is required
   * 1. AbortIncompleteMultipartUpload
   * 2. ExpirationDate
   * 3. ExpirationInDays
   * 4. NoncurrentVersionExpirationInDays
   * 5. NoncurrentVersionTransitions
   * 6. Transitions.
   *
   * Condtion Options:
   * 1. { quitMultipartsAfterDays: Number }
   * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
   * 3. { expiryDays: Number }
   * 4. { keepOldVersionForDays: Number }
   * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
   * 6. { transitions: {storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}}
   *
   * More Constraints:
   * 1. use relative dates "daysFromCreated" or absoluteDates and stick to it
   * 2. lifecycle options can only reduce availability of objects
   * 3. Don't use 'transition' if you are using - 'expiryDays'|'keepOldVersionForDays'
   */

  const ruleConfig = inRuleConfig as IInAlllValidInRules
  const ret: OutValidLifeCycleRule = {
    Status: status ? 'Enabled' : 'Disabled',
    ...transformtoAWSfmt(ruleConfig),
    ...TagFilters(tagList)
  }
  if (id) ret['Id'] = id
  if (prefix) ret['Prefix'] = prefix
  return ret
}

/*
 * "Type '{
      Status: \"Enabled\" | \"Disabled\";
      TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
    }
   | {
     TagFilters: OutTags[];
     ExpirationDate: string | undefined;
     Status: \"Enabled\" | \"Disabled\";
    }
    | ... 4 more ... | { ...; }'

    is not assignable to type 'OutValidLifeCycleRule'.

    Type '{ TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
      Status: \"Enabled\" | \"Disabled\"; }' is not assignable to type 'OutValidLifeCycleRule'.

    Type '{ TagFilters: OutTags[];
      AbortIncompleteMultipartUpload: { DaysAfterInitiation: number; };
      Status: \"Enabled\" | \"Disabled\"; }' is not assignable to type 'OutMultiPartCancel'

      Types of property 'TagFilters' are incompatible.\n

      Type 'OutTags[]' is missing the following properties from type 'OutTags': Key, Value",
 *
 */

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.quiteMultipartsAfterDays -
 * @returns {Object} Cloudformation S3::AbortIncompleteMultipartUpload property.
 * @example
 * var v = conditionAbortIncompleteMultipartUpload()
 */
const conditionAbortIncompleteMultipartUpload = (params: IInRuleMultipartAbort) => {
  const { quitMultipartsAfterDays } = params
  return {
    AbortIncompleteMultipartUpload: {
      DaysAfterInitiation: quitMultipartsAfterDays
    }
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.expiryDate -
 * @example
 * var v = conditionExpirationDate()
 */
const conditionExpirationDate = (params: IInRuleExpiryDate) => {
  const { expiryDate } = params
  return { ExpirationDate: expiryDate }
}

/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.expiryDays -
 * @example
 * var v = conditionExpirationInDays()
 */
const conditionExpirationInDays = (params: IInRuleExpirationDays) => {
  const { expiryDays } = params
  return { ExpirationInDays: expiryDays }
}

/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.keepOldVersionForDays -
 * @returns Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionExpirationInDays()
 */
const conditionNoncurrentVersionExpirationInDays = (params: IInRuleMoveOldVersionsAfterDays) => {
  const { keepOldVersionForDays } = params
  return { NoncurrentVersionExpirationInDays: keepOldVersionForDays }
}

/**
 * Title.
 *
 * @description descrip.
 * @param  trans -
 * @example
 * var v = conditionNoncurrentVersionTransitions()
 */
const conditionNoncurrentVersionTransitions = (trans: IInRuleMoveOldVersions) => {
  const transitionList = Array.isArray(trans.moveOldVersionRules)
    ? trans.moveOldVersionRules
    : new Array(trans.moveOldVersionRules)

  return {
    NoncurrentVersionTransitions: transitionList.map((v: IInRuleMoveOldVersionsItem) => ({
      StorageClass: v.storage,
      TransitionInDays: v.daysTillSlowDown
    }))
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param trans - Param.
 * @example
 * var v = conditionTransitions()
 */
const conditionTransitions = (input: IInRuleTransitions) => {
  const transitionList = Array.isArray(input.transitions)
    ? input.transitions
    : new Array(input.transitions)

  let ret: OutTransitionItem
  return {
    Transitions: transitionList.map(
      (v: IInRuleTransitionItem_wDate | IInRuleTransitionItem_wDays) => {
        if (v.atDate) {
          const complierHelp = v as IInRuleTransitionItem_wDate
          ret = {
            StorageClass: complierHelp.storage,
            TransitionDate: complierHelp.atDate
          }
        } else {
          const complierHelp = v as IInRuleTransitionItem_wDays
          ret = {
            StorageClass: complierHelp.storage,
            TransitionInDays: complierHelp.daysTillSlowDown
          }
        }
        return ret
      }
    )
  }
}
const transformtoAWSfmt = (input: IInAlllValidInRules) => {
  /**
   * Condtion Options:
   * 1. { quitMultipartsAfterDays: Number }
   * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
   * 3. { expiryDays: Number }
   * 4. { keepOldVersionForDays: Number }
   * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
   * 6. { transitions: [{storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}] }
   */

  switch (input.ruleName) {
    case 'AbortIncompleteMultipartUpload':
      return conditionAbortIncompleteMultipartUpload(input)
    case 'ExpirationDate':
      return conditionExpirationDate(input)
    case 'ExpirationInDays':
      return conditionExpirationInDays(input)
    case 'NoncurrentVersionExpirationInDays':
      return conditionNoncurrentVersionExpirationInDays(input)
    case 'NoncurrentVersionTransitions':
      return conditionNoncurrentVersionTransitions(input)
    case 'Transitions':
      return conditionTransitions(input)
    default:
      let shouldNeverGetHere: never
      return new Error('poorly formed inputs in the lifecycleConfig function')
  }
}
interface IInRuleMoveOldVersionsItem {
  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule-noncurrentversiontransition.html
  storage: string
  daysTillSlowDown: number
}

interface IInRuleTransitionItem_wDays {
  storage: string
  atDate: never
  daysTillSlowDown: number
}

interface IInRuleTransitionItem_wDate {
  storage: string
  atDate: string
  daysTillSlowDown: never
}

// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html
type IInAlllValidInRules =
  | IInRuleMultipartAbort
  | IInRuleExpirationDays
  | IInRuleMoveOldVersions
  | IInRuleExpiryDate
  | IInRuleTransitions
  | IInRuleMoveOldVersionsAfterDays

interface IInRuleMultipartAbort extends InRule {
  readonly ruleName: 'AbortIncompleteMultipartUpload'
  quitMultipartsAfterDays: number
}

interface IInRuleExpiryDate extends InRule {
  readonly ruleName: 'ExpirationDate'
  expiryDate?: string
}

interface IInRuleExpirationDays extends InRule {
  readonly ruleName: 'ExpirationInDays'
  expiryDays: number
}

interface IInRuleMoveOldVersionsAfterDays extends InRule {
  readonly ruleName: 'NoncurrentVersionExpirationInDays'
  keepOldVersionForDays?: number
}

interface IInRuleMoveOldVersions extends InRule {
  readonly ruleName: 'NoncurrentVersionTransitions'
  moveOldVersionRules: IInRuleMoveOldVersionsItem | IInRuleMoveOldVersionsItem[]
}

type IInRuleTransitions = IInRuleTransitionsDated | IInRuleTransitionsDurationed

interface IInRuleTransitionsDated extends InRule {
  readonly ruleName: 'Transitions'
  transitions: IInRuleTransitionItem_wDays | IInRuleTransitionItem_wDays[]
}

interface IInRuleTransitionsDurationed extends InRule {
  readonly ruleName: 'Transitions'
  transitions: IInRuleTransitionItem_wDate | IInRuleTransitionItem_wDate[]
}

interface InRule {
  id?: string
  prefix?: string
  status?: boolean
  tagList?: InTags
}

interface OutMoveOldVersionsItem {
  StorageClass: string
  TransitionInDays: number
}

interface OutTransitionItem {
  StorageClass: string
  TransitionDate?: string
  TransitionInDays?: number
}

type OutValidLifeCycleRule =
  | OutMultiPartCancel
  | OutExpirationDate
  | OutExpirationInDays
  | OutNoncurrentVer
  | OutNonCurrentTrans
  | OutTransitions

interface OutMultiPartCancel extends OutLifecycleRule {
  AbortIncompleteMultipartUpload: {
    DaysAfterInitiation: number
  }
}
interface OutExpirationDate extends OutLifecycleRule {
  ExpirationDate: string
}
interface OutExpirationInDays extends OutLifecycleRule {
  ExpirationInDays: number
}
interface OutNoncurrentVer extends OutLifecycleRule {
  NoncurrentVersionExpirationInDays?: number
}
interface OutNonCurrentTrans extends OutLifecycleRule {
  NoncurrentVersionTransitions: OutMoveOldVersionsItem[]
}
interface OutTransitions extends OutLifecycleRule {
  Transitions: OutTransitionItem[]
}
interface OutLifecycleRule {
  Status: 'Enabled' | 'Disabled'
  Id?: string
  Prefix?: string
  TagFilters?: OutTags
}

interface OutLifecycleConfig {
  LifecycleConfiguration: { Rules: OutLifecycleRule[] }
}
export { lifecycleConfig, lifecyleRule }
