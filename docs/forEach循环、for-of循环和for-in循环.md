## forEach循环、for-of循环和for-in循环

``` javascript
// forEach循环无法通过break或return语句进行中断
arr.forEach(function (elem) {
  console.log(elem)
})

// for-in循环实际上是为循环对象的可枚举（enumerable）属性而设计的，也能循环数组，不过不建议，因为key变成了数字
var obj = {a: 1, b: 2, c: 3}
for (var p in obj) {
  console.log('obj.' + p + ' = ' + obj[p])
}
// 上面的代码依次输出内容如下：
// obj.a = 1
// obj.b = 2
// obj.c = 3

// for-of能循环很多东西，包括字符串、数组、map、set、DOM collection等等（但是不能遍历对象，因为对象不是iterable可迭代的）
var iterable = [1, 2, 3]
for (var value of iterable) {
  console.log(value)
}
```

基本上for in用于大部分常见的由key-value对构成的对象上以遍历对象内容。但是for in在遍历数组对象时并不方便，这时候用for of会很方便。
