# 二分法查找

英语科普：二分法，[dichotomy](https://www.google.com/search?q=dichotomy)。

## 前提

数组已预先排序。

## 面试题

问题：在已从小到大排序的数组（数组内元素均为数字）中找到给定的数字对应的下标。

回答：

``` javascript
function dichotomySearch (arr, num) {
  var low = 0
  var high = arr.length - 1
  var mid = Math.floor((low + high) / 2)

  // while循环的判断条件是high - low > 1
  while (high - low > 1) {
    if (num === arr[low]) {
      return low
    } else if (num === arr[high]) {
      return high
    } else if (num === arr[mid]) {
      return mid
    } else if (num > arr[mid]) {
      low = mid
      mid = Math.floor((low + high) / 2)
    } else {
      high = mid
      mid = Math.floor((low + high) / 2)
    }
  }

  // 如果没找到，则返回-1
  return -1
}
```
