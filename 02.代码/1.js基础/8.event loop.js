/*
    setTimeout可以称为超时定时器
    setTimeout的第二个参数,是当前回调函数延迟执行的时间,单位是毫秒
        第二个参数的最小值是1,写0也等于1

    问题:主线程的代码太少了,执行他们都不需要花费1ms,所以可能会出现定时器顺序不正常
    解决:
        只要写个for循环,让主线程代码超过1ms即可

*/

const fs = require("fs");

// setTimeout(()=>{
//     console.log(1)
// },1)

// fs.readFile('./1.原型.html',()=>{
//     console.log(2)

//     setTimeout(()=>{
//         console.log(3)
//     },1)

//     setImmediate(()=>{
//         console.log(4)
//     })
// })

// setImmediate(()=>{
//     console.log(5)
// })

// for(var i=0;i<1000000;i++){

// }

/*
    微任务本身就是js代码中的VIP,但是这个nextTick是SVIP
    node一共有两个微任务队列,一个是.then的,一个是nextTick的
    无论是浏览器还是node,微任务队列都是清空
        即便nextTick优先级较高,但是微任务没执行结束,不会跳转队列
*/
// Promise.resolve().then(()=>{
//     console.log(1)
// })

// // Promise.resolve().then(()=>{
// //     console.log(2)
// // })

// process.nextTick(()=>{
//     console.log(2)
// })

// Promise.resolve().then(()=>{
//     console.log(3)
// })

// Promise.resolve().then(() => {
//   console.log(1);

//   Promise.resolve().then(() => {
//     console.log(2);
//   });

//   process.nextTick(() => {
//     console.log(3);
//   });

//   Promise.resolve().then(() => {
//     console.log(4);
//   });
// });


process.nextTick(()=>{
    console.log(1)

    Promise.resolve().then(() => {
      console.log(2);
    });
  
    process.nextTick(() => {
      console.log(3);
    });
  
    Promise.resolve().then(() => {
      console.log(4);
    });
})