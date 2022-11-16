<template>
  <div id="app">
    <!-- <HelloWorld ref="hello" msg="Welcome to Your Vue.js App"/>
    <h1  ref="h1" @click="resetData">{{msg}}</h1> -->

    <!-- <BigImage/> -->

    
    <!-- <HelloWorld
     msg="Welcome to Your Vue.js App" 
     a="1" 
     b="2" 
     @change1="" 
     @change2=""
     /> -->

      <HintButtonVue 
      type="primary" 
      size="small" 
      title="当前是添加功能"
      @click="handler1"
      />
      <HintButtonVue 
      type="danger" 
      size="big" 
      title="当前是删除功能"
      @click="handler2"
      />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from '@/components/BigImage'
import HintButtonVue from './components/HintButton.vue'

export default {
  name: 'App',
  data(){
    return{
      msg:"我是初始化数据"
    }
  },
  components: {
    HelloWorld,
    BigImage,
    HintButtonVue
  },
  mounted(){
    // this.msg=666;
    // console.log(this.$data)
    // console.log(this.$children)
    // console.log(this.$refs.h1)
    // console.log(this.$refs.hello)
  },
  methods:{
    resetData(){
      Object.assign(this.$data,this.$options.data());
    },
    handler1(){
      console.log(1)
    },
    handler2(){
      console.log(2)
    }
  }
}
</script>

<style>
</style>
