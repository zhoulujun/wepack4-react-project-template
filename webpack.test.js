/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 * webpack 配置文件
 */
'use strict';
const path = require('path');
const config = {
  // target: 'web',//告知 webpack 为目标(target)指定一个环境。默认web
  entry: {//配置页面入口
    index: './src/index.js'
  },
  output: {  //配置输出选项
    path: path.resolve(__dirname, 'dist'),//输出路径为，当前路径下
    filename: '[name].[hash:5].js'//输出后的文件名称
  },
  resolve: {
    extensions: ['.js', '.json'] //减少文件查找
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [//使用use可配置多个loader进行处理。顺序由最后一个至第一个。此处匹配到css文件后，先由postcss-loader处理，css-loader处理后再交由style-loader处理
          {
            loader: 'style-loader',
            options: {
              // singleton:true //处理为单个style标签
            }
          },
          {//css-loader 解释(interpret) @import 和 url()
            loader: 'css-loader',
            options: {
              // url:false, //false  css中加载图片的路径将不会被解析 不会改变
              // minimize:true, //压缩css
              importLoaders: 1//importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
            }
          },
          {//需在css-loader/style-loader后面，在其他预处理前面
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ],
              browsers: [
                '> 1%',
                'last 5 versions',
                'not ie <= 9',
                'ios >= 8',
                'android >= 4.0'
              ]
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [//使用use可配置多个loader进行处理。顺序由最后一个至第一个
          {
            loader: 'style-loader'
            /* options: {
                 singleton:true //处理为单个style标签
             }*/
          },
          {//css-loader 解释(interpret) @import 和 url()
            loader: 'css-loader',
            options: {
              // url:false, //false  css中加载图片的路径将不会被解析 不会改变
              // minimize:true, //压缩css
              importLoaders: 1,
              sourceMap: true,//importLoaders代表import进来的资源；2代表css-loader后还需要使用几个loader
            }
          },
          {//需在css-loader/style-loader后面，在其他预处理前面
            loader: 'postcss-loader',
            options: {

              plugins: [
                require('autoprefixer')
              ],
              browsers: [
                '> 1%',
                'last 5 versions',
                'not ie <= 9',
                'ios >= 8',
                'android >= 4.0'
              ],
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader'

          }
        ]
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,//图片处理
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50,//图片不转base64，减少css的阻塞时间，开启http2，所以也不用雪碧图
              name: '[name].[hash:5].[ext]',
              url: false,//不处理css图片路径,
              outputPath: 'images'
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,//字体处理
        use: ['url-loader']
      },

      {//babel编译
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/ //设置node_modules里的js文件不用解析
      },
      {//eslint 检查
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: ['eslint-loader'],
        exclude: /node_modules/ //设置node_modules里的js文件不用解析
      }


    ]
  },
  plugins: [

  ]
};

module.exports = config;
