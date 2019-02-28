import { tags } from './tags'

/**
 * Title.
 *
 * @description description.
 * @param {Object} firstRule - Asd.
 * @param {Array} firstRule.c - Asd.
 * @param {Object} firstRule.o - Asd.
 * @param {Object} firstRule.c - Asd.
 * @param {number} firstRule.c.quiteMultipartsAfterDays - Asd.
 * @param {string} firstRule.c.expiryDate - Asd.
 * @param {number} firstRule.c.expiryDays - Asd.
 * @param {number} firstRule.c.keepOldVersionForDays - Asd.
 * @param {Array<Object>} firstRule.c.moveOldVersion - Asd.
 * @param {Array<Object>} firstRule.c.transitions - Asd.
 * @param {Array} moreRules - Asd.
 * @returns {Object} - Asd.
 * @example
 *  var lifeCycle1 = lifecycleConfig([[{someCondition:1}]])
 *  var lifeCycle2 = lifecycleConfig([[{someCondition:1}, {prefix:'pre'}]])
 */
const lifecycleConfig = (firstRule, moreRules = []) => {
  if (Array.isArray(moreRules)) {
    const inputRuleTuples = [firstRule, ...moreRules]

    return {
      LifecycleConfiguration: {
        Rules: lifecyleRule(inputRuleTuples)
      }
    }
  } else {
    console.error(
      `lifecycleConfig function was expecting otherRules to be an array`
    )
  }
}

/**
 *
 * @param {Array<Object>} conditions - Asdf.
 * @param {Object} opts - Asdf.
 * @param {boolean} [opts.status=true] - Asdf.
 * @param {string} opts.id - Asdf.
 * @param {string} opts.prefix - Asdf.
 * @param {Array<Object>} opts.tagList - Asdf.} param0
 */

/**
 * Title.
 *
 * @description description.
 * @param {Array<{c:Array,o:Object}>} rules - Where C = conditions and O = options.
 * @returns {Array} - Asd.
 * @example
 *  var rulesA = lifecyleRule([{opt:1}])
 *  var rulesB = lifecyleRule([{opt:1}], {status:true})
 */
const lifecyleRule = rules => {
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

  //   log({ rules })

  return rules.map(({ c, o }) => {
    const { status, id, prefix, tagList } = {
      status: true,
      id: null,
      prefix: null,
      tagList: [],
      ...o
    }

    // log({ c, o, status, id, prefix, tagList })

    const r = c.reduce((p, v) => {
      return { ...p, ...transformtoAWSfmt(v) }
    }, {})
    const ret = {
      ...r,
      Status: status ? 'Enabled' : 'Disabled'
    }
    if (id) ret['Id'] = id
    if (prefix) ret['Prefix'] = prefix
    if (tagList.length > 0) ret['TagFilters'] = tags(tagList)
    return ret
  })
}

const conditionAbortIncompleteMultipartUpload = ({
  quiteMultipartsAfterDays
}) => {
  return {
    AbortIncompleteMultipartUpload: {
      DaysAfterInitiation: quiteMultipartsAfterDays
    }
  }
}

const conditionExpirationDate = ({ expiryDate }) => {
  return { ExpirationDate: expiryDate }
}

const conditionExpirationInDays = ({ expiryDays }) => {
  return { ExpirationInDays: expiryDays }
}

const conditionNoncurrentVersionExpirationInDays = ({
  keepOldVersionForDays
}) => {
  return { NoncurrentVersionExpirationInDays: keepOldVersionForDays }
}

const conditionNoncurrentVersionTransitions = trans => {
  return {
    NoncurrentVersionTransitions: trans.map(v => ({
      StorageClass: v.storage,
      TransitionInDays: v.daysTillslowdown
    }))
  }
}
const conditionTransitions = trans => {
  return {
    Transitions: trans.map(v => {
      const ret = { StorageClass: v.storage }
      if (v.atDate) ret['TransitionDate'] = v.atDate
      if (v.daysTillslowdown) ret['TransitionInDays'] = v.daysTillslowdown
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

export { lifecycleConfig, lifecyleRule }
