'use strict'
const Glob = require('glob')
const path = require('path')

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]} ['entry1','entry2']         [description]
 */
exports.getEntry = function(globPath) {
  let entries = []
  Glob.sync(globPath).forEach(entry => {
    let pathname = path.dirname(entry)
    entries.push(pathname.split('/')[2])
  })
  return entries
}
