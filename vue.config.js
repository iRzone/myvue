
module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8088,
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/smms': {
        target: 'https://sm.ms/api/upload',   // 设置你调用的接口域名和端口号
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/smms': '/'    // 代理的路径
          // '^/api': '/api'   // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
          //'^/api': '/' 这种接口配置出来     http://XX.XX.XX.XX:8083/login
        }
      }
    }
  }
}
