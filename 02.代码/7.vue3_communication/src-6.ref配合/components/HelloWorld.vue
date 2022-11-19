<template>
  <div class="hello">
    <h1>hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {ref,defineExpose} from 'vue';

// Vue2中,通过组件实例对象,可以随意获取子组件的任意数据
// Vue3中,必须要子组件向外主动暴露数据,父组件才能使用,没暴露的无法使用
const msg = ref('hello的数据');
const msg1 = ref('hello的数据1');
defineExpose({
  msg
  // msg:msg
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
