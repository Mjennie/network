const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { // 环境配置
    proxy: 'http://localhost:3001/', // 配置代理，将请求转发到指定的地址
    host: '127.0.0.1', // 指定主机地址
    port: '9000', // 指定端口号
    open: true // 是否自动打开浏览器
  },

})
