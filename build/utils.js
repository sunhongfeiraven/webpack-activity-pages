'use strict'
const Glob = require('glob')
const path = require('path')
const config = require('../config')

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]} ['entry1','entry2']         [description]
 */
exports.getEntry = function(globPath) {
  let entries = []
  const exceptFiles = config.exceptFiles
  Glob.sync(globPath).forEach(entry => {
    let pathname = path.dirname(entry)
    let basename = pathname.split('/')[2]
    if (exceptFiles.indexOf(basename) === -1) {
      entries.push(basename)
    }
  })
  return entries
}
