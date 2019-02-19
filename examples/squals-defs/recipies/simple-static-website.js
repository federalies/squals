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
} from '../../../src'

const funnyPrint = (data, v = { on: true }) => {
  v.p && console.log('')
  v.p && console.log('')
  v.p && console.log(data)
  v.p && console.log('')
  v.p && console.log('')
  v.p && console.log(JSON.stringify(data, null, 2))
  v.p && console.log('')
  v.p && console.log('')
  v.p && console.log(data.toString())
  v.p && console.log('')
  v.p && console.log('')
}

const t1 = new Template({ Description: `A simple website template` })
funnyPrint(t1)

const webContent = new S3Bucket()
const MyCDN = new CloudFrontCDN()
const DomainRecordsForCDN = new Route53RecordSet()

if (t1.validate().pass) {
  t1.addResources({ webContent, MyCDN, DomainRecordsForCDN })
}

if (t1.validate().pass) {
  console.log('passed')
  funnyPrint(t1)
}

const t2 = new Template({
  Description: `A simple website template`,
  Resources: { webContent, MyCDN, DomainRecordsForCDN }
})

if (t2.validate().pass) {
  console.log('passed')
  funnyPrint(t1)
}

export default t2
