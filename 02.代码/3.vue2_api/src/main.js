import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.filter('myFilter',function(a){
  console.log('myFilter',a,this)
  return a+'!!!!!!!!'
})

/*
  需求:当每个组件挂载结束的时候,打印当前组件的名称
  拆解:
    1.当每个组件挂载结束的时候
      通过事件监听监视
        mounted
    2.打印当前组件的名称
      可以从配置对象$options身上读取name属性即可

*/
/*
  混入/混合
    分为两种
      1.全局混合
      2.局部混合

    注意:
      1.如果是通过全局混合和局部混合给组件注入生命周期钩子函数,那么他们传入的都会共存
        小总结:全局混合,局部混合,组件自己的生命周钩子函数能够共存

      2.优先级
        如果是某些配置属性名发生了重名,例如methods中的方法,computed中的计算属性等
          那么优先级:组件自身的>局部混合>全局混合
*/
// Vue.mixin({
//   mounted(){
//     console.log('我是全局混合',this.$options.name)
//   }
// })

/* 
  需求:当用户的鼠标在页面上移动的时候,我们需要在页面上展示他的对应坐标数据
  拆解:
    1.当用户的鼠标在页面上移动的时候
      绑定事件监听
      事件源:document
      事件名:mousemove

    2.需要在页面上展示他的对应坐标数据
      继续拆解:
        1.如何获取到对应坐标
          通过事件对象event可以获取到

        2.如何显示在页面上
          将数据存入data中,在页面上使用插值表达式进行显示
*/

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
