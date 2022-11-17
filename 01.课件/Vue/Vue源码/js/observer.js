function Observer(data) {
    // return new Observer(vm._data);
    // this->ob对象
    // data->vm._data

    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        // this.walk(data);//走起
        // this->ob对象
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        
        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", vm._data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });
        
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 

        // ob.defineReactive(ob.data, "msg", "hello mvvm"); 

    },

    defineReactive: function(data, key, val) { 
        // ob.defineReactive(ob.data, "msg", "hello mvvm"); 
        // this->ob对象

        // 每调用一次defineReactive方法,就会生成一个全新的dep对象
        // 目前看来,data中每具有一个直系属性名,就会生成一个对应的dep对象
        // 总结:data中一共具有多少个属性名,就会创建多少个dep对象
        var dep = new Dep();  

        // 此处具有隐式递归效果,observe会导致defineReactive调用,defineReactive又会调用observe
        // 如果属性值是个对象,就会继续递归数据劫持内部的直系属性名
        var childObj = observe(val);

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 此处是在重写属性,而不是新增属性
        // 由于代码会递归调用,所以此处会重写data中所有的属性
        // 虽然经过Object.defineProperty方法重写了data中的所有属性,但是Vue很巧妙的使用了闭包将属性值进行了保留
        // 实现了一个属性具有get/set方法,还能具有value的效果
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //         如果新值等于旧值,就会直接return,那么后续代码就无法执行
        //          直观效果:只要新值等于旧值,那么DOM就不会更新
        //         if (newVal === val) {
        //             return;
        //         }

        //         val = newVal;

        //          从此处可以看出,给响应式属性赋值,如果属性值是一个对象,那么内部的属性也会变成响应式的
        //         childObj = observe(newVal);
                
        //          此处是在通知DOM进行更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
    // observe(vm._data, vm);
    // 此处在判断value是否有值,以及他是否是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {

        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        
    }
};

Dep.target = null;