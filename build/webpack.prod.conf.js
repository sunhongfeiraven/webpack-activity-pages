'use strict'
const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PostcssConfigPath = path.resolve(__dirname, '../postcss.config.js')
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getSingleEntry(fileName) {
  let entry = {}
  entry[fileName] = `./src/${fileName}/main.js`
  return entry
}

const webpackConfig = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, `..`),
  entry: { app: `./src/${config.fileName}/main.js` },
  output: {
    // publicPath:'./',
    // path: config.build.assetsRoot,
    filename: `main[hash:8].bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'px2rem-loader',
              options: {
                remUnit: 75
              }
            },
            {
              loader: 'less-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: PostcssConfigPath
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: 'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              publicPath: '',
              name: 'font/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // [name]在getEntryHtml中配置
      filename: 'css/style-[hash:8].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(__dirname, `../src/${config.fileName}/index.html`)
    }),
  ]
})

module.exports = webpackConfig
