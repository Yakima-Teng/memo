# 数组扁平化

## 1、问题

- 将数组中的所有数组元素扁平化成顶层元素，返回新数组，不修改原数组
- 增加去重功能，重复的**为基本数据类型的元素**不显示（只是不显示重复的部分，即如果有两个2，第二个重复的2不显示，第一个2还是要显示的）

## 2、解答

``` javascript
function flattenArray(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('You should pass in an Array parameter')
    }
    const tempArr = []
    const tempObj = {}

    void function recurison(item) {
        if (Array.isArray(item)) {
            item.forEach(recurison)
        } else {
            if (typeof item === 'object') {
                tempArr.push(item)
            } else if (!tempObj[item]) {
                tempArr.push(item)
                tempObj[item] = true
            }
        }
    }(arr)

    return tempArr
}
```
