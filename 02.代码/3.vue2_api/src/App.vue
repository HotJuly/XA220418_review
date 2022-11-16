<template>
  <div id="app">
    <h2>pageX:{{ pageX }}</h2>
    <h2>pageY:{{ pageY }}</h2>
    <h2>num:{{ num }}</h2>
  </div>
</template>

<script>
import moveMixin from '@/mixins/moveMixin'

export default {
  name: 'App',
  data(){
    return{
      pageX:200,
      num:999
    }
  },
  methods:{
    moveHandler(event){
          // console.log(event)
          const {clientX,clientY} = event;
          this.pageX = clientX;
          this.pageY = clientY;
          console.log('组件的methods方法')
        }
  },
  mixins:[moveMixin]
}
</script>

<style>

</style>
