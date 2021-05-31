# 二叉搜索树及其遍历

英文：binary search tree。

## 1、图例

![](./attachments/binary_search_tree.png =200x)

前序遍历：8 3 1 6 4 7 10 14 13

中序遍历：1 3 4 6 7 8 10 13 14

后序遍历：1 4 7 6 3 13 14 10 8

层次遍历：8 3 10 1 6 14 4 7 13

## 2、二叉树的构造

``` javascript
// 节点对象的构造函数
function Node (data, left, right) {
  this.data = data
  this.left = left
  this.right = right
}

Node.prototype.getData = function () {
  return this.data
}

// 二叉树的构造函数
function BST () {
  this.root = null
}

// 插入方法
BST.prototype.insert = function (data) {
  var n = new Node(data, null, null)
  if (this.root === null) {
    this.root = n
  } else {
    var current = this.root
    var parent
    while (true) {
      parent = current
      if (data < current.data) {
        current = current.left
        if (current === null) {
          parent.left = n
          break
        }
      } else {
        current = current.right
        if (current === null) {
          parent.right = n
          break
        }
      }
    }
  }
}
```

## 3、前/中/后序遍历（递归）

这个算法很好实现，主要是容易记混怎么样算前序遍历、中序遍历、后续遍历，其遍历顺序分别为：

- 前序遍历：根节点 > 左子树 > 右子树。
- 中序遍历：左子树 > 根节点 > 右子树。
- 后序遍历：左子树 > 右子树 > 根节点。

```javascript
// 前序遍历二叉树
BST.prototype.preOrder = function (node) {
  if (node !== null) {
    console.log(node.getData())
    this.preOrder(node.left)
    this.preOrder(node.right)
  }
}

// 中序遍历二叉树
BST.prototype.inOrder = function (node) {
  if (node !== null) {
    this.inOrder(node.left)
    console.log(node.getData())
    this.inOrder(node.right)
  }
}

// 后序遍历二叉树
BST.prototype.postOrder = function (node) {
  if (node !== null) {
    this.postOrder(node.left)
    this.postOrder(node.right)
    console.log(node.getData())
  }
}

// 测试
var nums = new BST()
nums.insert(8)
nums.insert(3)
nums.insert(10)
nums.insert(1)
nums.insert(6)
nums.insert(14)
nums.insert(4)
nums.insert(7)
nums.insert(13)

nums.inOrder(nums.root)

// 依次输出如下内容：
1 3 4 6 7 8 10 13 14
```
