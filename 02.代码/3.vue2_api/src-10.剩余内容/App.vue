<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 v-pre>{{msg}}</h1>
    <h1 v-once>{{msg}}</h1>

    <!-- <KeepAlive> -->
    <!-- <keep-alive include="A"> -->
    <keep-alive exclude="A">
      <AVue v-if="isShow"></AVue>
      <BVue v-else></BVue>
    </keep-alive>
    <!-- </KeepAlive> -->
    <button @click="clickHandler1">切换</button>

    <!-- <component :is="showComponent"></component>
    <button @click="clickHandler">切换</button> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AVue from './components/A.vue';
import BVue from './components/B.vue';

export default {
  name: 'App',
  data(){
    return{
      msg:"我是APP",
      isShow:true,
      showComponent:AVue
    }
  },
  components: {
    HelloWorld,
    AVue,
    BVue
  },
  mounted(){
    this.msg=777;
  },
  methods:{
    clickHandler(){
      this.showComponent = BVue
    },
    clickHandler1(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>
</style>
