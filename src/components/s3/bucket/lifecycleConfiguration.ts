import { TagFilters, OutTags, InTags } from './tags'

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
export const lifecycleConfig = (
  rules: IlifecycleValidRules | IlifecycleValidRules[]
): ILifecycleConfig => {
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
 * @param rule -
 * @param rule.status -
 * @param rule.id -
 * @param rule.prefix -
 * @param rule.tagList - .
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html>
 * @todo Add more validations to cover the covariance requirements on input variable -namely choose a unit and stick with it
 * @example
 *  var rulesA = lifecyleRule({opt:1})
 *  var rulesB = lifecyleRule([{opt:1},{opt:1}])
 */
export const lifecyleRule = (rule: IlifecycleRule): ILifecycleValid => {
  const { status, id, prefix, tagList, ...inRuleConfig } = {
    status: true,
    id: null,
    prefix: null,
    tagList: null,
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

  const ruleConfig = inRuleConfig as IlifecycleValidRules
  const ret: ILifecycleValid = tagList
    ? {
      Status: status ? 'Enabled' : 'Disabled',
      ...transformtoAWSfmt(ruleConfig),
      ...TagFilters(tagList)
    }
    : {
      Status: status ? 'Enabled' : 'Disabled',
      ...transformtoAWSfmt(ruleConfig)
    }

  if (id) ret['Id'] = id
  if (prefix) ret['Prefix'] = prefix
  return ret
}

/**
 * Title.
 *
 * @description descrip.
 * @param input -
 * @param input.quiteMultipartsAfterDays -
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
    NoncurrentVersionTransitions: transitionList.map((v: IlifecycleRuleMoveOldVersionsItem) => ({
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

  let ret: ILifecycleTransitionItem
  return {
    Transitions: transitionList.map(
      (v: IlifecycleRuleTransitionItem_wDate | IlifecycleRuleTransitionItem_wDays) => {
        if (v.atDate) {
          const complierHelp = v as IlifecycleRuleTransitionItem_wDate
          ret = {
            StorageClass: complierHelp.storage,
            TransitionDate: complierHelp.atDate
          }
        } else {
          const complierHelp = v as IlifecycleRuleTransitionItem_wDays
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

/**
 * Title.
 *
 * @description asd.
 * @param input
 * @example
 * var awsFormated = transformtoAWSfmt({ ruleName:"ExpirationInDays", expiryDays: 42 })
 */
const transformtoAWSfmt = (input: IlifecycleValidRules): any => {
  /**
   * Condtion Options:
   * 1. { quitMultipartsAfterDays: Number }
   * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
   * 3. { expiryDays: Number }
   * 4. { keepOldVersionForDays: Number }
   * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
   * 6. { transitions: [{storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}] }
   */

  if ('quitMultipartsAfterDays' in input) {
    return conditionAbortIncompleteMultipartUpload(input)
  } else if ('expiryDays' in input) {
    return conditionExpirationInDays(input)
  } else if ('expiryDate' in input) {
    return conditionExpirationDate(input)
  } else if ('keepOldVersionForDays' in input) {
    return conditionNoncurrentVersionExpirationInDays(input)
  } else if ('moveOldVersionRules' in input) {
    return conditionNoncurrentVersionTransitions(input)
  } else if ('transitions' in input) {
    return conditionTransitions(input)
  }
  // compiler needs to guarentee we never reach here
  // other wise we have an unreturned/void function
}

// @todo: make some mermaid diagram for these types
// this module has a lot of intractable type complexity
// as much as is reasonable - types should represent shapes - not meta-meta-logic
// this one makes it hard

export interface IlifecycleRule {
  id?: string
  prefix?: string
  status?: boolean
  tagList?: InTags | InTags[]
}

export interface IlifecycleRuleMoveOldVersionsItem {
  // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule-noncurrentversiontransition.html
  storage: string
  daysTillSlowDown: number
}

export interface IlifecycleRuleTransitionItem_wDays {
  storage: string
  daysTillSlowDown: number
  atDate?: never
}

export type IInRuleTransitions = IInRuleTransitionsDated | IInRuleTransitionsDurationed

export interface IlifecycleRuleTransitionItem_wDate {
  storage: string
  atDate: string
  daysTillSlowDown?: never
}

export interface IInRuleMultipartAbort extends IlifecycleRule {
  quitMultipartsAfterDays: number
}

export interface IInRuleExpiryDate extends IlifecycleRule {
  expiryDate?: string
}

export interface IInRuleExpirationDays extends IlifecycleRule {
  expiryDays: number
}

export interface IInRuleMoveOldVersionsAfterDays extends IlifecycleRule {
  keepOldVersionForDays?: number
}

export interface IInRuleMoveOldVersions extends IlifecycleRule {
  moveOldVersionRules: IlifecycleRuleMoveOldVersionsItem | IlifecycleRuleMoveOldVersionsItem[]
}

export interface IInRuleTransitionsDurationed extends IlifecycleRule {
  transitions: IlifecycleRuleTransitionItem_wDays | IlifecycleRuleTransitionItem_wDays[]
}

export interface IInRuleTransitionsDated extends IlifecycleRule {
  transitions: IlifecycleRuleTransitionItem_wDate | IlifecycleRuleTransitionItem_wDate[]
}

// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig-rule.html
export type IlifecycleValidRules =
  | IInRuleMultipartAbort
  | IInRuleExpirationDays
  | IInRuleMoveOldVersions
  | IInRuleExpiryDate
  | IInRuleTransitions
  | IInRuleMoveOldVersionsAfterDays

/*******
 * inbound Interfaces ⬆︎
 *
 * Outbound Interfaces ⬇
 ********/

export type ILifecycleValid =
  | ILifecycleMultiPartCancel
  | ILifecycleExpirationDate
  | ILifecycleExpirationInDays
  | ILifecycleNoncurrentVer
  | ILifecycleNonCurrentTrans
  | ILifecycleTransitions

export interface ILifecycleMoveOldVersionsItem {
  StorageClass: string
  TransitionInDays: number
}

export interface ILifecycleTransitionItem {
  StorageClass: string
  TransitionDate?: string
  TransitionInDays?: number
}

export interface ILifecycleMultiPartCancel extends ILifecycleItem {
  AbortIncompleteMultipartUpload: {
    DaysAfterInitiation: number
  }
}
export interface ILifecycleExpirationDate extends ILifecycleItem {
  ExpirationDate: string
}
export interface ILifecycleExpirationInDays extends ILifecycleItem {
  ExpirationInDays: number
}
export interface ILifecycleNoncurrentVer extends ILifecycleItem {
  NoncurrentVersionExpirationInDays?: number
}
export interface ILifecycleNonCurrentTrans extends ILifecycleItem {
  NoncurrentVersionTransitions: ILifecycleMoveOldVersionsItem[]
}
export interface ILifecycleTransitions extends ILifecycleItem {
  Transitions: ILifecycleTransitionItem[]
}
export interface ILifecycleItem {
  Status: 'Enabled' | 'Disabled'
  Id?: string
  Prefix?: string
  TagFilters?: OutTags
}

export interface ILifecycleConfig {
  LifecycleConfiguration: { Rules: ILifecycleItem[] }
}
