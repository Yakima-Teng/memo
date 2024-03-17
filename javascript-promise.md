[[toc]]

## Promise的实现 {#promise}

### 简单版Promise {#simple-promise}

```javascript
class SimplePromise {
    // pending 初始状态，既不是成功，也不是失败状态。等待resolve或者reject调用更新状态。
    static pending = 'pending'
    // fulfilled 意味着操作成功完成。pending转换为fulfilled，只能由resolve方法完成转换
    static fulfilled = 'fulfilled'
    // rejected 意味着操作失败。pending转换为rejected，只能由reject方法完成转换
    static rejected = 'rejected'

    callbacks = []

    constructor(executor) {
        // 初始化状态为pending
        this.status = SimplePromise.pending
        // 存储 this._resolve 即操作成功 返回的值
        this.value = undefined
        // 存储 this._reject 即操作失败 返回的值
        this.reason = undefined
        /**
         * 存储then中传入的参数
         * 至于为什么是数组呢？因为同一个Promise的then方法可以调用多次
         * 比如:
         * const p = new Promise((resolve, reject) => resolve('3'));
         * p.then(console.log);
         * p.then(console.log);
         * 上面后面的两句p.then(console.log)都会打印'3'，
         * 都是基于p的结果3进行处理的（两个p.then互相无关）
         */
        this.callbacks = [];
        // 这里绑定this是为了防止执行时this的指向改变，this的指向问题，这里不过多赘述
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
        this.value = value
        // 将状态设置为成功
        this.status = SimplePromise.fulfilled
        
        // 通知事件执行
        this.callbacks.forEach((cb) => this._handler(cb))
    }

    _reject(reason) {
        this.reason = reason
        // 将状态设置为失败
        this.status = SimplePromise.rejected

        // 通知事件执行
        this.callbacks.forEach((cb) => this._handler(cb))
    }

    _handler(callback) {
        const { onFulfilled, onRejected } = callback;

        if (this.status === SimplePromise.fulfilled && onFulfilled) {
            // 传入存储的值
            onFulfilled(this.value);
        }

        if (this.status === SimplePromise.rejected && onRejected) {
            // 传入存储的错误信息
            onRejected(this.reason);
        }
    }
}
```

### 支持链式调用的Promise {#chainable-promise}

**要求下面打印出来1、3**
```javascript
const p = new ChainablePromise((resolve) => {
    resolve(1)
})
p
    .then((val) => {
        console.log(val)
        return 3
    }, (reason) => {
        console.log(reason)
    })
    .then((val) => {
        console.log(val)
    }, (reason) => {
        console.log(reason)
    })
```

**实现方式**

```javascript
class ChainablePromise {
    static pending = 'pending';
    static fulfilled = 'fulfilled';
    static rejected = 'rejected';

    constructor(executor) {
        this.status = ChainablePromise.pending; // 初始化状态为pending
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
        // 返回一个新的Promise
        return new ChainablePromise((nextResolve, nextReject) => {
            /**
             * 这里之所以把下一个Promise的resolve函数和reject函数也存在callback中
             * 是为了将onFulfilled的执行结果
             * 通过nextResolve传入到下一个Promise作为它的value值
             */
            this._handler({
                nextResolve,
                nextReject,
                onFulfilled,
                onRejected
            });
        });
    }

    _resolve(value) {
        /**
         * 处理onFulfilled执行结果是一个Promise时的情况
         * 这里可能理解起来有点困难
         * 当value instaneof ChainablePromise时，
         * 说明当前Promise肯定不会是第一个Promise
         * 而是后续then方法返回的Promise（第二个Promise）
         *
         * 我们要获取的是value中的value值
         * （有点绕，value是个promise时，那么内部存有个value的变量）
         *
         * 怎样将value的value值获取到呢，
         * 可以将传递一个函数作为value.then的onFulfilled参数
         *
         * 那么在value的内部则会执行这个函数，
         * 我们只需要将当前Promise的value值赋值为value的value即可
         */
        if (value instanceof ChainablePromise) {
            value.then(
                this._resolve.bind(this),
                this._reject.bind(this)
            );
            return;
        }

        this.value = value;
        this.status = ChainablePromise.fulfilled; // 将状态设置为成功

        // 通知事件执行
        this.callbacks.forEach(cb => this._handler(cb));
    }

    _reject(reason) {
        if (reason instanceof ChainablePromise) {
            reason.then(
                this._resolve.bind(this),
                this._reject.bind(this)
            );
            return;
        }

        this.reason = reason;
        this.status = ChainablePromise.rejected; // 将状态设置为失败

        this.callbacks.forEach(cb => this._handler(cb));
    }

    _handler(callback) {
        const {
            onFulfilled,
            onRejected,
            nextResolve,
            nextReject
        } = callback;

        if (this.status === ChainablePromise.pending) {
            this.callbacks.push(callback);
            return;
        }

        if (this.status === ChainablePromise.fulfilled) {
            // 传入存储的值
            // 未传入onFulfilled时，value传入
            const nextValue = onFulfilled
                ? onFulfilled(this.value)
                : this.value;
            nextResolve(nextValue);
            return;
        }

        if (this.status === ChainablePromise.rejected) {
            // 传入存储的错误信息
            // 同样的处理
            const nextReason = onRejected
                ? onRejected(this.reason)
                : this.reason;
            nextReject(nextReason);
        }
    }
}

const p = new ChainablePromise((resolve) => {
    resolve(1)
})
p
    .then((val) => {
        console.log(val)
        return 3
    }, (reason) => {
        console.log(reason)
    })
    .then((val) => {
        console.log(val)
    }, (reason) => {
        console.log(reason)
    })
```
