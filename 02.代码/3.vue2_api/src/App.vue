<template>
  <div id="app">
    <router-view></router-view>
    <router-link tag="h1" to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    // console.log(this.$router,this.$route)
  },
  methods:{
    toAbout(){
      this.$router.push('/about');
      // this.$router.replace('/about');
    }
  }
}
</script>

<style>
</style>
