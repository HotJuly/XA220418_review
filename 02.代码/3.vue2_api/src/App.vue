<template>
  <div id="app">
    <h1>我是APP的msg数据:{{ msg }}</h1>
    <!-- <HelloWorld :msg.sync="msg"/> -->

    <HelloWorld :msg="msg" @update:msg="(data) => msg = data" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    this.$bus.$emit('abc', 999)
    setTimeout(() => {
      this.$destroy();
      console.log(1)

      this.msg = "嘿嘿"
    }, 3000)
  }
}
</script>

<style>

</style>
