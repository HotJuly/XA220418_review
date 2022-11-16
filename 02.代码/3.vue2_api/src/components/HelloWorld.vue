<template>
  <div class="hello">
    <!-- <h1>{{ _msg }}</h1> -->
    <h1>name:{{ user.name }}</h1>
    <h1>a:{{ a }}</h1>
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    /*
      需求:我现在有一些数据想要放在data中,但是不希望他有响应式的效果
      回答:
        1.将属性名写成_或者$开头
        2.可以使用Object.freeze方法将某个对象数据类型变为只读对象,
          那么内部的属性就无法修改,自然就无法变成响应式属性
    */
    return{
      _msg:"我是初始化的数据",
      user:Object.freeze({
        name:"xiaoming"
      })
    }
  },
  props:["a","fn"],
  mounted(){
    // this.msg = "我是修改之后的数据"
    // console.log(this._msg)
    // this.user.name = "小红"

    // 当前是在helloworld组件的mounted中,所以此处的this是hello组件的实例对象
    this.fn.call(this,123)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
