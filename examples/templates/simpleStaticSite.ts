/*

tsc
cd examples/templates
tsc simpleStaticSite.ts && node simpleStaticSite.js > templ.json
cfn-lint templ.json
aws cloudformation validate-template --template-body file://templ.json
aws cloudformation validate-template --template-body file://templ.json

cd ../..

*/

import * as yaml from 'js-yaml'
import { Route53HostedZone, Route53RecordSetGroup } from '../../dist/src/components/route53'
import { S3Bucket } from '../../dist/src/components/s3/bucket'
import { AWSCertificate } from '../../dist/src/components/certificateManager/certificate/certificate'
import { CloudFrontCDN } from '../../dist/src/components/cloudFront'
import { Template } from '../../dist/src/components/Template'

// constants
const mydomain = 'federali.es'
const useYaml = false

// template
const simpleSite = new Template({
  Description: `A simple website template`
})

// resources
const awsCert = new AWSCertificate(mydomain)
const DomainRecords = new Route53RecordSetGroup(new Route53HostedZone(mydomain))
const webContent = new S3Bucket()
const MyCDN = new CloudFrontCDN(webContent.WebsiteURL())

// connections
DomainRecords.A(['', MyCDN.DomainName()])

simpleSite.Resources = [
  awsCert,
  DomainRecords,
  MyCDN,
  webContent,
  DomainRecords._connectedHostedZone
]

if (useYaml) {
  console.log(yaml.dump(simpleSite))
} else {
  console.log(JSON.stringify(simpleSite, null, 2))
}
