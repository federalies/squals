import {
  Template,
  CloudFrontCDN,
  Route53RecordSetGroup,
  Route53HostedZone,
  S3Bucket,
  AWSCertificate
} from '../../src/components'

describe('simple static site', () => {
  const mydomain = 'example.com'
  const awsCert = new AWSCertificate(mydomain)
  const DomainRecords = new Route53RecordSetGroup(new Route53HostedZone(mydomain))
  const webContent = new S3Bucket()

  test.skip('Template Resource Name Check', () => {
    expect(1).toEqual(1)
  })

  test.skip('Basic Static Site', () => {
    const MyCDN = new CloudFrontCDN(webContent.WebsiteURL())
    DomainRecords.A(['', MyCDN.DomainName()])

    const simpleSite = new Template({
      Description: `A simple website template`
    })

    simpleSite.Resources = [webContent, MyCDN, DomainRecords, awsCert]

    console.log(simpleSite)
    expect(JSON.stringify(simpleSite, null, 2)).toEqual([])
  })
})
