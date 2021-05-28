## 移动端click事件延时

在移动端使用click事件会产生300ms的延迟

问题的产生：移动端存在双击放大的问题，所以在移动端点击事件发生时，为了判断用户的行为（到底是要双击还是要点击），浏览器通常会等待300ms，如果300ms之内，用户没有再次点击，则判定为点击事件，否则判定为双击缩放。

为什么要解决：现代web对性能的极致追求，对用户体验的高标准，让着300ms的卡顿变得难以接受

如何解决：

1、user-scalable:no  禁止缩放——没有缩放就不存在双击，也就没有点击延迟

2、指针事件：CSS：-ms-touch-action:none   点击后浏览器不会启用缩放操作，也就不存在延迟。然而这种方法兼容性很不好。

3、FastClick库：针对这个问题所开发的轻量级库。FastClick在检测到touchend事件后，会立即触发一个模拟的click事件，并把300ms后真正的click事件阻止掉

用法：

``` javascript
window.addEventListener('load', function () {
  // 虽然可以绑定到更具体的元素，但绑定到body上能使整个应用都受益
  FastClick.attach(document.body)
})
```

当FastClick检测到页面中使用了user-scalable:no或者touch-action:none方案时，会静默退出。
