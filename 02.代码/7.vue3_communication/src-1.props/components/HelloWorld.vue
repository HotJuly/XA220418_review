<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>hello:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props:["msg"]
}
</script>

<script setup>
/*
  由于defineProps和defineEmits这两个方法使用率极高,所以Vue3已经将这两个API变成了编程宏存入
    Vue3已经自动将这两个API进行注入,不需要我们手动引入

*/
// defineProps<{
//   msg:String
// }>()


// 如果只是模版中需要使用,执行defineProps(["msg"])即可
// 如果是js代码中需要使用,需要接收defineProps(["msg"])的返回值
const props = defineProps(["msg"]);
console.log(props)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
