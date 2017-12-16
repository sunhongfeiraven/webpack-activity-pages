'use strict'
const Glob = require('glob')

/**
 * 根据目录获取 html 入口
 * @param {*} golbPath
 */
exports.getEntryHtml = function(globPath) {
  let entries = []
  Glob.sync(globPath).forEach(function(entry) {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)
    // @see https://github.com/kangax/html-minifier#options-quick-reference
    let minifyConfig = IsDev
      ? ''
      : {
        removeComments: true
        // collapseWhitespace: true
        // minifyCSS: true, // 不压缩
        // minifyJS: true // 不压缩
      }
    entries.push({
      filename: entry
        .split('/')
        .splice(2)
        .join('/'),
      template: entry,
      chunks: [pathname.split('/').splice(2)[0]], // enrtyjs同名的chunk ！必填不然会注入全部chrunk
      minify: minifyConfig
    })
  })
  return entries
}

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
exports.getEntry = function(globPath) {
  let entries = {}
  Glob.sync(globPath).forEach(entry => {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)

    entries[pathname.split('/')[2]] = pathname + '/' + basename
  })
  return entries
}
