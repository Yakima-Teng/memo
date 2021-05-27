## ES5中的闭包、作用域、变量/函数提升（hoisting）

写出下面代码的执行结果：

``` javascript
// 当前位于全局作用域下
function testObject () {
  alert(this)
}

testObject()
```

上题的答案：在chrome中会弹出[object Window]

``` javascript
var msg = 'String A'
function test () {
  alert(msg)
  var msg = 'String A'
  alert(msg)
}
test()
```

上题的分析与答案：在函数内部声明的变量在函数内部会覆盖掉全局同名变量。在JS预解析时，定义变量的行为会在变量作用域内的顶部实现（hoisting），但是变量的赋值行为并不会提前，所以上述代码等价于如下代码，所以第一次alert弹出的是undefined，第二次alert弹出的是“String A”。

``` javascript
var msg = 'String A'
function test () {
  var msg
  alert(msg)
  msg = 'String A'
  alert(msg)
}
```

写出下面代码a、b、c三行的输出分别是什么？

``` javascript
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
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3)
var b = fun(0).fun(1).fun(2).fun(3)
var c = fun(0).fun(1); c.fun(2); c.fun(3)

// 答案：
// undefined, 0, 0, 0
// undefined, 0, 1, 2
// undefined, 0, 1, 1
```

首先，可以分析得到的结论：标记A下面的fun函数和标记C下面return的fun是同一个函数，标记B下面的fun属性对应的函数不同于标记A和标记C下方的函数。下文为了行文方便，将各个标记处下方的函数方便叫做A、B、C函数。

a行的分析：
- a = fun(0)：即a = fun (0) {console.log(undefined) return { // ... } }，故输出undefined；
- a.fun(1)：相当于给B函数传了一个参数1，返回了C函数传参(1, 0)执行后的结果，即A函数传参(1, 0)后执行的结果，故输入0；
- a.fun(2)和a.fun(2)同上，因为一开始a = fun(0)已经将n的值定为0了，后面console.log出来的就都是0了；

b行的分析：
- fun(0)：毫无疑问输出undefined；
- fun(0).fun(1)：参考a行的分析，可知这里输出的是0；
- fun(0).fun(1).fun(2)：类似的，输出1；
- fun(0).fun(1).fun(2).fun(3)：类似的，输出2；

c行的分析：
- fun(0).fun(1)：参见上面的分析，输出undefined、0；
- c.fun(2)、c.fun(3)：参见之前的分析，输出1、1。
