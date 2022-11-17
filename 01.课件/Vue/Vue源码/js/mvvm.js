function MVVM(options) {
  /*
    this->vm(MVVM的实例对象,也就是我们平常说的组件实例对象)

    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  // Vue1中的this._data,其实就是Vue2的this.$data
  var data = (this._data = this.$options.data);
  // var data = (this._data = this.$options.data);
  // var data = (this.$options.data);

  var me = this;

  /*
      MVVM源码第一部分:数据代理
        代理:我们找代理商买东西,代理商会找厂家购买,再将厂家给的东西转交给我们
          从我们的角度来看,代理商是有东西,但是实际上他没有东西,只是一个搬运者

        目的:为了方便开发者获取到data中的数据,让我们开发的时候可以少写一层._data
            它并不能算是响应式原理中必不可少的一部分,有他没他都可以

        次数:2次(跟data对象具有多少个直系属性有关)

        流程:
          1.使用Object.keys方法获取到了data对象中,所有的直系属性名
          2.使用forEach遍历流程1中获取到的属性名数组,并将属性名传入_proxy方法中
          3.在_proxy方法中,使用Object.defineProperty去给vm对象新增属性
              新增的属性名是与data中的属性同名
          4.在新增属性的时候,会将每个属性都变成访问描述符(具有get/set方法的属性)
            如果开发者读取该属性的值,就会触发get方法,自动获取data对象中的对应属性值
            如果开发者修改该属性的值,就会触发set方法,自动修改data对象中的对应属性值
  */

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  /*
    响应式效果
      需求:当开发者修改某个属性值的时候,页面会自动显示最新的结果
      拆解:
        1.当开发者修改某个属性值的时候
          事件监听
          使用Object.defineProperty可以将一个属性变成get/set方法,
          通过set方法可以监视到用户是否修改数据

        2.页面会自动显示最新的结果
          找到对应的DOM标签,在将他的文本内容修改掉就可以
  
  */

/*
  MVVM源码第二部分:数据劫持
  劫持:将某个人绑架,限制他的人身自由,并要求他做他不想做的事情

  目的:
    重写data对象中所有的属性,让其用于get/set方法,并使用闭包保存他的value值
    通过重写属性的方式,可以让源码监视到开发者修改属性值的操作,便于实现响应式原理

  次数:4次(与data对象中拥有多少个属性名有关)

  流程:
    1.调用observe函数,并将vm._data传入内部,
      observe函数内部会判断当前传入的值是否有值,是否为对象
        如果满足以上两个条件,就new调用Observer函数,创建实例对象
    
    2.在Observer函数中,调用了ob对象的walk方法
    3.在walk方法,会使用Object.keys获取data中所有的直系属性名,并执行defineReactive方法
    4.在defineReactive方法,
      -创建一个dep对象
        总结:data中一共具有多少个属性名,就会创建多少个dep对象
      -调用observe函数,并将当前属性的值传入内部
        如果该属性值又是一个对象,就回到流程2,继续递归数据劫持
      -调用Object.defineProperty方法,对data对象中所有的属性进行重写操作
        将内部所有的属性都变成get/set方法,并使用闭包保存他原先的value值
          -当用户读取该属性的值的时候,他会自动返回闭包val中存储的结果
          -当用户修改该属性的值的时候,他会自动执行set方法
            -判断新旧两个值是否相同,如果不相同才会执行后续代码
            -修改闭包val中存储的数据,变为最新结果
            -将更新的新值传入observe函数,实现深度数据劫持功能
              此处就是响应式属性创建的第二个时间点
            -调用dep.notify方法,通知DOM进行更新
*/
  observe(data, this);
  // observe(vm._data, vm);


  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    //   vm._proxy("msg");
    // this->vm,key=>"msg"

    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    //  我们在ES6之前创建的对象,都是只具有key和value的对象
    // Object.defineProperty方法它可以新增和修改对象某个属性
    // 在定义属性的过程中,可以将属性变成具有get/set方法的属性
    // 注意:一个属性要么拥有value值,要么拥有get/set方法

    // 当用户读取该属性的值时,会自动触发get方法
    // 当用户修改该属性的值时,会自动触发set方法

    // 此处是在新增属性,给vm对象添加msg属性
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });
  },
};
