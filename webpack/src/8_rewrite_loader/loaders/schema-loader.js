const fs = require('fs')
const loaderUtils = require('loader-utils') // 负责读取loader中的参数
const validateOptions = require('schema-utils') // 负责参数校验

function loader(source) {
  const options = loaderUtils.getOptions(this)
  const cb = this.async()
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'
      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options, 'banner-loader')
  if (options.filename) {
    fs.readFile(options.filename, 'utf8', function (err, data) {
      cb(err, `/**${data}*/${source}`)
    })
  } else {
    cb(null, `/**${options.text}*/${source}`)
  }
}

module.exports = loader
