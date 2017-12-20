'use strict'

const path = require('path')
const file = require('./file')

module.exports = {
  fileName: file.fileName,
  additionalFiles: file.additionalFiles,
  exceptFiles: file.exceptFiles,
  dev: {
    host: '0.0.0.0',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist')
  }
}
