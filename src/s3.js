import { isEmpty, intersection } from 'lodash-es'
import { validations, properties } from './validations/s3-validations.js'

export class S3BucketPolicy {
  constructor (props = {}) {
    this.a = { ...props }
  }
}

/** Class representing a point. */
export class S3Bucket {
  /**
   * Create an S3Bucket.
   *
   * @description S3 Object maker
   * @param {Object} props - The properties config input object.
   * @param {string} props.BucketName - Is a way to set the created BucketName.
   * @param {string} props.AccessControl - Is a way to set the created BucketName.
   * @param {Object} props.AccelerateConfiguration - Is a way to set the created BucketName.
   * @param {Array} props.AnalyticsConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.BucketEncryption - Is a way to set the created BucketName.
   * @param {Array.<Object>} props.BucketEncryption.ServerSideEncryptionConfiguration - Specifies the server-side encryption by default configuration.
   * @param {Object} props.CorsConfiguration - Is a way to set the created BucketName.
   * @param {Array} props.CorsConfiguration.CorsRules - Is a way to set the created BucketName.
   * @param {Array} props.InventoryConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.LifecycleConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.LoggingConfiguration - Is a way to set the created BucketName.
   * @param {Array} props.MetricsConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.NotificationConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.PublicAccessBlockConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.ReplicationConfiguration - Is a way to set the created BucketName.
   * @param {Array} props.Tags - Is a way to set the created BucketName.
   * @param {Object} props.VersioningConfiguration - Is a way to set the created BucketName.
   * @param {Object} props.WebsiteConfiguration - Is a way to set the created BucketName.
   * @example
   *  var ImportES = require('esm')(module)
   *  var S3Bucket = ImportES('./src/S3.js')
   *  var myBucket = new S3Bucket() // will use ALL defaults suchas auto-gen bucketname
   */
  constructor (props = {}) {
    this.Type = 'AWS::S3::Bucket'
    if (Object.keys(props).length > 0) {
      const validProps = Object.entries(props).reduce((a, [k, v]) => {
        if (intersection(Object.keys(props), properties).includes(k)) a[k] = v
        return a
      }, {})
      console.log({ validProps })
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
