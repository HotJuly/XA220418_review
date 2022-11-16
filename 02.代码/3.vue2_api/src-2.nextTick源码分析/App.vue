<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div v-if="isShow">我是APP</div>

    <input ref="input678" v-if="isEdit" type="text">
    <button v-else @click="handleClick">添加</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      isShow: false,
      isEdit: false
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      问题1:请问Vue更新数据是同步更新还是异步更新?
            同步修改
            上一行代码修改完之后,下一行代码就可以立即得到最新的结果

      问题2:请问Vue更新DOM是同步更新还是异步更新?
            异步更新DOM(他其实也是微任务,而且他是使用nextTick更新DOM的)
              异步更新DOM,相当于是对DOM的更新实现了防抖效果
                减少更新的次数

      响应式:当数据发生变化,页面会自动更新,展示最新结果

    */
    //  this.isShow = true;
    // //  console.log(this.isShow)
    // //  debugger

    // Promise.resolve().then(()=>{
    //   console.log(1)
    // })
    
    // this.$nextTick(()=>{
    //   console.log(2)
    // })

    // Promise.resolve().then(()=>{
    //   console.log(3)
    // })

    // this.$nextTick(()=>{
    //   console.log(4)
    // })
  },
  methods: {
    handleClick() {

      this.isEdit = true;

      this.$nextTick(() => {
        this.$refs.input678.focus();
      })

      // 从该处可以体现出,当前Vue更新数据是同步更新,但是更新DOM是异步更新
      /*
      需求:我希望将一件事情放到DOM更新之后才做
      解决:
        使用nextTick可以解决该问题
        nextTick
          数据类型:函数
          接收参数个数:1个
            传入一个回调函数
              该回调函数会在DOM更新之后执行
                在该回调函数中,一定可以获取到最新的DOM节点
                
          原理:它可以延迟一个函数的执行时机,是个异步操作
              它内部其实是.then去开启的微任务

          问题:为什么Vue能够那么肯定的说,在更新数据之后,使用nextTick就一定能得到最新的DOM
          原因:因为更新数据这个操作,会将更新DOM的方法传给nextTick
              也就是说更新DOM的函数会在nextTick中排列在最前面
              那么我们写的nextTick]回调函数,都会排在他后面,他先更新DOM,我们才获取,就一定能得到最新的DOM结果
      */
    }
  }
}
</script>

<style>

</style>
