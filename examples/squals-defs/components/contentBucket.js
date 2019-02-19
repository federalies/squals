import { S3Bucket, CloudFrontCDN, Route53RecordSet } from '../../../src'

const resources = () => {
  const contentBucket = new S3Bucket({
    BucketName: 'example-bucket-content',
    AccessControl: 'BucketOwnerFullControl'
  })
  const cdn = new CloudFrontCDN({ refs: { contentBucket } })
  const domainChanges = new Route53RecordSet({ refs: { cdn } })
  return { Resources: { contentBucket, cdn, domainChanges } }
}

export default resources
