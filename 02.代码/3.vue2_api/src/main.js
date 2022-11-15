import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/*
  需求:将项目中所有组件的配置对象中的a数值+1
  可以通过自定义合并策略的方法去对所有组件中的配置进行修改

  总结:通过自定义合并策略可以统一修改所有组件的配置对象
*/
// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   console.log(parent, child, vm)
//   return child * 2
// }

// Vue.config.devtools = false;

/*
  需求:请问你在项目开发中,是如何捕获出现的报错的?
  回答:
    1.try...catch
      只能捕获一段代码的报错
    2.Promise->catch
      只能捕获promise的错误
    3.生命周期->errorCaptured
      只能捕获后代的错误
    4.Vue.config.errorHandler
      可以捕获Vue项目中所有的报错
    5.window.onerror=function(){}
      可以捕获网页中出现的报错


  需求2:请问项目上线之后,你是如何知道项目出现了哪些报错的?
  回答:
    1.在项目中使用Vue.config.errorHandler方法,捕获项目中出现的报错
    2.使用ajax将出现的报错相关信息,发送给公司的指定服务器
    3.公司将会汇总出现的问题,交给对应的开发人员进行解决
}

*/
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
// }

Vue.config.ignoredElements = [
  "About"
]

new Vue({
  render: h => h(App),
}).$mount('#app')
