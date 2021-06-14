# 链表

## 1、约瑟夫环问题

100个小朋友成环报数，从1开始，小朋友编号为1-10，
报到含3或者3的倍数时站起来并且之后不会再报，
当最后一个小朋友站起来时，他的编号和报的数字是多少？

## 2、数组下标方案

```javascript
const arr = Array(10)
const key = 3


const numOfPeopleToLeave = arr.length - 1
let numOfPeopleLeaved = 0
let count = 0
let totalCount = 0
while (numOfPeopleLeaved < numOfPeopleToLeave) {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === 1) {
            continue
        }
        count++
        totalCount++
        if (count === key) {
            arr[i] = 1
            numOfPeopleLeaved++
            count = 0
        }
    }
}
console.log(arr.findIndex((item) => item !== 1) + 1) // 4（第4个人是最后一个）
console.log(totalCount) // 27 最后一个人报的数字
```

## 3、链表方案

这题一般是要考链表（循环链表）。

如果是单向循环链表的话，对单个链表节点，有：

```javascript
function Node (next) {
    this.next = next || null
}
```

每当计数计到3时，将当前node节点的上一个节点的next指向当前node节点的下一个节点，然后继续从1开始计数，
代码就不写了，虽说数据结构上和数组下标方案不同，计数规则的写法上是差不多的，while循环的终止条件可以换成当当前节点next指向null时。

## 4、参考资料

- [算法科普：什么是约瑟夫环](https://www.cxyxiaowu.com/1159.html)
