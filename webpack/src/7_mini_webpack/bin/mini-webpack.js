#! /usr/bin/env node
const path = require('path')
const Compiler = require('../lib/Compiler')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))

const compiler = new Compiler(config)
compiler.hooks.entryOption.call() // 相应钩子函数触发
compiler.run()
