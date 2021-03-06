# diff算法

diff算法用于计算出两个virtual dom的差异，是react中开销最大的地方。

传统diff算法通过循环递归对比差异，算法复杂度为O(n3)。

react diff算法制定了三条策略，将算法复杂度从 O(n3)降低到O(n)。

- WebUI中DOM节点跨节点的操作特别少，可以忽略不计。
- 拥有相同类的组件会拥有相似的DOM结构。拥有不同类的组件会生成不同的DOM结构。
- 同一层级的子节点，可以根据唯一的ID来区分。

针对这三个策略，react diff实施的具体策略是:

- diff对树进行分层比较，只对比两棵树同级别的节点。跨层级移动节点，将会导致节点删除，重新插入，无法复用。
- diff对组件进行类比较，类相同的递归diff子节点，不同的直接销毁重建。diff对同一层级的子节点进行处理时，会根据key进行简要的复用。两棵树中存在相同key的节点时，只会移动节点。

另外，在对比同一层级的子节点时:

diff算法会以新树的第一个子节点作为起点遍历新树，寻找旧树中与之相同的节点。

如果节点存在，则移动位置。如果不存在，则新建一个节点。

在这过程中，维护了一个字段lastIndex，这个字段表示已遍历的所有新树子节点在旧树中最大的index。
在移动操作时，只有旧index小于lastIndex的才会移动。

这个顺序优化方案实际上是基于一个假设，大部分的列表操作应该是保证列表基本有序的。
可以推倒倒序的情况下，子节点列表diff的算法复杂度为O(n2)

![](https://segmentfault.com/img/bVbcYvX?w=822&h=488)
![](https://segmentfault.com/img/bVbcYvY?w=776&h=428)
![](https://segmentfault.com/img/bVbcYv3?w=714&h=432)

## 参考资料

- [react基本原理及性能优化](https://segmentfault.com/a/1190000015648248)
