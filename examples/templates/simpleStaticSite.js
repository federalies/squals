const Import = require('esm')(module)
const { Route53HostedZone, Route53RecordSetGroup } = Import('../../dist/src/components/route53')
const { S3Bucket } = Import('../../dist/src/components/s3/bucket')
const { AWSCertificate } = Import('../../dist/src/components/certificateManager/certificate')
const { CloudFrontCDN } = Import('../../dist/src/components/cloudFront')
const { Template } = Import('../../dist/src/components/Template')
const yaml = require('js-yaml')

// constants
const mydomain = 'example.com'
const useYaml = false

// resources
const awsCert = new AWSCertificate(mydomain)
const DomainRecords = new Route53RecordSetGroup(new Route53HostedZone(mydomain))
const webContent = new S3Bucket()
const MyCDN = new CloudFrontCDN(webContent.WebsiteURL())
const simpleSite = new Template({
  Description: `A simple website template`
})

// connections
DomainRecords.A(['', MyCDN.DomainName()])

simpleSite.Resources = [
  webContent,
  MyCDN,
  DomainRecords,
  DomainRecords._connectedHostedZone,
  awsCert
]

if (useYaml) {
  console.log(yaml.dump(simpleSite))
} else {
  console.log(JSON.stringify(simpleSite, null, 2))
}

//
//
// node examples/templates/simpleStaticSite.js > examples/templates/templ.json
// node examples/templates/simpleStaticSite.js > examples/templates/templ.yaml
//
// aws cloudformation validate-template --template-body file://examples/templates/templ.json
// aws cloudformation validate-template --template-body file://examples/templates/templ.yaml
