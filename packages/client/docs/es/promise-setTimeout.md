# Promise和setTimeout执行顺序

![](https://pic1.zhimg.com/80/v2-96a9f64788d8831c2b9e193ef38fdda0_1440w.jpg)

上面的执行结果是2，1。

从规范上来讲，setTimeout有一个4ms的最短时间，也就是说不管你设定多少，反正最少都要间隔4ms（不是精确时间间隔）才运行里面的回调。
而Promise的异步没有这个问题。

从具体实现上来说，这两个的异步队列不一样，Promise所在的那个异步队列优先级要高一些。具体讲解看第二个例子：

![](https://pic4.zhimg.com/80/v2-b64bd5dd66fb75c287ea2110ec3b8dcb_1440w.jpg)

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

## 参考资料

- [Promise和setTimeout执行顺序](https://zhuanlan.zhihu.com/p/86295065)
