import path from "path";
const resolve = (dir:string) => path.resolve(__dirname,dir)

module.exports = {
  webpack:{
    alias:{
      '@':resolve('src')
    }
  },
  deServer:{

  }
}