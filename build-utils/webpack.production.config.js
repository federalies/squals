const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')

const plugins = env => ({ plugins: [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    title: 'Becca',
    template: path.resolve(__dirname, '../static/index.html')
  }),
  new Dotenv({
    path: path.resolve(__dirname, `./vars/${env.mode}.env`),
    safe: false,
    systemvars: false, // load all predefined 'process.env' variables which trumps anything local per dotenv specs.
    silent: false // hide any errors
  }),
  new FaviconsWebpackPlugin({
    logo: '../client/static/icons/favicon.png',
    prefix: 'icons-[hash]/'
  }),
  new MinifyPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin()
] })

const URL_EMBED_THRESHOLD = 8192

module.exports = (env) => ({
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  performance: {
    hints: 'warning'
  },
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
              name: '[hash].[ext]',
              stripdeclarations: true
            }
          }
        ]
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[path][hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  ...plugins(env)
})
