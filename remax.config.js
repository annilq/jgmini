const path =require("path")
const less = require('@remax/plugin-less');

module.exports = {
  configWebpack({ config, webpack, addCSSRule }) {
    // config 是的 https://github.com/neutrinojs/webpack-chain Config 对象。
    config.plugins.delete('webpackbar'); // 去掉进度条
    config.resolve
    .alias
      .merge({
        '@/': path.resolve(__dirname, './src')
      })
  },
  plugins: [
    less({
      lessOptions: {
        globalVars: {
          'primary-color': '"#4569d4"',
        },
      },
    }),
  ],
  // pxToRpx:false
};
