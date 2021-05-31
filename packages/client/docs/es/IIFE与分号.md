## Immediately-Invoked Function Expression与分号

如果习惯写完一条语句后不加分号的写法，碰到需要写自执行函数函数的时候容易踩到下面的坑，而且此种问题有时候不易分析出来：

``` javascript
var a = 1
(function () {})() // 会报错，因为上一行的1会和这一行一起被程序解析成var a = 1(function () {})()，然后报错说1不是函数
```

这时候可以这样写：

``` javascript
var a = 1
void function () {}()
// 或
var a = 1
void (function () {})()
// 或者下面这种方式，但据说会多一次逻辑运算
var a = 1
!function () {}()
```
