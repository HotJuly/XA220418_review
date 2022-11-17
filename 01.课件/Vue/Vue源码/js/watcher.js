function Watcher(vm, exp, cb) {
  // new Watcher(vm, "msg", function(value, oldValue) {
  //     textUpdater && textUpdater(text节点, value, oldValue);
  // });
  // this.cb.call(vm, value, oldVal);
  // this->watcher对象


  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 获取当前插值表达式最新值
    var value = this.get();

    // 获取当前插值表达式的旧值
    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
      // this.cb.call(vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);
    // this->watcher

    // 语法:a.hasOwnProperty('b')=>检查a对象身上是否具有b这个属性,有就返回true,没有就false
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 在watcher对象的depIds对象中,以dep的id为属性名,属性值是对应的dep对象进行存储
      // watcher收集到了与他相关的dep对象
      // 插值语法收集到了与他相关的响应式属性
      this.depIds[dep.id] = dep;

      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // 此处的this是watcher实例对象
    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    // 此时的exp->["msg"]
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
      // val = vm._data["msg"];
    });
    return val;
  },
};
