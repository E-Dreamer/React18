import path from "path";
const resolve = (dir: string) => path.resolve(__dirname, dir)
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    },
    plugins: {
      add: [new CircularDependencyPlugin(
        {
          exclude: /node_modules/,
          include: /src/,
          failOnError: false,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }
      )]
    }
  },
  deServer: {
    historyApiFallback: true, // 解决BrowserRouter路由跳转之后刷新浏览器按钮报404的情况
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  }
}