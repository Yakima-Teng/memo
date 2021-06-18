# React做了什么

react是用于构建用户界面的JS框架。因此react只负责解决view层的渲染。

## 1、react做了什么？

- Virtual Dom模型
- 生命周期管理
- setState机制
- diff算法
- React patch、事件系统
- react的 Virtual Dom模型

virtual dom 实际上是对实际Dom的一个抽象，是一个js对象。react所有的表层操作实际上是在操作virtual dom。

经过diff算法会计算出virtual dom的差异，然后将这些差异进行实际的dom操作更新页面。

## 参考资料

- [react基本原理及性能优化](https://segmentfault.com/a/1190000015648248)
