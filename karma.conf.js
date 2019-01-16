var webpackCfg;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
// Set node environment to testing
if (process.env.NODE_ENV === 'development') {
  webpackCfg = require('./webpack.server');
} else if (process.env.NODE_ENV === 'production') {
  webpackCfg = require('./webpack.dist');
} else {
  webpackCfg = require('./webpack.test');
  webpackCfg.mode = 'production';
}

process.env.NODE_ENV = 'test';


module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'], // 这里使用的是PhantomJS作为浏览器测试环境，这个插件支持DOM, CSS, JSON, Canvas, and SVG.的解析
    // frameworks: [ 'mocha', 'chai' ],// 下面的测试框架是用来测试js
    frameworks: ['jasmine'],// 下面的测试框架是用来测试js
    files: [//关于loadtests.js其实就是把需要测试的文件都require进来，然后一股脑的在上面的browsers里面跑，使用frameworks测试js,通过reporters输出报告
      'test/loadtests.js'
    ],
    // exclude: [/node_modules/],
    port: 18218,
    captureTimeout: 60000,
    client: {
      mocha: {}
    },
    singleRun: true,
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    //coverage是代码测试覆盖率的一个reporter，也就是说告诉你项目的代码有多少测试了
    reporters: ['mocha', 'coverage'],//代码覆盖率 _下面的是用来出报告的
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'html'},
        {type: 'text'}
      ]
    },
    // 下面给webpack指定相关的配置文件
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },

    // plugins: [
    //   // Karma will require() these plugins
    //   'karma-jasmine',
    //   // 'karma-chrome-launcher',
    //
    //   // inlined plugins
    //   // {'framework:xyz': ['factory', factoryFn]},
    //   // require('./plugin-required-from-config')
    // ]
  });
};
