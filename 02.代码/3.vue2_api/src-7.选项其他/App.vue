<template>
  <div id="app">
    <!-- <input type="text" v-model="msg">
    <input type="text" :value="msg" @input="(event)=>msg=event.target.value"> -->

    <h1>我是APP的msg:{{ msg }}</h1>
    <HelloWorld class="a" a="1" v-model="msg" />
    <!-- <HelloWorld  :value="msg" @input="(data)=>msg=data"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "我是初始化数据"
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
