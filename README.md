# webpack-mutiple-output

## 目录结构

```js
src
├── lib                      # 全局通用的某些第三方库 可用<script>引入 详情见下文
├── utils                    # 工具库 在项目main.js中用import引入
├── ...                      # 其他项目文件
```

## 项目结构

```js
.
├── css                      # css 文件
├── images                   # 图像目录
├── js                       # 其他js文件可从这里import
├── main.js                  # js 主入口
└── index.html               # 开发用 html 文件，打包时会生成 index.html 文件
```

## LIB & CDN

config.index 中由 externals 配置

使用方法:

1.在config.index中配置externals

```js
  externals: {
    // ...other externals
    axios: 'axios',
  },
```

2.在项目index.html中添加

```html
<script src="../lib/axios.min.js"></script>

// or

<script src="cdn address"></script>
```

3.在main.js中import( 为了防止全局变量污染 )

```js
import axios from 'axios'
```

当前支持列表:

- axios

## Alias

@: src/utils

## 开发

修改config里的fileName

```shell
yarn dev || yarn start    //开发单个页面
```

## 构建

```shell
yarn build             //生产环境打包
```

## TODO

- ~~script/CDN 方式引入公共资源 ?webpack copyPlugin~~
- ~~提取公共组件至lib~~
- 测试font打包
- 添加项目通用lib
- 重构share等方法
