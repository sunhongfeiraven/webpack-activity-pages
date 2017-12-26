'use strict'

const path = require('path')

module.exports = {
  fileName: 'vue',
  // 额外没有main.js的文件打包
  additionalFiles: ['privacy', 'lib', 'assets'],
  // 不需要打包的项目 即不会出现在dist当中
  exceptFiles: ['projectB'],
  // 第三方包
  externals: {
    axios: 'axios'
  },
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
