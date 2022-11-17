function Compile(el, vm) {
  // this.$compile = new Compile("#app", vm);
//   this->com实例

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);
        // this.$fragment = this.node2Fragment(this.$el);

        // 此处开始正式解析模版
        this.init();

        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // this.$fragment = this.node2Fragment(this.$el);
        // 创建一个文档碎片
        var fragment = document.createDocumentFragment(),
            child;

        // 此处在对el元素内部,实行抄家政策,内部所有子节点全部转移到文档碎片中
        // 无论如何操作文档碎片中的节点,页面都不会发生重绘重排
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // this.compileElement(this.$fragment);
        // childNodes = [text节点,p元素节点,text节点]
        // childNodes = [text节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [text节点,p元素节点,text节点].forEach(function(node) {
        // [text节点].forEach(function(node) {
        //      第一次:text->p元素的文本内容->"{{msg}}"
        //      第二次:text->文本节点的文本内容->"{{msg}}"
        //     var text = node.textContent;
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         com.compile(p元素);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(node, RegExp.$1);
        //         com.compileText(text节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         com.compileElement(p元素节点);
        //     }
        // });

    },

    compile: function(node) {
        // com.compile(p元素);
        var nodeAttrs = node.attributes,
            me = this;
        // console.log(nodeAttrs);

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        //com.compileText(text节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // this->compileUtil
        // compileUtil.text(text节点, vm, "msg");
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');

    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(text节点, vm, "msg", 'text');

        // 从updater对象身上,找到一个专门用于更新文本的更新器函数
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // textUpdater && textUpdater(text节点, this._getVMVal(vm, "msg"));
        // textUpdater && textUpdater(text节点, "hello mvvm");

        // 每执行一次bind方法,就会生成一个全新的watcher对象
        // 总结:页面上每存在一个插值表达式,就会生成一个对应的watcher对象
        // new Watcher(vm, exp, function(value, oldValue) {
        //     updaterFn && updaterFn(node, value, oldValue);
        // });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // this._getVMVal(vm, "msg")

        // 假设:exp是person.name

        var val = vm._data;

        // exp=>["msg"]
        // exp=>["person","name"]
        exp = exp.split('.');

        // 此处会多次触发数据劫持的get方法,但是不会触发数据代理的get
        exp.forEach(function(k) {
            val = val[k];
            // val = vm._data["person"];
            // val = person["name"];
        });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // textUpdater(text节点, "hello mvvm");
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};