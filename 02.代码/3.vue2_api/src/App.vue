<template>
  <div id="app">
    <h1 ref="h1" v-if="isH1">我是h1</h1>
    <h2 ref="h2" v-if="isH2">我是h2</h2>
    <h3 ref="h3" v-if="isH3">我是h3</h3>
    <button @click="clickShow">切换显示</button>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      isH1: false,
      isH2: false,
      isH3: false,
      msg:"我是初始化数据"
    }
  },
  components: {
    HelloWorld
  },
  beforeCreate(){
    // console.log('-------APP beforeCreate--------',this,this.$data,this.msg,this.$el)
    console.log('-------APP beforeCreate--------')
  },
  created(){
    // console.log('-------created--------',this,this.$data,this.msg,this.$el)
    console.log('-------APP created--------')
  },
  beforeMount(){
    // console.log('-------beforeMount--------',this,this.$data,this.msg,this.$el)
    console.log('-------APP beforeMount--------')
  },
  mounted(){
    // console.log('-------mounted--------',this,this.$data,this.msg,this.$el)
    console.log('-------APP mounted--------')
  },
  // beforeMount(){
  //   // $vnode存储的是父组件的虚拟DOM
  //   // _vnode存储的是当前组件的虚拟DOM
  //   console.log('-------beforeMount--------',this.$vnode,this._vnode)
  // },
  methods: {
    clickShow() {

      // Vue2更新数据是同步更新还是异步更新?
      // 同步更新

      // Vue2更新范围:整个组件
      /*
        nextTick在Vue中本身与普通的微任务相比,就有超车功能
          因为所有的nextTick会共享一个微任务,在微任务中会遍历callbacks数组,执行所有的回调函数

        DOM更新操作函数,会交给nextTick执行,而一个组件多次DOM更新还会合并成一次更新
        多个组件的更新,也会形成一个queue队列,实现对中队中队中的感觉,实现一个组件执行更新DOM的方法,
          那么所有组件DOM更新都能超车
      
      */

      this.isH1 = true;

      this.$nextTick(()=>{
        console.log(this.$refs.h1)
        console.log(this.$refs.h2)
      })

      this.isH2 = true;
    }
  }
}
</script>

<style>

</style>
