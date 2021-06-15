# 事件代理/委托

事件代理/委托，是靠事件的冒泡机制实现的（所以，对于一些不具有冒泡特性的事件，比如focus、blur，就没有事件代理/委托这种说法了）。

## 1、优缺点
优点有：
- 可以大量节省内存占用，减少事件注册，比如在table上代理所有td的click事件就非常棒；
- 可以实现当新增子孙节点时无需再次对其绑定事件，对于动态内容部分尤为合适。

缺点有：
- 如果把所有事件都代理到一个比较顶层的DOM节点上的话，比较容易出现误判，给不需要绑定事件的节点绑定了事件，比如把页面中所有事件都绑定到document上进行委托，就不是很合适；
- 事件逐级冒泡到外部dom上再执行肯定没有直接执行快。

## 2、实现

```javascript
// 只考虑IE 9&+
function delegate(element, targetSelector, type, handler) {
    element.addEventListener(type, function(e) {
        var targets = Array.prototype.slice.call(element.querySelectorAll(targetSelector))
        var target = e.target
        if (targets.indexOf(target) !== -1) {
            return handler.apply(target, arguments)
        }
    })
}

// 兼容写法
function delegate(element, targetClass, type, handler) {
    addEvent(element, type, function(e) {
        e = e || window.event
        var target = e.target || e.srcElement
        if (target.className.indexOf(targetClass) !== -1) {
            handler.apply(target, arguments)
        }
    })
}

function addEvent(target, type, listener) {
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

说明：上面的实现方案中addEvent方法的最后一种实现方式，
即`target['on' + type]`的方式会将之前绑定的事件覆盖掉，是有点问题的。
但是考虑到兼容性，一般来说代码是走不到这个地方的，所以也没有问题。
