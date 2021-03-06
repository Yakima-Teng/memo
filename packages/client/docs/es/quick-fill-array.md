# 快速填充数字数组

## 背景描述

假设你需要一个数组，数据长度为100，数组元素依次为0、1、2、3、4...98、99。
该如何实现呢？直接写个for循环当然是可以的。
不过这里有更方便的方法。

## 方案描述

```javascript
Array.from(Array(10).keys())
```

或者

```javascript
[...Array(10).keys()]
```

如果你想要直接从1开始到100，可以用Array.from方法实现
（下面这种传参方法不太常见，第二个参数是一个map function，可以对第一个参数传进去的类数组元素进行遍历更改）：

```javascript
Array.from({ length: 100 }, (_, i) => i + 1)
```

注意，上面的例子里可以认为`{ length: 100 }`是一种对欺骗的方式，让Array.from认为这是一个类数组。
