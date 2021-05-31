## 说明js中call、apply、bind的区别

call：func.call(obj, arg1, arg2)将func函数应用于obj对象上，此时func函数内部的this指向obj对象。

apply：与call类似，只是传参是以数组的方式进行的，如func.apply(obj, [arg1, arg2])。

bind：与call类似，修改了函数中this的指向，但并不立即执行，只是生成一个对应的新函数，需另行调用才会执行。
