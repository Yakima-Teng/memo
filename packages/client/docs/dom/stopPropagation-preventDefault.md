# 阻止事件传播和默认行为

## 阻止事件传播

The stopPropagation() method of the Event interface
prevents further propagation of the current event in the
capturing and bubbling phases.
It does not, however, prevent any default behaviors from occurring;
for instance, clicks on links are still processed.
If you want to stop those behaviors, see the preventDefault() method.

```javascript
e = e || window.event
if (e.stopPropagation) {
    e.stopPropagation()
} else {
    // IE 8&-
    e.cancelBubble = true
}
```

## 阻止事件的默认行为

```javascript
e = e || window.event
if (e.preventDefault) {
    // none-IE, IE 9&+
    e.preventDefault()
} else {
    // IE 5-8
    e.returnValue = false
}
```

## Event.stopImmediatePropagation

The stopImmediatePropagation() method of the Event interface prevents
other listeners of the same event from being called.

**If several listeners are attached to the same element for the same event type,
they are called in the order in which they were added.**
If stopImmediatePropagation() is invoked during one such call,
no remaining listeners will be called.

## stopPropagation和stopImmediatePropagation

- stopPropagation will prevent any **parent** handlers from being executed;
- stopImmediatePropagation will prevent any **parent** handlers and also any **other handlers from executing**.

## jQuery中的return false

原生JS中return false只会阻止默认行为，
而用jQuery的话会同时阻止事件传播和阻止事件的默认行为：

```javascript
$('a').click(function() {
    // 同时阻止默认行为和事件传播
    return false
})

document.getElementById('link').onclick = function(e) {
    // 阻止默认行为
    return false
}
```

下面这段是在jQuery 3.6.0中找到的代码，供参考：

```javascript
ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
    handleObj.handler).apply(matched.elem, args);

if (ret !== undefined) {
    if ((event.result = ret) === false) {
        event.preventDefault();
        event.stopPropagation();
    }
}
```

## 参考资料

- [Event.stopImmediatePropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation)
- [Example 5: Event Propagation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples#example_5_event_propagation)
- [stopPropagation vs. stopImmediatePropagation](https://stackoverflow.com/questions/5299740/stoppropagation-vs-stopimmediatepropagation)
