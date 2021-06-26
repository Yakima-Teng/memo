# 二分法查找

英语科普：二分法，[dichotomy](https://www.google.com/search?q=dichotomy)。

## 1、前提

数组已预先排序。

## 2、具体实现

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

## 3、求平方根

求一个数n的平方根。

```javascript
/**
 * 计算平方根
 * @param  {[type]} n         需要求平方根的目标数字
 * @param  {[type]} deviation 偏离度（允许的误差范围）
 * @return {[type]}           返回平方根
 */
function square (n, deviation) {
	let max = n
	let min = 0
	let mid = (max - min) / 2
	const isAlmost = (val) => (val * val - n <= deviation) && (n - val * val <= deviation)
	while (isAlmost(mid) === false) {
		if (mid * mid > n) {
			max = mid
			mid = (max + min) / 2
		} else if (mid * mid < n) {
			min = mid
			mid = (max + min) / 2
		}
	}
	return mid
}
```
