const path = require('path')
const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./build/webpack.prod.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const merge = require('webpack-merge')
const clean = require('gulp-clean')
const utils = require('./build/utils')

// TODO 循环打包 √
// TODO 其他列表根据config打包
// TODO 添加BUILD_ENV环境 √
// TODO 输出美化
// TODO 添加CDN
// TODO 测试font

// 遍历src文件获取入口
const entrys = utils.getEntry('./src/**/main.js')
console.log(chalk.blue('BUILD_ENV ==> ') + chalk.yellow(process.env.BUILD_ENV))

entrys.forEach(entry => {
  let gulpWebpackConf = merge(webpackConfig, {
    entry: `./src/${entry}/main.js`,
    plugins: [
      new webpack.DefinePlugin({
        _ENV_: JSON.stringify(process.env.BUILD_ENV)
      }),
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: path.resolve(__dirname, `./src/${entry}/index.html`)
      }),
      new FriendlyErrorsPlugin()
    ]
  })
  gulp.task(entry, () => {
    return gulp
      .src(`src/${entry}/main.js`) // 好像不用理他
      .pipe(webpackStream(gulpWebpackConf))
      .pipe(gulp.dest(`dist/${entry}`))
  })
})

gulp.task('clean', () => {
  return gulp.src('dist/', { force: true }).pipe(clean())
})

// TODO zip
gulp.task('default', ['clean', ...entrys], () => {})
