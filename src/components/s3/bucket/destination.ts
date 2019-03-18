/**
 * AWS::S3: Make a destination.
 *
 * @description Make a Destination object.
 * @param opts - Config/option input.
 * @see <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-destination.html>
 * @example
 *  var dest = destination()
 */
export const destination = (
  config: IbucketDestination
): { Destination: IBucketDestinationItem } => {
  const { arn, format, acctId, prefix } = { format: 'CSV', ...config }

  let ret: { Destination: IBucketDestinationItem }

  if (arn) {
    if (format && ['CSV', 'ORC', 'Parquet'].includes(format)) {
      ret = {
        Destination: {
          BucketArn: arn.toString(),
          Format: format
        }
      }
    } else {
      throw new Error(
        `ƒ.destination param of 'format' has valid values of CSV + ORC + Parquet - found: ${format}`
      )
    }
  } else {
    throw new Error('ƒ.destination requires an `arn` param')
  }

  if (acctId) ret.Destination['BucketAccountId'] = acctId
  if (prefix) ret.Destination['Prefix'] = prefix
  return ret
}

export interface IbucketDestination {
  arn: string
  prefix?: string
  acctId?: string
  format?: string
}

export interface IBucketDestinationItem {
  BucketArn: string
  Format: string
  Prefix?: string
  BucketAccountId?: string
}
