[[toc]]

## 事件循环 {#event-loop}

### 微任务和宏任务 {#micro-macro-task}

除了广义的同步任务和异步任务，我们可以分的更加精细一点：

- macro-task（宏任务）：包括整体代码脚本、`setTimeout`、`setInterval`
- micro-task（微任务）：`Promise`、`process.nextTick`

不同类型的任务会进入到不同的 **事件队列（event queue）**。相同类型的任务会进入相同的事件队列。比如 `setTimeout` 和 `setInterval` 会进入相同的事件队列。

![事件循环，宏任务，微任务的关系图](./attachments/event-loop.webp)

先看一个例子：

```javascript
setTimeout(function() {
    console.log('setTimeout');
}, 0)

new Promise(function(resolve) {
    console.log('promise');
    resolve(true)
    console.log('after resolve')
}).then(function() {
    console.log('then');
})

console.log('console');

// promise
// after resolve
// console
// then
// setTimeout
```

1. 首先会遇到setTimeout,将其放到宏任务event queue里面
2. 然后回到promise，new promise会立即执行，then会分发到微任务
3. 遇到 console 立即执行
4. 整体宏任务执行完成，接下来判断是否有微任务，刚刚放到微任务里面的then，执行
5. ok，第一轮事件结束，进行第二轮，刚刚我们放在event queue的setTimeout函数进入到宏任务，立即执行
6. 结束

### 为何要区分微任务和宏任务 {#why-differ-micro-macro-task}

区分微任务和宏任务是为了将异步队列任务划分优先级，通俗的理解就是为了插队。

一个事件队列（Event Loop）中，**microtask** 是在 **macrotask** 之后被调用的，**microtask** 会在下一个 Event Loop 之前执行完，**并且会将 **microtask** 执行当中新注册的 `Microtask` 一并调用执行完，**然后才开始下一次 Event Loop，所以如果有新的 Macrotask 就需要一直等待，等到上一个 Event Loop 当中 Microtask 被清空为止。由此可见，**我们可以在下一次 Event Loop 之前进行插队。**

如果不区分 Microtask 和 Macrotask，那就无法在下一次 Event Loop 之前进行插队，其中新注册的任务得等到下一个 Macrotask 完成之后才能进行，这中间可能你需要的状态就无法在下一个 Macrotask 前得到同步。

### setTimeout的时间误差 {#set-timeout-accuracy}

在使用setTimeout的时候，经常会发现设定的时间与自己设定的时间有差异。

如果改成下面这段会发现执行时间远远超过预定的时间：

```javascript
setTimeout(() => {
    task()
},3000)

sleep(10000000)
```

这是为何？

我们来看一下是怎么执行的：

1. task()进入到event table里面注册计时
2. 然后主线程执行sleep函数，但是非常慢。计时任然在继续
3. 3秒到了。task()进入event queue 但是主线程依旧没有走完
4. 终于过了10000000ms之后主线程走完了，task()进入到主线程
5. 所以可以看出其真实的时间是远远大于3秒的

### setTimeout第二个参数最小值 {#set-timeout-parameter}

HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，
如果低于这个值，就会自动增加。
在此之前，老版本的浏览器都将最短间隔设为10毫秒。

### promise和process.nextTick {#process-next-tick}

process.nextTick(callback)类似Node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

### 几个例子 {#event-loop-examples}

**例1**

```javascript
setTimeout(() => {
    console.log(1)
}, 0)
new Promise((resolve) => {
    resolve()
}).then(() => {
    console.log(2)
})
```

上面的执行结果是2，1。

从规范上来讲，setTimeout有一个4ms的最短时间，也就是说不管你设定多少，反正最少都要间隔4ms（不是精确时间间隔）才运行里面的回调。
而Promise的异步没有这个问题。

从具体实现上来说，这两个的异步队列不一样，Promise所在的那个异步队列优先级要高一些。

**例2**

```javascript
(function () {
    setTimeout(() => {
        console.log(4)
    }, 0)
    new Promise((resolve) => {
        console.log(1)
        for (let i = 0; i < 10000; i++) {
            i === 9999 && resolve(null)
        }
        console.log(2)
    }).then(() => {
        console.log(5)
    })
    console.log(3)
})()
```

执行结果1，2，3，5，4

为什么执行这样的结果？

1、创建Promise实例是同步执行的。所以先输出1，2，3，这三行代码都是同步执行。

2、promise.then和setTimeout都是异步执行，会先执行谁呢？

setTimeout异步会放到异步队列中等待执行。

promise.then异步会放到microtask queue中。
microtask队列中的内容经常是为了需要直接在当前脚本执行完后立即发生的事，
所以当同步脚本执行完之后，就调用microtask队列中的内容，
然后把异步队列中的setTimeout放入执行栈中执行，
所以最终结果是先执行promise.then异步，然后再执行setTimeout异步。

这是由于：

Promise 的回调函数属于异步任务，会在同步任务之后执行。
但是，Promise的回调函数不是正常的异步任务，而是微任务（microtask）。
它们的区别在于，正常任务追加到下一轮事件循环，微任务追加到本轮事件循环。
这意味着，微任务的执行时间一定早于正常任务。
注意：目前microtask队列中常用的就是promise.then。

**例3**

```javascript
setTimeout(() => {
    console.log(7)
}, 0)
new Promise((resolve, reject) => {
    console.log(3);
    resolve();
    console.log(4);
}).then(() => {
    console.log(6)
})
console.log(5)
```

执行结果3，4，5，6，7

**例4**

```javascript
console.log(1)
const promise = new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
        resolve(3)
        reject(4)
    }, 0)
})

promise.then((data) => {
    console.log(data)
}).catch((err) => {
    console.log('6')
    console.log(err)
})

promise.then((data) => {
    console.log(data)
}).catch((err) => {
    console.log('7')
    console.log(err)
})

console.log(5)
```

上面这段代码会输出：1、2、5、3、3。

::: tip promise 的 resolve、reject

这里需要注意，promise 被 `resolve` 后再触发 `reject` 是无效的，不会触发 `promise.catch` 回调。

:::
