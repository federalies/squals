import { S3Bucket, CloudFrontCDN, Route53RecordSet } from '../../../src'

const resources = () => {
  const publicSite = new S3Bucket({
    BucketName: 'example-bucket-content',
    AccessControl: 'PublicRead',
    WebsiteConfiguration: {
      IndexDocument: 'index.html',
      ErrorDocument: '404.html'
    }
  })
  const cdn = new CloudFrontCDN({ refs: { publicSite } })
  const domainChanges = new Route53RecordSet({ refs: { cdn } })
  return { Resources: { publicSite, cdn, domainChanges } }
}

export default resources
