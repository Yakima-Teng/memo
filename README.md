# memo

因为入门时间不长，前端涉及到的东西又多，自己也还会去看些后端的东西，精力有限，不可能看过的东西都记得，借这篇文档，主要是帮助自己回忆一些知识点。算是备忘录吧。

有点地方可能自己写得不好，不完善，甚至是不对，希望看发现的朋友能提个issue，或者提个pr。^_^

## 实用网站

- [MDN](https://developer.mozilla.org/en-US/)
- [百度用户体验中心](http://mux.baidu.com/)
- [携程设计委员会](http://ued.ctrip.com/blog/)
- [腾讯CDC](http://cdc.tencent.com/)
- [京东设计中心JDC](http://jdc.jd.com/)
- [京东凹凸实验室](https://aotu.io/)
- [HTML5梦工厂](http://www.html5dw.com/)
- [Can I Use](http://caniuse.com/)
- [HTML5与CSS3技术应用评估](http://html5please.com/)
- [各种奇妙的Hack](http://browserhacks.com/#hack-71627a771f70379e1704bbf6132792cb)
- [webkit独有样式分析（携程UED）](http://ued.ctrip.com/webkitcss/index.html)

## 高性能动画

CSS动画会比JS动画的性能更好，JS动画的优势主要在于
- 更具定制性（毕竟JS比CSS更可编程）；
- 更易实现对低端浏览器的兼容。

当然，大部分业务中，主要还是使用CSS动画的，对低端浏览器进行降级就可以了（保证页面可读可操作就可以了，增加老旧设备的性能负担不是好事情）。

几个注意点：
- 利用transform: translate3d(x, y, z);可借助3D变形开启GPU加速（这会消耗更多内存与功耗，确有性能问题时再考虑）；
- 若动画开始时有闪烁，可尝试：backface-visibility: hidden; perspective: 1000;
- 尽可能少用box-shadows和gradients这两页面性能杀手；
- CSS动画属性可能会触发整个页面的重排（reflow/relayout）、重绘（repaint）和重组（recomposite）。其中paint通常是最花费性能的，进可能避免使用触发paint的CSS动画属性。所以要尽可能通过修改translate代替修改top/left/bottom/right来实现动画效果，可以减少页面重绘（repaint），前者只触发页面的重组，而后者会额外触发页面的重排和重绘；
- 尽量让动画元素脱离文档流（document flow）中，以减少重排（reflow）；
- 操作DOM的js语句能连着写尽量连着写，这样可借助浏览器的优化策略，将可触发重排的操作放于一个队列中，然后一次性进行一次重排；如果操作DOM的语句中间被其他诸如赋值语句之类的间断了，页面可能就会发生多次重排了。


## 高频率触发的事件的性能优化

一些事件，比如touchmove可能会被高频率的触发，如果该事件对应的handler函数中需要处理的逻辑较多，可能会导致FPS下降影响程序流畅度，在这种情况下，可以考虑将handler中的执行体放于setTimeout(function () { //执行的代码  }, 0)中，程序会变流畅。


## 移动端常见问题

伪类:active失效：
- 只需给document绑定touchstart或touchend事件即可，如document.addEventListener('touchstart', function () {}, false)；
- 更简单的方法是直接在html中body标签上添加属性ontouchstart=""；

不让安卓手机识别邮箱：
``` html
<meta content="email=no" name="format-detection">
```

禁止IOS识别长串数字为电话：
``` html
<meta content="telephone=no" name="format-detection">
```

禁止iOS弹出各种操作窗口：-webkit-touch-callout: none;

禁止用户选中文字：-webkit-user-select: none;

input[type="date"]不支持placeholder：
``` html
<input placeholder="占位符" type="text" onfocus="(this.type='date')">
```

三星I9100 （Android 4.0.4）不支持display:-webkit-flex这种写法的弹性布局，但支持display:-webkit-box这种写法的布局,相关的属性也要相应修改，如-webkit-box-pack: center，移动端采用弹性布局时，建议直接写display:-webkit-box系列的布局。

touchmove事件在Android部分机型(如LG Nexus 5 android4.4，小米2 android 4.1.1)上只会触发一次。解决方案是在触发函数里面加上e.preventDefault()。

iOS部分版本的Date构造函数不支持规范标准中定义的YYYY-MM-DD格式，如new Date('2013-11-11')是Invalid Date, 但支持YYYY/MM/DD格式，可用new Date('2013/11/11')；类似的，对于yyyy-mm-dd hh:mm:ss格式的日期，可以通过类似下面的方法将其转换为Date对象实例（适用于所有设备）：
``` javascript
// 将形如"yyyy-mm-dd hh:mm:ss"的日期字符串转换为日期对象（兼容IOS设备）
function longStringToDate (dateString) {
  if (dateString && dateString.length === 19) {
    // Attention: there is a space between regular expression
    let tempArr = dateString.split(/[- :]/)
    return new Date(tempArr[0], tempArr[1] - 1, tempArr[2], tempArr[3], tempArr[4], tempArr[5])
  }
  return 'Invalid Date'
}
```

## IE8不支持媒体查询和HTML5新header, article等元素的解决方法

IE8不支持CSS媒体查询，也无法识别html5中的新元素（nav、article等），可用在head中加入如下代码解决：
``` html
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

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

## 判断JS全局变量是否存在

``` javascript
if (typeof localStorage !== 'undefined') {
  // 此时访问localStorage不会出现引用错误
}
```
或者
``` javascript
if ('localStorage' in self) { // 浏览器端全局处window/this/self三者彼此全等
  // 此时访问 localStorage 绝对不会出现引用错误
}
```

注意二者的区别：
``` javascript
var a // 或 var a = undefined
'a' in self // true
typeof a // 'undefined'
```
- var a = undefined或者var a相当于是给window对象添加了a属性，但是未赋值，即window.a === undefined为true
- typeof a就是返回其变量类型，未赋值或者声明类型为undefined的变量，其类型就是undefined

## JS原型与原型链

### 普通对象与函数对象

JS中，对象分**普通对象**和**函数对象**，Object、Function是JS自带的**函数对象**。凡是通过new Function()创建的对象都是函数对象，其他的都是普通对象。

``` javascript
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
typeof o2 // "object", normal object
typeof o3 // "object", normal object

```

### 原型对象

每当定义一个对象（函数）时，对象中都会包含一些预定义的属性。其中，函数对象会有一个prototype属性，就是我们所说的原型对象（普通对象没有prototype，但有_proto_属性；函数对象同时含有prototype和__proto__属性）。

原型对象其实就是普通对象（Function.prototype除外，它是函数对象，单同时它又没有prototype属性）。

``` javascript
function f1 () {}
console.log(f1.prototype) // Object{} with two properties constructor and __proto__
typeof f1.prototype // "object"

typeof Object.proto

// 特例，没必要记住，平常根本用不到
typeof Function.prototype // "function"
typeof Function.prototype.prototype // "undefined"
typeof Object.prototype // "object"
```

原型对象的主要作用是用于继承：

``` javascript
var Person = function (name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

var yakima = new Person('yakima')
yakima.getName() // "yakima"
```

### 原型链

上面提到原型对象的主要作用是用于继承，其具体的实现就是通过原型链实现的。创建对象（不论是普通对象还是函数对象）时，都有一个叫做__proto__的内置属性，用于指向**创建它的函数对象的原型对象（即函数对象的prototype属性）**

``` javascript
yakima.__proto__ === Person.prototype // true，对象的内置__proto__对象指向创建该对象的函数对象的prototype

Person.prototype.__proto__ === Object.prototype // true

// 继续，Object.prototype对象也有__proto__属性，但它比较特殊，为null
Object.prototype.__proto__ === null // true

typeof null // "object"
```

这个由__proto__串起来的直到Object.prototype.__proto__ ==> null对象的链称为原型链。

1. yakima的__proto__属性指向Person.prototype对象；
2. Person.prototype对象的__proto__属性指向Object.prototype对象；
3. Object.prototype对象的__proto__属性指向null**对象**；

说明（下面这几种看完忘掉就可以了^_^）

Object是函数对象，是通过new Function ()创建的，所以Object.__proto__指向Function.prototype

``` javascript
Object.__proto__ === Function.prototype // true
```

Function是函数对象，是通过new Function()创建的，所以Function.__proto__指向Function.prototype。本类创建本类。。。唐僧也说过类似的话的，人是人他妈生的，妖是妖他妈生的。
``` javascript
Function.__proto__ === Function.prototype // true
```

另外：
``` javascript
Function.prototype.__proto__ === Object.prototype // true
```

### constructor

原型对象中都有个constructor属性，用来引用它的函数对象。这是一种循环引用。

``` javascript
Person.prototype.constructor === Person // true
Function.prototype.constructor === Function // true
Object.prototype.constructor === Object // true
```

### 综合理解

原型和原型链是JS实现继承的一种模型。

``` javascript
var Animal = function () {}
var Dog = function () {}

Animal.price = 2000
Dog.prototype = Animal

var tidy = new Dog()

console.log(Dog.price) // undefined
console.log(tidy.price) // 200
```

对上例的分析：
- Dog自身没有price属性，沿着__proto__属性往上找，因为Dog赋值时的Dog = function () {}其实使用new Function ()创建的Dog，所以，Dog.__proto__ ==> Function.prototype, Function.prototype.__proto__ ===> Object.prototype，而Object.prototype.__proto__ ==> null。很明显，整条链上都找不到price属性，只能返回undefined了；
- tidy自身没有price属性，沿着__proto__属性往上找，因为tidy对象是Dog函数对象的实例，tidy.__proto__ ==> Dog.prototype ==> Animal，从而tidy.price获取到了Animal.price的值。


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

## z-index
建议使用CSS预处理器语言的情况下，对所有涉及z-index的属性的值放在一个文件中统一进行管理。这个主意是从饿了么前端团队代码风格指南中看到的。另外补充一下，应该将同一条直系链里同一层级的元素的z-index分类到一起进行管理。因为不同层级或者非直系链里的同一层级的元素是无法直接根据z-index来判断元素前后排列顺序的。

## 数据类型

**基本数据类型**有6个：Undefined、Null、Boolean、Number、String、Symbol。其中Symbol是ES 2015中新增的，特点就是如果给某个对象添加的某个方法或属性的key名是Symbol类型的话，该方法/属性将会是不可遍历的，只能通过obj[symbol]来访问，好处就是遍历对象时能减少对一些不必要方法/属性的遍历，遍历数组时不用担心数组长度会被改变了。

除了基本数据类型，剩下的就是**对象数据类型**了。

## DOM基础

### 问题

``` html
<ul id="list" class="foo">
  <li>#0</li>
  <li><span>#1</span></li>
  <li>#2</li>
  <li>#3</li>
  <li><ul><li>#4</li></ul></li>
  ...
  <li><a href="//v2ex.com">#99998</a></li>
  <li>#99999</li>
  <li>#100000</li>
</ul>
```

- 为ul元素添加一个类.bar
- 删除第10个li
- 在第500个li后面添加一个li，其文字内容为“&lt;v2ex.com />”
- 点击任意li弹框显示其为**当前列表**中的第几项

### 解答

``` javascript
// 还原题目真实DOM结构
var list = document.getElementById('list')
void function () {
  var html = ''
  for (var i = 0; i <= 10000; i++) {
    if (i === 1) {
      html += '<li><span>#1</span></li>'
    } else if (i === 4) {
      html += '<li><ul><li>#4</li></ul></li>'
    } else if (i === 9998) {
      html += '<li><a href="//v2ex.com">#9998</a></li>'
    } else {
      html += '<li>#' + i + '</li>'
    }
  }
  list.innerHTML = html
}()

// or, list.className += ' bar'
list.classList.add('bar')

var li10 = document.querySelector('#list > li:nth-of-type(10)')
li10.parentNode.removeChild(li10)

var newItem = document.createElement('LI')
var textNode = document.createTextNode('<v2ex.com />')
newItem.appendChild(textNode)

// index for css nth-of-type is 1-based
var li501 = document.querySelector('#list > li:nth-of-type(501)')
list.insertBefore(newItem, li501)

list.addEventListener('click', function (e) {
  var target = e.target || e.srcElement
  if (target.id === 'list') {
    alert('你点到最外层的ul上了，叫我怎么判断？')
    return
  }
  while (target.nodeName !== 'LI') {
    target = target.parentNode
  }

  var parentUl = target.parentNode
  var children = parentUl.childNodes
  var count = 0
  for (var i = 0, len = children.length; i < len; i++) {
    var node = children[i]
    if (node.nodeName === 'LI') {
      count++
    }
    if (node === target) {
      alert('是当前第' + count + '项')
      break
    }
  }
}, false)

// PS: if querySelector method is not available, the following can be changed.
var li10 = document.querySelector('#list > li:nth-of-type(10)')
var li501 = document.querySelector('#list > li:nth-of-type(501)')

// As below:
function getLiByIndex (index /* 0-based index */) {
  var count = -1
  for (var i = 0, len = list.childNodes.length; i < len; i++) {
    if (list.childNodes[i].nodeName === 'LI') {
      count++
      if (count === index) {
        return list.childNodes[i]
      }
    }
  }
}
var li10 = getLiByIndex(9)
var li501 = getLiByIndex(500)
```


## merge two objects (only for enumerable properties)

合并对象的**可枚举的**属性/方法到指定对象

``` javascript

// typeOf, return: 'array', 'object', 'function', 'null', 'undefined', 'string', 'number'

const typeOf = exports.typeOf = input => {
  return ({}).toString.call(input).slice(8, -1).toLowerCase()
}

// merge object properties
const merge = exports.merge = (obj, options) => {
  if (obj && options) {
    for (let p in options) {
      if (options.hasOwnProperty(p)) {
        if (typeOf(options[p]) === 'object') {
          merge(obj[p], options[p])
        } else {
          obj[p] = options[p]
        }
      }
    }
  }
  return obj
}

```

## isObjectEqual (only for enumerable properties)

``` javascript
function isObjectEqual (obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2
  }
  // if refer to the same location
  if (obj1 === obj2) {
    return true
  }

  var keys1 = Object.keys(obj1)
  var keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  if (keys1.length === 0 && keys2.length === 0) {
    return true
  }

  for (var i = 0, len = keys1.length; i < len; i++) {
    if (!isObjectEqual(obj1[keys1[i]], obj2[keys2[i]])) {
      return false
    }
  }
  return true
}
```

## flattenArray

- 将数组中的所有数组元素扁平化成顶层元素，返回新数组，不修改原数组
- 增加去重功能，重复的**为基本数据类型的元素**不显示

``` javascript
function flattenArray (arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('You should pass in an Array parameter')
  }
  var tempArr = []
  var tempObj = {}

  void function recurison (item) {
    if (Array.isArray(item)) {
      item.forEach(recurison)
    } else {
      if (typeof item === 'object') {
        tempArr.push(item)
      } else if (!tempObj[item]) {
        tempArr.push(item)
        tempObj[item] = true
      }
    }
  }(arr)

  return tempArr
}
```


## deepClone

``` javascript
function deepClone (obj) {
  // if number, string, boolean, or undefined
  if (typeof obj !== 'object') {
    throw new TypeError('You should pass in an Array parameter')
  }

  // if null
  if (obj === null) {
    return null
  }

  // if array
  if (Array.isArray(obj)) {
    var tempArr = []
    obj.forEach(function (elem, idx) {
      tempArr[idx] = deepClone(elem)
    })
    return tempArr
  }

  // if obj
  var tempObj = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      tempObj[key] = deepClone(obj[key])
    }
  }
  return tempObj
}
```


## assign

``` javascript
function assign () {
  var args = [].slice.call(arguments)
  var target = args.shift()

  // invalid target: undefined, null, none-object
  if (!target || typeof target !== 'object') {
    throw new TypeError('You have passed in some wrong arguments.')
  }

  args = (function () {
    var tempArr = []
    for (var i = 0, len = args.length; i < len; i++) {
      if (args[i] && typeof args[i] === 'object') {
        tempArr.push(args[i])
      }
    }
    return tempArr
  })()

  args.forEach(function (item, idx) {
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        target[key] = item[key]
      }
    }
  })

  return target
}
```


## JS事件

### Capture & Bubbling

JS中事件流的三个阶段：捕获（低版本IE不支持）==>目标==>冒泡。
- Captuer：from general to specific；
- Bubbling：from specific to general

如果不同层的元素使用useCapture不同，会先从最外层元素往目标元素寻找设定为capture模式的事件，到达目标元素后执行目标元素的事件后，在循原路往外寻找设定为bubbling模式的事件。

### event事件、target、currentTarget、srcElement

e.currentTarget和e.target的比较：
- target指向事件直接作用的对象，而currentTarget指向绑定该事件的对象；
- 当处于捕获或冒泡阶段时，两者指向不一致；当处于目标阶段时，两者指向一致。

获取事件对象和目标对象：
``` javascript
function (e) {
  e = e ? e : window.event
  var target = e.target || e.srcElement
  // do some things here
}
```

### 事件代理/委托

事件代理/委托，是靠事件的冒泡基质实现的（所以，对于一些不具有冒泡特性的事件，比如focus、blur，就没有事件代理/委托这种说法了）。

优点有：
- 可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒；
- 可以实现当新增子孙节点时无需再次对其绑定事件，对于动态内容部分尤为合适。

缺点：
- 如果把所有事件都代理到一个比较顶层的DOM节点上的话，比较容易出现误判，给不需要绑定事件的节点绑定了事件，比如把页面中所有事件都绑定到document上进行委托，就不是很合适。

``` javascript
// 只考虑IE 9&+
function delegate (element, targetSelector, type, handler) {
  element.addEventListener(type, function (e) {
    var targets = Array.prototype.slice.call(element.querySelectorAll(targetSelector))
    var target = e.target
    if (targets.indexOf(target) !== -1) {
      return handler.apply(target, arguments)
    }
  })
}

// 兼容写法
function delegate (element, targetClass, type, handler) {
  addEvent(element, type, function (e) {
    e = e || window.event
    var target = e.target || e.srcElement
    if (target.className.indexOf(targetClass) !== -1) {
      handler.apply(target, arguments)
    }
  })
}

function addEvent (target, type, listener) {
  if (target.addEventListener) {
    // non-IE, IE9&+
    target.addEventListener(type, listener, false)
  } else if (target.attachEvent) {
    // IE6 - IE10, not available in IE11
    target.attachEvent('on' + type, listener)
  } else {
    // all browsers
    target['on' + type] = listener
  }
}
```


### stopPropagation和preventDefault、return false

阻止事件的传播：
``` javascript
if (e.stopPropagation) {
  e.stopPropagation()
} else {
  // IE 8&-
  e.cancelBubble = true
}
```

阻止事件的默认行为：
``` javascript
if (e.preventDefault) {
  // none-IE, IE 9&+
  e.preventDefault()
} else {
  // IE 5-8
  e.returnValue = false
}
```

原生JS中return false只会阻止默认行为，而用jQuery的话会同时阻止事件传播和阻止事件的默认行为：
``` javascript
$(a).click(function () {
  // 阻止默认行为和事件传播
  return false
})

document.getElementById('link').onclick = funtion (e) {
  // 阻止默认行为
  return false
}
```

### 事件绑定和解绑

addEventListener方法的listener监听函数在元素的作用域内进行，this指向当前元素；attachEvent方法的listener监听函数在全局作用域下运行，this指向window。

注意：target.addEventListener、target.attachEvent与target.onclick这类方法的区别：
- 前面两种方法允许对一个target的某个事件同时绑定多个listener，后者在绑定多个listener的情况下只有最后一个会生效（后定义的会覆盖先定义的）；
- 后面两种只能在冒泡阶段触发listener。

IE8及以下：attachEvent

element.attachEvent(type, listener)
- element：要绑定事件的对象，或HTML节点；
- type：事件名称（带“on”），如“onclick”、“onmouseover”；
- listener：要绑定的事件监听函数；
- 默认在事件冒泡时执行。

标准的绑定事件监听函数的方法：addEventListener

element.addEventListener(type, listener, useCapture)
- element: 要绑定事件的对象，或HTML节点；
- type：事件名称（不带“on”），如“click”、“mouseover”；
- listener：要绑定的事件监听函数；
- userCapture：事件监听方式，只能是true或false。true，采用捕获（capture）模式；false，采用冒泡（bubbling）模式。若无特殊要求，一般是false。

兼容的事件绑定方法：

``` javascript
function addEvent (target, type, listener) {
  try {
    // Chrome, FireFox, Opera, Safari, IE9&+
    target.addEventListener(type, listener, false)
  } catch (e) {
    try {
      // IE6 - IE10, not available in IE11
      target.attachEvent('on' + type, listener)
    } catch (err) {
      // all browsers
      target['on' + type] = listener
    }
  }
}

// or shorter one like this:
function addEvent (target, type, listener) {
  if (target.addEventListener) {
    // non-IE, IE9&+
    target.addEventListener(type, listener, false)
  } else if (target.attachEvent) {
    // IE6 - IE10, not available in IE11
    target.attachEvent('on' + type, listener)
  } else {
    // all browsers
    target['on' + type] = listener
  }
}
```

兼容的事件解绑方法：

``` javascript
function removeEvent (target, type, listener) {
  if (target.removeEventListener) {
    target.removeEventListener(type, listener, false)
  } else if (target.detachEvent) {
    target.detachEvent('on' + type, listener)
  } else {
    target.detachEvent['on' + type] = null
  }
}
```

### 实现事件模型（绑定事件、触发事件、事件广播）

// TODO：暂时涉及不到这些考点

## 页面加载

### 从输入URL到整个页面显示在用户面前发生了什么

#### 1. 浏览器查找域名对应的IP地址

**IP地址**：IP协议为互联网上的每一个网络和每一台主机都分配的一个逻辑地址。通过IP地址才能确定一台主机（服务器）的位置。

**域名（DN，Domain Name）**：IP地址不便于用户记忆和使用，故用域名来代替纯数字的IP地址。

**DNS（Domain Name System）**：每个域名都对应**一个或多个**提供相同服务的服务器的IP地址，只有知道服务器IP地址才能建立连接，所以需要通过DNS把域名解析成一个IP地址。

说明：
- 域名和IP不是一一对应的关系，可以把多个提供相同服务的服务器IP设置为同一个域名，但在同一时刻一个域名只能解析出一个IP地址；同时，一个IP地址可以绑定多个域名，数量不限；
- 这里的知识点，对前端而言只要知道使用CDN存放静态资源这种优化策略的原理是DNS负载均衡：如果一个大型网站的所有请求都由同一个服务器进行处理，是不现实的；并且对用户而言，用户并不关注具体是哪台机器处理了他的请求。因此，DNS可以根据多个服务器中每个服务器的负载量、该机器离用户的地理位置的距离等信息返回其中某个适合的主机的IP地址，这个过程就是**DNS负载均衡，又叫做DNS重定向**。**CDN（Content Delivery Network）就是利用DNS的重定向技术**，DNS服务器会返回一个跟用户最接近的点的IP地址。

#### 2. 浏览器根据IP地址与服务器建立socket连接

**建立连接——三次握手**：知道了服务器的IP地址，便可开始与服务器建立连接了，通信连接的建立需要经历以下三个过程：
- 主机向服务器发送一个建立连接的请求（您好，我想认识你）；
- 服务器接到请求后发送统一连接的信号（好的，很高兴认识你）；
- 主机接到同意连接的信号后，再次向服务器发送了确认信号（我也很高兴认识你），至此，主机便于服务器建立了连接。

说明：
- TCP协议：三次握手的过程采用TCP协议，其可以保证信息传输的可靠性，三次握手过程中，若一方收不到确认信息，协议会要求重新发送信号。

#### 3. 浏览器与服务器通信：浏览器发出请求、服务器处理请求

当服务器与主机建立了连接之后，主机便开始与服务器进行通信。网页请求是一个主机向服务器请求数据==>服务器返回相应数据的**单向**的请求过程。
- 浏览器根据URL生成HTTP请求，请求中包含请求文件的位置、请求文件的方式等信息；
- 服务器接到请求后，会根据HTTP请求中的信息来决定如何获取相应的HTML文件；
- 服务器将得到的HTML文件发送给浏览器；
- **在浏览器还没有完全接受完HTML文件时便开始渲染、显示页面**；
- 在执行HTML中代码时，根据需要，浏览器会继续请求图片、CSS、Javascript、视频、音频等文件，过程类似。

针对浏览器渲染、显示页面的过程，说明如下：
- 浏览器端是一个边解析边渲染的过程。
- HTML Parser将HTML内容解析为DOM Tree，CSS Parser将CSS内容解析为样式规则（Style Rules）；
- 根据样式规则和DOM Tree来渲染树(Render Tree),在这个渲染树的过程中会发生回流（layout/reflow/relayout），回流就是浏览器计算各个盒模型的位置、大小等属性的过程；
- 等浏览器确定了盒模型的位置、尺寸等数据后开始绘制页面，这个过程称为重绘（Painting/repaint）。

#### 4. 浏览器与服务器断开连接

**断开连接——四次挥手**：
- 主机向服务器发送一个断开连接的请求（不早了，我该走了）；
- 服务器接到请求后发送确认收到请求的信号（知道了）；
- 服务器向主机发送断开通知（我也该走了）；
- 主机接到断开通知后断开连接并反馈一个确认信号（嗯，好的），服务器收到确认信号后断开连接。

说明：
- 为什么服务器在接到断开请求时不立即同意断开：当服务器收到断开连接的请求时，可能仍然有数据未发送完毕，所以服务器先发送确认信号，等所有数据发送完毕后再同意断开；
- 第四次挥手后，主机发送确认信号后并没有立即断开连接，而是等待了2个报文传送周期，原因是：如果第四次挥手的确认信息丢失，服务器将会重新发送第三次挥手的断开连接的信号，而服务器发觉丢包与重新发送断开连接到达主机的时间正好为2个报文传输周期。

### 优化相关的讨论

使用CDN。

对图片、css、js等静态资源进行压缩。

合并图片（css sprite）。

要权衡的是在全不合并（全不按需加载，最节约流量，但交互过程中的加载可能体验并不好）和全部合并（全不按需加载，最节约流量，但交互过程最流畅）之间找一个平衡点。不同类型系统的这个点肯定是不一样的，需要先确定好优化的目标才好有针对性地去解决。

通常的项目JS代码量达不到需要特别关照的程度，一般uglify就足够了。

**模块化开发是趋势**：分而治之是不变的道理。无论是传统网页还是SPA应用，都需要借力模块化来保持代码的鲁棒性（Robust的音译，即健壮性）。解耦、独立，不会互相影响。

**异步加载/按需加载**本身有些跑偏了：从LAB.js开始，各种各样的加载器都在追求加载性能，异步加载，希望可以加快页面的加载速度。分模块加载，异步加载的好处其实并没有那么明显，模块太多，或者异步加载太多，整体的加载实现反而延长。

**合理分组，同步加载，用好浏览器缓存和CDN应该可以解决大部分问题**：区分开发运行时和线上运行时。开发时使用模块化、异步加载器大幅提升开发体验。线上按照**代码更新频率**和作用合理分组，合并压缩代码，同步加载3~5个文件。配置好静态服务器，使用CDN，充分利用浏览器缓存和CDN，静态资源就不会是性能瓶颈了。

注意，浏览器通常会对同域下的静态资源有并行下载最大数的限制。

最后，任何不以场景为前提的设计都是耍流氓，任何太不切实际的理想终将幻灭，任何想永存的技术都是临时方案。


## 图片在父元素中水平、垂直居中

### 不知图片大小的情况下

方法一：
``` less
.parent {
  position: relative;
  display: block;

  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

方法二：
``` less
.parent {
  display: table-cell;
  // width要写得大一点，以撑满容器之外部容易的宽度
  width: 3000px;
  text-align: center;
  vertical-align: middle;

  .img {
    display: inline-block;
    vertical-align: middle;
  }
}
```

方法三（如果父元素的高度为已知的定制）：
``` less
.parent {
  display: block;
  text-align: center;
  height: 300px;
  line-height: 300px;

  .img {
    display: inline-block;
  }
}
```

### 知道图片大小和父级元素大小的情况下

方法四（写死距离）：
``` less
.parent {
  display: block;
  height: 400px;

  .img {
    display: block;
    height: 100px;
    margin: 150px auto 0;
  }
}
```

方法五（写死距离）：
``` less
.parent {
  position: relative;
  display: block;
  width: 600px;
  height: 400px;

  .img {
    position: absolute;
    width: 100px;
    height: 300px;
    top: 50px;
    left: 250px;
  }
}
```

### 如果父级元素的尺寸可以由内部图片元素决定

方法六：
``` less
.parent {
  display: inline-block; // 包围内部元素

  .img {
    padding: 30px 20px; // 用来加大父元素的尺寸
  }
}
```

### 如果图片允许作为父元素的背景图

方法七：
``` less
.parent {
  display: block;
  height: 300px;

  background: transparent url('./img/beauty.png') scroll no-repeat center center;
  background-size: 100px 200px;
}
```


## 简述position属性各个值的区别

fixed：类似absolute，但是是相对浏览器窗口而非网页页面进行定位。

absolute：相对最近的position值非normal的外层元素进行定位。

relative：相对自身在文档流中的原始位置进行定位。

static：position默认值，即元素本身在文档流中的默认位置（忽略top、bottom、left、right和z-index声明）。

inherit：继承父元素position属性的值。


## 完成一个页面布局（仅用HTML + CSS）

要求：分为左、中、右三部分，高度均为屏幕高度，左边部分宽度为200px，另外两部分等分剩下的页面宽度。

回答：可以。

``` html
<html>
<head></head>
<body>
  <div class="container">
    <aside class="left">Left</aside>
    <div class="wrapper">
      <article class="middle">Middle</article>
      <article class="right">Right</article>
    </div>
  </div>
</body>
</html>
```

``` less
.clearfix() {
  &:after {
    content: '';
    clear: both;
    display: block;
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
}
html, body, div, aside, article {
  margin: 0;
  padding: 0;
}
html, body, container, .left, .wrapper, .middle, .right {
  height: 100%;
}
.container {
  padding-left: 200px;
  .clearfix();

  .left {
    float: left;
    width: 200px;
    margin-left: -200px;
    background-color: skyblue;
  }

  .wrapper {
    float: left;
    width: 100%;

    .middle, .right {
      float: left;
      width: 50%;
    }
    .middle {
      background-color: gray;
    }
    .right {
      background-color: yellow;
    }
  }
}
```


## 边距塌陷及其修复

竖直方向上相接触的margin-top/bottom会塌陷，若二者均为正/负值，取其绝对值大者；若二者中一负一正，取二者之和。

## 清除浮动的原理

清除浮动使用clear: left/right/both。业界常用的.clearfix也是这么做的，只不过是把该样式写进了父元素的:after伪元素中，并加了opacity: 0; display: block; height: 0; visibile: hidden;等使伪元素不可见。

不清楚浮动但包围浮动元素的方法有 为浮动元素的父元素添加overflow: hidden、或将父元素也浮动起来等使父元素形成**BFC（Block Formatting Context）**的方式，但这些方式在应用上没有.clearfix这种方式理想。

## 常用meta标签

``` html
<!-- 设定页面使用的字符集 -->
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 国产360浏览器默认采用高速模式渲染页面 -->
<meta name="renderer" content="webkit">

<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

<!-- 禁止设备检测手机号和邮箱 -->
<meta name="format-detection" content="telephone=no,email=no">

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">

<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- UC应用模式 -->
<meta name="browsermode" content="application">

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">

<!-- Sets whether a web application runs in full-screen mode for iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- Sets the style of the status bar for a web application for iOS. This meta tag has no effect unless you first specify full-screen mode as described in apple-apple-mobile-web-app-capable -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Enables or disables automatic detection of possible phone numbers in a webpage in Safari on iOS. -->
<meta name="format-detection" content="telephone=no">

<!-- 用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出 -->
<meta http-equiv="pragma" content="no-cache">

<!-- 禁用缓存（再次访问需重新下载页面） -->
<meta http-equiv="cache-control" content="no-cache">

<!-- 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输 -->
<meta http-equiv="expires" content="0">

<!-- 停留2秒钟后自动刷新到URL网址 -->
<meta http-equiv="Refresh" content="2;URL=http://www.example.com/">

<!-- for SEO，其中页面描述应不超过150个字符 -->
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 强制页面在当前窗口以独立页面显示，用来防止别人在框架里调用自己的页面 -->
<meta http-equiv="Window-target" content="_top">
```


## 参考

- [高性能 CSS3 动画](https://github.com/Yakima-Teng/Mars/blob/master/performance/high-performance-css3-animation.md)
- [CSS动画属性性能](https://github.com/Yakima-Teng/Mars/blob/master/performance/css-property-animation-performance.md)
- [问题列表](https://github.com/Yakima-Teng/Mars/tree/master/issues)
- [Andorid Issues](https://github.com/Yakima-Teng/Mars/blob/master/issues/android.md)
- [iOS Issues](https://github.com/Yakima-Teng/Mars/blob/master/issues/iOS.md)
- [Supported Meta Tags](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
- [资源与工具](https://github.com/AlloyTeam/Mars/tree/master/tools)
- [饿了么前端风格指南](https://github.com/ElemeFE/style-guide)
- [JS原型与原型链终极详解](http://www.108js.com/article/article1/10201.html)
- [一些简单的前端代码面试题](https://github.com/ppq1991/simple-code-questions)
- [The HTML DOM Element Object](http://www.w3schools.com/jsref/dom_obj_all.asp)
- [2016十家公司前端面试小记](http://www.cnblogs.com/xxcanghai/p/5205998.html)
- [前端打包如何在减少请求数与利用并行下载之间找到最优解？](https://www.zhihu.com/question/37286611)
- [从输入URL到页面加载发生了什么?](http://www.cnblogs.com/engeng/articles/5943382.html)
- [根据 URL 请求页面过程](https://segmentfault.com/a/1190000003925803)
