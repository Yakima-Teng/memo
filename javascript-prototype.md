[[toc]]

## JS原型与原型链 {#prototype}

### 普通对象、函数对象、原型对象 {#object-normal-function-prototype}

::: tip 普通对象和函数对象
JS中，对象分**普通对象**和**函数对象**，Object、Function是JS自带的**函数对象**。凡是通过new Function()创建的对象都是函数对象，其他的都是普通对象。
:::

```javascript
typeof Object // "function", 函数对象
typeof Function // "function", 函数对象

function f1 () {}
var f2 = function () {}
var f3 = new Function('str', 'console.log(str)')

var o1 = new f1()
var o2 = {}
var o3 = new Object()

typeof f1 // "function", 函数对象
typeof f2 // "function", 函数对象
typeof f3 // "function", 函数对象

typeof o1 // "object", 普通对象
typeof o2 // "object", 普通对象
typeof o3 // "object", 普通对象
```

::: tip 原型对象
每当定义一个对象（函数）时，对象中都会包含一些预定义的属性。

其中，函数对象会有一个 `prototype` 属性，就是我们所说的原型对象（普通对象没有 `prototype`，但有 `__proto__` 属性；函数对象同时含有 `prototype` 和 `__proto__` 属性）。
:::

原型对象其实就是普通对象（`Function.prototype` 除外，它是函数对象，但同时它又没有 `prototype` 属性）。

``` javascript
function f1 () {}

// Object{} with two properties: `constructor` and `__proto__`
console.log(f1.prototype)

// "object"
typeof f1.prototype

// 'function'
typeof Object.__proto__

// 特例，没必要记住，平常根本用不到
typeof Function.prototype // "function"
typeof Function.prototype.prototype // "undefined"
typeof Object.prototype // "object"
```

**原型对象的主要作用是用于继承：**

```javascript
var Person = function (name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

var yakima = new Person('yakima')
yakima.getName() // "yakima"

// true
console.log(yakima.__proto__ === Person.prototype)
```

### 原型链 {#prototype-chain}

上面提到原型对象的主要作用是用于继承，其具体的实现就是通过原型链实现的。创建对象（不论是普通对象还是函数对象）时，都有一个叫做`__proto__`的内置属性，用于指向**创建它的函数对象的原型对象（即函数对象的prototype属性）**

```javascript
// true，对象的内置__proto__对象指向创建该对象的函数对象的prototype
yakima.__proto__ === Person.prototype

// true
Person.prototype.__proto__ === Object.prototype

// 继续，Object.prototype对象也有__proto__属性，但它比较特殊，为null
Object.prototype.__proto__ === null // true

typeof null // "object"
```

这个由`__proto__`串起来的直到`Object.prototype.__proto__` ==> null对象的链称为原型链。

1. yakima的`__proto__`属性指向Person.prototype对象；
2. Person.prototype对象的`__proto__`属性指向Object.prototype对象；
3. Object.prototype对象的`__proto__`属性指向null**对象**；

原型和原型链是JS实现继承的一种模型。

**看个例子**

```javascript
var Animal = function () {}
var Dog = function () {}

Animal.price = 2000
Dog.prototype = Animal

var tidy = new Dog()

console.log(Dog.price) // undefined
console.log(tidy.price) // 2000
```

对上例的分析：

- Dog自身没有price属性，沿着`__proto__`属性往上找，因为Dog赋值时的`Dog = function () {}`其实使用`new Function ()`创建的Dog，所以，`Dog.__proto__` ==> `Function.prototype`, `Function.prototype.__proto__` ===> `Object.prototype`，而`Object.prototype.__proto__` ==> null。很明显，整条链上都找不到price属性，只能返回undefined了；
- tidy自身没有price属性，沿着`__proto__`属性往上找，因为tidy对象是Dog函数对象的实例，`tidy.__proto__` ==> `Dog.prototype` ==> Animal，从而`tidy.price`获取到了`Animal.price`的值。

### constructor {#object-constructor}

原型对象中都有个 `constructor` 属性，用来引用它的函数对象。这是一种循环引用。

```javascript
Person.prototype.constructor === Person // true
Function.prototype.constructor === Function // true
Object.prototype.constructor === Object // true
```
