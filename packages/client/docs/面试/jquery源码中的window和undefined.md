## jquery源码中的()(function(window,undefined){})(window)

通过这种方式创建一个值为undefined的变量。
传window是出于性能考虑，js寻找一个变量是沿着作用域链逐级往上找的，把window变为函数内部的局部变量后，就不再需要每次都沿着作用域链一直到顶级才找到window了。
