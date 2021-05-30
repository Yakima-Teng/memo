## 简述position属性各个值的区别

fixed：类似absolute，但是是相对浏览器窗口而非网页页面进行定位。

absolute：相对最近的position值非normal的外层元素进行定位。

relative：相对自身在文档流中的原始位置进行定位。

static：position默认值，即元素本身在文档流中的默认位置（忽略top、bottom、left、right和z-index声明）。

inherit：继承父元素position属性的值。
