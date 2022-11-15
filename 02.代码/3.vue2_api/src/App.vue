<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <About></About>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// console.log('HelloWorld',HelloWorld)

// 当前文件暴露出去的是一个配置对象,不是组件的实例对象
export default {
  name: 'App',
  // components注册的意思,其实就是根据组件的配置对象,生成一个构造函数
  // 通过该构造函数,可以生成多个组件的实例对象
  components: {
    HelloWorld
  },
  mounted(){
    // console.log('app',this.$options.a)
    // console.log('app',c)
  },
  a:1
}
</script>

<style>
</style>
