'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, `..`),
  output: {
    publicPath: './', // ?加了gg
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({
            extract: true
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: 'images/[name].[ext]'
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
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    ]
  },
  externals: config.externals,
  plugins: [
    new ExtractTextPlugin({
      // [name]在getEntryHtml中配置
      filename: 'css/style[hash:8].css',
      allChunks: true
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/utils'),
      '#': path.resolve(__dirname, '../src/lib'),
    }
  }
}
