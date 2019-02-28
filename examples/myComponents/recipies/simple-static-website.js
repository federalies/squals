/**
 * This example gives you a static website that is editable via a browser
 * - use: $> `node -r esm examples/simple-static-website.js`
 * - or to save to tmp: $> `node -r esm examples/simple-static-website.js > simpleWebsite.cloudfm.json &&  aws cloudformation validate-template --template-body file://simpleWebsite.cloudfm.json`
 * - or `node -r esm validtor.js examples/simple-static-website.js`
 */

import {
  Template,
  S3Bucket,
  CloudFrontCDN,
  Route53RecordSet
} from '../../../src/components'

import simpleWebsite from '../../../src/higher-order-comps/staticWebsite'

const webContent = new S3Bucket()
const MyCDN = new CloudFrontCDN()
const DomainRecordsForCDN = new Route53RecordSet()

const t = new Template({
  Description: `A simple website template`
})

const t2 = simpleWebsite(t, 'www.mywebsite.com', {
  bucket: webContent,
  distribution: MyCDN,
  recordSet: DomainRecordsForCDN
})

console.log({ t2 })

export default t2
