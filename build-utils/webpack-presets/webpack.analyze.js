const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const analyze = () => ({
  // env is passed in
  plugins: [new WebpackBundleAnalyzer()]
})

module.exports = analyze
