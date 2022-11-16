<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>{{ msg | myFilter1 }}</h1>
    <h2>name:{{ user.name }}</h2>
    <h2>age:{{ user.age }}</h2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import test from '@/mixins/test';

export default {
  name: 'App',
  data() {
    return {
      msg: "我是APP初始化的数据",
      user: {
        name: "xiaoming"
      },
      tableData: []
    }
  },
  // mixins:[test],
  filters: {
    myFilter1(a) {
      // console.log('myFilter1', a, this)
      return a + '!!!!!!!!111111111'
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      数据驱动
      响应式属性
        当我们修改某个属性值的时候,页面会自动发生变化,显示最新的结果

        创建时机
          1.当组件初始化的时候,会自动执行data函数返回状态数据对象$data,
            该对象这一瞬间具有的所有的属性,都会变为响应式属性

          2.当我们修改某个响应式属性的值时,Vue会将传入的数据进行数据劫持
            也就是说把传入的对象所有的属性都变成响应式的

        如何快速判断一个属性是否是响应式属性?
          将拥有属性的对象进行打印,如果该属性是...写法,就说明他是一个响应式属性
              如果该属性是直接显示原值,就说明他是一个非响应式属性

        如何新增一个响应式属性?
          1.Vue.set
          2.this.$set(target,key,value)
          3.Vue.observable(object)

      非响应式属性
        当我们修改某个属性值的时候,页面不会发生变化,显示的依旧是旧的内容

      
      注意点:
        1.data中所有的属性都是响应式属性


      Vue2的缺点:
        1.新增的属性是非响应式属性
        2.删除属性没有响应式效果,页面依旧展示旧的数据
    */

    // let obj = {
    //   name:"xiaoming"
    // }
    // obj.name="xiaohong"

    // this.msg="我是APP修改之后的数据"
    // this.user.name="小红"

    // 注意:这种写法没有响应式
    // this.user.age = 23;

    //------------------------
    // this.user = {
    //   ...this.user,
    //   // age:23
    // }

    // 这种写法不是响应式的,由于上面有对user属性进行重新赋值,所以此处的age被顺带渲染了
    // this.user.age = 23;

    // this.$set(this.user,'age',23);

    // console.log(this.user)

    // setTimeout(()=>{
    //   this.user.age = 38;
    // },2000)

    // 以下写法没有响应式效果,所以需要替换成this.$delete
    // delete this.user.name

    // this.$delete(this.user, 'name')
    // console.log(this.user)

    console.log('我是组件的mounted',this.$options.name)
  },
}
</script>

<style>

</style>
