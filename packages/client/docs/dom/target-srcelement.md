# target、currentTarget、srcElement

## 1、Event.target

The target property of the Event interface is a reference to the object
onto which the event was dispatched.
It is different from Event.currentTarget when the event handler is called
during the bubbling or capturing phase of the event.

## 2、Event.currentTarget

The currentTarget read-only property of the Event interface identifies
the current target for the event, as the event traverses the DOM.
**It always refers to the element to which the event handler has been attached**,
as opposed to Event.target,
which identifies the element on which the event occurred and which may be its descendant.

## 3、currentTarget和target的比较

- target指向事件直接作用的对象，而currentTarget指向绑定该事件的对象；
- 当处于捕获或冒泡阶段时，两者指向不一致；当处于目标阶段时，两者指向一致。

**获取事件对象和目标对象：**

``` javascript
function (e) {
  e = e ? e : window.event
  var target = e.target || e.srcElement
  // do some things here
}
```

## 4、Event.srcElement

Initially implemented in Internet Explorer,
Event.srcElement is a now-standard alias
(defined in the DOM Standard but flagged as "historical") for the Event.target property.
It's supported in all major browser engines,
but only for compatibility reasons.
Use Event.target instead.

This feature is no longer recommended.
Though some browsers might still support it,
it may have already been removed from the relevant web standards,
may be in the process of being dropped,
or may only be kept for compatibility purposes.

Avoid using it, and update existing code if possible.
Be aware that this feature may cease to work at any time.

## 参考资料

- [Event.srcElement](https://developer.mozilla.org/en-US/docs/Web/API/Event/srcElement)
- [Event.currentTarget](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
- [Event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
