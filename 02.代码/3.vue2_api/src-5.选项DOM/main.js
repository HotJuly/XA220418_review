import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  面试题:请问在Vue项目中,有几处地方可以控制页面的显示内容?
  回答:
    3个
      -el元素中的结构(在index.html文件里)
        将内部结构当做模版进行使用

      -template配置属性(在main.js的new Vue中书写)
        将template字符串当作结构进行解析使用

      -render配置属性(在main.js的new Vue中书写)
        将render函数调用返回的虚拟DOM进行挂载操作

  面试题2:请问以上三者的显示优先级是怎么样的?
      优先级:render配置>template配置>el配置

*/

new Vue({
  el:'#app',
  template:"<h2>{{msg2}}</h2>",
  data:{
    msg1:"我是index.html的模版内容",
    msg2:"我是template中的模版内容"
  },
  render: h => h(App),
}).$mount('#app')
