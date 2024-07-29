[[toc]]

## 最佳实践 {#best-practices}

“最佳实践”只是一种习惯说法，是大家总结出的一些较好的代码实践方式，落地到具体项目中时，它并不一定就是最好的，各位可带着自己的思考进行阅读。

- **代码要精炼**。代码量的多少直接影响可读性。这简直是一句正确的废话，但又因为太朴素，总是被人忽略。在没有其他问题/原因的情况下，3行代码就是比5行代码好。

- **代码隔离**。一言以蔽之，就是在说代码的模块化。提到模块化，大家的第一反应就是import/export和代码复用。其实可以多一些思考。有时候我们不是为了复用，只是为了把代码分开：
    - 将次要代码挪到单独的文件提高主要代码的可读性。
    - 将赶业务临时写的脏代码放到单独的文件，便于后期重构。这里要注意函数的输入和输出，它们比函数内部的具体实现的优先级要高得多。只要输入和输出控制好了，加上一个友好的注释，即便内部实现非常脏，对于整体系统而言一点不良影响都没有。