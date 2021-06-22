# 求平方根

## 1、题目

求一个数n的平方根。

## 2、解法

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
