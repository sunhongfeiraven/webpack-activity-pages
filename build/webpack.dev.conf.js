'use strict'
const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function getSingleEntry(fileName){
  let entry = {}
  entry[fileName] = `./src/${fileName}/main.js`
  return entry
}

console.log(path.resolve(__dirname, `..`))

const devWebpackConfig = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, `..`),
  entry: {app:'./src/main.js'},
  output: {
    publicPath:'./',
    path: config.build.assetsRoot,
    filename: `main.js`,
  },
  devServer: {
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: true,
    stats: 'errors-only',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'], // 匹配删除的文件
      {
        root: path.resolve(__dirname, `../`), // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }
    ),
    new ExtractTextPlugin({
      // [name]在getEntryHtml中配置
      filename: 'css/style-[hash:8].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(__dirname, `../src/index.html`),
      // chunks: ['yuebin'] // enrtyjs同名的chunk ！必填不然会注入全部chrunk
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || '5000'
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${config.dev.host}:${port}`]
          }
        })
      )
      resolve(devWebpackConfig)
    }
  })
})