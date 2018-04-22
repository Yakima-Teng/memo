## IE8下parseInt方法默认将0开头的参数当做八进制处理，异常时返回0问题

parseInt问题：IE8及更早版本的IE中，会将parseInt('09')中的09当做八进制进行解析，但又发现09不是八进制，最后作为错误而抛出了0这个false。所以，如果要兼容IE8的话，记得写做parseInt('09', 10)，如果要兼容IE7的话，辞职。从IE9开始默认都会当做十进制进行解析了。或者，可以用下面的方法替换parseInt:
``` javascript
var a = 123.456
var b = -123.456

// 效果是截取整数部分，对正数相当于Math.floor()，对负数相当于Math.ceil()
// 不建议这么用，代码可读性不好
console.log(a | 0) // 123
console.log(b | 0) // -123

console.log(Math.floor(a), Math.ceil(a)) // 123, 124
console.log(Math.floor(b), Math.ceil(b)) // -124, -123
```
