/**
 * This example gives you a static website that is editable via a browser
 * - use: $> `node -r esm examples/simple-static-website.js`
 * - or to save to tmp: $> `node -r esm examples/simple-static-website.js > simpleWebsite.cloudfm.json &&  aws cloudformation validate-template --template-body file://simpleWebsite.cloudfm.json`
 * - or `node -r esm validtor.js examples/simple-static-website.js`
 */

// import simpleWebsite from '../../../src/higher-order-comps/staticWebsite'
// import {S3Bucket} from '../../../src/components/s3'

import {
  Template,
  CloudFrontCDN,
  Route53RecordSetGroup,
  Route53HostedZone
} from '../../../src/components'
import { S3Bucket } from '../../../src/components/s3' //  why can I not add this above? @todo @researc
import { AWSCertificate } from '../../../src/components/certificateManager'

const mydomain = 'example.com'
const awsCert = new AWSCertificate(mydomain)
const webContent = new S3Bucket()
const MyCDN = new CloudFrontCDN(webContent.WebsiteURL())
const DomainRecords = new Route53RecordSetGroup(new Route53HostedZone('example.com'))

// @workHere
DomainRecords.A(['', MyCDN.DomainName()])

const printMe = new Template({
  Description: `A simple website template`
})

printMe.Resources = [webContent, MyCDN, DomainRecords, awsCert]

console.log(printMe.toJSON())

export default printMe
