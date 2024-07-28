[[toc]]

## Vue2 diff 算法 {#vue2-diff}

### 虚拟 DOM (VNode) {#vue2-virtual-dom}

假设我们的真实dom是：

```html
<ul id="container">
    <li class="box" :key="user1">张三</li>
    <li class="box" :key="user2">李四</li>
</ul>
```

那么他对应的VNode就是：

```javascript
const oldVNode = {
  tag: "ul",
  data: {
    staticClass: "container",
  },
  text: undefined,
  children: [
    {
      tag: "li",
      data: { staticClass: "box", key: "user1" },
      text: undefined,
      children: [
        { tag: undefined, data: undefined, text: "张三", children: undefined },
      ],
    },
    {
      tag: "li",
      data: { staticClass: "box", key: "user2" },
      text: undefined,
      children: [
        { tag: undefined, data: undefined, text: "李四", children: undefined },
      ],
    },
  ],
};
```

这时候修改一个li标签的内容：

```html
<ul id="container">
    <li class="box" :key="user1">张三123123123</li>
    <li class="box" :key="user2">李四</li>
</ul>
```

对应的虚拟dom就变成：

```javascript
const newVNode = {
  tag: "ul",
  data: {
    staticClass: "container",
  },
  text: undefined,
  children: [
    {
      tag: "li",
      data: { staticClass: "box", key: "user1" },
      text: undefined,
      children: [
        { tag: undefined, data: undefined, text: "张三123123123", children: undefined },
      ],
    },
    {
      tag: "li",
      data: { staticClass: "box", key: "user2" },
      text: undefined,
      children: [
        { tag: undefined, data: undefined, text: "李四", children: undefined },
      ],
    },
  ],
};
```

### diff {#vue2-diff-detail}

用一句话来概括就是：同层比较、深度优先。

- 如果不限制同层比较的话，时间复杂度就不只是 On 了。

![](./attachments/vue2-diff-01.awebp)

#### 执行过程 {#vue2-diff-flow}

当我们 `this.key = xxx` 时，触发当前 `key` 的 `setter`，并通过内部 `dep.notify()` 通知所有 `watcher` 进行更新，更新的时候就会调用 `patch 方法。

![](./attachments/vue2-diff-02.awebp)

#### patch {#vue2-diff-patch}

这个函数的作用就是：通过 `sameVnode()` 判断 `oldVnode`、`newVnode` 是否为同一种节点类型。

- 如果是同一种节点类型，就调用 `patchVnode()` 进行 diff 算法。
- 否则，直接进行替换。

patch 的核心代码：

```javascript
function patch(oldVnode, newVnode) {
    const isRealElement = isDef(oldVnode.nodeType) //判断oldVnode是否是真实节点
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 更新周期走这里，diff发生的地方
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly) 
    } else {
        // 如果是真实dom，就转换为Vnode，赋值给oldVnode
        if (isRealElement) {
            oldVnode = emptyNodeAt(oldVnode) 
        }

        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm) // 得到真实dom的父节点

        // 将oldVnode转换为真实dom，并插入
        createElm(
            vnode,
            insertedVnodeQueue,
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
        )

        if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0) // 删除老的节点
        } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode)
        }
    }
}
```

#### sameVnode {#vue2-same-vnode}

这个方法主要是用来比较传入的俩个vnode是否是相同节点。判断条件见如下代码：

```javascript
function sameVnode (a, b) {
  return (
    a.key === b.key && // 比较key
    a.asyncFactory === b.asyncFactory && (
      (
        a.tag === b.tag && // 比较标签
        a.isComment === b.isComment && // 比较注释
        isDef(a.data) === isDef(b.data) && // 比较data
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

#### patchVnode {#vue2-patch-vnode}

主要作用：比较俩个Vnode，包括三种类型操作：属性更新 、文本更新、子节点更新。

具体规则如下：

- 新老节点均有 children 子节点，则对子节点进行 diff 操作，调用 updateChildren。
- 如果新节点有子节点，而老节点没有子节点，先清空老节点的文本内容，然后为其新增子节点。
- 如果新节点没有子节点，而老节点有子节点，则移除老节点所有的子节点。
- 当新老节点都没有子节点的时候，只是文本的替换。

`patchVnode` 核心代码：

```javascript
function patchVnode (oldVnode, vnode,) {
    if (oldVnode === vnode) {
        return
    } // 如果新节点等于老节点直接返回

    const elm = vnode.elm = oldVnode.elm // 将oldVnode的真实dom节点赋值给Vnode
 
    // 获取新旧节点的子节点数组
    const oldCh = oldVnode.children
    const ch = vnode.children

    // 如果新节点没文本，大概率有子元素
    if (isUndef(vnode.text)) {

        // 如果双方都有子元素
        if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
        }

        // 如果新节点有子元素
        else if (isDef(ch)) {
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
        }

        // 如果老节点有子元素（走到这一步说明新节点没有子元素）
        else if (isDef(oldCh)) {
            removeVnodes(oldCh, 0, oldCh.length - 1)
        }

        // 如果老节点有文本（走到这一步说明新节点没有文本）
        else if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, '')
        }
    }

    // 如果老节点的文本 != 新节点的文本
    else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text)
    }
}
```

上面的代码验证了我们上面说的四点规则，其中最主要的还是新旧节点都有子元素的时候的对比，也就是 `updateChildren`。

#### updateChildren {#vue2-update-children}

这个方式是 `patchVnode` 中的一个重要方法，也叫**重排操作**。主要进行新旧虚拟节点的子节点的对比，等通过 `sameVnode()` 找到相同节点时，再递归调用 `patchVnode`。

对比过程：

1. 旧首 => 新首
2. 旧尾 => 新尾
3. 旧首 => 新尾
4. 旧尾 => 新首

如果以上都匹配不到，再以新 `vnode` 为准，依次遍历老节点，直到找到相同的节点之后，再调用 `patchVnode`。

> 备注：过程1~4你可以理解为Vue优化的一种手段，想想你平时使用Vue场景，要么在开头或结尾插入，要么只是单纯的修改某个值（this.key = xxx）,Vue考虑到了这种场景可能出现的频率很高，索性就做了这个优化，避免每次重复遍历，这样对性能提升很大。

![](./attachments/vue2-diff-03.awebp)

接下来用一个实际例子，来看一下 diff 过程。

描述：真实 DOM 和 oldVnode 是内容分别为 a、b、c 的 div，新的虚拟 dom 只是改变了原来节点的内容（新a、新b、新c）以及新增了一个内容为 新d 的 div，别的没有任何变化。需要注意的是每次比较都遵循上面的规则。

初始值：

- oSIdx（oldVnode开头下标） = 0
- oEIdx（oldVnode结尾下标） = 2
- nSIdx（newVnode开头下标） = 0
- nEIdx（newVnode结尾下标） = 3

![](./attachments/vue2-diff-04.awebp)

**第一步：`oldVnode[oSIdx] === newVnode[nSIdx]` **

描述：按照规则，先 旧首 => 新首，`sameVnode(a,b)` 结果为 `true`，说明是相同节点。需要做的就是调用`patchVnode(oldVnode,vNode)` 更新节点的内容，之后 `oSIdx++`、`nSIdx++`。

![](./attachments/vue2-diff-05.awebp)

**第二步：oldVnode[oSIdx] === newVnode[nSIdx]（注意：此时oSIdx为1，nSIdx为1）**

描述：此时分别比较oldVnode、newVnode对应的第二个节点，因为是循环，所以依然是重新执行规则 旧首 => 新首（下面的源码里面可以看到对应逻辑），sameVnode(a,b)结果为true，所以依然是调用patchVnode(oldVnode,vNode)更新节点内容。之后oSIdx++、nSIdx++。

![](./attachments/vue2-diff-06.awebp)

**第三步：oldVnode[oSIdx] === newVnode[nSIdx]//注意：此时oSIdx为2，nSIdx为2**

描述：这一步跟前两步一样，这里不做过多描述。之后oSIdx++、nSIdx++。

![](./attachments/vue2-diff-07.awebp)

**第四步**

```text
oSIdx = 3  oEIdx = 2
nSIdx = 3  nEIdx = 3
```

描述：因为此时oSIdx>oEIdx、nSIdx===nEIdx（按照源码的逻辑，结束while循环），说明oldCh先遍历完，所以newCh比oldCh多，说明是新增操作，执行addVnodes()，将新节点插入到dom中。

![](./attachments/vue2-diff-08.awebp)

附录： updateChildren核心源码，以及注释：

```javascript
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0 // oldVnode开始下标
    let oldEndIdx = oldCh.length - 1 // oldVnode结尾下标
    let oldStartVnode = oldCh[0] // oldVnode第一个节点
    let oldEndVnode = oldCh[oldEndIdx] // oldVnode最后一个节点

    let newStartIdx = 0 // newVnode开始下标
    let newEndIdx = newCh.length - 1 // newVnode结尾下标
    let newStartVnode = newCh[0] // newVnode第一个节点
    let newEndVnode = newCh[newEndIdx] // newVnode最后一个节点
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm


    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(newCh)
    }

    // 注意循环条件，只有oldVnode和newVnode的开始节点小于等于的时候才会循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx] // 这一步就是额外操作，如果oldStartVnode取不到元素，就向后移
        } else if (isUndef(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx] // 这一步就是额外操作，如果oldEndVnode取不到元素，就向后移
        }
        // 真正开始执行diff
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            // 旧首新首比较
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 旧尾新尾比较
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 旧首新尾比较
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
            canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 旧尾新首比较
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 以上都不匹配执行下面的逻辑
            if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            idxInOld = isDef(newStartVnode.key)
                ? oldKeyToIdx[newStartVnode.key]
                : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
            if (isUndef(idxInOld)) { // New element
                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
            } else {
                vnodeToMove = oldCh[idxInOld]
                if (sameVnode(vnodeToMove, newStartVnode)) {
                    patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
                    oldCh[idxInOld] = undefined
                    canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
                } else {
                    // same key but different element. treat as new element
                    createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
                }
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }

    // 循环结束后，判断是oldCh多，还是newCh多
    // 如果oldCh多 newCh少 就是删除
    // 如果oldCh少 newCh多 就是创建
    if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
}
```

### 参考

- [Vue2.0详解diff算法](https://juejin.cn/post/7005093006453784590)
