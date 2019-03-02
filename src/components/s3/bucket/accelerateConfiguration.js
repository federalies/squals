/** @module S3Bucket */

/**
 * AWS:S3:: Acceleration Configuration.
 *
 * @description `AccelerateConfiguration` configures the transfer acceleration state for an S3 bucket.
 * @param {?boolean} [shouldAccelate=true] - A bool transformed to the two valid states [ Enabled | Suspended ].
 * @returns {outAccelerateConfig} An AccelerateConfiguration property.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-accelerateconfiguration.html>
 * @example
 *  var accCfg = accelerate(true)
 */
const accelerate = shouldAccelate => {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

/**
 * @typedef outAccelerateConfig
 * @type {!Object}
 * @property {!Object} AccelerateConfiguration - Configuration for the transfer acceleration state.
 * @property {!string} [AccelerationStatus='Enabled'] - Sets the transfer acceleration state of the bucket.
 */

export { accelerate }
