# React组件的生命周期

## 1、生命周期钩子

![react的生命周期](https://segmentfault.com/img/bVbcYvu?w=819&h=851)

**1.1、mount流程**

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

**1.2、update过程**

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

**1.3、unmount过程**

- componentWillUnmount

## 2、异步请求写在哪个生命周期里面合适

componentDidMount（原因）

## 参考资料

- [react基本原理及性能优化](https://segmentfault.com/a/1190000015648248)
