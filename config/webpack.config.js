const path = require('path')
const webpack = require('webpack')
const ROOT = process.cwd() // 根目录
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const PostcssConfigPath = './config/postcss.config.js'
const Glob = require('glob')
const HappyPack = require('happypack')
const ENV = process.env.NODE_ENV
const IsDev = ENV === 'dev'
const HappyThreadPool = HappyPack.ThreadPool({ size: IsDev ? 4 : 10 })

let entryHtml = getEntryHtml('./src/**/index.html')
let entryJs = getEntry('./src/**/main.js')
let configPlugins = [
  new CleanWebpackPlugin(
    ['dist'], // 匹配删除的文件
    {
      root: ROOT, // 根目录
      verbose: true, // 开启在控制台输出信息
      dry: false // 启用删除文件
    }
  ),
  new HappyPack({
    id: 'js', // @see https://github.com/amireh/happypack
    threadPool: HappyThreadPool,
    loaders: ['babel-loader']
  }),
  new HappyPack({
    id: 'styles',
    threadPool: HappyThreadPool,
    loaders: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader', 'px2rem-loader']
  }),
  new ExtractTextPlugin({
    // [name]在getEntryHtml中配置
    filename: '[name]/css/style.css?[chunkhash:8]',
    allChunks: true
  }),
  // @see https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common/commons.js?[chunkhash:8]'
  }),
  new StyleLintPlugin({
    files: ['src/**/*.less','src/**/*.css']
  })
]
// html
entryHtml.forEach(v => {
  configPlugins.push(new HtmlWebpackPlugin(v))
})

// 开发环境不压缩 js

// 配置
const config = {
  entry: entryJs,
  // @see https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/master/example/webpack.config.js
  // [name]在getEntryHtml中配置
  output: {
    filename: '[name]/js/main.js?[chunkhash:8]',
    // chunkFilename: '[name]/js/main.js?[chunkhash:8]',
    path: path.resolve(ROOT, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader?id=js',
            options: {
              presets: ['env']
            }
          },
          {
            loader: 'eslint-loader?id=js'
          }
        ]
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader?id=styles',
          use: [
            {
              loader: 'css-loader?id=styles',
              options: {
                minimize: !IsDev
              }
            },
            {
              loader: 'px2rem-loader?id=styles',
              options: {
                remUnit: 75
              }
            },
            {
              loader: 'less-loader?id=styles'
            },
            {
              loader: 'postcss-loader?id=styles',
              options: {
                config: {
                  path: PostcssConfigPath
                }
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              publicPath: '',
              name: '/img/[name].[ext]?[hash:8]'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              publicPath: '',
              name: '/font/[name].[ext]?[hash:8]'
            }
          }
        ]
      },
      // @see https://github.com/wzsxyz/html-withimg-loader
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader?min=false'
      }
    ]
  },
  resolve: {
    alias: {
      Lib: path.resolve(ROOT, './src/lib')
    }
  },
  plugins: configPlugins,
  // @see http://webpack.github.io/docs/webpack-dev-server.html
  // @see http://www.css88.com/doc/webpack2/configuration/dev-server/
  devServer: {
    contentBase: [path.join(ROOT, 'src/')],
    hot: false,
    host: '127.0.0.1',
    port: 5000
  }
}

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntry(globPath) {
  let entries = {}
  Glob.sync(globPath).forEach(entry => {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)
    entries[pathname.split('/').splice(2)] = pathname + '/' + basename
  })
  return entries
}
/**
 * 根据目录获取 html 入口
 * @param {*} golbPath
 */
function getEntryHtml(globPath) {
  let entries = []
  Glob.sync(globPath).forEach(function(entry) {
    let basename = path.basename(entry, path.extname(entry))
    let pathname = path.dirname(entry)
    // @see https://github.com/kangax/html-minifier#options-quick-reference
    let minifyConfig = IsDev
      ? ''
      : {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    entries.push({
      filename: entry
        .split('/')
        .splice(2)
        .join('/'),
      template: entry,
      chunks: ['common', pathname.split('/').splice(2)[0]], // 公用chunks及enrtyjs同名的chunk
      minify: minifyConfig
    })
  })
  return entries
}

module.exports = config
