[[toc]]

## JavaScript 中的 `this`

### 普通函数的 `this` 指向 {#this-normal-function}

这里说的“普通函数”指箭头函数以外的函数。

在绝大多数情况下，函数的调用方式决定了 `this` 的值（运行时绑定）。

写出下面代码的执行结果：

``` javascript
// 当前位于全局作用域下
function testObject () {
  alert(this)
}

testObject()
```

上题的答案：在chrome中会弹出 `[object Window]`。

`this` 关键字是函数运行时自动生成的一个内部独享对象，只能在函数内部使用，总指向调用它的对象。

根据不同的使用场合，`this` 有不同的值，主要分以下几种情况：

- 默认绑定。
- 隐式绑定。
- `new` 绑定。
- 显示绑定。

#### 默认绑定 {#this-default}

全局环境中定义 `person` 函数，内部使用 `this` 关键字。

``` javascript
var name = 'Jenny';
function person() {
    return this.name;
}

// Jenny
console.log(person());
```

上述代码输出 `Jenny`，原因是调用函数的对象在游览器中为 `window`，因此 `this` 指向 `window`，所以输出 `Jenny`。

注意：

严格模式下，不能将全局对象用于默认绑定，`this` 会绑定到 `undefined`，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。

#### 隐式绑定 {#this-implicitly}

函数还可以作为某个对象的方法调用，这时 `this` 就指这个上级对象。

```javascript
function test() {
  console.log(this.x);
}

const obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

下面这段代码中包含多级对象，注意 `this` 指向的只是它上一级的对象 `b` （由于 `b` 内部并没有属性 `a` 的定义，所以输出 `undefined`。）。

```javascript
const o = {
    a: 10,
    b: {
        fn: function() {
            console.log(this.a); // undefined
        }
    }
}
o.b.fn();
```

再举一种特殊情况：

```javascript
const o = {
    a: 10,
    b: {
        a: 12,
        fn: function() {
            console.log(this.a); // undefined
            console.log(this); // window
        }
    }
}
const j = o.b.fn;
j();
```

在上面的例子中，`this` 指向的是 `window`，这里的大家需要记住，`this` 永远指向的是最后调用它的对象，虽然`fn` 是对象 `b` 的方法，但是 `fn` 赋值给 `j` 时并没有执行，所以最终指向 `window`。

#### `new` 绑定 {#this-new}

通过构建函数 `new` 关键字生成一个实例对象时，`this` 指向这个实例对象。

```javascript
function Test() {
　this.x = 1;
}

const obj = new Test();
obj.x // 1
```

上述代码之所以会输出 `1`，是因为 `new` 关键字改变了 `this` 的指向。

这里再列举一些特殊情况：

`new` 过程遇到 `return` 一个对象（不包括 `null`），此时 `this` 指向返回的对象：

```javascript
function fn() {
    this.user = 'xxx';  
    return {};  
}
const a = new fn();
console.log(a.user); // undefined
```

如果 `return` 一个基础类型的值（包括 `null`），则 `this` 指向实例对象：

```javascript
function fn() {
    this.user = 'xxx';  
    return 1;
}
const a = new fn;
console.log(a.user); // xxx
```

注意的是 `null` 虽然也是对象，但是此时 `this` 仍然指向实例对象：

```javascript
function fn() {
    this.user = 'xxx';  
    return null;
}
const a = new fn;
console.log(a.user); // xxx
```

#### 显示修改 {#this-apparently}

`apply`、`call`、`bind`是函数的几个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时 `this` 指的就是这第一个参数。

```javascript
const x = 0;
function test() {
　console.log(this.x);
}

const obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply(obj) // 1
```

#### 匿名函数的 `this` {#this-anonymous}

匿名函数里的 `this` 指向 `window`。

```javascript
// 等价于 `window.name = 'The Window'`
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function() {
        return function() {
　　　　　   return this.name;
　　　　　};
　　　}
};
// 输出为 `The Window`
alert(object.getNameFunc()());
```

* 参考：[面试官：谈谈this对象的理解](https://vue3js.cn/interview/JavaScript/this.html)

### 箭头函数的 `this` 指向 {#this-arrow-function}

大部分情况下，`this` 总是指向调用该函数的对象。但对箭头函数而言却不是这样的，箭头函数里的 `this` 是根据外层（函数或者全局）作用域（**词法作用域**）来决定的。

箭头函数体内的 `this` 对象，就是**定义该函数时所在的作用域指向的对象**，而不是使用时所在的作用域指向的对象。

下面是普通函数的列子：

```javascript
// 其实是window.name = 'window'
var name = 'window';

var A = {
   name: 'A',
   sayHello: function() {
      console.log(this.name)
   }
}

// 输出 `A`
A.sayHello();

var B = {
  name: 'B'
}

// 输出 `B`
A.sayHello.call(B);

/**
 * 不传参数指向全局 `window` 对象，
 * 输出 `window.name` 也就是 `'window'`
 */
A.sayHello.call();
```

从上面可以看到，`sayHello` 这个方法是定义在 `A` 对象中的，但是当我们使用 `call` 方法，把其指向 `B` 对象后，最后输出了 `B`；可以得出，`sayHello` 的 `this` 只跟使用时的调用对象有关。

改造一下：

```javascript
var name = 'window'; 

var A = {
   name: 'A',
   sayHello: () => {
      console.log(this.name)
   }
}

// 还是以为输出 `A`? 错啦，其实输出的是 `window`
A.sayHello();
```

我相信在这里，大部分同学都会出错，以为 `sayHello` 是绑定在 `A` 上的，但其实它绑定在 `window` 上的，那到底是为什么呢？

一开始，我重点标注了**该函数所在的作用域指向的对象**，作用域是指函数内部，这里的箭头函数（也就是 `sayHello`）所在的作用域其实是最外层的 js 环境，因为没有其他函数包裹；然后最外层的 js 环境指向的对象是 `window` 对象，所以这里的 `this` 指向的是 `window` 对象。

那如何改造成永远绑定A呢：

```javascript
var name = 'window';

var A = {
    name: 'A',
    sayHello: function() {
        var s = () => console.log(this.name)
        // 返回箭头函数 `s`
        return s
    }
}

var sayHello = A.sayHello();
// 输出 `A` 
sayHello();

var B = {
    name: 'B'
}

// 输出 `A` 
sayHello.call(B);
// 输出 `A` 
sayHello.call();
```

OK，这样就做到了永远指向 `A` 对象了，我们再根据**该函数所在的作用域指向的对象**来分析一下：

- 该函数所在的作用域：箭头函数 `s` 所在的作用域是 `sayHello`，因为 `sayHello` 是一个函数。
- 作用域指向的对象：`A.sayHello` 指向的对象是 `A`。

**最后是使用箭头函数其他几点需要注意的地方**

- 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。可以用 `...rest` 入参代替（`(...rest) => { console.log(rest); }`）。
- 不可以使用 `yield` 命令，因此箭头函数不能用作 生成器（Generator）函数。

再来看一个例子：

```javascript
var fullname = 'a'
var obj = {
    fullname: 'b',
    prop: {
        fullname: 'c',
        getFullname: () => {
            return this.fullname;
        }
    }
}
// 打印 'a'
console.log(obj.prop.getFullname())
var test = obj.prop.getFullname
// 打印 'a'
console.log(test())
```

```javascript
var fullname = 'a'
function hello () {
    var fullname = 'd'
    var obj = {
        fullname: 'b',
        prop: {
            fullname: 'c',
            getFullname: () => {
                return this.fullname;
            }
        }
    }
    // 打印 'a'
    console.log(obj.prop.getFullname())
    var test = obj.prop.getFullname
    // 打印 'a'
    console.log(test())
}
hello()
```

```javascript
var fullname = 'a'
function hello () {
    var fullname = 'd'
    var obj = {
        fullname: 'b',
        prop: {
            fullname: 'c',
            getFullname: () => {
                return this.fullname;
            }
        }
    }
    // 打印 undefined
    console.log(obj.prop.getFullname())
    var test = obj.prop.getFullname
    // 打印 undefined
    console.log(test())
}
const d = new hello()
```

```javascript
var fullname = 'a'
function hello () {
    this.fullname = 'f'
    var fullname = 'd'
    var obj = {
        fullname: 'b',
        prop: {
            fullname: 'c',
            getFullname: () => {
                return this.fullname;
            }
        }
    }
    // 打印 'f'
    console.log(obj.prop.getFullname())
    var test = obj.prop.getFullname
    // 打印 'f'
    console.log(test())
}
const d = new hello()
```

看一个普通函数的例子：

```javascript
const obj = {
    count: 10,
    doSomethingLater() {
        setTimeout(function () {
            // 这是一个匿名函数，是在 window 作用域下执行的
            this.count++;
            console.log(this.count);
        }, 300);
    },
};

// 打印 `NaN`，因为 window 对象上没有 `count` 属性
obj.doSomethingLater();
```

如果改成箭头函数：

```javascript
const obj = {
    count: 10,
    doSomethingLater() {
        // 该方法将 `this` 绑定到 `obj` 上下文中
        setTimeout(() => {
            /**
             * 由于箭头函数内部不会自己绑定 `this`，
             * `setTimeout` 函数也没有创建 `this` 绑定，
             * 所以外部的 `obj` 上下文会被用作 `this`
             */
            this.count++;
            console.log(this.count);
        }, 300);
    },
};

// 打印 `11`
obj.doSomethingLater();
```

* 参考：

- [ES6箭头函数的this指向详解](https://www.zhihu.com/tardis/zm/art/57204184)
- [Arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
