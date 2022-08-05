const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        // 转发目标服务器地址
        // target: "http://182.92.128.115",
        target: 'http://127.0.0.1'
        // 是否把路径中的/api去掉
        // pathRewrite: { "^/api": "" }
      }
    }
  }
})
