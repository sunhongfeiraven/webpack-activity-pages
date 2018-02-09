# webpack-mutiple-output

基于 webpack 对活动页的架构支持支持 webpack-devserver
使用 gulp+webpack 进行打包压缩支持 vue，暂不支持 react
未使用 CommonsChunk 进行合并，活动页为多入口，若使用CommonsChunkPlugin会有生产风险

此项目主要契合多入口，多出口的简单项目（移动端）内置了 px2rem，libFlex 等快速对移动端 h5 进行开发

## 目录结构

```js
src
├── lib                      # 本地的第三方库可通过<script />方式加载的
├── utils                    # 可import的utils库（如browser判断ua,金诚逸bridge，全局通用样式等等）
├── assets                   # 全局静态资源（如金诚逸logo，分享图标，404页面资源等）
├── ...                      # 项目主文件
```

## 项目结构

```js
.
├── style                    # 样式 文件（目前支持css less, 其他类型可通过添加loader来实现）
├── images                   # 图片资源目录
├── js                       # 项目其他js (如封装的一些类，非通用的utils等等)
├── main.js                  # js 主入口
└── index.html               # index 入口文件
```

## 开始

修改 config/index.js 中的的 fileName 为当前开发文件夹名

```shell
yarn install
yarn dev || yarn start    // 开发单个页面
```

## 构建

```shell
yarn build             // 生产
yarn build:test        // 测试
yarn build:pre         // 预发
```

## 配置项
```js
// config/index.js

module.exports = {
  fileName: 'xxx', // 当前开发dev-server启动的项目
  additionalFiles: ['privacy', 'lib', 'assets', 'calfive', 'calsix'], // 未配置main.js但需要打包的项目（如不需要js的展示业，静态资源等）
  exceptFiles: [], // 不参与到打包的项目（如限时活动下架时）
  // ...
}

```


## CDN

可使用 CDN 加载线上资源如: Swiper.js

## Alias

@: src/utils

## utils

### bridge.js 

与金诚逸交互的bridge

### share.js

封装了金诚逸分享与微信二次分享

```js
import Share from 'path/to/share'

new Share({
  showIcon: true, //是否显示分享图标
  shareData: {
    title: '分享标题',
    subTitle: '分享文案',
    image: 'share/img/path',
    link: 'share/addreass/path'
  }
})
```

### utils.js

封装了常用工具如下：
- browser 判断ua
- isInJcy 判断是否在金诚逸环境
- getJcyUserId 获取金诚逸用户id
- getBasePrefix 构造分享内容中图片和链接的地址
- getBaseUrl 服务端请求接口域名配置
- getUrlParam 解析地址栏参数
- eventDelegate 事件代理方法

## TODO

- devServer及测试环境支持sourceMap 方便调试
- 支持react
- 未修改的不打包，加快速度
