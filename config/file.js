module.exports = {
  // 当前开发文件名
  fileName: 'projectA',
  // 额外没有main.js的文件打包
  additionalFiles: ['privacy'],
  // 不需要打包的项目 即不会出现在dist当中
  exceptFiles: ['projectB', 'projectA']
}
