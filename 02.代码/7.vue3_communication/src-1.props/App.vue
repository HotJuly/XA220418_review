<template>
  <h1>App:{{msg}}</h1>
  <HelloWorld :msg="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref} from 'vue';

const msg = ref('我是APP组件的数据');

</script>

<style>
</style>
