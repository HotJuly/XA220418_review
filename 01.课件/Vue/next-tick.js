/*
  ES6模块化语法中,一个文件无论被引入多少次,最终都只会执行一次内部代码

*/
// 由于ES6模块化的特性,整个项目共享这一个callbacks数组
const callbacks = []
let pending = false
let timerFunc;

function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 通过for循环遍历callbacks数组中所有的cb函数
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  // 通过callbacks数组收集传入的回调函数
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  // 无论调用多少次nextTick,都只会执行一次这个判断内部的代码
  // 无论调用多少次nextTick,都只会开启一个.then的微任务
  if (!pending) {
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点
    1.无论调用多少次nextTick,都只会开启一个微任务
      原因:因为在nextTick源码中,具有开关代码的功能,通过pending进行控制
        pending在第一次调用的时候,初始值是false,但是调用过会立即变为true
        注意:当微任务执行的时候,才会将pending的值重新赋值为false

    2.nextTick会使用callbacks数组,去收集传入的所有的回调函数
    3.当nextTick专用的微任务被执行的时候,会使用for循环遍历callbacks数组中,
      所有的cb函数,并执行


  Vue更新DOM的整体流程:
    1.当我们修改某个响应式属性的时候,会触发Vue的数据代理的set方法
    2.在数据代理的set方法中,会触发数据劫持的set方法
    3.数据劫持的set方法中,会触发dep.notify方法
    4.dep.notify方法中,会调用watcher.update方法
    5.watcher.update方法中,会调用queueWatcher方法
    6.最终在会queueWatcher方法,会将更新DOM的方法传递给nextTick,实现异步更新DOM的效果
*/
