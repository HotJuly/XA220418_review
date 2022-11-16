<template>
  <div class="hello">
    <!-- <h1 @click="clickHandler">{{ value }}</h1> -->
    <h1 @click="clickHandler">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String
  },
  model:{
    prop:"msg",
    event:"input789"
  },
  methods:{
    clickHandler(){
      // console.log('clickHandler')
      this.$emit('input789','666')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
