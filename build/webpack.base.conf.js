'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PostcssConfigPath = path.resolve(__dirname, '../postcss.config.js')

module.exports = {
  context: path.resolve(__dirname, `..`),
  output: {
    path: config.build.assetsRoot,
    filename: `main.bundle.[hash:8]].js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader?min=false'
      },
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
              name: 'images/[name][hash:8].[ext]'
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
              name: 'font/[name][hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // [name]在getEntryHtml中配置
      filename: 'css/style[hash:8].css',
      allChunks: true
    })
  ],
  resolve: {
    alias: {
      Lib: path.resolve(__dirname, '../src/lib')
    }
  }
}
