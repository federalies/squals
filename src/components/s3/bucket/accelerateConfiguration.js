/**
 * AWS:S3:: Acceleration Configuration.
 *
 * @description `AccelerateConfiguration` configures the transfer acceleration state for an S3 bucket.
 * @param {boolean} shouldAccelate - A bool that is transformed to the two valid states [  Enabled | Suspended ].
 * @returns {Object} An AccelerateConfiguration property.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-accelerateconfiguration.html>
 * @example
 *  var acc = accelerate(true)
 */
const accelerate = shouldAccelate => {
  return {
    AccelerateConfiguration: {
      AccelerationStatus: shouldAccelate ? 'Enabled' : 'Suspended'
    }
  }
}

export { accelerate }
