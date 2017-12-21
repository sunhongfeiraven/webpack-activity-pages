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

## Alias 
      
Lib: src/lib
    

## 开发
修改config里的fileName


```shell 
npm run dev || npm start  //开发单个页面
or:
yarn dev || yarn start  //开发单个页面
```
## 构建

```shell
npm run build             //生产环境打包
npm run build:pre         //预发环境打包
npm run build:test        //测试环境打包
npm run build:dev         //测试环境打包
or:
yarn run build             //生产环境打包
yarn run build:pre         //预发环境打包
yarn run build:test        //测试环境打包
yarn run build:dev         //测试环境打包
```

## TODO

- script/CDN 方式引入公共资源 ?webpack copyPlugin
- 测试font打包
- 提取公共组件至lib
