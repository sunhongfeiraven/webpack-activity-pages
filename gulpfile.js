const gulp = require('gulp')
const webpack = require('webpack-stream')
const webpackConfig = require('./build/webpack.prod.conf')

gulp.task('default', function() {
  return gulp.src('src/js/*.js')
    .pipe(webpack(webpackConfig),null,(err)=>{
      console.log(err)
    })
    .pipe(gulp.dest('dist/'));
})
