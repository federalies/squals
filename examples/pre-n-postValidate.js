#! node -r esm pre-n-postValidate.js

// import an example or just as easily iport your own
//
import TemplateBody from './squals-comps/recipies/simple-static-website'
const AWS = require('aws-sdk')
AWS.config.apiVersions = {
  cloudformation: '2010-05-15'
}
var cloudformation = new AWS.CloudFormation()

// console.log({ TemplateBody })
console.log(TemplateBody.toString(null, 2))

if (TemplateBody.validate()) {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#validateTemplate-property
  cloudformation
    .validateTemplate(TemplateBody)
    .promise()
    .then(res => {
      // the response values are defined in the template - so if you can setup your own non-default output values...
      console.log({ res })
    })
} else {
  console.log(
    `no need to call drop a validate call on the network,
    since we know the recipie is flawed based on the JSON-schema`
  )
}

console.log(JSON.stringify(TemplateBody, null))
