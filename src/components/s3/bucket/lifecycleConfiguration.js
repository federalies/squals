import { tags } from './tags'

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
 * @param {inRule | Array<inRule>} rules -
 * @returns {Object} -
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-lifecycleconfig.html>
 * @example
 *  var lifeCycle1 = lifecycleConfig({})
 *  var lifeCycle2 = lifecycleConfig([{},{}])
 */
const lifecycleConfig = rules => {
  return Array.isArray(rules)
    ? {
      LifecycleConfiguration: {
        Rules: rules.map(item => lifecyleRule(item))
      }
    }
    : {
      LifecycleConfiguration: {
        Rules: [lifecyleRule(rules)]
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
 * @todo Add more validations to cover the covariance requirements on input variable
 * @example
 *  var rulesA = lifecyleRule({opt:1})
 *  var rulesB = lifecyleRule([{opt:1},{opt:1}])
 */
const lifecyleRule = rule => {
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
   * 1. { quiteMultipartsAfterDays: Number }
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
   *
   *
   * Do NOTE:
   * c = conditions
   * o = options
   */

  const ret = {
    Status: status ? 'Enabled' : 'Disabled',
    ...transformtoAWSfmt(inRuleConfig)
  }
  if (id) ret['Id'] = id
  if (prefix) ret['Prefix'] = prefix
  if (tagList.length > 0) ret['TagFilters'] = tags(tagList)
  return ret
}

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
const conditionAbortIncompleteMultipartUpload = ({
  quiteMultipartsAfterDays
}) => {
  return {
    AbortIncompleteMultipartUpload: {
      DaysAfterInitiation: quiteMultipartsAfterDays
    }
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!string} input.expiryDate -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionExpirationDate()
 */
const conditionExpirationDate = ({ expiryDate }) => {
  return { ExpirationDate: expiryDate }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.expiryDays -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionExpirationInDays()
 */
const conditionExpirationInDays = ({ expiryDays }) => {
  return { ExpirationInDays: expiryDays }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Object} input -
 * @param {!number} input.keepOldVersionForDays -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionExpirationInDays()
 */
const conditionNoncurrentVersionExpirationInDays = ({
  keepOldVersionForDays
}) => {
  return { NoncurrentVersionExpirationInDays: keepOldVersionForDays }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Array<{storage:?string, daysTillSlowDown:!number}>} trans -
 * @returns {Object} Cloudformation S3:: property.
 * @example
 * var v = conditionNoncurrentVersionTransitions()
 */
const conditionNoncurrentVersionTransitions = trans => {
  return {
    NoncurrentVersionTransitions: trans.map(v => ({
      StorageClass: v.storage,
      TransitionInDays: v.daysTillSlowDown
    }))
  }
}

/**
 * Title.
 *
 * @description descrip.
 * @param {Array<inTransitionItem>} trans -
 * @returns {Object} Cloudformation S3::AbortIncompleteMultipartUpload property.
 * @example
 * var v = conditionTransitions()
 */
const conditionTransitions = trans => {
  return {
    Transitions: trans.map(v => {
      const ret = { StorageClass: v.storage }
      if (v.atDate) ret['TransitionDate'] = v.atDate
      if (v.daysTillSlowDown) ret['TransitionInDays'] = v.daysTillSlowDown
      return ret
    })
  }
}
const transformtoAWSfmt = input => {
  /**
   * Condtion Options:
   * 1. { quiteMultipartsAfterDays: Number }
   * 2. { expiryDate: "YYYY-MM-DD" } // isoDate
   * 3. { expiryDays: Number }
   * 4. { keepOldVersionForDays: Number }
   * 5. { moveOldVersion: [{ storage:"type1", daysTillslowdown:Number },{ storage:"type1", daysTillslowdown:Number }] } // options({storage:['STANDARD_IA', 'GLACIER', 'INTELLIGENT_TIERING','ONEZONE_IA']}
   * 6. { transitions: [{storage: "class1", atDate:"YYYY-MM-DD", daysTillslowdown:Number}] }
   */

  if (input.quiteMultipartsAfterDays) {
    return conditionAbortIncompleteMultipartUpload(input)
  } else if (input.expiryDate) {
    return conditionExpirationDate(input)
  } else if (input.expiryDays) {
    return conditionExpirationInDays(input)
  } else if (input.keepOldVersionForDays) {
    return conditionNoncurrentVersionExpirationInDays(input)
  } else if (input.moveOldVersion) {
    // the next two (with transition conditions) expect arrays
    return conditionNoncurrentVersionTransitions(input.moveOldVersion)
  } else if (input.transitions) {
    return conditionTransitions(input.transitions)
  } else {
    return new Error('poorly formed inputs in the lifecycleConfig function')
  }
}

/**
 * @typedef inMoveOldVersionsItem
 * @type {Object}
 * @property {!string} storage - The storage class to which you want the object to transition, such as GLACIER. For valid values, see the StorageClass request element of the PUT Bucket lifecycle action in the Amazon Simple Storage Service API Reference.
 * @property {!number} daysTillSlowDown - The number of days between the time that a new version of the object is uploaded to the bucket and when old versions of the object are transitioned to the specified storage class.
 */

/**
 * @typedef inRuleMoveOldVersions
 * @type {Object}
 * @property {*} moveOldVersion - For buckets with versioning enabled (or suspended), one or more transition rules that specify when non-current objects transition to a specified storage class. If you specify a transition and expiration time, the expiration time must be later than the transition time. If you specify this property, don't specify the NoncurrentVersionTransition property
 */

/**
 * @typedef outMoveOldVersionsItem
 * @type {Object}
 * @property {!string} StorageClass - The storage class to which you want the object to transition, such as GLACIER. For valid values, see the StorageClass request element of the PUT Bucket lifecycle action in the Amazon Simple Storage Service API Reference.
 * @property {!number} TransitionInDays - The number of days between the time that a new version of the object is uploaded to the bucket and when old versions of the object are transitioned to the specified storage class.
 */

/**
 * @typedef inTransitionItem
 * @type {Object}
 * @property {!string} storage - The storage class to which you want the object to transition, such as GLACIER.
 * @property {?string} atDate - Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.
 * @property {?number} daysTillSlowDown - Indicates the number of days after creation when objects are transitioned to the specified storage class.
 */

/**
 * @typedef outTransitionItem
 * @type {Object}
 * @property {!string} StorageClass - The storage class to which you want the object to transition, such as GLACIER.
 * @property {?string} TransitionDate - Indicates when objects are transitioned to the specified storage class. The date value must be in ISO 8601 format. The time is always midnight UTC.
 * @property {?number} TransitionInDays - Indicates the number of days after creation when objects are transitioned to the specified storage class.
 */

/**
 * @typedef inRule
 * @type {Object}
 * @property {?string} id - A unique identifier for this rule. The value cannot be more than 255 characters.
 * @property {?string} prefix - Object key prefix that identifies one or more objects to which this rule applies.
 * @property {?boolean} [status=true] - [Enabled | Disabled] Specify either Enabled or Disabled. If you specify Enabled, Amazon S3 executes this rule as scheduled. If you specify Disabled, Amazon S3 ignores this rule.
 * @property {?Array} tagList - Tags to use to identify a subset of objects to which the lifecycle rule applies.
 * @property {?number} expiryDays - Indicates the number of days after creation when objects are deleted from Amazon S3 and Glacier. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.
 * @property {?string} expiryDate - Indicates when objects are deleted from Amazon S3 and Glacier. The date value must be in ISO 8601 format. The time is always midnight UTC. If you specify an expiration and transition time, you must use the same time unit for both properties (either in days or by date). The expiration time must also be later than the transition time.
 * @property {?number} keepOldVersionForDays - For buckets with versioning enabled (or suspended), specifies the time, in days, between when a new version of the object is uploaded to the bucket and when old versions of the object expire. When object versions expire, Amazon S3 permanently deletes them. If you specify a transition and expiration time, the expiration time must be later than the transition time.
 * @property {?number} quiteMultipartsAfterDays - Specifies a lifecycle rule that aborts incomplete multipart uploads to an Amazon S3 bucket.
 * @property {?inRuleMoveOldVersions|?Array<inRuleMoveOldVersions>} moveOldVersion -
 * @property {?inTransitionItem | ?Array<inTransitionItem>} transitions -
 */

/**
 * @typedef outRule
 * @type {Object}
 * @property {?string} Id - A unique identifier for this rule. The value cannot be more than 255 characters.
 * @property {?string} Prefix - Object key prefix that identifies one or more objects to which this rule applies.
 * @property {?string} Status - [Enabled | Disabled] Specify either Enabled or Disabled. If you specify Enabled, Amazon S3 executes this rule as scheduled. If you specify Disabled, Amazon S3 ignores this rule.
 * @property {?Array} TagFilters - Tags to use to identify a subset of objects to which the lifecycle rule applies.
 * @property {?number} ExpirationInDays
 * @property {?string} ExpirationDate -
 * @property {?number} NoncurrentVersionExpirationInDays -
 * @property {?Object} AbortIncompleteMultipartUpload -
 * @property {?Array<outMoveOldVersionsItem>} NoncurrentVersionTransitions -
 * @property {?Array<outTransitionItem>} Transitions -
 */

// const log = data => console.log(JSON.stringify(data, null, 2))
// log(lifecyleRule({}))

export { lifecycleConfig, lifecyleRule }
