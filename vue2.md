[[toc]]

## Vue2 {#vue2}

### Vue2的响应式原理 {#vue2-reactive}

所谓响应式就是首先建立响应式数据和依赖之间的关系，当这些响应式数据发生变化的时候，
可以通知那些绑定这些数据的依赖进行相关操作，可以是 DOM 更新，也可以是执行一个回调函数。

我们知道 Vue2 的对象数据是通过 Object.defineProperty 对每个属性进行监听，
当对属性进行读取的时候，就会触发 getter，对属性进行设置的时候，就会触发 setter。

```javascript
/**
 * 这里的函数 defineReactive 用来对 Object.defineProperty 进行封装。
 */
function defineReactive(data, key, val) {
   // 依赖存储的地方
   const dep = new Dep()
   Object.defineProperty(data, key, {
       enumerable: true,
       configurable: true,
       get: function () {
           // 在 getter 中收集依赖
           dep.depend()
           return val
       },
       set: function(newVal) {
           val = newVal
           // 在 setter 中触发依赖
           dep.notify()
       }
   }) 
}
```

那么是什么地方进行属性读取呢？就是在 Watcher 里面，Watcher 也就是所谓的依赖。
在 Watcher 里面读取数据的时候，会把自己设置到一个全局的变量中。

```javascript
/**
 * 我们所讲的依赖其实就是 Watcher，
 * 我们要通知用到数据的地方，而使用这个数据的地方有很多，
 * 类型也不一样，有可能是组件的，有可能是用户写的watch，
 * 所以我们需要抽象出一个能集中处理这些情况的类。
 */
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.getter = exp
        this.cb = cb
        this.value = this.get()
    }

    get() {
        Dep.target = this
        let value = this.getter.call(this.vm, this.vm)
        Dep.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}
```

在 Watcher 读取数据的时候也就触发了这个属性的监听 getter，
在 getter 里面就需要进行依赖收集，这些依赖存储的地方就叫 Dep，
在 Dep 里面就可以把全局变量中的依赖进行收集，收集完毕就会把全局依赖变量设置为空。
将来数据发生变化的时候，就去 Dep 中把相关的 Watcher 拿出来执行一遍。

```javascript
/**
* 我们把依赖收集的代码封装成一个 Dep 类，它专门帮助我们管理依赖。
* 使用这个类，我们可以收集依赖、删除依赖或者向依赖发送通知等。
**/
class Dep {
    constructor() {
        this.subs = []
    }
    
    addSub(sub) {
        this.subs.push(sub)
    }
    
    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if(Dep.target){
            this.addSub(Dep.target)
        }
    }

    notify() {
        const subs = this.subs.slice()
        for(let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

// 删除依赖
function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item)
        if(index > -1){
            return arr.splice(index, 1)
        } 
    }
}
```

总的来说就是通过 Object.defineProperty 监听对象的每一个属性，当读取数据时会触发 getter，修改数据时会触发 setter。

然后我们在 getter 中进行依赖收集，当 setter 被触发的时候，就去把在 getter 中收集到的依赖拿出来进行相关操作，通常是执行一个回调函数。

我们收集依赖需要进行存储，对此 Vue2 中设置了一个 Dep 类，相当于一个管家，负责添加或删除相关的依赖和通知相关的依赖进行相关操作。

在 Vue2 中所谓的依赖就是 Watcher。
值得注意的是，只有 Watcher 触发的 getter 才会进行依赖收集，哪个 Watcher 触发了 getter，就把哪个 Watcher 收集到 Dep 中。
当响应式数据发生改变的时候，就会把收集到的 Watcher 都进行通知。

由于 Object.defineProperty 无法监听对象的变化，
所以 Vue2 中设置了一个 Observer 类来管理对象的响应式依赖，同时也会递归侦测对象中子数据的变化。

### 为什么 Vue2 新增响应式属性要通过额外的 API？ {#vue2-add-reactive-property}

这是因为 Object.defineProperty 只会对属性进行监测，而不会对对象进行监测，
为了可以监测对象 Vue2 创建了一个 Observer 类。
Observer 类的作用就是把一个对象全部转换成响应式对象，包括子属性数据，
当对象新增或删除属性的时候负债通知对应的 Watcher 进行更新操作。

```javascript
// 定义一个属性
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

class Observer {
    constructor(value) {
        this.value = value
        // 添加一个对象依赖收集的选项
        this.dep = new Dep()
        // 给响应式对象添加 __ob__ 属性，表明这是一个响应式对象
        def(value, '__ob__', this)
        if(Array.isArray(value)) {
           
        } else {
            this.walk(value)
        }
    }
    
    walk(obj) {
        const keys = Object.keys(obj)
        // 遍历对象的属性进行响应式设置
        for(let i = 0; i < keys.length; i ++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}
```

#### vm.$set 的实现原理 {#vue2-vm-set}

```javascript
function set(target, key, val) {
    const ob = target.__ob__
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
```

当向一个响应式对象新增属性的时候，需要对这个属性重新进行响应式的设置，
即使用 defineReactive 将新增的属性转换成 getter/setter。

我们在前面讲过每一个对象是会通过 Observer 类型进行包装的，
并在 Observer 类里面创建一个属于这个对象的依赖收集存储对象 dep，
最后在新增属性的时候就通过这个依赖对象进行通知相关 Watcher 进行变化更新。

#### vm.$delete 的实现原理 {#vue2-vm-delete}

```javascript
function del(target, key) {
    const ob = target.__ob__
    delete target[key]
    ob.dep.notify()
}
```

我们可以看到 vm.$delete 的实现原理和 vm.$set 的实现原理是非常相似的。

通过 vm.$delete 和 vm.$set 的实现原理，我们可以更加清晰地理解到 Observer 类的作用，
Observer 类就是给一个对象也进行一个监测，因为 Object.defineProperty 是无法实现对对象的监测的，
但这个监测是手动，不是自动的。
获得授权，非商业转载请注明出处。

### Object.defineProperty 真的不能监听数组的变化吗？ {#vue2-define-property-watch-array-change}

面试官一上来可能先问你 Vue2 中数组的响应式原理是怎么样的，这个问题你也许会觉得很容易回答，
Vue2 对数组的监测是通过重写数组原型上的 7 个方法来实现，然后你会说具体的实现，
接下来面试官可能会问你，为什么要改写数组原型上的 7 个方法，而不使用 Object.defineProperty，
是因为 Object.defineProperty 真的不能监听数组的变化吗？

其实 Object.defineProperty 是可以监听数组的变化的。

```javascript
const arr = [1, 2, 3]
arr.forEach((val, index) => {
    Object.defineProperty(arr, index, {
        get() {
            console.log('监听到了')
            return val
        },
        set(newVal) {
            console.log('变化了：', val, newVal)
            val = newVal
        }
    })
})
```

其实数组就是一个特殊的对象，它的下标就可以看作是它的 key。

所以 Object.defineProperty 也能监听数组变化，那么为什么 Vue2 弃用了这个方案呢？

首先这种直接通过下标获取数组元素的场景就比较少，
其次即便通过了 Object.defineProperty 对数组进行监听，但也监听不了 push、pop、shift 等对数组进行操作的方法，
所以还是需要通过对数组原型上的那 7 个方法进行重写监听。
所以为了性能考虑 Vue2 直接弃用了使用 Object.defineProperty 对数组进行监听的方案。

### Vue2 中是怎么监测数组的变化的？ {#vue2-watch-array-change}

通过上文我们知道如果使用 Object.defineProperty 对数组进行监听，
当通过 Array 原型上的方法改变数组内容的时候是无发触发 getter/setter 的，
Vue2 中是放弃了使用 Object.defineProperty 对数组进行监听的方案，
而是通过对数组原型上的 7 个方法进行重写进行监听的。

原理就是使用拦截器覆盖 Array.prototype，之后再去使用 Array 原型上的方法的时候，
其实使用的是拦截器提供的方法，在拦截器里面才真正使用原生 Array 原型上的方法去操作数组。

**拦截器**

```javascript
// 拦截器其实就是一个和 Array.prototype 一样的对象。
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function (method) {
    // 缓存原始方法
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            // 最终还是使用原生的 Array 原型方法去操作数组
            return original.apply(this, args)
        },
        eumerable: false,
        writable: false,
        configurable: true
    })
})
```

所以通过拦截器之后，我们就可以追踪到数组的变化了，然后就可以在拦截器里面进行依赖收集和触发依赖了。

接下来我们就使用拦截器覆盖那些进行了响应式处理的 Array 原型，数组也是一个对象，
通过上文我们可以知道 Vue2 是在 Observer 类里面对对象的进行响应式处理，并且给对象也进行一个依赖收集。
所以对数组的依赖处理也是在 Observer 类里面。

```javascript
class Observer {
    constructor(value) {
        this.value = value
        // 添加一个对象依赖收集的选项
        this.dep = new Dep()
        // 给响应式对象添加 __ob__ 属性，表明这是一个响应式对象
        def(value, '__ob__', this)
        // 如果是数组则通过覆盖数组的原型方法进行拦截操作
        if(Array.isArray(value)) {
          value.__proto__ = arrayMethods 
        } else {
            this.walk(value)
        }
    }
    // ...
}
```

在这个地方 Vue2 会进行一些兼容性的处理，
如果能使用 `__proto__` 就覆盖原型，
如果不能使用，则直接把那 7 个操作数组的方法直接挂载到需要被进行响应式处理的数组上，
因为当访问一个对象的方法时，只有这个对象自身不存在这个方法，才会去它的原型上查找这个方法。

数组如何收集依赖呢？

我们知道在数组进行响应式初始化的时候会在 `Observer` 类里面给这个数组对象的添加一个 `__ob__` 的属性，
这个属性的值就是 Observer 这个类的实例对象，而这个 `Observer` 类里面有存在一个收集依赖的属性 dep，
所以在对数组里的内容通过那 7 个方法进行操作的时候，会触发数组的拦截器，
那么在拦截器里面就可以访问到这个数组的 `Observer` 类的实例对象，从而可以向这些数组的依赖发送变更通知。

```javascript
// 拦截器其实就是一个和 Array.prototype 一样的对象。
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)
;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function (method) {
    // 缓存原始方法
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            // 最终还是使用原生的 Array 原型方法去操作数组
            const result = original.apply(this, args)
            // 获取 Observer 对象实例
            const ob = this.__ob__
            // 通过 Observer 对象实例上 Dep 实例对象去通知依赖进行更新
            ob.dep.notify()
        },
        eumerable: false,
        writable: false,
        configurable: true
    })
})
```

因为 Vue2 的实现方法决定了在 Vue2 中对数组的一些操作无法实现响应式操作，例如：

```javascript
this.list[0] = xxx
```

由于 Vue2 放弃了 Object.defineProperty 对数组进行监听的方案，所以通过下标操作数组是无法实现响应式操作的。

又例如：

```javascript
this.list.length = 0
```

这个动作在 Vue2 中也是无法实现响应式操作的。

#### 数组依赖的收集

其实不管是对象还是数组的依赖都是在 getter 中进行依赖收集的。

例如：
```text
{ list: [1,2,3,4] }
```

你要获取到 list 数组的内容，首先是通过 list 这个 key 进行获取的，
所以当通过 list 这个 key 进行获取数组内容的时候，就触发了 list 这个 key 的 getter。

在 getter 中会进行 key 的依赖收集，收集到的依赖保存在对应 key 的 Dep 对象中，
同时也会判断 key 的值，如果是一个对象，还会对这个对象进行依赖收集，
收集到的依赖则保存在这个对象的 `__ob__` 属性对象上的 Dep 上，
而这个 `__ob__` 属性对象就是上文中提到的 Observer 类，
在 Observer 类中也有一个 Dep 属性用于专门保存响应式对象的依赖的。
这样无论是对象还是数组数据都可以通过 `__ob__` 属性拿到 Observer 实例，
然后拿到 Observer 实例中的 dep。然后就可以进行相关的响应式依赖通知操作了。

### 实现Vue的数据双向绑定 {#vue2-bidirectional-data-binding}

**要求**

```html
<div id="app">
    <h3>数据的双向绑定</h3>
    <div class="cell">
        <div class="text" v-text="myHello"></div>
        <input class="input" type="text" v-model="myHello" >
        <div class="text" v-text="myWorld"></div>
        <input class="input" type="text" v-model="myWorld" >
    </div>
</div>
```

要求实现一个SimpleVue类，使得执行下面的代码可以实现双向数据绑定效果。

```javascript
// 创建SimpleVue实例
const app = new SimpleVue({
    el : '#app' ,
    data : {
        myHello : 'hello',
        myWorld : 'world',
    }
})
```

**实现**

```javascript
class SimpleVue {
    constructor (options){
        // 传入的配置参数
        this.options = options;
        // 根元素
        this.$el = document.querySelector(options.el);
        // 数据域
        this.$data = options.data;

        /**
         * 保存数据model与view相关的指令，
         * 当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
         */
        this._directives = {};
        // 数据劫持，重新定义数据的 set 和 get 方法
        this._obverse(this.$data);
        /**
         * 解析器，解析模板指令，
         * 并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，
         * 一旦数据有变动，收到通知，更新视图
         */
        this._compile(this.$el);
    }

    // _obverse 函数，对data进行处理，重写data的set和get函数
    _obverse(data) {
        // 遍历数据
        for (const key in data) {
            // 判断是不是属于自己本身的属性
            if (!data.hasOwnProperty(key)) {
                continue
            }

            /**
             * 这里的key是一种简单处理，
             * 其实在后续递归调用this._obverse时，是可能会出现重复的key的
             */
            this._directives[key] = [];

            let val = data[key];

            // 如果是对象，则继续递归遍历（这里简化了，只考虑对象这种单一场景）
            if (typeof val === 'object') {
                this._obverse(val);
            }

            // 初始当前数据的执行队列
            let _dir = this._directives[key];

            // 重新定义数据的 get 和 set 方法
            Object.defineProperty(this.$data, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return val;
                },
                set: function (newVal) {
                    if (val !== newVal) {
                        val = newVal;
                        /**
                         * 当 myHello等指令值改变时，
                         * 触发 _directives 中的绑定的Watcher类的更新
                         */
                        _dir.forEach((item) => {
                            //调用自身指令的更新操作
                            item._update();
                        })
                    }
                }
            })
        }
    }

    /**
     * 接着我们来看看 _compile 这个方法，它实际上是一个解析器，
     * 其功能就是解析模板指令，并将每个指令对应的节点绑定更新函数，
     * 添加监听数据的订阅者，一旦数据有变动，就收到通知，
     * 然后去更新视图变化，具体实现如下：
     *
     * 我们从根元素 #app 开始递归遍历每个节点，
     * 并判断每个节点是否有对应的指令，这里我们只针对 v-text 和 v-model，
     * 我们对 v-text 进行了一次 new Watcher()，
     * 并把它放到了 myHello 的指令集里面，对 v-model 也进行了解析，
     * 对其所在的 input 绑定了 input 事件，并将其通过 new Watcher() 与 myHello 关联起来
     */
    _compile(el){
        // 子元素
        const nodes = el.children;
        for (let i = 0, len = nodes.length;  i < len; i++){
            const node = nodes[i];

            // 递归：对所有子元素进行遍历，并进行处理
            if (node.children.length) {
                this._compile(node);
            }

            // 如果有 v-text 指令 , 监控 node的值 并及时更新
            if (node.hasAttribute('v-text')) {
                const attrValue = node.getAttribute('v-text');
                // 将指令对应的执行方法放入指令集
                this._directives[attrValue].push(
                    new Watcher('text', node, this, attrValue, 'innerHTML')
                )
            }

            /**
             * 如果有 v-model属性，
             * 并且元素是INPUT或者TEXTAREA，
             * 我们监听它的input事件
             */
            if (
                node.hasAttribute('v-model') &&
                ['INPUT', 'TEXTAREA'].includes(node.tagName)
            ){
                const _this = this;
                const attrValue = node.getAttribute('v-model');
                // 初始化赋值
                _this._directives[attrValue].push(
                    new Watcher('input', node, _this, attrValue, 'value')
                );
                // 添加input事件监听
                node.addEventListener('input', () => {
                    // 后面每次都会更新
                    _this.$data[attrValue] = node.value;
                }, { capture: false })
            }
        }
    }
}

/**
 * Watcher 其实就是订阅者，
 * 是 _observer 和 _compile 之间通信的桥梁，
 * 用来绑定更新函数，
 * 实现对 DOM 元素的更新。
 *
 * 每次创建 Watcher 的实例，都会传入相应的参数，
 * 也会进行一次 _update 操作，上述的 _compile 中，
 * 我们创建了两个 Watcher 实例，不过这两个对应的 _update 操作不同而已，
 * 对于 div.text 的操作其实相当于 div.innerHTML=h3.innerHTML = this.data.myHello，
 * 对于 input 相当于 input.value=this.data.myHello，
 * 这样每次数据 set 的时候，我们会触发两个 _update 操作，
 * 分别更新 div 和 input 中的内容~
 */
class Watcher {
    /*
    * name  指令名称，例如文本节点"text"、输入框'input'
    * el    指令对应的DOM元素
    * vm    指令所属SimpleVue实例
    * exp   指令对应的值，如'myHello'
    * attr  绑定的属性值，本例为"innerHTML"
    * */
    constructor (name, el, vm, exp, attr){
        this.name = name;
        this.el = el;
        this.vm = vm;
        this.exp = exp;
        this.attr = attr;

        // 更新操作
        this._update();
    }

    _update(){
        this.el[this.attr] = this.vm.$data[this.exp];
    }
}
```

### 总结 {#vue2-conclusion}

Vue2 是通过 Object.defineProperty 将对象的属性转换成 getter/setter 的形式来进行监听它们的变化，
当读取属性值的时候会触发 getter 进行依赖收集，
当设置对象属性值的时候会触发 setter 进行向相关依赖发送通知，从而进行相关操作。

由于 Object.defineProperty 只对属性 key 进行监听，无法对引用对象进行监听，
所以在 Vue2 中创建一个了 Observer 类对整个对象的依赖进行管理，
当对响应式对象进行新增或者删除则由响应式对象中的 dep 通知相关依赖进行更新操作。

Object.defineProperty 也可以实现对数组的监听的，但因为性能的原因 Vue2 放弃了这种方案，
改由重写数组原型对象上的 7 个能操作数组内容的变更的方法，从而实现对数组的响应式监听。
