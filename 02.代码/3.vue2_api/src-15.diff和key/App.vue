<template>
  <div id="app">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="add">添加</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3,4,5,6]
    }
  },
  methods:{
    add(){
      this.arr.splice(1,0,7)
    }
  }
}
</script>

<style>
</style>
