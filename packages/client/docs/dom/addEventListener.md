# 事件绑定和解绑

## 1、attachEvent

IE8及以下：attachEvent

element.attachEvent(type, listener)
- element：要绑定事件的对象，或HTML节点；
- type：事件名称（带“on”），如“onclick”、“onmouseover”；
- listener：要绑定的事件监听函数；
- 默认在事件冒泡时执行。

## 2、addEventListener

标准的绑定事件监听函数的方法：addEventListener

element.addEventListener(type, listener, useCapture)
- element: 要绑定事件的对象，或HTML节点；
- type：事件名称（不带“on”），如“click”、“mouseover”；
- listener：要绑定的事件监听函数；
- userCapture：事件监听方式，只能是true或false。true，采用捕获（capture）模式；false，采用冒泡（bubbling）模式。若无特殊要求，一般是false。

## 3、区别

addEventListener方法的listener监听函数在元素的作用域内进行，**this指向当前元素**；attachEvent方法的listener监听函数在全局作用域下运行，**this指向window**。

注意：target.addEventListener、target.attachEvent与target.onclick这类方法的区别：

- 前面两种方法允许对一个target的某个事件同时绑定多个listener，后者在绑定多个listener的情况下只有最后一个会生效（后定义的会覆盖先定义的）；
- 后面两种只能在**冒泡阶段**触发listener。

## 4、兼容的事件绑定方法

``` javascript
function addEvent(target, type, listener) {
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

## 5、兼容的事件解绑方法：

``` javascript
function removeEvent(target, type, listener) {
    if (target.removeEventListener) {
        target.removeEventListener(type, listener, false)
    } else if (target.detachEvent) {
        target.detachEvent('on' + type, listener)
    } else {
        target.detachEvent['on' + type] = null
    }
}
```
