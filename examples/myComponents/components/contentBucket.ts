import { S3Bucket, CloudFrontCDN } from '../../../src'
import { Route53Record } from '../../../src/components/route53'

const resources = () => {
  const contentBucket = new S3Bucket({
    BucketName: 'example-bucket-content',
    AccessControl: 'BucketOwnerFullControl'
  })
  const cdn = new CloudFrontCDN(contentBucket.WebsiteURL())

  // this is tough
  // IGetAtt :: could be supported BUT
  // it would almost always be require an `alias` record but the required fields for route53 components
  // to handle building that for the upstream component needs more info
  // basically the whole `amazonaws.com` uri
  // servicename + region would generally be acceptable with the exception of `network load balancers`

  const domainChanges = new Route53Record({ cname: cdn.DomainName() })
  return { Resources: [contentBucket, cdn, domainChanges] }
}

export default resources
