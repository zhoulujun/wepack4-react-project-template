/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 *webpack  打包配置
 *打包速度方面优化无必要。可能你研究了半天，改了一堆参数发现其实也就提升了几秒，但维护成本上去了，得不偿失。
 */


const webpack =require("webpack");
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackSftpClient = require('webpack-sftp-client');
const config = require('./webpack.config');
process.env.NODE_ENV='production';
config.mode='production';
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
                chunks: 'initial',
                name: 'vendor',
                priority: 10,
                enforce: true
            }
        }
    },
    runtimeChunk: true// 单独抽离 runtimeChunk 之后，每次打包都会生成一个runtimeChunk.xxx.js。
};

config.plugins.push(
    new ManifestPlugin(),
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
module.exports =config;
