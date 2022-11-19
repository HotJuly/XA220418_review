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
import {useAttrs} from 'vue';
const props = defineProps(["a"]);
const emits = defineEmits(["abc"]);
const attrs = useAttrs();
console.log(props,attrs)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
