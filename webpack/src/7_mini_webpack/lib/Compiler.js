const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const ejs = require('ejs')
const { SyncHook } = require('tapable')
const generator = require('@babel/generator').default

class Compiler {
  constructor(config) {
    this.config = config
    // 需要保存入口文件路径
    this.entryId
    // 需要保存所有模块依赖和打包产物的对应关系
    this.modules = { }
    this.entry = config.entry  // 入口路径
    this.root = process.cwd() // 工作路径
    // 钩子函数设置生命周期，插件的使用
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugins: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    }

    let plugins = this.config.plugins
    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        plugin.apply(this)
      })
      this.hooks.afterPlugins.call()
    }
  }

  run() {
    // 创建文件依赖关系
    this.hooks.compile.call()
    this.buildModule(path.resolve(this.root, this.entry), true)
    this.hooks.afterCompile.call()
    // 导出打包结果
    this.emitFile()
    this.hooks.emit.call()
    this.hooks.done.call()
  }

  // 读取文件
  getSource(modulePath) {
    const rules = this.config.module.rules
    let content = fs.readFileSync(modulePath, 'utf8')
    // 遍历rules进行处理
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const { test, use } = rule
      let len = use.length - 1
      // 校验规则
      if (test.test(modulePath)) {
        function normalLoader() {
          let loader = require(use[len--])
          content = loader(content)
          if (len >= 0) {
            normalLoader()
          }
        }
        normalLoader()
      }
    }
    console.log(content)
    return content
  }

  parse(source, parentPath) {
    // babylon 将源码转为ast
    // @babel/traverse 遍历
    // @babel/types 节点修改
    // @babel/generator 代码生成
    const ast = babylon.parse(source)
    let dependencies = []
    traverse(ast, {
      CallExpression(p) {
        let node = p.node
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__'
          let moduleName = node.arguments[0].value
          moduleName = moduleName + (path.extname(moduleName) ? '': '.js')  // 处理前缀
          moduleName = './' + path.join(parentPath, moduleName)
          dependencies.push(moduleName)
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    })
    let sourceCode = generator(ast).code
    return {
      sourceCode,
      dependencies
    }
  }

  // 利用babel构建依赖关系
  buildModule(modulePath, isEntry) {
    let source = this.getSource(modulePath)
    let moduleName = './' + path.relative(this.root, modulePath)
    // 保存入口id
    if (isEntry) this.entryId = moduleName
    // 更改require方法 & 路径修改
    let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
    this.modules[moduleName] = sourceCode
    dependencies.forEach(dependency => {
      this.buildModule(path.resolve(this.root, dependency), false)
    })
  }

  // 根据模版内容输出打包产物
  emitFile() {
    let main = path.join(this.config.output.path, this.config.output.filename)
    let template = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'), 'utf-8')
    let code = ejs.render(template, {
      entryId: this.entryId,
      modules: this.modules
    })
    this.assets = {}
    this.assets[main] = code
    fs.writeFileSync(main, this.assets[main])
  }
}

module.exports = Compiler
