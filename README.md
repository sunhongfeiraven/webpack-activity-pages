## 活动页-webpack-苏州

## 目录结构

```
.
├── css                      # css 文件
├── images                   # 图像目录
├── js                       # 其他js文件可从这里import
├── main.js                  # js 主入口
└── index.html               # 开发用 html 文件，打包时会生成 index.html 文件
```

## 开发
修改config里的fileName

npm

```shell 
npm run dev || npm start  //开发单个页面
```

yarn

```shell 
yarn dev || yarn start  //开发单个页面
```

## 构建

npm

```shell
npm run build             //生产环境打包
npm run build:pre         //预发环境打包
npm run build:test        //测试环境打包
npm run build:dev         //测试环境打包
```

yarn

```shell
yarn run build             //生产环境打包
yarn run build:pre         //预发环境打包
yarn run build:test        //测试环境打包
yarn run build:dev         //测试环境打包
```

