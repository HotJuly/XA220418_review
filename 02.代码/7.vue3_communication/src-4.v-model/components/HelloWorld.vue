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
const props = defineProps(["value"]);
const emits = defineEmits(["update:value"]);
// console.log('hello',props)

// 如果v-model指令没有自定义名称,那么默认的标签属性名是modelValue
// 可以通过v-model:属性名,来自定义标签属性名称

setTimeout(()=>{
  emits('update:value',"我是helloworld的数据")
},3000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
