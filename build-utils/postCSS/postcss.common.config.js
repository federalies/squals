const Common = () => {
  return {
    plugins: [
      require('autoprefixer')({ browsers: ['last 2 versions', '> 2%'] }),
      // require('postcss-assets')
      require('postcss-preset-env')({ browsers: 'last 2 versions' }),
      require('css-mqpacker')()
    ]
  }
}

module.exports = Common
