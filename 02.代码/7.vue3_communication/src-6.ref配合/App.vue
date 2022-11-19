<template>
  <h1 ref="h1">app</h1>
  <HelloWorld ref="hello"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref,onMounted} from 'vue';

const h1 = ref();
const hello = ref();

onMounted(()=>{
  // console.log(h1)
  console.log(hello.value.msg)
  console.log(hello.value.msg1)
})

</script>

<style>
</style>
