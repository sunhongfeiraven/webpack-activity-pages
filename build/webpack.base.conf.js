'use strict'

const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const chalk = require('chalk')
const PostcssConfigPath = path.resolve(__dirname, '../postcss.config.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
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
      }
      // {
      //   test: /\.(less|css)$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader'
      //       },
      //       {
      //         loader: 'px2rem-loader',
      //         options: {
      //           remUnit: 75
      //         }
      //       },
      //       {
      //         loader: 'less-loader'
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           config: {
      //             path: PostcssConfigPath
      //           }
      //         }
      //       }
      //     ]
      //   })
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100,
      //         publicPath: '',
      //         name: '/images/[name]-[hash:8].[ext]'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(eot|svg|ttf|woff)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 100,
      //         publicPath: '',
      //         name: '/font/[name]-[hash:8].[ext]'
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(htm|html)$/i,
      //   loader: 'html-withimg-loader?min=false'
      // }
    ]
  }
  // resolve: {
  //   alias: {
  //     Lib: path.resolve(__dirname, '../src/lib')
  //   }
  // }
}
