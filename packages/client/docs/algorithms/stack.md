# 栈

## 1、括号闭合问题

给定一个只包括`'('`，`')'`，`'{'`，`'}'`，`'['`，`']'`的字符串`s`，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

如：

- 有效的字符串：`"()"`、`"()[]{}"`、`"{[]}"`。
- 无效的字符串：`"(]"`、`"([)]"`。

我的解法如下：

```javascript
function isStrValid (str) {
    const matches = ['()', '[]', '{}']
    const arr = []
    for (let i = 0, len = str.length; i < len; i++) {
        const char = str.charAt(i)
        if (arr.length === 0) {
            arr.push(char)
            continue
        }
        const last = arr[arr.length - 1]
        if (matches.includes(last + char)) {
            arr.pop()
            continue
        }
        arr.push(char)
    }
    return arr.length === 0
}
```

## 参考资料

- [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
