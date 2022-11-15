function MVVM(options) {

  this.$options = options;

  var data = this._data = this.$options.data;

  var me = this;

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });


  observe(data, this);
  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
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

  },
};
