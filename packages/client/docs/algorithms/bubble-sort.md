# 冒泡排序

英文：Bubble Sort。

冒泡排序的思想是，比较相邻两个数，如果前者大于后者，就把两个数交换位置；这样一来，第一轮就可以选出一个最大的数放在最后面；那么经过n-1轮，就完成了所有数的排序。

## 1、基本实现

``` javascript
function bubbleSort (arr) {
  var len = arr.length
  while (len > 0) {
    for (var i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        var temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    len--
  }
  return arr
}
```

## 2、优化

在上面的方案中，如果我们经过第一轮排序就成功将所有元素正确排好序了的话，仍然会继续遍历。
这里可以每一轮开始遍历时，加一个初始值为false的changeFlag标记，
当本轮有进行过换位的话，就接着遍历下一轮。
当本轮没有进行过换位操作的话，则说明已经排序完毕，就可以直接退出循环，没必要接着遍历了。
具体实现还是比较简单的，大家自行尝试，这里就不写了。
