class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync('DonePlugin', (_, cb) => {
      setTimeout(() => {
        console.log('打包完成啦')
        cb()
      }, 2000)
    })
  }
}

module.exports = DonePlugin
