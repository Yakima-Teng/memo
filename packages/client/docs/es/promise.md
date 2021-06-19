# Promise的实现

## 1、简单版Promise

**1. promise是一个类，它的构造函数接受一个函数，函数的两个参数也都是函数**

第一点比较简单

```js
// 这里没有使用Promise作为类名是为了方便测试
class WPromise {
    constructor(executor) {
        // 这里绑定this是为了防止执行时this的指向改变，this的指向问题，这里不过多赘述
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve() {}

    _reject() {}
}
```

**2. 在传入的函数中执行resolve表示成功，执行reject表示失败，传入的值会传给then方法的回调函数**

成功、失败，这个很容易想到使用一个状态进行标记，实际上Promise就是这样做的。
在Promise中使用了pending、fulfilled、rejected来标识当前的状态。

- pending 初始状态，既不是成功，也不是失败状态。等待resolve或者reject调用更新状态。
- fulfilled 意味着操作成功完成。
- rejected 意味着操作失败。

需要注意的一点是，这三个状态之间只存在两个变换关系：

- pending转换为fulfilled，只能由resolve方法完成转换
- pending转换为rejected，只能由reject方法完成转换

传入的值会传给then的回调函数，怎么传递呢？显然我们将对resolve和reject的值做一个保存。

将上面的状态和值添加到Promise。

```js
class WPromise {
    static pending = 'pending';
    static fulfilled = 'fulfilled';
    static rejected = 'rejected';

    constructor(executor) {
        this.status = WPromise.pending; // 初始化状态为pending
        this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
        this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(value) {
        this.value = value;
        this.status = WPromise.fulfilled; // 将状态设置为成功
    }

    _reject(reason) {
        this.reason = reason;
        this.status = WPromise.rejected; // 将状态设置为失败
    }
}
```

**3. Promise有一个叫做then的方法，该方法有两个参数，第一个参数是成功之后执行的回调函数，第二个参数是失败之后执行的回调函数。then方法在resolve或者reject执行之后才会执行，并且then方法中的值是传给resolve或reject的参数**

这句话有点长，需要注意的是这句then方法在resolve或者reject执行之后才会执行，
我们知道Promise是异步的，也就是说then传入的函数是不能立马执行，
需要存储起来，在resolve函数执行之后才拿出来执行。

换句话说，这个过程有点类似于发布订阅者模式：
我们使用then来注册事件，那什么时候来通知这些事件是否执行呢？
答案就是在resolve方法执行或者reject方法执行时。

ok, 继续完善我们的代码。

```javascript
class WPromise {
    static pending = "pending";
    static fulfilled = "fulfilled";
    static rejected = "rejected";

    constructor(executor) {
        this.status = WPromise.pending; // 初始化状态为pending
        this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
        this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
        // 存储then中传入的参数
        // 至于为什么是数组呢？因为同一个Promise的then方法可以调用多次
        this.callbacks = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    // onFulfilled 是成功时执行的函数
    // onRejected 是失败时执行的函数
    then(onFulfilled, onRejected) {
        // 这里可以理解为在注册事件
        // 也就是将需要执行的回调函数存储起来
        this.callbacks.push({
            onFulfilled,
            onRejected,
        });
    }

    _resolve(value) {
        this.value = value;
        this.status = WPromise.fulfilled; // 将状态设置为成功

        // 通知事件执行
        this.callbacks.forEach((cb) => this._handler(cb));
    }

    _reject(reason) {
        this.reason = reason;
        this.status = WPromise.rejected; // 将状态设置为失败

        this.callbacks.forEach((cb) => this._handler(cb));
    }

    _handler(callback) {
        const { onFulfilled, onRejected } = callback;

        if (this.status === WPromise.fulfilled && onFulfilled) {
            // 传入存储的值
            onFulfilled(this.value);
        }

        if (this.status === WPromise.rejected && onRejected) {
            // 传入存储的错误信息
            onRejected(this.reason);
        }
    }
}
```

从上面的输出结果来看，暂时是没什么问题的。接下来就是需要重点关注的链式调用问题了。

## 2、重难点：链式调用



## 参考资料

- [手写Promise - 实现一个基础的Promise](https://segmentfault.com/a/1190000023180502)
