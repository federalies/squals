/** @module S3Bucket */

/**
 * AWS::S3: Make a destination.
 *
 * @description Make a Destination object.
 * @param {inDestination} opts - Config/option input.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-destination.html>
 * @returns {{Destination:outDestination}} Cloduformation object.
 * @example
 *  var dest = destination()
 */
const destination = ({ arn, acctId, format, prefix }) => {
  let ret = { Destination: { BucketArn: arn, Format: format || 'CSV' } }
  if (!arn) {
    throw new Error('ƒ.destination requires an `arn` param')
  }
  if (format && !['CSV', 'ORC', 'Parquet'].includes(format)) {
    throw new Error(
      `ƒ.destination param of 'format' has valid values of CSV + ORC + Parquet - found: ${format}`
    )
  }
  if (acctId) ret.Destination['BucketAccountId'] = acctId
  if (prefix) ret.Destination['Prefix'] = prefix
  return ret
}

// * @param {!string} opts.arn - * (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration.
// * @param {?string} [opts.format='CSV'] - (Format) Specifies the output format of the analytics or inventory results. Currently, Amazon S3 supports the comma-separated value (CSV) format.
// * @param {?string} opts.acctId - (BucketAccountId) The ID of the account that owns the destination bucket where the analytics is published.
// * @param {?string} opts.prefix - (Prefix) The prefix that is prepended to all analytics results.

/**
 * @typedef inDestination
 * @type {Object}
 * @property {!string} arn  - The Amazon Resource Name (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration
 * @property {?string} [format='CSV'] - Valid values include ['CSV', 'ORC', 'Parquet']
 * @property {?string} [acctId=null]  - The ID of the account that owns the destination bucket where the analytics is published. Although optional, we recommend that the value be set to prevent problems if the destination bucket ownership changes.
 * @property {?string} [prefix=null] - The prefix that is prepended to all analytics results.
 */

/**
 * @typedef outDestination
 * @type {Object}
 * @property {!string} BucketArn - The Amazon Resource Name (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration.
 * @property {!string} Format - Specifies the output format of the analytics or inventory results. Currently, Amazon S3 supports the comma-separated value (CSV) format.
 * @property {?string} [BucketAccountId=null] - The ID of the account that owns the destination bucket where the analytics is published.
 * @property {?string} [Prefix=null] - The prefix that is prepended to all analytics results.
 */

export { destination }
