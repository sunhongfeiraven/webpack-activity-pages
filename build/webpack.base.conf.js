'use strict'
const path = require('path')
const webpack = require('webpack')

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
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader?min=false'
      }
    ]
  },
  resolve: {
    alias: {
      Lib: path.resolve(__dirname, '../src/lib')
    }
  }
}
