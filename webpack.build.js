/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 *webpack  打包配置
 *打包速度方面优化无必要。可能你研究了半天，改了一堆参数发现其实也就提升了几秒，但维护成本上去了，得不偿失。
 */


// const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const WebpackSubresourceIntegrity = require('webpack-subresource-integrity');

const WebpackSftpClient = require('webpack-sftp-client');


const config = require('./webpack.config');

process.env.NODE_ENV = 'production';
config.mode = 'production';
// config.output.publicPath='http://zhoulujun.cn/demo/';

config.optimization = {
  splitChunks: { // 打包 node_modules里的代码
    chunks: 'initial', // 只对入口文件处理
    cacheGroups: {
      commons: {
        chunks: 'initial',//打包初始时依赖第三方
        minChunks: 2,//最小共用次数
        maxInitialRequests: 5,
        minSize: 0
      },
      vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。
        test: /node_modules/,
        chunks: 'all',//提取所有 chunks
        name: 'vendor',
        priority: 10,
        enforce: true
      }
    }
  },
  runtimeChunk: true// 单独抽离 runtimeChunk 之后，每次打包都会生成一个runtimeChunk.xxx.js。
};

config.plugins.push(
  new WebpackAssetsManifest({
    // Options go here
    integrity: true,
    integrityHashes: ['sha256', 'sha384']
  }),
  new WebpackSubresourceIntegrity({
    hashFuncNames: ['sha256', 'sha384']
  }),

  /*new webpack.optimize.UglifyJsPlugin(),
   new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.optimize.AggressiveMergingPlugin(),
   new webpack.NoErrorsPlugin()*/

  //上传到服务器发布
  /*new WebpackSftpClient({
      port: '20020',
      host: '10.111.111.38',
      username: 'nginx',
      password: 'zlj@123',
      path: './dist/',//本地上传目录
      remotePath: '/usr/local/nginx/html/demo',//服务器目标目录
      verbose: true
  })*/
);

module.exports = config;
