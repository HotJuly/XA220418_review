<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ a }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  inject:["msg","a"],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
