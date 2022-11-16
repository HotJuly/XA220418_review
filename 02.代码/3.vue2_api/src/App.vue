<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" :a="a"/> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" :fn="$options.fn"/> -->
    <HelloWorld msg="Welcome to Your Vue.js App" :fn="fn"/>
    <h1>str:{{str}}</h1>
    <h1>str:{{str}}</h1>
    <h1>str:{{str}}</h1>
    <h1>str:{{str}}</h1>
    <h1>str:{{str}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  /*
    面试题:为什么data必须是一个函数?
      如果data是一个对象的话,那么当前组件构造函数创建的所有实例对象,都会共享这一个data,
        也就是说,只要data中的数据被任意一个组件实例修改,其余的组件实例都会发生变化
          类似于简化版的Vuex,但是data在开发中是用于存储当前组件独享的数据的

      如果data是一个函数的话,那么组件在创建实例对象的时候,就会自动调用data函数,创建一个独享的data对象
  
  */
  data(){
    return{
      a:"我是APP的数据"
    }
  },
  components: {
    HelloWorld
  },
  fn(data){
    console.log('fn',data,this)
    // this.a = data;
  },
  methods:{
    fn(data){
      // methods中声明的方法,this一定是当前组件的实例对象
      console.log('fn',data,this)
      // this.a = data;
    },
  },
  /*
    面试题:请问computed和watch之间的区别
    回答:
      1.相同点
        -格式相同,都是对象,对象内部都是回调函数
        -他们都可以监视一个响应式属性的变化,如果监视的数据发生变化,就会执行对应的回调函数
          如果监视的是一个非响应式属性,那么即便数据发生变化,也不会执行回调函数
        -默认情况下,computed和watch函数中的this都是当前组件实例对象

      2.不同点
        -使用场景
          computed
            当我们需要一个数据,可惜我们手头没有,不过我们可以根据现有数据进行计算得到
            例如:购物车计算总数,总价等功能

          watch
            当某个数据发生变化的时候,我们需要做一些事情
            例如:在商品搜索页面,监视用户搜索的关键字信息,如果发生变化,我们就会重新发送请求,获取最新的商品数据

          总结:computed更注重于结果,watch更注重于过程
            computed返回值可以用来显示和后续代码计算,watch写了返回值没用

        -缓存
          computed具有缓存,watch不存在缓存
            computed在使用的过程中,如果监视的状态数据没有发生变化,那么他就会自动复用上次的计算结果
              不需要再次执行回调函数

        -执行时机
          computed在组件挂载的时候会执行,watch默认情况下在组件挂载的时候不会执行,只会在更新的时候执行
        
        -函数写法不一定相同
          computed可以写箭头函数,watch是不能写写成箭头函数
            computed如果是箭头函数,第一个参数就是当前组件实例对象

  
  
  */
  computed:{
    str(){
      console.log('str')
      return this.a+"!!!!!!!!!!!!!!!!!!!"
    }
  },
  watch:{
    num(){
      
    },
    user(newValue,oldValue){

    }
  }
}
</script>

<style>
</style>
