/**
 * AWS::S3: Make a destination.
 *
 * @description Make a Destination object.
 * @param {Object} opts - Config/option input.
 * @param {!string} opts.arn - * (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration.
 * @param {!string} [opts.format='CSV'] - (Format) Specifies the output format of the analytics or inventory results. Currently, Amazon S3 supports the comma-separated value (CSV) format.
 * @param {string} opts.acctId - (BucketAccountId) The ID of the account that owns the destination bucket where the analytics is published.
 * @param {string} opts.prefix - (Prefix) The prefix that is prepended to all analytics results.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-destination.html>
 * @returns {outDestination} Cloduformation object.
 * @example
 *  var dest = destination()
 */
const destination = ({ arn, acctId, format, prefix }) => {
  let Destination = {}
  if (arn) {
    Destination['BucketArn'] = arn
  } else {
    throw new Error('ƒ.destination requires an `arn` param')
  }
  if (format && !['CSV', 'ORC', 'Parquet'].includes(format)) {
    throw new Error(
      `ƒ.destination param of 'format' has valid values of CSV + ORC + Parquet - found: ${format}`
    )
  }
  Destination['Format'] = format || 'CSV'
  if (acctId) Destination['BucketAccountId'] = acctId
  if (prefix) Destination['Prefix'] = prefix
  return { Destination }
}

/**
 * @typedef inDestination
 * @type {Object}
 * @property {!string} arn  - The Amazon Resource Name (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration
 * @property {?string} [format='CSV'] - Valid values include ['CSV', 'ORC', 'Parquet']
 * @property {?string} acctId  - The ID of the account that owns the destination bucket where the analytics is published. Although optional, we recommend that the value be set to prevent problems if the destination bucket ownership changes.
 * @property {?string} prefix - The prefix that is prepended to all analytics results.
 */

/**
 * @typedef outDestination
 * @type {Object}
 * @property {!string} BucketArn - The Amazon Resource Name (ARN) of the bucket where analytics results are published. This destination bucket must be in the same region as the bucket used for the analytics or inventory configuration.
 * @property {!string} Format - Specifies the output format of the analytics or inventory results. Currently, Amazon S3 supports the comma-separated value (CSV) format.
 * @property {?string} BucketAccountId - The ID of the account that owns the destination bucket where the analytics is published.
 * @property {?string} Prefix - The prefix that is prepended to all analytics results.
 */

export { destination }