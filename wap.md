[[toc]]

## 移动端开发 {#wap}

### 响应式页面设计的原理 {#responsive-design}

响应式页面设计的原理是让页面根据浏览器屏幕宽度/视口宽度自适应，较理想地呈现出页面内容。

较常见的做法是使用CSS media query，
而且通常会在meta标签中对viewport的宽度等进行设定（比如设定width: device-width）。
但即便不用这种方法，只要页面能根据屏幕宽度做出自适应的调整，那就是响应式设计。

**rem布局原理**

``` javascript
function fit () {
  // 750是设计稿的宽度
  const scale = $('body').width() / 750
  // 开发时，以100px对应1rem进行计算
  document.querySelector('html').style.fontSize = 100 * scale + 'px'
}

$(document).ready(() => {
  fit()
  $(window).resize(fit)
})
```

### 移动端click事件延时 {#mobile-click-delay}

在移动端使用click事件会产生300ms的延迟。

问题的产生：移动端存在双击放大的问题，
所以在移动端点击事件发生时，为了判断用户的行为（到底是要双击还是要点击），浏览器通常会等待300ms，
如果300ms之内，用户没有再次点击，则判定为点击事件，否则判定为双击缩放。

为什么要解决：现代web对性能的极致追求，对用户体验的高标准，让着300ms的卡顿变得难以接受

如何解决：

1、user-scalable:no  禁止缩放——没有缩放就不存在双击，也就没有点击延迟

2、指针事件：CSS：-ms-touch-action:none  点击后浏览器不会启用缩放操作，也就不存在延迟。然而这种方法兼容性很不好。

3、FastClick库：针对这个问题所开发的轻量级库。FastClick在检测到touchend事件后，会立即触发一个模拟的click事件，并把300ms后真正的click事件阻止掉

用法：

``` javascript
window.addEventListener('load', function () {
  // 虽然可以绑定到更具体的元素，但绑定到body上能使整个应用都受益
  FastClick.attach(document.body)
})
```

当FastClick检测到页面中使用了user-scalable:no或者touch-action:none方案时，会静默退出。

### 伪类:active失效 {#pseudo-active}

只需给document绑定touchstart或touchend事件即可，
如document.addEventListener('touchstart', function () {}, false)。

更简单的方法是直接在html中body标签上添加属性ontouchstart=""。

### 格式检测 {#format-detection}

不让安卓手机识别邮箱：
``` html
<meta content="email=no" name="format-detection">
```

禁止IOS识别长串数字为电话：
``` html
<meta content="telephone=no" name="format-detection">
```

### 交互限制 {#action-limit}

禁止iOS弹出各种操作窗口：-webkit-touch-callout: none;

禁止用户选中文字：-webkit-user-select: none;

### input[type="date"]不支持placeholder {#input-date-placeholder}

``` html
<input
    placeholder="占位符"
    type="text"
    onfocus="(this.type='date')"
    onblur="(this.type='text')"
>
```

### iOS部分版本Date构造函数不支持YYYY-MM-DD格式入参 {#ios-date-yyyy-mm-dd}

iOS 部分版本的 `Date` 构造函数不支持规范标准中定义的 `YYYY-MM-DD` 格式，如 `new Date('2013-11-11')` 是 `Invalid Date`，但支持 `YYYY/MM/DD` 格式，可用 `new Date('2013/11/11')`。最通用的还是直接年月日注入传入的方式，即 `new Date(year, month, date)`。

类似的，对于 `yyyy-mm-dd hh:mm:ss` 格式的日期，可以通过类似下面的方法将其转换为 `Date` 对象实例（适用于所有设备）：

```javascript
// 将形如"yyyy-mm-dd hh:mm:ss"的日期字符串转换为日期对象（兼容IOS设备）
function longStringToDate (dateString) {
  if (dateString && dateString.length === 19) {
    // Attention: there is a space between regular expression
    const tempArr = dateString.split(/[- :]/)
    return new Date(
        tempArr[0],
        tempArr[1] - 1,
        tempArr[2],
        tempArr[3],
        tempArr[4],
        tempArr[5]
    )
  }
  return 'Invalid Date'
}
```
