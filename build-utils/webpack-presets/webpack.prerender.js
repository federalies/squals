const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const path = require('path')

const prerender = env => {
  return {
    entry: path.resolve(__dirname, './_prerender.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    plugins: [
      new StaticSiteGeneratorPlugin({
        globals: {
          window: {}
        },
        paths: [
          '/',
          '/login'
        ]
        // locals: {
        //   Properties here are merged into `locals`
        //   passed to the exported render function
        //   greet: 'Hello'
        // }
      })
    ]
  }
}
module.exports = prerender
