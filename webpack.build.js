/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 */
const webpack =require("webpack");
const config = require('./webpack.config');
config.mode='production';
config.optimization = {
    splitChunks: { // 打包 node_modules里的代码
        cacheGroups: {
            commons: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0
            },
            vendor: {
                test: /node_modules/,
                chunks: 'initial',
                name: 'vendor',
                priority: 10,
                enforce: true
            }
        }
    },
    runtimeChunk: true// 打包 runtime 代码
};

module.exports =config;
