<template>
  <HelloWorld>
    <template #default>
      <h1>我是默认插槽</h1>
    </template>
    <template #header>
      <h1>我是header插槽</h1>
    </template>
    <template #footer="scope">
      <h1>我是footer插槽,{{scope}}</h1>
    </template>
  </HelloWorld>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>
</style>
