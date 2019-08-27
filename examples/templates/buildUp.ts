import { Template } from '../../src/components/Template'
import {
  // SESReceiptRuleSet,
  SESReceiptFilter,
  // SESReceiptRule,
  // SESConfigurationSet,
  // SESConfigurationSetEventDestination,
  SESTemplate
} from '../../src/components/ses'
import {
  Route53HostedZone,
  Route53Record,
  Route53RecordSetGroup
} from '../../src/components/route53'
import { KinesisFirehoseDeliveryStream } from '../../src/components/kinesisFirehose'
import { S3Bucket } from '../../src/components/s3'
import { IamRole, IamPolicy } from '../../src/components/iam'

console.log('imports done', { SESTemplate })
