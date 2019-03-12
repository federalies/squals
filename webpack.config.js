// const path = require('path')
const webpackMerge = require('webpack-merge')
const loadPresets = require('./build_utils/loadPresets-Webpack.js')

module.exports = env => {
  // expand the dev/prod shorthands
  !env && console.warn('Env is missing defaulting to mode:`none` - Webpack would prefer PROD')
  let { mode } = { mode: 'none', ...env }
  let cleanedMode = ['development', 'production', 'none'].includes(mode) ? mode : 'none'
  const commonConfig = require('./build_utils/webpack.common.js')
  const envConfig = require(`./build_utils/webpack.${mode}.config.js`)

  let mergedConfig = webpackMerge.smartStrategy({ entry: 'replace' })(
    { mode: cleanedMode },
    commonConfig(env),
    envConfig(env)
  )
  // console.log(JSON.stringify(mergedConfig, null, 2))

  mergedConfig = webpackMerge.smartStrategy({ entry: 'replace' })(mergedConfig, loadPresets(env))
  console.log(mergedConfig)
  // console.log(JSON.stringify(mergedConfig.module.rules[3], null, 2))

  return mergedConfig
}
