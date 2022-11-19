<template>
  <div>App</div>
  <h1>a:{{a}}</h1>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'App',
  setup(){
    // setup的执行时机,setup是最早的生命周期,他会在beforeCreate之前执行
    // 组件初始化的时候会执行setup,更新组件的时候不会
    /* setup函数的两大特点:
      1.this是undefined,所以在setup中不会书写this相关代码
        会写的都是Vue3的组合API
      2.setup函数必须返回一个对象,该对象中的数据可以在模版中使用
    */
  //  console.log(this)
  /*
    ref函数
      返回值:是一个Ref对象
      该对象具有value属性,value属性是一个响应式属性

      使用方法:
        1.模版中使用ref对象,不需要.value,Vue会自动读取ref对象的value属性进行展示
        2.在js代码中使用ref对象,需要.value来读取或者修改属性值
          修改该属性值具有响应式效果
  */

    let a = ref(1);
    // console.log(a)
    setTimeout(()=>{
      // a=2;
      a.value=2;
      // console.log(a)
    },3000)

   return {
    a
   }
  }
}
</script>


<style>
</style>
