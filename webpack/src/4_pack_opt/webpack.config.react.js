const path = require('path')
let wepback = require('webpack')

// ddlPlugin 专门打包公用模块
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',  // 打包文件名
    path: path.resolve(__dirname, './dist'),
    library: '_dll_[name]_[hash]',  // 导报后文件的输出形式
    // libraryTarget: 'var', // 导出后文件格式
  },
  plugins: [
    new wepback.DllPlugin({ // 即将打包文件与名字形成映射
      name: '_dll_[name]_[hash]', // name和output字段值必须相同
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}
