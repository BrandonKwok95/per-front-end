const {
  SyncHook, // 正常情况
  SyncBailHook, // 类似于 SyncHook，执行过程中注册的回调返回非 undefined 时就停止不在执行。
  SyncWaterfallHook,  // 接受至少一个参数，上一个注册的回调返回值会作为下一个注册的回调的参数。
  SyncLoopHook  // 有点类似 SyncBailHook，但是是在执行过程中回调返回非 undefined 时继续再次执行当前的回调
} = require('tapable')

// tapable使用方法
// i. 实例化钩子
const hook = new SyncHook(['name'])
// ii. 注册钩子的执行函数
hook.tap('hello', (name) => {
  console.log(`hello ${name}`)
})
hook.tap('hello', (name) => {
  console.log(`hello ${name}`)
})
// iii. 调用钩子
hook.call('brandon')
