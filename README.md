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

<<<<<<< HEAD
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

## ES5实现Promise

一些说明：
- promise有三种状态：pending、resolved、rejected，状态只能由pending转变成resolved或rejected，不可逆，并且后两者彼此也不可互相转换；
- promise必须有一个then方法，而且要返回一个promise，供then链式调用，也就是必须是可thenable的；
- promise接受两个回调（onResolved, onRejected），回调可返回promise，等待此promise被resolved后，继续触发then链。

思路大致是，用2个数组doneList和failList分别存储成功时的回调函数队列和失败时的回调函数队列：
- state：当前执行状态，有pending、resolved、rejected三种取值；
- done：向doneList中添加一个成功回调函数；
- fail：向failList中添加一个失败回调函数；
- then：分别向doneList和failList中添加回调函数；
- always：

// TODO: go on reading http://www.cnblogs.com/chris-oil/p/5715073.html

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
- [浅谈Javascript中Promise对象的实现](http://www.cnblogs.com/chris-oil/p/5715073.html)
