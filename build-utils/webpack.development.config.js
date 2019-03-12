const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// const NpmInstallPlugin = require('npm-install-webpack-plugin')

const plugins = () => {
  // env is avail in params
  return {
    plugins: [
      // new (require('webpack-dashboard/plugin')),
      new webpack.ProgressPlugin(),
      new webpack.AutomaticPrefetchPlugin(),
      new HtmlWebpackPlugin({
        title: 'Becca',
        template: path.resolve(__dirname, '../static/index.html')
      }),
      new FaviconsWebpackPlugin({
        logo: '../client/static/icons/favicon.png',
        prefix: 'icons/' // The prefix for all image files (might be a folder or a name)
      })
      // new NpmInstallPlugin({
      //   NOT WEBPACK.v4 COMPAT yet
      //   dev: true, // Use --save or --save-dev
      //   peerDependencies: true, // Install missing peerDependencies
      //   quiet: false, // Reduce amount of console logging
      //   npm: 'tnpm' // npm command used inside company, yarn is not supported yet
      // })
    ] }
}

console.log(path.resolve(__dirname, '../static/index.html'))

const URL_EMBED_THRESHOLD = 1024

const devConfig = (env) => {
  return {
    // env is passed in too
    // devtool: 'eval-source-map',
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
        // { test: /.((woff2?)(\?v=[0-9].[0-9].[0-9]))|(woff2?)$/,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: URL_EMBED_THRESHOLD
        //       }
        //     },
        //     {
        //       // remember the right/bottom goest first
        //       loader: 'file-loader',
        //       options: {
        //         outputPath: 'fonts',
        //         name: '[path][name].[ext]' }
        //     }
        //   ]
        // }
        // { test: /.((ttf|eot)(\?v=[0-9].[0-9].[0-9]))|(ttf|eot)$/,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: URL_EMBED_THRESHOLD
        //       }
        //     },
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         outputPath: 'fonts',
        //         name: '[path][name].[ext]'
        //       }
        //     }
        //   ]
        // }
      ]
    },
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '~',
        name: true,
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
    performance: {
      hints: false
    },
    devServer: {
      // https: true,
      // host: 'localhost' // 'cem.local', // to access the dev server from my phone over Wifi
      bonjour: false, // broadcasts server via WiFi/ZeroConf
      clientLogLevel: 'info',
      watchOptions: {
        ignored: /node_modules/
      },
      historyApiFallback: true,
      hot: true,
      inline: true,
      compress: true,
      open: true,
      publicPath: '/'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js'
    },
    ...plugins(env)
  }
}

module.exports = devConfig
