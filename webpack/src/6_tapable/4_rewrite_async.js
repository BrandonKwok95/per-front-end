// 异步钩子主要分为两种 异步并行钩子和异步串型钩子
class AsyncHook {
  constructor() {
    this.tasks = [];
  }

  tapAsync(name, task) {
    this.tasks.push(task);
  }

  tapPromise(name, task) {
    this.tasks.push(task);
  }
}
// 并行钩子
class AsyncParallelHook extends AsyncHook {
  // 异步回调
  callAsync(...args) {
    let finalCallback = args.pop(),
      index = 0;
    // done 是末回调
    let done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    };
    this.tasks.forEach((task) => {
      task(...args, done);
    });
  }

  promise(...args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}
// 串行钩子
class AsyncSeriesHook extends AsyncHook {
  callAsync(...args) {
    let finalCallback = args.pop(),
      index = 0;
    let next = () => {
      if (index === this.tasks.length) return finalCallback();
      let task = this.tasks[index++];
      task(...args, next);
    };
    next();
  }

  promise(...args) {
    let [first, rest] = args;
    rest.reduce((prev, curr) => {
      // prev执行完触发curr
      return prev.then(() => {
        return curr(...args)
      });
    }, first(...args));
  }
}

class AsyncSeriesWaterfallHook extends AsyncHook {
  callAsync(...args) {
    let index = 0,
        finalCallback = args.pop()
    let next = (err, data) => {
      let task = this.tasks[index++]
      if (index === this.tasks.length || err !== null) return finalCallback()
      task(data, next())
    }
    next(null, ...args)
  }
}

module.exports = {
  AsyncParallelHook,
  AsyncSeriesHook,
  AsyncSeriesWaterfallHook
};
