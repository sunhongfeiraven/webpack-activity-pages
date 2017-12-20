'use strict'

const path = require('path')
const fileName = require('./file')

module.exports = {
  fileName,
  dev: {
    assetsPublicPath: '/',
    proxyTable: {},
    host: '0.0.0.0',
    port: 8080,
    autoOpenBrowser: true,
    errorOverlay: true,
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
  }
}
