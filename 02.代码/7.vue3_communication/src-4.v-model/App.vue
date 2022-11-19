<template>
  <h1>app:{{msg}}</h1>
  <HelloWorld v-model:value="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref} from 'vue';

const msg = ref('我是App的数据');

</script>

<style>
</style>
