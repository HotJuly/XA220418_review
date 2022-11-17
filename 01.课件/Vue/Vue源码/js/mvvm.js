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
  

    准备工作:
      1.在bind方法中,new Watcher创建watcher实例对象
      2.watcher调用get方法获取当前表达式的结果
      3.在获取属性值的过程中,将Dep.target修改成了当前的watcher,并且触发了数据劫持的get方法
      4.由于当前Dep.target已经有值了,所以会触发dep.depend方法
      5.在dep.depend方法中,会使用watcher对象调用addDep方法
        -该方法中实现了,让watcher收集到与自身相关所有dep对象
        -并且调用dep.addSub(watcher)
      6.最后,dep对象使用subs数组收集到与自身相关的所有的watcher对象

      小总结:也就是说,最终dep和watcher互相收集到了对方

    更新流程:
      1.书写vm.msg=123,会触发数据代理的set方法
      2.在数据代理的set方法中,会修改vm._data的msg属性的值,所以会触发数据劫持的set方法
      3.在数据劫持的set方法中,会触发dep.notify方法
      4.在notify方法,会遍历dep对象的subs数组,获取到每一个watcher对象,并调用他们的update方法
      5.update方法中,会调用cb回调函数,并将最新值传入内部
      6.cb函数中,会调用textUpdater函数,实现对页面上某个节点的文本内容更新效果
      
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


  /*
    MVVM源码第三部分:模版解析
    目的:
      1.解析模版之后,可以让页面上的指令和插值表达式都得到编译解析,
        最终可以在页面上显示出对应的状态数据的内容
      2.在解析的过程中,会创建watcher对象,实现响应式操作
    流程:
      1.将el属性传入Compile函数中,获取到指定的DOM节点
      2.将el元素中所有的子节点,全部转移到文档碎片中
      3.调用init方法开始解析模版,获取文档碎片中所有的子节点
      4.开始判断遍历这些子节点
        -如果是元素节点,就获取他所有的标签属性,用于解析指令
        -如果是文本节点,而且满足插值语法的正则检测,那么就开始编译该插值语法
      5.如果是文本节点,解析的时候会调用bind方法
      6.bind方法中
        -从updater对象中,找到对应的更新器函数
        -调用更新器函数,并将当前表达式对应的结果传入更新期函数,实现节点的文本内容更新操作
        -创建一个watcher对象
          页面上每存在一个插值表达式,就会生成一个对应的watcher对象

  
  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", vm);

  /*
    问题1:请问Vue1中,数据更新导致DOM更新的范围是多大(项目,组件,节点)
      在Vue1中,会找到指定的节点进行更新(精准更新)
  
    问题2:请问Vue1中,DOM更新是同步更新还是异步更新?
      在Vue1中,更新DOM是同步更新的(整个流程里面没有出现异步任务)
      无论是Vue1还是Vue2或者Vue3,他们都是依靠GUI线程更新页面,所以渲染页面一定是异步的
  */

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
