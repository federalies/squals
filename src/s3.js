import { isEmpty, intersection } from 'lodash-es'
import { validations, properties } from './validations/s3-validations.js'

export class S3BucketPolicy {
  constructor (props = {}) {
    this.a = { ...props }
  }
}

export class S3Bucket {
  constructor (props = {}) {
    this.Type = 'AWS::S3::Bucket'

    if (Object.keys(props).length > 0) {
      const validProps = Object.entries(props).reduce((a, [k, v]) => {
        return intersection(Object.keys(props), properties).includes(k)
          ? (a[k] = v)
          : a
      }, {})
      this.Properties = { ...validProps }
    }
  }

  toString (replacer = null, spaces = 2) {
    const printable = Object.entries(this).reduce((a, [k, v]) => {
      if (v && !isEmpty(v)) a[k] = v
      return a
    }, {})
    return JSON.stringify(printable, replacer, spaces)
  }

  validate () {
    const testStatusBuilder = (passing = true, msgAccum = {}) => {
      return (pass, addMsg) => {
        msgAccum = pass ? { ...msgAccum } : { ...msgAccum, ...addMsg }
        passing = passing && pass
        return {
          test: pass,
          allTestsPass: passing,
          failMsgs: msgAccum
        }
      }
    }
    const didTestPass = testStatusBuilder()

    const { allTestsPass, failMsgs } = validations(this).reduce((p, t) => {
      return didTestPass(t.test, t.msg)
    })
    return { passes: allTestsPass, failMsgs }
  }
}
