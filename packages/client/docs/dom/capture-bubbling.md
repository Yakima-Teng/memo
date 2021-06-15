# 事件的冒泡和捕获

## 1、介绍

JS中事件流的三个阶段：捕获（低版本IE不支持）==>目标==>冒泡。

- Capture：from general to specific;
- Bubbling：from specific to general.

如果不同层的元素使用useCapture不同，
会先从最外层元素往目标元素寻找设定为capture模式的事件，
到达目标元素后执行目标元素的事件后，在循原路往外寻找设定为bubbling模式的事件。
