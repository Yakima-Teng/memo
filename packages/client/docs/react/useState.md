# useState的实现原理

## 1、基本用法

```jsx harmony
import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

按照React 16.8.0版本之前的机制，我们知道如果某个组件是函数组件，
则这个function就相当于Class组件中的render()，
不能拥有自己的状态（故又称其为无状态组件，stateless components），
所以数据（输入）必须是来自父组件的props。
而在>=16.8.0中，函数组件支持通过使用Hooks来为其引入state的能力，
例如上面所展示的例子：这个App组件提供了一个按钮，
每次点击这个都会执行setCount使得count增加1，并更新在视图上。

## 2、模拟实现

React.useState() 里都做了些什么：

1. 将初始值赋给一个变量我们称之为 state
2. 返回这个变量 state 以及改变这个 state 的回调函数我们称之为 setState
3. 当 setState() 被调用时， state 被其传入的新值重新赋值，并且更新根视图

```jsx harmony
function useState(initialState) {
  let _state = initialState;
  const setState = (newState) => {
    _state = newState;
    ReactDOM.render(<App />, rootElement);
  };
  return [_state, setState];
}
```

4. 每次更新时，函数组件会被重新调用，也就是说useState()会被重新调用，
为了使state的新值被记录（而不是一直被重新赋上initialState），
需要将其提到外部作用域声明。

```jsx harmony
let _state;
function useState(initialState) {
  _state = _state === undefined ? initialState : _state;
  const setState = (newState) => {
    _state = newState;
    ReactDOM.render(<App />, rootElement);
  };
  return [_state, setState];
}
```

通过时上面的处理，目前暂时是达到了React.useState()一样的效果。

5. 但是，如果添加多个useState()，就一定会出现BUG了。
因为当前的_state只能存放一个单一变量。
如果我将_state改成数组存储呢？
让这个数组_state根据当前操作useState()的索引向内添加state。

```jsx harmony
let _state = [], _index = 0;
function useState(initialState) {
  let curIndex = _index; // 记录当前操作的索引
  _state[curIndex] = _state[curIndex] === undefined ? initialState : _state[curIndex];
  const setState = (newState) => {
    _state[curIndex] = newState;
    ReactDOM.render(<App />, rootElement);
    _index = 0; // 每更新一次都需要将_index归零，才不会不断重复增加_state
  }
  _index += 1; // 下一个操作的索引
  return [_state[curIndex], setState];
}
```

虽然通过使用数组存储_state成功模拟了多个useState()的情况，但这要求我们保证useState()的调用顺序，
所以我们不能在循环、条件或嵌套函数中调用useState()，这在React.useState()同样要求，官网还给出了专门的解释。

实际上，React并不是真的是这样实现的。上面提到的_state其实对应React的memoizedState，而_index实际上是利用了链表。

## 参考资料

- [useState 的原理及模拟实现 —— React Hooks 系列（一）](https://zhuanlan.zhihu.com/p/100714485)
