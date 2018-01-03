const path = require('path')
const gulp = require('gulp')
const gulpCopy = require('gulp-copy')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./build/webpack.prod.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const chalk = require('chalk')
const merge = require('webpack-merge')
const clean = require('gulp-clean')
const config = require('./config')
const utils = require('./build/utils')

console.log(chalk.blue('BUILD_ENV ==> ') + chalk.yellow(process.env.BUILD_ENV))

// 遍历src文件获取入口
const entrys = utils.getEntry('./src/**/main.js')
const additionalFiles = config.additionalFiles

// webpack打包文件
entrys.forEach(entry => {
  let gulpWebpackConf = merge(webpackConfig, {
    entry: `./src/${entry}/main.js`,
    plugins: [
      new webpack.DefinePlugin({
        env: JSON.stringify(process.env.BUILD_ENV)
      }),
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: path.resolve(__dirname, `./src/${entry}/index.html`)
      })
    ]
  })
  gulp.task(entry, () => {
    return gulp
      .src(`src/${entry}/main.js`) // 好像不用理他
      .pipe(webpackStream(gulpWebpackConf))
      .pipe(gulp.dest(`dist/${entry}`))
  })
})

// 不需打包的文件
additionalFiles.forEach(addEntry => {
  gulp.task(addEntry, () => {
    return gulp.src(`src/${addEntry}/**`).pipe(gulp.dest(`dist/${addEntry}`))
  })
})

// dist清理
gulp.task('clean', () => {
  return gulp.src('dist/', { force: true }).pipe(clean())
})

gulp.task('default', [...additionalFiles, ...entrys], () => {})
