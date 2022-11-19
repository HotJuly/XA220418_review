<template>
  <div>App</div>
  <h1>user.name:{{ user.name }}</h1>
  <h1>user.age:{{ user.age }}</h1>
  <h1>arr[0]:{{ arr[0] }}</h1>
</template>

<script>
export default {
  name: 'App',
}
</script>

<script setup>
import {reactive} from 'vue';

const user = reactive({
  name:"xiaoming"
})
const arr = reactive([6,7,8])

setTimeout(()=>{
    // user.age = 23;
    // delete user.name;
    // console.log(user)

    arr[0] = 9;
    console.log(arr)
},2000)
</script>



<style>

</style>
