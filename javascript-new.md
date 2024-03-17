[[toc]]

## JS 中的 `new` {#js-new}

直接使用 `{}` 花括号可以很方便地创建一个对象，但是当我们想要创建很多对象时，如果还采用直接使用 `{}` 的方式就需要写很多冗余代码。JavaScript 提供了 `new` 关键字，我们可以对构造函数使用 `new` 操作符来创建一类相似的对象。

### 构造函数 {#js-new-constructor}

构造函数在技术上是常规函数。不过有两个约定：

- 它们的命名通常以大写字母开头（语法上并未限制，但这是普遍的共识、约定）。
- 它们只能由 `new` 操作符来执行（如果直接调用，这时它就不是**构造函数**了，而是常规函数）。

```javascript
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

const user = new User("Jack");

console.log(user.name); // Jack
console.log(user.isAdmin); // false
```

当一个函数被使用 `new` 操作符执行时，它会经历以下步骤：

- 一个新的空对象被创建并赋值给 `this`。
- 函数体执行。通常它会修改 `this` 对象，比如为其添加新的属性。
- 返回 `this` 对象。

换句话说，执行 `new User(...)` 时，做的就是类似下面的事情：

```javascript
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

故 `const user = new User("Jack")` 可等价为以下代码：

```javascript
const user = {
  name: "Jack",
  isAdmin: false
};
```

现在，如果我们想创建其他用户，我们可以调用 `new User("Ann")`、`new User("Alice")` 等。代码量比每次都使用 `{}` 字面量的方式去创建要少，而且更易阅读。

这就是构造器的主要目的 —— 实现可重用的对象创建代码。

::: tip 提示
从技术上讲，任何函数（除了箭头函数，它没有自己的 `this`）都可以用作构造器。即可以通过 `new` 来运行。“首字母大写”是一个共同的约定，以明确表示一个函数将被使用 `new` 来运行。
:::

### `new.target` {#new-target}

在一个函数内部，我们可以使用 `new.target` 属性来检查它是否被使用 `new` 关键字进行调用了。

常规调用时，它为 `undefined`。使用 `new` 调用时，则等于该函数：

```javascript
function User() {
    console.log(new.target);
    console.log(new.target === User);
}

// 直接调用（不使用 `new` 关键字）：
User(); // undefined, false

// 使用 `new` 关键字调用
new User(); // function User { ... }, true
```

我们也可以让常规调用和使用 `new` 关键字调用做相同的工作，像这样：

```javascript
function User(name) {
    if (!new.target) {
        return new User(name);
    }

    this.name = name;
}

const john = User("John");
console.log(john.name);
```

这种方法有时被用在库中以使语法更加灵活。这样其他人在调用函数时，无论是否使用了 `new`，程序都能如期工作。

不过，到处都使用它并不是一件好事，因为省略了 `new` 使得很难直观地知道代码在干啥。而通过使用 `new` 关键字，我们都知道代码正在创建一个新对象。

### 构造函数的 `return` {#constructor-return}

通常，构造器函数内没有 `return` 语句。它们的任务是将所有必要的东西写入 `this`，并自动返回 `this`。

但是，如果构造器函数内有 `return` 语句，那么：

- 如果 `return` 返回的是一个对象（不含 `null`），则返回这个对象，而不是 `this`。
- 如果` return` 返回的是一个原始类型（包括 `null`），则忽略 `return` 语句，继续返回 `this`。

换句话说，带有对象的 `return` 语句返回该对象，其他情况下都返回 `this`。

例如，这里 `return` 通过返回一个对象覆盖了 `this`：

```javascript
function BigUser() {
    this.name = "小明";
    return { name: "小王" }; 
}

console.log(new BigUser().name);  // 小王
```

这里有一个 `return` 为 `undefined` 的例子（或者我们可以在它之后放置一个原始类型，结果是一样的）：

```javascript
function SmallUser() {
    this.name = "小小王";
    return;
}

console.log(new SmallUser().name);  // 小小王
```

通常构造器函数里都是没有 `return `语句的，这里只做了解即可。

::: tip 省略括号
顺便说一下，如果没有参数，我们可以省略 `new` 后的括号：

```javascript
const user = new User;
// 等同于
const user = new User();
```
这里省略括号不是一种**好风格**，但是语法规范上是允许的。
:::

### 构造器中的方法 {#method-in-new-constructor}

使用构造函数来创建对象有很大的灵活性。构造函数可能有一些函数入参，这些参数定义了如何构造对象。

当然，我们不仅可以在 `this` 上添加属性，还可以添加方法。

```javascript
function User(name) {
    this.name = name;

    this.sayHi = function () {
        console.log(`我的名字是: ${this.name}`);
    };
}

const user = new User("李白");

user.sayHi(); // 我的名字是李白
```

### 手写一个 `new` {#realize-js-new}

**问题描述**

由于 `new` 是 JavaScript 中的关键字，我们不可能另外实现一个自己的关键字。所以这里要求我们实现一个函数 `myNew`，要求：`myNew(Person, '李白')` 等价于 `new Person('李白')`。

**具体实现**

```javascript
function myNew() {
    // 1、创建一个空对象
    const obj = {}
    // 获取构造方法（并将其从 `arguments` 中移出）
    const constructor = [].shift.call(arguments)

    // 2、将新对象的原型指向构造方法的 `prototype` 对象上
    obj.__proto__ = constructor.prototype

    /**
     * 3、获取到构造方法的返回值
     * 如果原先构造方法有返回值，且是对象，
     * 那么原始的 `new` 会把这个对象返回出去
     * （基本类型会忽略）
     * 
     * 原始 `arguments` 的第一个参数已经在前面被 `shift` 了，
     * 所以剩下的参数全都是构造方法需要的值
     */
    const ret = constructor.apply(obj, arguments)

    // `(ret || obj)` 是为了判断 `null`，当为 `null` 时，也返回新对象
    return typeof ret === 'object' ? (ret || obj) : obj
}
```

**使用**

```javascript
function Person(name, age) {
    this.name = name
    this.age = age
}

const p = myNew(Person, 'cheny', 28)
// true
console.log(p instanceof Person);
```
