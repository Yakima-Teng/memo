## 完成一个页面布局（仅用HTML + CSS）

要求：分为左、中、右三部分，高度均为屏幕高度，左边部分宽度为200px，另外两部分等分剩下的页面宽度。

回答：可以。

``` html
<html>
<head></head>
<body>
  <div class="container">
  <aside class="left">Left</aside>
  <div class="wrapper">
    <article class="middle">Middle</article>
    <article class="right">Right</article>
  </div>
  </div>
</body>
</html>
```

``` less
.clearfix() {
  &:after {
  content: '';
  clear: both;
  display: block;
  height: 0;
  opacity: 0;
  visibility: hidden;
  }
}
html, body, div, aside, article {
  margin: 0;
  padding: 0;
}
html, body, container, .left, .wrapper, .middle, .right {
  height: 100%;
}
.container {
  padding-left: 200px;
  .clearfix();

  .left {
  float: left;
  width: 200px;
  margin-left: -200px;
  background-color: skyblue;
  }

  .wrapper {
  float: left;
  width: 100%;

  .middle, .right {
    float: left;
    width: 50%;
  }
  .middle {
    background-color: gray;
  }
  .right {
    background-color: yellow;
  }
  }
}
```
