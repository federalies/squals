const getopts = require('getopts')
let AWS = require('aws-sdk')
const Import = require('esm')(module)
const path = require('path')

AWS.config.update({ region: 'us-west-2' })
AWS.config.apiVersions = { cloudformation: '2010-05-15' }
// const cloudformation = new AWS.CloudFormation()

/**
 * intended use: `node makeChangeSet.js -l -u -m -p --mode1Flag --modeAFlag -- string1 string2 string3`
 * or use: `node makeChangeSet.js -lupm 42 --mode1Flag=Universal --modeAFlag=42 -- file/path1 file/path2 file/path3`
 * for hyphened param `-m` shows boolean presence
 * or to pass in string values (numbers must be parsed) `-m Hello` or `-m 42`
 */

const modulesLoaded = (cliInput => {
  const opts = getopts(cliInput, {
    alias: {
      w: 'warp',
      t: 'turbo'
    }
  })

  return opts._.map(m => Import(path.resolve(m)).default)
})(process.argv.slice(2))

console.log({ modulesLoaded })
