# 程序员备忘录

<div align="center" style="display: flex;align-items: center;justify-content: center;gap:8px;">
  <img style="width:200px;" src="https://github.com/Yakima-Teng/memo/raw/master/attachments/logo.svg">
</div>

> 程序员备忘录记录了WEB程序员常用的知识点，方便温故知新，自我成长。

## 阅读方式

你可以通过以下方式进行阅读。

- [多页在线版本](https://www.orzzone.com/writings)。
- [单页在线版本](https://www.orzzone.com/frontend)：读者可以直接利用浏览器的打印功能将单页在线版本打印成PDF电子书放到电纸书阅读器中阅读，对眼睛更友好。
- [百度网盘资源](https://pan.baidu.com/s/17zS-w0ukaIr0Y2wwjTFT2A?pwd=82xh)：
  - 程序员备忘录.pdf：注意，这个pdf不一定是最新的，需要最新的请直接访问单页在线版本手动打印成PDF格式。
  - memo.apk：安卓客户端。
  - memo.exe：Windows客户端。

说明：

1. 有意见和建议，请到这里提交：[https://github.com/Yakima-Teng/memo/issues](https://github.com/Yakima-Teng/memo/issues)。
2. 欢迎提交PR（提交PR时可以主动更新下致谢名单把自己加上去，格式参考已有内容）。
3. 正文内容已开源到GibHub：[https://github.com/Yakima-Teng/memo](https://github.com/Yakima-Teng/memo)。Gitee/码云上只做代码同步，不要在Gitee/码云上提Issue和PR。
4. 作者GitHub上如有其他项目对你有些许帮助，不妨star以表支持，万分感谢：[https://github.com/Yakima-Teng](https://github.com/Yakima-Teng)。
5. 如果添加了新的章节或者移除了某个章节，请更新index.md文件中的引用关系。
6. 该仓库最终会被脚本git clone后用VitePress进行编译转html后进行部署。所以不要删除index.md中诸如`<!--@include: ./safety.md{3,}-->`、`layout: book-home`、`::: warning 获取最新版`等非标准的Markdown写法，它们是会被VitePress正确解析的。

## 前言

本书动笔最早是在2018年左右，起因是自己找工作准备面试，一边准备面试一边总结当时的常见面试题，于是有了本书的“初稿"。说是初稿，但其实内容并不成体系，东一块西一块的，只是简单按目录进行了归类，并不能称之为“书”。

现在，做前端已经有8年了，工作经验和阅历也比之前更丰富了，于是着手将之前的内容进行整理，从而有了本书。此次整理，并不是简单将之前的内容汇总，用行业的话来说，应该叫重构。与此同时，也总结了很多新的话题，以免书中部分内容过时。

**这本书的目标读者不包括零基础的纯新手**，主要是帮助初、中级开发进阶高级开发，或者帮助高级开发进一步进阶用的。不过光靠看书是不够的，工作经验也是很重要的，工作久了你会有些自己感悟。所以大家在平时工作中还是要多注意代码质量，想想怎么样写更好，平时多进行小范围的重构。这样不仅自己后面维护代码更轻松，而且也对自己的技能进行了实际意义上的打磨，对以后的职业发展更有助益。

最后，希望本书的内容能给大家带来一些帮助。如读者有宝贵意见和建议，欢迎邮件指出，我会及时更新本书内容。

**本书中引用的他人文章版权归原作者/平台所有，本人自己写的部分版权归本人所有。仅用于个人私下学习。谢绝商用。**

作者邮箱：[yakima.public@gmail.com](mailto:yakima.public@gmail.com?subject=github-memo)。

**目录**

- [前端基础](./base.md)
- [JavaScript](./javascript.md)
- [CSS](./css.md)
- [HTML](./html.md)
- [DOM](./dom.md)
- [移动端开发](./wap.md)
- [HTTP](./http.md)
- [REST](./rest.md)
- [JS内存回收机制](./garbage-collection.md)
- [Vue2](./vue2.md)
- [Vue3](./vue3.md)
- [React](./react.md)
- [数据结构和算法](./data-structure.md)
- [最佳实践](./best-practices.md)
- [设计模式](./design-patterns.md)
- [Webpack](./webpack.md)
- [Performance 性能数据统计](./performance.md)
- [Babel和AST（抽象语法树）](./babel.md)
- [从输入URL到整个页面显示在用户面前发生了什么](./page-load.md)
- [前端优化](./optimize.md)
- [安全](./safety.md)
- [简历与工作](./job.md)
- [写在最后](./last.md)
- [参考文档](./reference.md)

## 致谢名单

见[致谢名单](./thanks.md)。
