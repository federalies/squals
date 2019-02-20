// const esImport = require('esm')(module)
// const ow = esImport('ow')
import ow from 'ow'

const properties = [
  'BucketName',
  'AccessControl',
  'AccelerateConfiguration',
  'AnalyticsConfiguration',
  'BucketEncryption',
  'CorsConfiguration',
  'InventoryConfiguration',
  'LifecycleConfiguration',
  'LoggingConfiguration',
  'MetricsConfiguration',
  'NotificationConfiguration',
  'PublicAccessBlockConfiguration',
  'ReplicationConfiguration',
  'Tags',
  'VersioningConfiguration',
  'WebsiteConfiguration'
]

export const bucketACLS = [
  'AuthenticatedRead',
  'AwsExecRead',
  'BucketOwnerRead',
  'BucketOwnerFullControl',
  'LogDeliveryWrite',
  'Private',
  'PublicRead',
  'PublicReadWrite'
]

const validations = _this => {
  return [
    {
      msg: { AccessControl: 'input is not a valid selection' },
      test:
        _this.Properties.AccessControl &&
        ow.isValid(_this.Properties.AccessControl, ow.string.oneOf(bucketACLS))
    },
    {
      msg: { SomeOtherIssue: 'input is not a valid selection' },
      test: true
    }
  ]
}

export { validations, properties }
