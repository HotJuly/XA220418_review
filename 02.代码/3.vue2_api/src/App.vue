<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <!-- <template v-slot:header>
        <h1>我是header插槽</h1>
      </template> -->
      <template #header>
        <h1>我是header插槽</h1>
      </template>
      <!-- <template #footer="scope">
        <h1>我是footer插槽,{{scope.msg}}</h1>
      </template> -->
      <template #footer="{msg}">
        <h1>我是footer插槽,{{msg}}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
</style>
