const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
} = require('./2_rewrite_sync')

let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('hello', (name) => {
  console.log(`hello ${name}`)
  return total++ !== 3 ? `具有返回值终端${total}` : undefined
})
hook.tap('hello', (name) => {
  console.log(`world ${name}`)
})

hook.call('brandon')
