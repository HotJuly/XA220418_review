<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>hello:{{obj.name}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {inject} from 'vue';

const obj = inject("user");
console.log(obj)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
