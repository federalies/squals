let AWS = require('aws-sdk')
const Import = require('esm')(module)
const path = require('path')

AWS.config.update({ region: 'us-west-2' })
AWS.config.apiVersions = { cloudformation: '2010-05-15' }
var cloudformation = new AWS.CloudFormation()

const resultsFromMain = (cliInputs => {
  console.log({ cliInputs })
  return cliInputs
    .map(cliToken => Import(path.resolve(cliToken)).default)
    .map(m => {
      console.log(m)
      return m
    })
    .map(m => {
      console.log(m.toString())
      return cloudformation
        .validateTemplate({ TemplateBody: m.toString() })
        .promise()
    })
})(process.argv.slice(2))

// eslint-disable-next-line
const ignoreMe = (async resultsFromMain => {
  const validatedTemplates = await Promise.all(resultsFromMain)
  console.log(`Results>>>`)
  console.log(JSON.stringify(validatedTemplates, null, 2))
})(resultsFromMain)
