[[toc]]

## Promise的实现 {#promise}

### 简单版Promise {#simple-promise}

```javascript
class SimplePromise {
    /**
     * pending 初始状态，既不是成功，也不是失败状态。
     * 等待 resolve 或者 reject 调用更新状态。
     */
    static pending = 'pending'
    /**
     * fulfilled 意味着操作成功完成。
     * 状态从 pending 转换为 fulfilled，只能由 resolve 方法完成转换
     */
    static fulfilled = 'fulfilled'
    /**
     * rejected 意味着操作失败。
     * 状态从 pending 转换为 rejected，只能由 reject 方法完成转换
     */
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
         * 存储 `then` 中传入的参数
         * 至于为什么是数组呢？
         * 因为同一个 Promise 的 `then` 方法可以调用多次。
         * 比如:
         * ```javascript
         * const p = new Promise(
         *     (resolve, reject) => resolve('3')
         * );
         * p.then(console.log);
         * p.then(console.log);
         * ```
         * 上面后面的两句 `p.then(console.log)` 都会打印 '3'，
         * 都是基于 p 的结果 3 进行处理的（两个 `p.then` 互相无关）
         */
        this.callbacks = [];
        // 这里绑定 this 是为了防止执行时 this 的指向被改
        executor(
            this._resolve.bind(this),
            this._reject.bind(this)
        );
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

        if (
            this.status === SimplePromise.fulfilled &&
            onFulfilled
        ) {
            // 传入存储的值
            onFulfilled(this.value);
        }

        if (
            this.status === SimplePromise.rejected &&
            onRejected
        ) {
            // 传入存储的错误信息
            onRejected(this.reason);
        }
    }
}
```

### 支持链式调用的 Promise {#chainable-promise}

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
        // 初始化状态为pending
        this.status = ChainablePromise.pending;
        // 存储 this._resolve 即操作成功 返回的值
        this.value = undefined;
        // 存储 this._reject 即操作失败 返回的值
        this.reason = undefined;
        /**
         * 存储 then 中传入的参数
         * 至于为什么是数组呢？
         * 因为同一个 Promise 的 then 方法可以调用多次
         */
        this.callbacks = [];
        executor(
            this._resolve.bind(this),
            this._reject.bind(this)
        );
    }

    /**
     * onFulfilled 是成功时执行的函数
     * onRejected 是失败时执行的函数
     */
    then(onFulfilled, onRejected) {
        // 返回一个新的Promise
        return new ChainablePromise((
            nextResolve,
            nextReject
        ) => {
            /**
             * 这里之所以把下一个 Promise 的 resolve 函数
             * + 和 reject 函数也存在 callback 中
             * 是为了将 onFulfilled 的执行结果
             * 通过 nextResolve 传入到下一个 Promise
             * + 作为它的 value 值
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
         * 处理 onFulfilled 执行结果是一个 Promise 时的情况
         * 这里可能理解起来有点困难
         * 当 value instaneof ChainablePromise 时，
         * 说明当前 Promise 肯定不会是第一个 Promise
         * 而是后续 then 方法返回的 Promise（第二个 Promise）
         *
         * 我们要获取的是 value 中的 value 值
         * （
         * 有点绕，value 是个 promise 时，
         * 那么内部存有个 value 的变量
         * ）
         *
         * 怎样将 value 的 value 值获取到呢，
         * 可以将传递一个函数作为 value.then 的 onFulfilled 参数
         *
         * 那么在 value 的内部则会执行这个函数，
         * 我们只需要将当前 Promise 的 value 值
         * + 赋值为 value 的 value 即可
         */
        if (value instanceof ChainablePromise) {
            value.then(
                this._resolve.bind(this),
                this._reject.bind(this)
            );
            return;
        }

        this.value = value;
        // 将状态设置为成功
        this.status = ChainablePromise.fulfilled;

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
        // 将状态设置为失败
        this.status = ChainablePromise.rejected;

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
            // 未传入 onFulfilled 时，传入 value
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
