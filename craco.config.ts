import path from "path";
const resolve = (dir:string) => path.resolve(__dirname,dir)

module.exports = {
  webpack:{
    alias:{
      '@':resolve('src')
    },
    plugins:{
      
    }
  },
  deServer:{
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