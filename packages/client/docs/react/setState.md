# setState机制

## 1、理想情况

setState是“异步”的，调用setState只会提交一次state修改到队列中，不会直接修改this.state。

等到满足一定条件时，react会合并队列中的所有修改，触发一次update流程，更新this.state。

因此setState机制减少了update流程的触发次数，从而提高了性能。

由于setState会触发update过程，因此在update过程必经的生命周期中调用setState会存在循环调用的风险。

另外如果要监听state更新完成，可以使用setState方法的第二个参数，回调函数。在这个回调中读取this.state就是已经批量更新后的结果。

## 2、特殊情况

在实际开发中，setState的表现有时会不同于理想情况。主要是以下两种。

- 在mount流程中调用setState。
- 在setTimeout/Promise回调中调用setState。

在第一种情况下，不会进入update流程，队列在mount时合并修改并render。

在第二种情况下，setState将不会进行队列的批更新，而是直接触发一次update流程。

这是由于setState的两种更新机制导致的，只有在批量更新模式中，才会是“异步”的。

## 参考资料

- [react基本原理及性能优化](https://segmentfault.com/a/1190000015648248)
