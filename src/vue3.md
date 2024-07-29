[[toc]]

## Vue3 {#vue3}

### Vue3 的响应式原理 {#vue3-reactive}

Vue3 是通过 Proxy 对数据实现 getter/setter 代理，从而实现响应式数据，
然后在副作用函数中读取响应式数据的时候，就会触发 Proxy 的 getter，
在 getter 里面把对当前的副作用函数保存起来，
将来对应响应式数据发生更改的话，则把之前保存起来的副作用函数取出来执行。

具体是副作用函数里面读取响应式对象的属性值时，
会触发代理对象的 getter，然后在 getter 里面进行一定规则的依赖收集保存操作。

**简单代码实现：**

```javascript
// 使用一个全局变量存储被注册的副作用函数
let activeEffect
// 注册副作用函数
function effect(fn) {
    activeEffect = fn
    fn()
}
const obj = new Proxy(data, {
    // getter 拦截读取操作
    get(target, key) {
        // 将副作用函数 activeEffect 添加到存储副作用函数的全局变量 targetMap 中
        track(target, key)
        // 返回读取的属性值
        return Reflect.get(target, key)
    },
    // setter 拦截设置操作
    set(target, key, val) {
        // 设置属性值
        const result = Reflect.set(target, key, val)
        // 把之前存储的副作用函数取出来并执行
        trigger(target, key)
        return result
    }
})
// 存储副作用函数的全局变量
const targetMap = new WeakMap()
// 在 getter 拦截器内追踪依赖的变化
function track(target, key) {
    // 没有 activeEffect，直接返回
    if(!activeEffect) return
    // 根据 target 从全局变量 targetMap 中获取 depsMap
    let depsMap = targetMap.get(target)
    if(!depsMap) {
       // 如果 depsMap 不存，那么需要新建一个 Map 并且与 target 关联
       depsMap = new Map()
       targetMap.set(target, depsMap)
    }
    // 再根据 key 从 depsMap 中取得 deps, deps 里面存储的是所有与当前 key 相关联的副作用函数
    let deps = depsMap.get(key)
    if(!deps) {
       // 如果 deps 不存在，那么需要新建一个 Set 并且与 key 关联
       deps = new Set()
       depsMap.set(key, deps)
    }
    // 将当前的活动的副作用函数保存起来
    deps.add(activeEffect)
}
// 在 setter 拦截器中触发相关依赖
function trgger(target, key) {
    // 根据 target 从全局变量 targetMap 中取出 depsMap
    const depsMap = targetMap.get(target)
    if(!depsMap) return
    // 根据 key 取出相关联的所有副作用函数
    const effects = depsMap.get(key)
    // 执行所有的副作用函数
    effects && effects.forEach(fn => fn())
}
```

通过上面的代码我们可以知道 Vue3 中依赖收集的规则，
首先把响应式对象作为 key，一个 Map 的实例做为值方式存储在一个 WeakMap 的实例中，
其中这个 Map 的实例又是以响应式对象的 key 作为 key, 值为一个 Set 的实例为值。
而且这个 Set 的实例中存储的则是跟那个响应式对象 key 相关的副作用函数。

**那么为什么 Vue3 的依赖收集的数据结构这里采用 WeakMap 呢？**

所以我们需要解析一下 WeakMap 和 Map 的区别，
首先 WeakMap 是可以接受一个对象作为 key 的，而 WeakMap 对 key 是弱引用的。
所以当 WeakMap 的 key 是一个对象时，一旦上下文执行完毕，WeakMap 中 key 对象没有被其他代码引用的时候，
**垃圾回收器** 就会把该对象从内存移除，我们就无法通过该对象从 WeakMap 中获取内容了。

另外副作用函数使用 Set 类型，是因为 Set 类型能自动去除重复内容。

上述方法只实现了对引用类型的响应式处理，因为 Proxy 的代理目标必须是非原始值。
原始值指的是 Boolean、Number、BigInt、String、Symbol、undefined 和 null 等类型的值。
在 JavaScript 中，原始值是按值传递的，而非按引用传递。
这意味着，如果一个函数接收原始值作为参数，那么形参与实参之间没有引用关系，它们是两个完全独立的值，对形参的修改不会影响实参。

Vue3 中是通过对原始值做了一层包裹的方式来实现对原始值变成响应式数据的。
最新的 Vue3 实现方式是通过属性访问器 getter/setter 来实现的。

```javascript
class RefImpl{
    private _value
    public dep
    // 表示这是一个 Ref 类型的响应式数据
    private _v_isRef = true
    constructor(value) {
        this._value = value
        // 依赖存储
        this.dep = new Set()
    }
	  // getter 访问拦截
    get value() {
        // 依赖收集
        trackRefValue(this)
        return this._value
    }
	  // setter 设置拦截
    set value(newVal) {
        this._value = newVal
        // 触发依赖
        triggerEffect(this.dep)   
    }
}
```

ref 本质上是一个实例化之后的 “包裹对象”，
因为 Proxy 无法提供对原始值的代理，所以我们需要使用一层对象作为包裹，间接实现原始值的响应式方案。
由于实例化之后的 “包裹对象” 本质与普通对象没有任何区别，所以为了区分 ref 与 Proxy 响应式对象，
我们需要给 ref 的实例对象定义一个 `_v_isRef` 的标识，表明这是一个 ref 的响应式对象。

最后我们和 Vue2 进行一下对比，我们知道 Vue2 的响应式存在很多的问题，例如：

- 初始化时需要遍历对象所有 key，如果对象层次较深，性能不好
- 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
- 无法监听到数组元素的变化，只能通过劫持重写了几个数组方法
- 动态新增，删除对象属性无法拦截，只能用特定 set/delete API 代替
- 不支持 Map、Set 等数据结构

而 Vue3 使用 Proxy 实现之后，以上的问题都不存在了。

### Vue3 中是如何监测数组变化的？ {#vue3-watch-array-change}

我们知道在 Vue2 中是需要对数组的监听进行特殊的处理的，其实在 Vue3 中也需要对数组进行特殊处理。
在 Vue2 是不可以通过数组下标对响应式数组进行设置和读取的，而 Vue3 中是可以的，
但是数组中仍然有很多其他特别的读取和设置的方法，
这些方法没经过特殊处理，是无法通过普通的 Proxy 中的 getter/setter 进行响应式处理的。

**数组中对属性或元素进行读取的操作方法。**

- 通过索引访问数组的元素值
- 访问数组的长度
- 把数组作为对象，使用 for ... in 循环遍历
- 使用 for ... of 迭代遍历数组
- 数组的原型方法，如 concat、join、every、some、find、findIndex、includes 等

**数组中对属性或元素进行设置的操作方法。**

- 通过索引修改数组的元素值
- 修改数组的长度
- 数组的栈方法
- 修改原数组的原型方法：splice、fill、sort 等

当上述的数组的读取或设置的操作发生时，也应该正确地建立响应式联系或触发响应。

当通过索引设置响应式数组的时候，有可能会隐式修改数组的 length 属性，
例如设置的索引值大于数组当前的长度时，那么就要更新数组的 length 属性，
因此在触发当前的修改属性的响应之外，也需要触发与 length 属性相关依赖进行重新执行。

遍历数组，使用 for ... in 循环遍历数组与遍历常规对象是一致的，
也可以使用 ownKeys 拦截器进行设置。
而影响 for ... in 循环对数组的遍历会是添加新元素：`arr[0] = 1` 或者修改数组长度：`arr.length = 0`，
其实无论是为数组添加新元素，还是直接修改数组的长度，本质上都是因为修改了数组的 length 属性。
所以在 ownKeys 拦截器内进行判断，如果是数组的话，就使用 length  属性作为 key 去建立响应联系。

**在 Vue3 中也需要像 Vue2 那样对一些数组原型上方法进行重写。**

当数组响应式对象使用 includes、indexOf、lastIndexOf 这方法的时候，
它们内部的 this 指向的是代理对象，并且在获取数组元素时得到的值要也是代理对象，
所以当使用原始值去数组响应式对象中查找的时候，如果不进行特别的处理，是查找不到的，
所以我们需要对上述的数组方法进行重写才能解决这个问题。

首先 arr.indexOf 可以理解为读取响应式对象 arr 的 indexOf 属性，
这就会触发 getter 拦截器，在 getter 拦截器内我们就可以判断 target 是否是数组，
如果是数组就看读取的属性是否是我们需要重写的属性，如果是，则使用我们重写之后的方法。

```javascript
const arrayInstrumentations = {}
;(['includes', 'indexOf', 'lastIndexOf']).forEach(key => {
  const originMethod = Array.prototype[key]
  arrayInstrumentations[key] = function(...args) {
    // this 是代理对象，先在代理对象中查找
    let res = originMethod.apply(this, args)

    if(res === false) {
       // 在代理对象中没找到，则去原始数组中查找
       res = originMethod.apply(this.raw, args)
    }
    // 返回最终的值
    return res
  }
})
```

上述重写方法的主要是实现先在代理对象中查找，
如果没找到，就去原始数组中查找，结合两次的查找结果才是最终的结果，
这样就实现了在代理数组中查找原始值也可以查找到。

在一些数组的方法中除了修改数组的内容之外也会隐式地修改数组的长度。例如下面的例子：

```javascript
const arr = new Proxy([1], {
    get(target, key) {
        console.log(`读取`, target, key)
        return target[key]
    },
    set(target, key, val) {
        console.log('设置', key, val)
        /**
         * 注意这里需要return一下，否则会因为返回undefined报错：
         * VM680:1 Uncaught TypeError:
         * 'set' on proxy: trap returned falsish for property '1'
         * at Proxy.push (<anonymous>)
         * at <anonymous>:1:5
         */
        return Reflect.set(target, key, val)
    }
})

arr.push(2)
```

上述代码执行后，控制台输入内容如下：

```text
读取 [1] push
读取 [1] length
设置 1 2
设置 length 2
```

我们可以看到我们只是进行 arr.push 的操作却也触发了 getter 拦截器，
并且触发了两次，其中一次就是数组 push 属性的读取，还有一次是什么呢？
还有一次就是调用 push 方法会间接读取 length 属性，
那么问题来了，进行了 length 属性的读取，也就会建立 length 的响应依赖，
可 `arr.push` 本意只是修改操作，并不需要建立 length 属性的响应依赖。
所以我们需要 “屏蔽” 对 length 属性的读取，从而避免在它与副作用函数之间建立响应联系。

**相关代码实现如下：**

```javascript
const arrayInstrumentations = {}
// 是否允许追踪依赖变化
let shouldTrack = true
// 重写数组的 push、pop、shift、unshift、splice 方法
;['push','pop','shift', 'unshift', 'splice'].forEach(method => {
    // 取得原始的数组原型上的方法
    const originMethod = Array.prototype[method]
    // 重写
    arrayInstrumentations[method] = function(...args) {
        // 在调用原始方法之前，禁止追踪
        shouldTrack = false
        // 调用数组的默认方法
        let res = originMethod.apply(this, args)
        // 在调用原始方法之后，恢复允许进行依赖追踪
        shouldTrack = true
        return res
    }
})
```

在调用数组的默认方法间接读取 length 属性之前，禁止进行依赖跟踪，
这样在间接读取 length 属性时，由于是禁止依赖跟踪的状态，
所以 length 属性与副作用函数之间不会建立响应联系。

### 常见疑问

**对于基本数据类型ref的处理方式还是Object.defineProperty的get()和set()完成。这说法对吗？**

从原理上来说不是的，是使用对象的属性的赋值器（setter）和取值器（getter），
而不是Object.defineProperty，Object.defineProperty 是重新定义，劫持属性的访问和设置。

但从实际上来说是对的，因为用babe转译后就是Object.defineProperty。

### 总结 {#vue3-conclusion}

Vue3 则是通过 Proxy 对数据实现 getter/setter 代理，从而实现响应式数据，
然后在副作用函数中读取响应式数据的时候，就会触发 Proxy 的 getter，
在 getter 里面把对当前的副作用函数保存起来，
将来对应响应式数据发生更改的话，则把之前保存起来的副作用函数取出来执行。

Vue3 对数组实现代理时，用于代理普通对象的大部分代码可以继续使用，
但由于对数组的操作与对普通对象的操作存在很多的不同，
那么也需要对这些不同的操作实现正确的响应式联系或触发响应。
这就需要对数组原型上的一些方法进行重写。

比如通过索引为数组设置新的元素，可能会隐式地修改数组的 length 属性的值。
同时如果修改数组的 length 属性的值，也可能会间接影响数组中的已有元素。
另外用户通过 includes、indexOf 以及 lastIndexOf 等对数组元素进行查找时，
可能是使用代理对象进行查找，也有可能使用原始值进行查找，
所以我们就需要重写这些数组的查找方法，从而实现用户的需求。
原理很简单，当用户使用这些方法查找元素时，先去响应式对象中查找，如果没找到，则再去原始值中查找。

另外如果使用 push、pop、shift、unshift、splice 这些方法操作响应式数组对象时会间接读取和设置数组的 length 属性，
所以我们也需要对这些数组的原型方法进行重写，让当使用这些方法间接读取 length 属性时禁止进行依赖追踪，
这样就可以断开 length 属性与副作用函数之间的响应式联系了。
