# 数字数组奇偶排序问题

## 1、问题

将数组中奇数放在右边，偶数放在左边，不允许使用额外空间

说明：从一个数组中间删除元素splice的运行代价是比较大的

## 2、答案

``` javascript
var arr = [1, 4, 5, 2, 3, 7, 8]
arr.sort(function (a, b) {
  return a % 2 !== 0
})
```

## 3、其他方案

下面的讨论暂时不考虑空间复杂度。


### 3.1、sort类似方案

```javascript
arr.sort((a) => -a % 2)
```

### 3.2、filter方案

```javascript
arr.filter((item) => item % 2 === 1).concat(arr.filter((item) => item % 2 === 0)
```

### 3.3、reduce方案

```javascript
arr.reduce((prev, curr) => curr % 2 === 0 ? [...prev, curr] : [curr, ...prev], [])
```

### 3.4、sort加排序方案

```javascript
arr.sort((a, b) => (a % 2 === 1 ? a / 9999999 : a) - (b % 2 === 1 ? b / 9999999 : b))
```

## 4、参考资料

- [数字数组奇排序问题](https://www.orzzone.com/numer-array-odd-even-sort.html)
