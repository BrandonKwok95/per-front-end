const babel = require('@babel/core')
const loaderUtils = require('loader-utils')

function loader(source) {
  let options = loaderUtils.getOptions(this)  // 读取loader中的配置
  let cb = this.async() // 异步loader
  babel.transform(source, {
    ...options,
    sourceMap: true,
    filename: this.resourcePath.split('/').pop()  // 文件名
  }, function (err, data) {
    cb(err, data.code, data.map)
  })
}

module.exports = loader

