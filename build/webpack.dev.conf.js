'use strict'
const webpack = require('webpack')
const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ip = require('ip')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, `..`),
  entry: { app: `./src/${config.fileName}/main.js` },
  output: {
    // publicPath:'./',
    path: config.build.assetsRoot,
    filename: `main.bundle[hash:8].js`
  },
  devServer: {
    watchContentBase: true, // css html 热更新
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    quiet: true,
    stats: 'errors-only',
    overlay: config.dev.errorOverlay
  },
  plugins: [
    new webpack.DefinePlugin({
      _ENV_: JSON.stringify('TEST')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, `../src/${config.fileName}/index.html`)
    })
  ]
})

// TODO add ip √
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Serving!`,
              ``,
              `Local:            http://${config.dev.host}:${port}`,
              `On your Network : http://${ip.address()}:${port}`
            ]
          }
        })
      )
      resolve(devWebpackConfig)
    }
  })
})
