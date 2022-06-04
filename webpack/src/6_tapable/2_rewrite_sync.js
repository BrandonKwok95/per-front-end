class Hook {
  constructor(args) {
    this.tasks = []; // 钩子回调函数队列
  }
  tap(name, task) {
    this.tasks.push(task);
  }
}

class SyncHook extends Hook {
  call(...args) {
    this.tasks.forEach((task) => {
      task(...args);
    });
  }
}

class SyncBailHook extends Hook {
  call(...args) {
    let ret,
        index = 0
    // 根据函数执行结果判断是否继续执行
    do {
      ret = this.tasks[index++](...args)
    } while(ret === undefined && index < this.tasks.length);
  }
}

class SyncWaterfallHook extends Hook {
  call(...args) {
    // 函数返回值是下一个函数的入参
    let [first, ...rest] = this.tasks
    let ret = first(...args)
    rest.reduce((prev, curr) => {
      return curr(prev)
    }, ret)
  }
}

class SyncLoopHook extends Hook {
  call(...args) {
    let ret
    this.tasks.forEach(task => {
      let ret
      do {
        ret = task(...args)
      } while (ret !== undefined)
    })
  }
}

module.exports = {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
};
