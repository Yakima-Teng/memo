[[toc]]

## 闭包 {#closure}

闭包（closure）指有权访问另一个函数作用域中变量的函数。

闭包的作用：

- 延伸变量作用域范围，读取函数内部的变量。
- 让这些变量的值始终保持在内存中。

**闭包案例1**

```javascript
function fn1() {
    var num = 10;
    function fn2() {
        console.log(num);
    }
    fn2();
}
fn1(); //输出结果10
```

fn2的作用域当中访问到了fn1函数中的num这个局部变量，
所以此时 **fn1** 就是一个闭包函数（被访问的变量所在的函数就是一个闭包函数）。

**闭包案例2**

另一个例子：

```javascript
function fn() {
    var num = 10;
    return function() {
        console.log(num);
    }
}
var f = fn();
// 上面这步类似于
// var f = function() {
//         console.log(num);
//     }
f();//输出结果10
```

在上例中我们做到了在 fn() 函数外面访问 fn() 中的局部变量 num 。
闭包延伸了变量作用域范围，读取了函数内部的变量。

**闭包案例3**

```javascript
const fn = function() {
    let sum = 0
    return function(){
        sum++
        console.log(sum);
    }
}
fn()() //1
fn()() //1
//fn()进行sum变量申明并且返回一个匿名函数，第二个()意思是执行这个匿名函数
```

我这里直接简单解释一下，执行fn()() 后，fn()()已经执行完毕，
没有其他资源在引用fn，此时内存回收机制会认为fn不需要了，就会在内存中释放它。

那如何不被回收呢？

```javascript
const fn = function() {
    let sum = 0
    return function(){
        sum++
        console.log(sum);
    }
}
fn1 = fn()
// 1
fn1()
// 2
fn1()
// 3
fn1()
```

这种情况下，`fn1` 一直在引用 `fn()`，此时内存就不会被释放，就能实现值的累加。
那么问题又来了，这样的函数如果太多，就会造成内存泄漏。

内存泄漏了怎么办呢？我们可以手动释放一下。

```javascript
const fn = function() {
    let sum = 0
    return function(){
        sum++
        console.log(sum);
    }
}
fn1 = fn()

// 1
fn1()
// 2
fn1()
// 3
fn1()

// `fn1` 的引用 `fn` 被手动释放了
fn1 = null
// num再次归零
fn1 = fn()
// 1
fn1()
```
