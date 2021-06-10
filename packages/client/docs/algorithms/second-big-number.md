# 求一个数组中第二大的元素

## 1、问题

要求：
- 不能对这个数组进行整体排序；
- 若要用循环，只能一重循环；
- 不使用额外空间。

## 2、解答

思路：把最大的数字标记为null，然后再求此时的最大数字。

``` javascript
var arr = [1, 3, 5, 2, 7, 6]
arr[arr.indexOf(Math.max.apply(null, arr))] = null
Math.max.apply(null, arr)
```
