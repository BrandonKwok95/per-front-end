const {
  AsyncParallelHook,
  AsyncParallelBailHook
} = require('./4_rewrite_async')

let hook = new AsyncParallelHook(['name']);

hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 1000);
  });
});

hook.tapPromise('node', function(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 2000);
  });
});

hook.promise('zhangfeng').then(function () {
  console.log('所有方法执行结束');
});
