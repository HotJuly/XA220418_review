<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import myBus from '@/myBus';

myBus.on('sendMsg',(data)=>{
  console.log('sendMsg',data)
})
</script>

<style>
</style>
