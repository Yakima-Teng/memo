## 弹性盒（flexbox）实现竖向九宫格
要求：使用flexbox布局将9个格子排列成3*3的九宫格，且第一列排完才排第二列。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Flexbox竖向九宫格</title>
    <style>
      html {
        font-family: sans-serif;
      }
      body {
        margin: 0;
      }
      .boxs-wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap:  wrap;
        height: 320px;
        width: 320px;
        margin: 0 auto;
      }
      .box {
        background: aqua;
        height: 100px;
        width: 100px;
        text-align: center;
        line-height: 100px;
        margin: 0 10px 10px 0;
      }
      .box:nth-of-type(3n) {
        margin-bottom: 0;
      }
      .box:nth-of-type(n+7) {
        margin-right: 0;
      }
    </style>
  </head>
  <body>
    <section class="boxs-wrapper">
      <article class="box">1</article>
      <article class="box">2</article>
      <article class="box">3</article>
      <article class="box">4</article>
      <article class="box">5</article>
      <article class="box">6</article>
      <article class="box">7</article>
      <article class="box">8</article>
      <article class="box">9</article>
    </section>
  </body>
</html>
```
