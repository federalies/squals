const addSourceMaps = (env) => {
  // @see: https://webpack.js.org/configuration/devtool/#devtool
  const { sourcemap } = { sourcemap: 'source-map', ...env } // defaulted or passed in via CLI

  const validOptions = [
    'source-map', 'eval', 'eval-source-map',
    'cheap-eval-source-map', 'cheap-module-eval-source-map', 'cheap-source-map', 'cheap-module-source-map',
    'inline-cheap-source-map', 'inline-cheap-module-source-map', 'inline-source-map',
    'nosources-source-map', 'hidden-source-map'
  ]

  const badProdOptions = [
    'eval', 'eval-source-map',
    'cheap-eval-source-map', 'cheap-module-eval-source-map',
    'inline-cheap-source-map', 'inline-cheap-module-source-map', 'inline-source-map'
  ]

  !(validOptions.includes(sourcemap)) && console.warn('Used SourceMap is not a valid option')
  env.mode === 'production' && badProdOptions.includes(sourcemap) && console.warn('Used SourceMap is not a valid option')
  console.log({ sourcemap })
  return {
    devtool: sourcemap
  }
}

module.exports = addSourceMaps
