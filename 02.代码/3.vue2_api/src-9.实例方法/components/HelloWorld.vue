<template>
  <div class="hello">
    <h1 @click="clickHandler">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    clickHandler(){
      this.$emit('update:msg',"我是hello组件修改之后的数据")
    }
  },
  mounted(){
    this.$bus.$on('abc',(data)=>{
      console.log('abc',data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
