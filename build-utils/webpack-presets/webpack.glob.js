var glob = require('glob')

const globbed = env => {
  const { fileglob } = env
  return {
    entry: glob.sync(fileglob)
  }
}

module.exports = globbed
