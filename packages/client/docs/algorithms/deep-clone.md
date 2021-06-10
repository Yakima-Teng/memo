# 深拷贝

## 1、实现

``` javascript
function deepClone(obj) {
    // if not object
    if (typeof obj !== 'object') {
        throw new TypeError('You should pass in an Object parameter')
    }

    // if null
    if (obj === null) {
        return null
    }

    // if array
    if (Array.isArray(obj)) {
        return obj.map((elem, idx) => deepClone(elem))
    }

    // if obj
    const tempObj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            tempObj[key] = deepClone(obj[key])
        }
    }
    return tempObj
}
```
