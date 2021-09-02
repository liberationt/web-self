module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist',
  lintOnSave: false,
  // chainWebpack: (config) => {
  //   config.resolve.symlinks(true) //热更新
  // },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
  },
  devServer: {
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    proxy: {
      "/self": {
        /* 目标代理服务器地址 */
        target: "", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/opApi": ""
        }
      },
      "/api": {
        /* 目标代理服务器地址 */
        target: "", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    // loaderOptions: {
    //   scss: {
    //     // prependData: `@import "./src/styles/main.scss";`
    //   }
    // }
  }
}