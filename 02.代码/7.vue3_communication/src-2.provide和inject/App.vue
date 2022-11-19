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
import {ref, provide} from 'vue';

const user = ref({
  name:"xiaoming"
})

provide("user",user);
</script>

<style>
</style>
