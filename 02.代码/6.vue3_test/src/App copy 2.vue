<template>
  <div>App</div>
  <h1>user.name:{{ user.name }}</h1>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    /*
      reactive函数
      接受一个参数,接收一个元对象
      返回值:一个全新的Proxy对象
      效果:
        根据元对象,创建一个Proxy对象
        如果找代理对象获取数据,代理对象会自动找元对象获取数据
          严格来说,只要操作了代理对象,那么代理对象也会对元对象做相同的事情
      注意:
        1.不要操作元对象,因为操作元对象是没有响应式效果的
    
    
    */
    const obj = {
      name: "xiaoming"
    }

    const user = reactive(obj)
    // console.log(user,obj)



    setTimeout(()=>{
      user.name = "xiaohong";
      console.log(user,obj)
    },2000)
    return {
      obj,
      user
    }
  }
}
</script>


<style>

</style>
