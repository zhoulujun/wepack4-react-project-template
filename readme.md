webpack4 react15 sass3 babel7 boilerplate 标准工程模板，

Migrating to webpack4 babel7 react-router4 with Redux
> webpack 一直以来最饱受诟病的就是其配置门槛极高，配置内容极其复杂和繁琐，容易让人从入门到放弃，而它的后起之秀如 rollup、parcel 等均在配置流程上做了极大的优化，做到开箱即用，所以webpack 4 也从中借鉴了不少经验来提升自身的配置效率。愿世间再也不需要 webpack 配置工程师。

但是，webpack4还是需要n多优化部分，配置下来，实为不易。而实际开发也不需要浪费这个时间——了解即可
有心制作成yo 自动包，奈何时间不够

启动:
```bash
npm run start 
```
打包：
```bash
npm run build
```





# 目录结构
src
  actions
  components
  containers
  images
  reducers
  router
  stores
  styles
  untils
  

# 团队规范
遵从平台发布前端规范标准，节选以下要点：

## 命名规范
遵从Camel命名

### 变量命名规范：

#### js规范，请遵从eslint
+ 常量全部大写，单词间下划线分隔
+ 类采用Pascal命名
### scss 规范
+ css 按照工程结构 嵌套书写，嵌套层级不超过三层——采用 @at-root 
+ 非页面引用scss文件，加前缀 _  如：_fun.scss _mixin.scss

# 构建过程 节选关键步骤
### 构建目录初始化
```bash
mkdir yourFileName
cd yourFileName
```
根据工程目录结构，构建相关文件
……
___
```bash
npm init 
npm install webpack webpack-cli  --save-dev
```
##### 注：--save-dev和--save的区别：
development很明显就是我们开发所需要的依赖包，而打包好上线的话是不需要这些包的，一来各种包加起来太大，二来它只是我们开发提高效率的工具而已；
由于本工程只在本地跑，最终还是sftp自动dist 到服务器，所以暂略

修改package.json ,npm run dev 检查打包结果
```json
{
 "scripts": {
   "dev": "webpack --mode development",
    "build": "webpack --mode production"
  }
}
```
##### 注：webpack4只需要一个--mode选项 指定 production||development
参考http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
+如果是并行执行（即同时的平行执行），可以使用&符号。
+如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。
npm run script1.js & npm run script2.js
npm run script1.js && npm run script2.js


___
#### 配置webpack配置文件 webpack.config.js
##### rule对象参数说明
+ test: A condition that must be met   必须满足的条件
+ exclude: A condition that must not be met  不能满足的条件
+ include: A condition that must be met  必须满足的条件
+ loader: A string of “!” separated loaders   用 “！”分割loaders
+ loaders: An array of loaders as string  loaders的字符串数组

#### 基础loader

```bash
npm install  css-loader style-loader  html-loader url-loader file-loader --save-dev
```

```javascript
    [
                   {
                       test: /\.html$/,
                       use: 'html-loader'
                   },
                   {
                       test: /\.css$/,
                       use: [
                           {
                               loader: 'style-loader',
                               options:{
                                   // singleton:true //处理为单个style标签
                               }
                           },
                           {
                               loader: 'css-loader',
                               options:{
                                   // minimize:true //压缩css
                               }
                           }
                       ]
                   },
                   {
                       test:/\.(png|jpg|jpeg|gif)$/,//图片处理
                       use:[
                           {
                               loader: 'url-loader',
                               options:{
                                   limit:2048,
                                   name:'[name][hash].[ext]'
                               }
                           },
                           {
                               loader: 'file-loader',
                               publicPath:publicPath,
                               outputPath: 'dist/',
                               useRelativePath: true
                           }
                       ]
                   },
                   {
                       test: /\.(woff|woff2|eot|ttf|otf)$/,//字体处理
                       use: ['url-loader']
                   },

    ]
```
#### 配置babel 编译js
```bash
npm install --save-dev  babel-loader @babel/core  @babel/preset-env 
npm install --save-dev  eslint-loader 
```

```javascript
    [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/ //设置node_modules里的js文件不用解析
        }
    ]
```

参考：https://segmentfault.com/a/1190000010468759

babel7.0后，需要@ @babel/core vs babel-core  babel插件和版本需要对应上，不然掉坑
参考https://www.w3ctech.com/topic/2150
babel-preset-es2015 babel-plugin-transform-runtime   babel-plugin-add-module-exports babel-plugin-transform-runtime babel-plugin-transform-class-properties


##### .babelrc配置文件
````json
{
    "presets": ["@babel/preset-env","@babel/preset-react"]
}
````


#### 配置eslint 检查

```bash
npm install --save-dev  eslint eslint-loader babel-eslint eslint-plugin-react
```

```javascript
[
   {//eslint 检查
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      loader: ['eslint-loader'],
      exclude: /node_modules/ //设置node_modules里的js文件不用解析
    },
]
```
增加.eslintrc配置
#####  其实没有多大必要，intellij 会自动检车eslint





#### 处理html
npm install html-webpack-plugin 
```javascript
    new HtmlWebpackPlugin({
            filename: './index.html',//输出文件
            template: 'src/index.html',//模板文件
            inject: 'body',//插入位置
            chunks: ['index'],
            hash: true,
            minify: {
                caseSensitive:false,
                removeComment:true,//移除注释
                collapseWhitespace:false//移除多余空格
            }
        })
```
chunks: ['index','vendor','manifest'], 一定要记得 各处的chunk ，特别是optimization.runtimeChunk
#### 处理图片 - 压缩图片
参考：http://shirmy.me/2018/05/15/webpack-图片、文件处理/
```bash
npm install image-webpack-loader --save-dev 
```

```javascript
    [
        {
            test: /\.(png|jpg|jpeg|gif)$/i,//图片处理
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 0,//图片不转base64，增加css的阻塞时间，开启http2，所以也不用雪碧图
                        name: '[name].[hash:5].[ext]',
                    }
                },
            ]
        },
        {//压缩图片
            loader: 'image-webpack-loader',
            options: {
                bypassOnDebug: true,
            }
        },
    ]
```



#### 配置webapck server
```bash
npm install webpack-dev-server open --save-dev
```
参看 webpack.server.js 注释

 "start": "node webpack.server.js",
npm start 启动项目

### 配置css优化设置

```bash
npm install --save-dev postcss-loader autoprefixer postcss autoprefixer  mini-css-extract-plugin
```
##### 注：
+ webpack4已经废弃 extract-text-webpack-plugin 这个插件了，现在使用的是 mini-css-extract-plugin
+ 在项目根目录新建postcss.config.js文件，并对postcss进行配置：
```javascript
module.exports = {
    plugins: {
        'autoprefixer': {
            browsers: [
                "> 1%",
                "last 5 versions",
                "not ie <= 9",
                "ios >= 8",
                "android >= 4.0"
            ]
        }
    }
};
```
不然会报出：Error: No PostCSS Config found  

#### 自动消除冗余的css代码
```bash
npm install --save-dev  optimize-css-assets-webpack-plugin 
```
##### 个人觉得css压缩优化空间不大，nginx开启gzip的情况，很有限，有点画蛇添足
#### 配置sass 
```bash
npm install --save-dev  node-sass sass-loader

```



## webpack构建优化

#### 多线程 happypack 

```bash
npm install --save-dev  happypack

```

配置第三方包，比如jquery
```bash
npm install imports-loader --save-dev
```
```javascript
[
    {
        loader: 'imports-loader',
        options: {
            // 模块为 value，同样webpack也会解析它，如果没有则从alias中解析它
            $: 'jquery'
        }
    }
]
```
#### 增加manifest.json 配置，缓存校对下载, 增加js integrity 安全校验
```bash
npm install --save-dev webpack-subresource-integrity webpack-assets-manifest
```
两个插件准备写成一个，看来不到春节没有时间


#### 增加webpack 模块分析
配置参看 webpack.analy
参考文章：https://www.cnblogs.com/ssh-007/p/7944491.html
```bash
npm install --save-dev webpack-bundle-analyzer
```


#### webpack压缩js、css文件
```bash
npm install --save-dev  webpack-parallel-uglify-plugin optimize-css-assets-webpack-plugin cssnano
```
```javascript

const UglifyJsPlugin=require('webpack-parallel-uglify-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');


config.optimization = {
  minimizer:[
    new UglifyJsPlugin({
      cache: true, // node_modules/.cache/uglifyjs-webpack-plugin
      parallel: os.cpus().length, // 并行 default:true os.cpus().length - 1
      uglifyOptions: {
        ecma: 5,
        mangle: true,
      },
      sourceMap: false,
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano, // 默认使用 cssnano 处理 css
      cssProcessorOptions: {
        reduceIdents: false, // 禁止将 keyframes 自动更名
        mergeIdents: false, // 禁止自动合并 keyframes
        discardUnused: false, // 禁止移除掉未使用的 keyframes
        autoprefixer: false, // 禁止默认删除掉一些前缀，以减少兼容性的问题
        zindex: false, // 禁止自动转换 z-index
        map: false,
      },
    }),
  ],
  ...
  
  }
```
参考：https://jdc.jd.com/archives/212580
> Webpack v4 以前使用内置的 webpack.optimize.UglifyJsPlugin 插件，在 Webpack 4 以后，开始使用 ^1.0.0 独立的版本。


#### 增加上传至服务器
```bash
npm install --save-dev webpack-sftp-client
```
```javascript
  new WebpackSftpClient({
      port: '20020',
      host: '10.111.111.38',
      username: 'nginx',
      password: 'zlj@123',
      path: './dist/',//本地上传目录
      remotePath: '/usr/local/nginx/html/demo',//服务器目标目录
      verbose: true
  })
```

#### 配置react 
```bash
npm install --save-dev react react-dom @babel/preset-react babel-preset-react  eslint-plugin-react

```



#### 配置react router

```bash
npm install --save-dev react-router@3.2.1 history redux react-redux redux-thunk  

```
react-router v4 官方教程
第一个是：react-router-dom，配置方面的
第二是code-splitting：https://reacttraining.com/react-router/web/guides/code-splitting
React-router4简约教程 https://www.jianshu.com/p/bf6b45ce5bcc
react-router@2.8.1  2.x  不兼容
#####  react-router4升级踩坑 https://www.jianshu.com/p/56dce67b8b13
推荐 react-router@3.2.1
```bash
npm install --save-dev   react-router-dom history redux react-redux redux-thunk   react-router-redux

```



```bash
npm install --save-dev react-loading  react-hot-loader  

```

```bash
npm install --save-dev es6-promise isomorphic-fetch immutable

```

# 测试
Karma文档 http://karma-runner.github.io/3.0/config/configuration-file.html
+ 测试管理工具 karma
+ 测试框架 jasmine ||Mocha
+ 断言库 expect||chai
+ 测试覆盖率统计工具 Karma-Coverage
+ 测试浏览器 PhantomJs||chrome
##### 之前一直是Mocha做测试，后面更喜欢 jasmine，因为之前有个童鞋就叫这个名字
推荐阅读：https://www.jianshu.com/p/6726c0410650

```bash
npm install --save-dev karma karma-coverage karma-mocha karma-mocha-reporter karma-phantomjs-launcher karma-sourcemap-loader karma-webpack

```

```bash
npm install --save-dev karma-jasmine  jasmine-core 
```

```bash
npm install --save-dev chai isparta-instrumenter-loader mocha phantomjs-prebuilt react-addons-test-utils

```



```bash
npm install --save-dev  glob minimatch

```
node的glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件.
这个glob工具基于javascript.它使用了 minimatch 库来进行匹配 
https://www.cnblogs.com/xinxingyu/p/5736244.html



react-composition //中文输入问题

webpack 相关优化，可参看：https://www.zhoulujun.cn/html/tools/webpack/2016_0218_7492.html


#npm 包简要说明
```json
{
  "devDependencies": {
      "@babel/core": "^7.2.2",
      "@babel/preset-env": "^7.2.3",
      "@babel/preset-react": "^7.0.0",
      "autoprefixer": "^9.4.4",//css不全兼容代码
      "babel-eslint": "^10.0.1",
      "babel-loader": "^8.0.4",
      "chai": "^4.2.0",//断言库
      "css-loader": "^2.1.0",
      "es6-promise": "^4.2.5",
      "eslint": "^5.12.0",
      "eslint-loader": "^2.1.1",
      "eslint-plugin-react": "^7.12.3",
      "eslint-plugin-vue": "^5.1.0",
      "file-loader": "^3.0.1",
      "glob": "^7.1.3",
      "happypack": "^5.0.1",//阿里多线程 处理 *-loader
      "history": "^3.2.1", //浏览器历史记录处理
      "html-loader": "^0.5.5",
      "html-webpack-plugin": "^3.2.0",//html 生成处理
      "image-webpack-loader": "^4.6.0",//图片压缩
      "immutable": "^4.0.0-rc.12",
      "isomorphic-fetch": "^2.2.1",
      "isparta-instrumenter-loader": "^1.0.1",
      "jasmine": "^3.3.1",//BDD, framework independent, 测试框架 || https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript
      "jasmine-core": "^3.3.0",
      "karma": "^3.1.4",//测试管理工具 ||Selenium、WebDriver/Selenium 2、Mocha[1]、JsTestDriver、HTML Runners和Karma，我这里选择使用Karma
      "karma-coverage": "^1.1.2",//测试覆盖报告
      "karma-jasmine": "^2.0.1",
      "karma-mocha": "^1.3.0",
      "karma-mocha-reporter": "^2.2.5",
      "karma-phantomjs-launcher": "^1.0.4",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-webpack": "^3.0.5",
      "mini-css-extract-plugin": "^0.5.0",
      "minimatch": "^3.0.4",
      "mocha": "^5.2.0",//测试框架 || https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript
      "node-sass": "^4.11.0",
      "open": "0.0.5",
      "phantomjs-prebuilt": "^2.1.16",
      "postcss": "^7.0.7",
      "postcss-loader": "^3.0.0",
      "react": "^16.7.0",
      "react-addons-test-utils": "^15.6.2",
      "react-dom": "^16.7.0",
      "react-hot-loader": "^4.6.3",
      "react-loading": "^2.0.3",
      "react-redux": "^6.0.0",
      "react-router": "^3.2.1",
      "redux": "^4.0.1",
      "redux-thunk": "^2.3.0",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.23.1",
      "url-loader": "^1.1.2",
      "webpack": "^4.28.3",
      "webpack-assets-manifest": "^3.1.1",
      "webpack-bundle-analyzer": "^3.0.3",
      "webpack-cli": "^3.2.0",
      "webpack-dev-server": "^3.1.14",
      "webpack-manifest-plugin": "^2.0.4",
      "webpack-sftp-client": "^1.2.1",
      "webpack-subresource-integrity": "^1.3.1"
    }
}
```
