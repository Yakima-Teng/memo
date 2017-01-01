# memo

因为入门时间不长，前端涉及到的东西又多，自己也还会去看些后端的东西，精力有限，不可能看过的东西都记得，借这篇文档，主要是帮助自己回忆一些知识点。算是备忘录吧。

有点地方可能自己写得不好，不完善，甚至是不对，希望看发现的朋友能提个issue，或者提个pr。^_^

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
```
<meta content="email=no" name="format-detection">
```

禁止IOS识别长串数字为电话：
```
<meta content="telephone=no" name="format-detection">
```

禁止iOS弹出各种操作窗口：-webkit-touch-callout: none;

禁止用户选中文字：-webkit-user-select: none;

input[type="date"]不支持placeholder：
```
<input placeholder="占位符" type="text" onfocus="(this.type='date')">
```

三星I9100 （Android 4.0.4）不支持display:-webkit-flex这种写法的弹性布局，但支持display:-webkit-box这种写法的布局,相关的属性也要相应修改，如-webkit-box-pack: center，移动端采用弹性布局时，建议直接写display:-webkit-box系列的布局。

touchmove事件在Android部分机型(如LG Nexus 5 android4.4，小米2 android 4.1.1)上只会触发一次。解决方案是在触发函数里面加上e.preventDefault()。

iOS部分版本的Date构造函数不支持规范标准中定义的YYYY-MM-DD格式，如new Date('2013-11-11')是Invalid Date, 但支持YYYY/MM/DD格式，可用new Date('2013/11/11')；类似的，对于yyyy-mm-dd hh:mm:ss格式的日期，可以通过类似下面的方法将其转换为Date对象实例（适用于所有设备）：
```
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

## PC端常见问题

IE8不支持CSS媒体查询，也无法识别html5中的新元素（nav、article等），可用在head中加入如下代码解决：
```
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

## 常用meta标签

```
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
