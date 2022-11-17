<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <p class="b">{{arr[0]}}</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      arr:[6,7,8]
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    setTimeout(()=>{
      this.arr[0] = 9;
      this.arr.splice(0,1,9);

      // let arr = [7,8,9];
      // arr.splice(0,1,9);
      console.log(this.arr)
    },2000)
  }
}
</script>

<style>
</style>
