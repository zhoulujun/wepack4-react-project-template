/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('open');
process.env.NODE_ENV='development';
const config = require('./webpack.config');
config.mode = 'development';
config.devtool='cheap-module-eval-source-map';
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),//热替换
    new webpack.NoEmitOnErrorsPlugin(),//去除系统抛出的错误消息
);


const addressObj = {
    ip: getLocalIPAdress(),
    port: 11037
};

new WebpackDevServer(webpack(config), {

    historyApiFallback: true,
    hot: true,//热加载
    hotOnly: true,
    overlay: {
        errors: true//webpack编译出现的错误是否会出现在网页中
    },
    compress: false,
    proxy: {
        '/api/*': {
            target: 'https://zhoulujun.cn/api',//代理地址
            secure: false
        }
    }
})
    .listen(addressObj.port,addressObj.ip,function (error) {
    error&&console.log(error);
    let address=`http://${addressObj.ip}:${addressObj.port}`;
    // let address=`http://localhost:13080`;
    open(address);
    console.log('listening at:'+address)
});

function getLocalIPAdress () {
    var interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}