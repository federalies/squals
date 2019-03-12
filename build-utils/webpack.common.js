const path = require('path')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const I18nPlugin = require('i18n-webpack-plugin')
// const languages = { en: null, de: require('./de.json') }

const plugins = env => ({ plugins: [
  new Dotenv({
    path: path.resolve(__dirname, `./env-vars/${env.mode}.env`),
    safe: false,
    systemvars: false, // load all predefined 'process.env' variables which trumps anything local per dotenv specs.
    silent: false // hide any errors
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[hash].css'
  })

  // new I18nPlugin(languages)
] })

// const URL_EMBED_THRESHOLD = 8192

module.exports = (env) => {
  // env is also passed in
  const { mode } = env
  return {
    entry: [
      path.resolve(__dirname, '../src/index.js'),
      'core-js/modules/es6.promise',
      'core-js/modules/es6.array.iterator'
    ],
    ...plugins(env),
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.css$/,
          use: [
            // { loader: 'style-loader', options: { hmr: false } },
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: '../'
              }
            },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.s[ca]?ss$/,
          // check out: https://github.com/SassNinja/media-query-plugin or https://github.com/mike-diamond/media-query-splitting-plugin
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: mode !== 'production' } },
            { loader: 'sass-loader',
              options: {
                // includePaths: ['absolute/path/a', 'absolute/path/b'],
                sourceMap: mode !== 'production',
                sourceComments: false,
                precision: 4,
                outputStyle: mode === 'production' ? 'compressed' : 'nested'
              }
            }]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['@babel/plugin-transform-react-jsx', { 'pragma': 'h' }],
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import'
              ],
              presets: [
                ['@babel/preset-env', { 'modules': false }]
              ]
            }
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash].js'
    }
  }
}
