# Babel

## 1、babel如何编译const和let

```javascript
let value = 'a'
// babel编译后：
var value = 'a'
```

可以看到 Babel是将let编译成了var，那再来一个例子：

```javascript
if (false) {
    let value = 'a';
}
console.log(value); // value is not defined
```

如果babel将let编译为var应该打印 undefined,为何会报错呢，babel是这样编译的：

```javascript
if (false) {
    var _value = 'a';
}
console.log(value);
```

babel是改变量名，使内外层的变量名称不一样。

const修改值时报错，以及重复声明报错怎么实现的呢？其实在编译时就报错了。

**重点来了：for循环中的 let 声明呢？**

```javascript
var functions = [];
for (let i = 0; i < 3; i++) {
    functions[i] = function () {
        console.log(i);
    };
}
functions[0](); // 0
```

babel编译成了：

```javascript
var functions = [];

var loop = function loop(i) {
    functions[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 3; i++) {
    loop(i);
}
functions[0](); // 0
```

## 参考资料

- [Babel是如何编译let和const?](https://blog.csdn.net/qq_42698109/article/details/104773517)
