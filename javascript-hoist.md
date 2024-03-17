[[toc]]

## JavaScript 函数与变量声明提升 {#js-hoist}

### 函数作用域与变量提升 {#function-scope-variable-hoist}

`for` 循环的例子：

```javascript
// 打印：4、5、6
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(++i), 0)
}

// 打印：1、2、3
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(++i), 0)
}
```

变量声明在函数内部提升至顶部的例子：

```javascript
var foo = 1;
function bar () {
    if (!foo) {
        var foo = 10;
    }
    alert(foo);
}
// 会 alert 10
bar();
```

**变量声明提升在作用域最顶部，其次是函数声明，最后是赋值语句：**

```javascript
var a = 1;
function b () {
    a = 10;
    return;
    function a() {}
}
b();
// 会 alert 1
alert(a);
```

```javascript
function a () {
    var b = 1;
    function b () {};
    console.log(b);
}
// 输出 1
a();
```

```javascript
function a () {
    var b;
    function b () {};
    console.log(typeof b);
}
// 输出 'function'
a();
```

```javascript
function a () {
    function b () {};
    var b;
    console.log(typeof b);
}
// 也是输出 'function'
a();
```

```javascript
function a () {
    function b () {};
    var b = 2;
    console.log(b);
}
// 输出 2
a();
```

**例子1**

```javascript
var msg = 'String A'
function test () {
    // 弹出 `undefined`
    alert(msg)
    var msg = 'String A'
    // 弹出 'String A'
    alert(msg)
}
test()

// 上面的代码等价于下面的写法：
var msg = 'String A'
function test () {
    var msg
    alert(msg)
    msg = 'String A'
    alert(msg)
}
```

**来一个复杂的例子：**

写出下面代码 `a`、`b`、`c` 三行的输出分别是什么？

```javascript
// mark A
function fun (n, o) {
    console.log(o)
    return {
        // mark B
        fun: function (m) {
            // mark C
            return fun(m, n)
        }
    }
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1); c.fun(2); c.fun(3);

// 答案：
// undefined, 0, 0, 0
// undefined, 0, 1, 2
// undefined, 0, 1, 1
```

首先，可以分析得到的结论：标记 A 下面的 `fun` 函数和标记 C 下面 `return` 的 `fun` 是同一个函数，标记 B 下面的 `fun` 属性对应的函数不同于标记 A 和标记 C 下方的函数。下文为了行文方便，将各个标记处下方的函数方便叫做 A、B、C 函数。

a 行的分析：
- `a = fun(0)`：即 `a = fun (0) {console.log(undefined) return { // ... } }`，故输出 `undefined`；
- `a.fun(1)`：相当于给 B 函数传了一个参数 1，返回了 `C` 函数传参 `(1, 0)` 执行后的结果，即 A 函数传参 `(1, 0)` 后执行的结果，故输出 0；
- `a.fun(2)` 和 `a.fun(2)` 同上，因为一开始 `a = fun(0)` 已经将 `n` 的值定为 0 了，后面 `console.log` 出来的就都是0了；

b 行的分析：
- `fun(0)`：毫无疑问输出 `undefined`；
- `fun(0).fun(1)`：参考 a 行的分析，可知这里输出的是 0；
- `fun(0).fun(1).fun(2)`：类似的，输出 1；
- `fun(0).fun(1).fun(2).fun(3)`：类似的，输出 2；

c 行的分析：
- `fun(0).fun(1)`：参见上面的分析，输出 `undefined`、0；
- `c.fun(2)、c.fun(3)`：参见之前的分析，输出 1、1。
