[[toc]]

## JavaScript 中常用函数的实现

### 判断 JavaScript 全局变量是否存在 {#global-variable-exist}

``` javascript
if (typeof localStorage !== 'undefined') {
  // 此时访问localStorage不会出现引用错误
}
```

或者

``` javascript
// 浏览器端全局处 `window`/`this`/`self` 三者彼此全等
if ('localStorage' in self) {
  // 此时访问 `localStorage` 绝对不会出现引用错误
}
```

注意二者的区别：

``` javascript
var a // 或 var a = undefined
'a' in self // true
typeof a // 'undefined'
```

- 在全局作用域下定义 `var a = undefined` 或者 `var a` 相当于是给 `window` 对象添加了 `a` 属性，但是未赋值，即 `window.a === undefined` 为 `true`。
- `typeof a` 就是返回其变量类型，未赋值或者声明类型为 `undefined` 的变量，其类型就是 `undefined`

::: tip `const`、`let` 与 `var`

全局作用域下通过 `const` 或 `let` 定义一个变量时，并不会在 `window` 上挂载该对象，这是与 `var` 表现不同之处。

:::

### 判断 2 个对象是否**相等**（不是**相同**） {#object-equality}

**前提假设**

不是只根据引用地址来判断，只要两个对象的键完全一致且同名键对应的值也“相等”，就认为这两个对象是相等的，比如分开创建的 `{ a: 1 }` 和 `{ a: 1 }`，被认为是相等的两个对象。

**具体实现**

```javascript
function isObjectEqual (obj1, obj2) {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return obj1 === obj2
    }

    // 如果两个对象指向的是同一个引用地址，则为相同对象
    if (obj1 === obj2) {
        return true
    }

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
        return false
    }

    if (keys1.length === 0) {
        return true
    }

    for (let i = 0, len = keys1.length; i < len; i++) {
        const key = keys1[i]
        if (!isObjectEqual(obj1[key], obj2[key])) {
            return false
        }
    }

    return true
}
```

### 实现 `assign` {#assign}

```javascript
function assign () {
    const args = Array.from(arguments)
    const target = args.shift()

    if (!target || typeof target !== 'object') {
        throw new TypeError('入参错误')
    }

    const objects = args.filter((obj) => typeof obj === 'object')

    objects.forEach((obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key] = obj[key]
            }
        }
    })

    return target
}
```

### merge 合并 2 个对象的可枚举属性 {#merge-objects}

合并对象的**可枚举的**属性/方法到指定对象

```javascript
/**
 * 判断是否是非空对象
 * @param val {any}
 * @returns {boolean}
 */
function isObject(val) {
    return (
        typeof val !== 'null' &&
        ({}).toString.call(val).slice(8, -1).toLowerCase() === 'object'
    )
}

function merge(target, obj) {
    for (const p in obj) {
        if (!obj.hasOwnProperty(p)) {
            return
        }
        if (isObject(target[p]) && isObject(obj[p])) {
            merge(target[p], obj[p])
            return
        }
        target[p] = obj[p]
    }
    return target
}
```

### 快速填充数字数组 {#quick-fill-array}

假设你需要一个数组，数据长度为100，数组元素依次为0、1、2、3、4...98、99。该如何实现呢？直接写个for循环当然是可以的。不过这里有更方便的方法。

```javascript
Array.from(Array(100).keys())
```

或者

```javascript
[...Array(100).keys()]
```

如果你想要直接从 1 开始到 100，可以用 `Array.from` 方法实现（下面这种传参方法不太常见，第二个参数是一个 **map function**，可以对第一个参数传进去的**类数组对象**或者**可迭代对象**进行处理）：

`Array.from`的语法如下：

```javascript
Array.from(arrayLike)
Array.from(arrayLike, mapFn)
Array.from(arrayLike, mapFn, thisArg)
```

所以，可以这么写：

```javascript
Array.from({ length: 100 }, (_, i) => i + 1)
```

注意，上面的例子里可以认为 `{ length: 100 }` 是一个**类数组**。

* [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### [原创]不使用内置函数处理时间戳 {#timestamp}

**要求**

实现一个函数，该函数入参为一个时间戳，返回 `YYYY:MM:DD HH:mm:ss` 格式的字符串。不允许使用 `Date` 对象的内置方法。

已知：
- 时间戳是指格林威治时间 1970 年 01 月 01 日 00 时 00 分 00 秒（北京时间 1970 年 01 月 01 日 08 时 00 分 00 秒）起至现在的总秒数。
- 普通闰年：公历年份是 4 的倍数，且不是 100 的倍数的，为闰年（如 2004 年、2020 年等就是闰年）。
- 世纪闰年：公历年份是整百数的，必须是400的倍数才是闰年（如 1900 年不是闰年，2000 年是闰年）。
- 1、3、5、7、8、10、12 月每月 31 天。
- 4、6、9、11 月每月 30 天。

**实现**

```javascript
function toDateStr (ts) {
    // 1 天的毫秒数
    const tsDay = 24 * 60 * 60 * 1000
    // 1 小时的毫秒数
    const tsHour = 60 * 60 * 1000
    // 1 分钟的毫秒数
    const tsMin = 60 * 1000
    // 1 秒的毫秒数
    const tsSecond = 1000

    let remaining = ts
    // 天数
    const days = Math.floor(remaining / tsDay)
    remaining -= days * tsDay

    // 小时数
    const hours = Math.floor(remaining / tsHour)
    remaining -= hours * tsHour

    // 分钟数
    const mins = Math.floor(remaining / tsMin)
    remaining -= mins * tsMin

    // 秒数
    const seconds = Math.floor(remaining / tsSecond)

    // 将天数转换成年和月
    let years = 1970
    let months = 0
    let daysInLastMonth = 0
    
    // 统计过的天数
    let numOfDays = 0
    while (numOfDays < days) {
        // 2 月份
        let daysInFebruary = 28
        if (years % 400 === 0) {
            daysInFebruary = 29
        }
        if (years % 100 !== 0 && years % 4 === 0) {
            daysInFebruary = 29
        }

        // 各个月份的天数
        const arrMonthAndDays = [
            31, daysInFebruary, 31, 30, 31,
            30, 31, 31, 30, 31,
            30, 31,
        ]
        for (const daysInMonth of arrMonthAndDays) {
            /**
             * 注意这里是小于，不是小于等于，
             * 因为是从 1970 年 1 月【1 日】开始计算的，
             * 过 30 天就是 1 月 31 日，过 31 天已经是 2 月份了
             */
            if (days - numOfDays < daysInMonth) {
                daysInLastMonth = days - numOfDays
                numOfDays += days - numOfDays
                break
            }
            months++
            numOfDays += daysInMonth
        }
        
        if (numOfDays < days) {
            // 下一个年份
            years++
            months = 0
        }
    }

    /**
     * 因为时间戳是从 1970 年 1 月 1 日开始计时的，
     * 所以误差 1 天实际对应的是 2 号，
     * 所以我们最终算出来的误差天数需要加 1
     */
    return [
        `${years}:${months + 1}:${daysInLastMonth + 1}`,
        `${hours}:${mins}:${seconds}`
    ].join( )
}
```

### [原创]三行代码实现函数柯里化 {#curry}

**实现一个函数，用于将目标函数柯里化**

柯里化之前的效果：

```javascript
// 柯里化之前
function add(a, b, c, d, e) {
    console.log(a + b + c + d + e)
}
add(1, 2, 3, 4, 5)
```

实现一个柯里化函数 `curry`，使得下面 `curryAdd(1)(2)(3)(4)(5)` 的计算结果与上方 `add(1, 2, 3, 4, 5)` 一致：

```javascript
function curry() {}
const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3)(4)(5)) // 输出：15
```

**实现方案**

判断当前传入函数的参数个数 (`args.length`) 是否大于等于**原函数**所需参数个数 (`fn.length`) ：
- 如果是，则执行当前函数；
- 如果否，则返回一个新函数，用于继续接收更多的参数。

注意，这里我们的原函数是指如下这个函数（`fn.length`为 5，因为有 `a`、`b`、`c`、`d`、`e` 一共 5 个参数）：

```javascript
function add(a, b, c, d, e) {
    console.log(a + b + c + d + e)
}
```

实现方案如下：

```javascript
function curry(fn, ...args) {
    // 函数的参数个数可以直接通过函数的 `.length` 属性来访问
    return args.length === fn.length
        ? fn(...args)
        : (...newArgs) => curry(fn, ...args, ...newArgs)
}

// 使用
function add(a, b, c, d, e) {
    console.log(a + b + c + d + e)
}
const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3)(4)(5)) // 输出：15
```
