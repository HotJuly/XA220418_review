<template>
  <h1>num:{{num}}</h1>
  <HelloWorld @abc="abcFn"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref} from 'vue'

const num = ref(0);

const abcFn=(data)=>{
  // console.log('abcFn',data)
  num.value = data;
}

</script>

<style>
</style>
