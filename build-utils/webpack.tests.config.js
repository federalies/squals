const path = require('path')
let glob = require('globby')
const webpack = require('webpack')

const plugins = () => {
  // env is avail in params
  return {
    plugins: [
      // new (require('webpack-dashboard/plugin')),
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin()
    ] }
}

const URL_EMBED_THRESHOLD = 1024

const testConfig = (env) => {
  return {
    // env is passed in too
    devtool: 'eval-source-map',
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.svg/,
          use: [
            {
              loader: 'svg-url-loader', // reader/ namer/ inliner
              options: {
                limit: URL_EMBED_THRESHOLD,
                name: '[path][name].[ext]',
                stripdeclarations: true
              }
            }
          ]
        },
        { test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'responsive-loader',
              options: {
                quality: 85,
                outputPath: 'images',
                name: '[path][name].[ext]',
                adapter: require('responsive-loader/sharp')
              }
            }
          ]
        }
      ]
    },
    entry: glob.sync(path.resolve(__dirname, '../tests/**/*.test.js')),
    output: {
      path: path.resolve(__dirname, '../testing-bundle'),
      filename: '[name].js'
    },
    ...plugins(env)
  }
}

module.exports = testConfig // testing
