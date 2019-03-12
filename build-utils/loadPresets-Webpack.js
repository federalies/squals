const webpackMerge = require('webpack-merge')
const path = require('path')

const loadPresets = env => {
  const { presets } = env

  if (presets) {
    const mergedPresets = [].concat(...[presets])
    const mergedConfigs = mergedPresets.map(presetName => {
      console.log(path.resolve(__dirname, `./presets/webpack.${presetName}`))
      return require(`./webpack-presets/webpack.${presetName}`)(env) // call the preset and pass env also
    })
    return webpackMerge({}, ...mergedConfigs)
  } else {
    return {}
  }
}

module.exports = loadPresets
