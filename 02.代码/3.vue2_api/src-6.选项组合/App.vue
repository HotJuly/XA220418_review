<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      a:1,
      user:{
        name:"xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  // provide:{
  //   msg:"我是APP的数据",
  //   a:this.a
  // },
  provide(){
    // return {
    //   msg:"我是APP的数据",
    //   a:this.a,
    //   user:this.user
    // }
    return Vue.observable({
      msg:"我是APP的数据",
      user:{
        name:"xiaoming"
      }
    })
  }
}
</script>

<style>
</style>
