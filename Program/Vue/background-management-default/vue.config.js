const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}




const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@views', resolve('./src/views/'))
      .set('__ROOT__', resolve(''))
  }
})
