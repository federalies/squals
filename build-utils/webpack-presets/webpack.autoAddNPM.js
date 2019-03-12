const NpmInstallPlugin = require('npm-install-webpack-plugin')

const autoAddtoNPM = () => ({
  // env is passed in
  plugins: [new NpmInstallPlugin()]
})

module.exports = autoAddtoNPM
