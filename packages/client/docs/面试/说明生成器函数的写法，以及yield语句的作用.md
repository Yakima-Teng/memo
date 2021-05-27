## 说明生成器函数的写法，以及yield语句的作用

ES6引入了Generator函数，示例如下：

``` javascript
function* hello (name) {
  yield `hello ${name}!`
  yield 'I am glad to meet you!'
  if (0.6 > 0.5) {
  yield `It is a good day!`
  }
  yield 'See you later!'
}

// Generator函数执行后会返回一个迭代器，通过调用next方法依次yeild相应的值
var iterator = hello('Yakima')

iterator.next() // 返回{value: "hello Yakima!", done: false}
iterator.next() // 返回{value: "I am glad to meet you!", done: false}
iterator.next() // 返回{value: "It is a good day!", done: false}
iterator.next() // 返回{value: "See you later!", done: false}
iterator.next() // 返回{value: undefined, done: true}
iterator.next() // 返回{value: undefined, done: true}
```

Generator函数与常见的函数的差异：
- 通常的函数以function开始，而Generator函数以function*开始；
- 在Generator函数内部，yield是一个关键字，和return有点像。不同点在于，所有函数（包括Generator函数）都只能返回一次，而在Generator函数中可以yield任意次。yield表达式暂停了Generator函数的执行，然后可以从暂停的地方恢复执行。

常见的函数不能暂停执行，而Generator函数可以，这是两者最大的区别。
