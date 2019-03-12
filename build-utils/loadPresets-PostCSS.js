const path = require('path')

const postCssMerge = (...arrConfigObjs) => {
  if(Array.isArray(arrConfigObjs)){//eslint-disable-line
    // console.log(`arguments are an array`)
    return arrConfigObjs.reduce((p, c) => {
      // handle plugins separately
      return { ...p, ...c }
    }, {})
  } else {
    // console.log(`arguments are NOT an array`)
    return Object.entries(arrConfigObjs)
      .reduce((p, [, c]) => {
        // handle plugins separately
        return { ...p, ...c }
      }, {})
  }
}

const loadPresets = env => {
  const { postcssPresets } = env

  if (postcssPresets) {
    const mergedPresets = [].concat(...[postcssPresets])
    console.log({ mergedPresets })

    const mergedConfigs = mergedPresets.map(
      presetName => {
        console.log(path.resolve(__dirname, `./postCSS/presets/postcss.${presetName}`))
        return require(`./postCSS/presets/postcss.${presetName}`)(env) // import and execute the returned func - passing the env
      }
    )
    return postCssMerge({}, ...mergedConfigs)
  } else {
    return {}
  }
}

module.exports = loadPresets
