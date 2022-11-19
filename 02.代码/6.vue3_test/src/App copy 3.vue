<template>
  <div>App</div>
  <h1>user1.name:{{ user1.name }}</h1>
  <h1>user2.name:{{ user2.name }}</h1>
</template>

<script>
import { ref,reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    /*
      ref和reactive的区别
        一般来说,ref是用来将基本数据类型变成响应式的
          reactive是把对象数据类型变成响应式的

        但是,ref其实可以对对象数据类型使用
          ref如果遇到了一个对象,还是会创建一个ref对象,并将遇到的对象交给reactive函数,
            用于创建对应的Proxy对象,最终将代理对象的地址值存在自己的value属性中

        使用场景:
          1.如果未来只是对对象的属性值进行新增,删除,修改等操作,那么就是用reactive
            因为reactive语法比较简单,ref需要每次都加.value

          2.如果未来需要更新对象,那么就使用ref
            因为ref的value属性具有响应式效果,可以监视到更换对象操作,而reactive不行
    
    */
    const obj = {
      name: "xiaoming"
    }

    const user1 = ref(obj);

    let user2 = reactive(obj);
    // console.log(user1)


    setTimeout(()=>{
      // user1.value.name = "xiaohong";

      // user2.name = "xiaohong";

      //------------------
      // user1.value = {
      //   name:"xiaohong"
      // }

      // 注意:该写法没有经过代理对象,所以没有响应式效果
      // user2 = {
      //   name:"xiaohong"
      // }
      // console.log(user,obj)
    },2000)

    return {
      user1,
      user2
    }
  }
}
</script>



<style>

</style>
