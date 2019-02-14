/**
 *
 * What is this:
 *  Much of the validations of cloudformation templates are - are the right inputs avaiable?
 *  Are all composition rules satisfied?
 *
 * Why?
 * - It's nice to answer those at the smallest lelvel
 *
 * * Overview:
 * - cache the AWS definition
 * - chop up AWS definitions
 * - translate the AWS definitions to JSON-schema.org styles
 *
 * Weeds2
 * - save selected resourceDefs to a list
 * - can iterate through the list - expanding various partial defs of resource.properties
 *    - dont foreget to save off the collection `Type`: `List` otherwise the collection type is `MAP` if the `TYPE` is a ref
 *    - `PrimitiveType` seems mutually exclusive form `Type`
 *    - where those can be determine by the presence of an `ItemType` key referencing a PropertyDef
 *
 *
 * CLI options:
 * - keep the AWS defintion file
 * - only update/generate the JSON schemmas for certain AWS Services
 * - (future) JSON-Schema version to use
 *
 * Assumptions:
 * - the format of the folder
 */

import AWScfg from './AWS_cloudformation.json'

// const AWSprimitiveTypes = ['Boolean', 'Integer', 'String', 'Json', 'Double']
// const AWSotherTypes = ['Map', 'List'] // Where MAP means grab the property def Key

// in case Pupeteer happens...
// let validLbl = Array.from(document.querySelectorAll('#main-col-body > div > dl > dd > p > em')).filter(n=> n.innerText.includes('Valid'))

const defaultTypes = [
  'AWS::S3:',
  'AWS::Lambda:',
  'AWS::CloudFront:',
  'AWS::Route53:',
  'AWS::ApiGateway:',
  'AWS::AppSync:',
  'AWS::CodeBuild:',
  'AWS::CodePipeline:',
  'AWS::CodeCommit:',
  'AWS::DynamoDB:',
  'AWS::SQS:',
  'AWS::SNS:',
  'AWS::SES:',
  'AWS::CertificateManager:',
  'AWS::KinesisFirehose:',
  'AWS::KinesisAnalytics:',
  'AWS::Kinesis:'
]

const propertyDefs = Object.keys(AWScfg.PropertyTypes).reduce(
  (a, awsResourceKey) => {
    if (defaultTypes.find(prefix => awsResourceKey.startsWith(prefix))) {
      a.push({ [awsResourceKey]: AWScfg.PropertyTypes[awsResourceKey] })
    }
    return a
  },
  []
)
console.log({ propertyDefs })

const resopurceDefs = Object.keys(AWScfg.ResourceTypes).reduce(
  (a, awsResourceKey) => {
    if (defaultTypes.find(prefix => awsResourceKey.startsWith(prefix))) {
      a.push({ [awsResourceKey]: AWScfg.ResourceTypes[awsResourceKey] })
    }
    return a
  },
  []
)

console.log(JSON.stringify(resopurceDefs, null, 2))

// const selectedAWSDefs = [...resopurceDefs, ...propertyDefs].sort((l, r) =>
//   Object.keys(l)[0] < Object.keys(r)[0] ? -1 : 1
// )

// console.log({ selectedAWSDefs })
// console.log(JSON.stringify(selectedAWSDefs, null, 2))
