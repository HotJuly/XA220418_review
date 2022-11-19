<template>
  <div>App</div>
  <h1>pageX:{{ pageX }}</h1>
  <h1>pageY:{{ pageY }}</h1>
</template>

<script>
export default {
  name: 'App',
}
</script>

<script setup>
import useMouseMoveHook from '@/hooks/useMouseMoveHook'

const {pageX,pageY} = useMouseMoveHook();
</script>



<style>

</style>
