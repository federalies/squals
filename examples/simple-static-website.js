/**
 * This example gives you a static website that is editable via a browser
 * - use: $> `node -r esm examples/simple-static-website.js`
 * - or to save to tmp: $> `node -r esm examples/simple-static-website.js > simpleWebsite.cloudfm.json &&  aws cloudformation validate-template --template-body file://simpleWebsite.cloudfm.json`
 * - or `node -r esm validtor.js examples/simple-static-website.js`
 */

import { Template, S3Bucket, CloudFrontCDN, Route53RecordSet } from '../src'

const t = new Template({ Description: `A simple website template` })
t.Resources['MyName'] = new S3Bucket({
  BucketName: 'MyAwesomeBucketThatIHopeHasTheNameAvailable'
})
t.Resources['MyCDN'] = new CloudFrontCDN()
t.Resources['Domain+CDN'] = new Route53RecordSet()

// console.log(t.toString())

export default t
