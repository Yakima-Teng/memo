# 单调栈

英语学习：

- 时间复杂度：time complexity
- 单调栈：monotone stack

## 1、介绍

单调栈是一种特殊的栈结构，其内部元素的排序是单调朝一个方向的。在许多数组的范围查询问题上，用上单调栈可显著降低时间复杂度——毕竟其时间复杂度只有O(N)。

## 2、去重返回最小数

这是LeetCode里的一道难度级别显示为中等的题目。

题目：给定一串数字, 去除字符串中重复的数字, 而且不能改变数字之间的顺序,
使得返回的数字最小 "23123" => "123" "32134323" => "1342"。

我的解法如下：

```javascript
function handleArray(strings) {
    const array = strings.split('')
    const stack = []
    const obj = {}

    for (let i = 0, len = array.length; i < len; i++) {
        const item = array[i]
        if (stack.length === 0) {
            stack.push(item)
            continue
        }
        while (stack[stack.length - 1] >= item && array.slice(i).includes(stack[stack.length - 1])) {
            stack.pop()
        }
        if (!stack.includes(item)) {
            stack.push(item)
        }
    }

    return stack.join('')
}
handleArray('23123')
handleArray('32134323')
```

## 3、参考资料

- [Algorithms for Interview 2: Monotonic Stack](https://medium.com/techtofreedom/algorithms-for-interview-2-monotonic-stack-462251689da8)
- [单调栈](https://oi-wiki.org/ds/monotonous-stack/)
- [由浅入深，单调栈思路去除重复字符](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/you-qian-ru-shen-dan-diao-zhan-si-lu-qu-chu-zhong-/)
