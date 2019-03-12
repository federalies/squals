// This is an env that should layer in:
// - Offline Caching
// - Layer in responsive images
//
// Maybe even an s3 "deployment" push and open it up in a sandbox env
// The intention of an alpha env is to live for a few hours
// perhaps long enough to run exit tests on some limited section (the parts that changed) so it can be promoted an a beta build
//
// If exit tests pass, graduate the changes to a beta build
// where a full prod env is setup
// and full regression tests are run over all tests
// if that passes then the changes can be applied to production

const webpack = require('webpack')
const OfflinePlugin = require('offline-plugin')

const plugins = () => {
  return {
    plugins: [
      // new (require('webpack-dashboard/plugin')),
      new webpack.ProgressPlugin(),
      new OfflinePlugin()
    ]
  }
}

const alphaConfig = (env) => ({
  ...plugins(env)
})

module.exports = alphaConfig
