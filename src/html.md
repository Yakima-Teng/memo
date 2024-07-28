[[toc]]

## HTML {#html}

### HTML 页面的渲染 {#html-render}

本文参考：[html+CSS+js解析全过程](https://juejin.cn/post/7101718150177095688)。

**主流程**

从浏览器请求html文件，到屏幕上出现渲染的实际像素等，可以分为以下部分：

1. 构建 DOM Tree
2. 构建 CSSOM Tree
3. 合成 Render Tree
4. layout 回流：主要涉及到字体大小、元素长宽等 CSS 属性，计算元素的相对位置
5. repaint 重绘：颜色等 CSS 属性，显示在屏幕上

**解析HTML文件的细节**

1. 解析 DOM 元素
2. 遇 script，DOM 解析暂停
   - 包含 JS 代码
   - 外联：加载 JS
3. 执行 JS（该 JS 代码在 CSS 前，则不受 CSSOM 的阻塞）
4. 遇 link CSS
5. 加载 CSS 文件，不阻塞 DOM 解析
   - 遇到 script：JS 加载，等待 CSSOM Tree 构建完成后再运行
     - 防止 JS 代码执行时 获取旧的 CSS 属性
6. 构建 CSSOM Tree，DOM 继续解析
7. 若有 JS，则运行
8. 构建 DOM Tree
9. 渲染

::: tip DOMContentLoaded 与 load 事件

- DOMContentLoaded 事件：在完成 DOM 解析完成，JS 执行完毕后触发。大多数浏览器也会等到 CSS 文件加载并解析完成。
- load 事件：所有外部资源与文件下载完毕后触发。

:::

**关于阻塞/非阻塞**

- 内联 JS 会阻塞 DOM 的解析。
- 内联 CSS 会阻塞 DOM 解析。
- 外联 CSS 加载不阻塞 DOM 解析，阻塞 DOM 渲染。
- 外联 CSS 加载阻塞后续 script 内的 JS 代码执行（不阻塞前面的）
- JS 文件的普通加载与执行（非 async defer）会阻塞 DOM 的解析
  - 因此实际上，**后面有 script 的外联 CSS 会阻塞DOM的解析**
- &lt;script defer&gt; 不会阻塞 DOM 的解析
- &lt;script async&gt; 加载不阻塞，执行阻塞
- iframe 内的 image 等资源不阻塞 DOM 解析

**其他注意事项**

- DOM Tree 增量构建，而 CSSOM Tree 非渐进。

### 常用 meta 标签 {#html-meta}

```html
<!-- 设定页面使用的字符集 -->
<meta charset="utf-8">
<meta
    http-equiv="Content-Type"
    content="text/html; charset=UTF-8"
>

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta
    http-equiv="X-UA-Compatible"
    content="IE=edge,chrome=1"
>

<!-- 国产360浏览器默认采用高速模式渲染页面 -->
<meta name="renderer" content="webkit">

<meta
    name="viewport"
    content="
        width=device-width,
        initial-scale=1,
        user-scalable=no
    "
>

<!-- 禁止设备检测手机号和邮箱 -->
<meta
    name="format-detection"
    content="telephone=no,email=no"
>

<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">

<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">

<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">

<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">

<!-- UC应用模式 -->
<meta name="browsermode" content="application">

<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">

<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

<!--
    针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，
    比如黑莓
-->
<meta name="HandheldFriendly" content="true">

<!-- 设置 web 应用在 iOS 设备中是否启用全屏模式 -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!--
    设置 iOS 设备中 web 应用的状态栏样式。
    只在用 `apple-apple-mobile-web-app-capable`
    + 开启全局模式后生效
-->
<meta
    name="apple-mobile-web-app-status-bar-style"
    content="black"
>

<!-- 启用/禁用 iOS Safari 浏览器中自动检测手机号的功能 -->
<meta name="format-detection" content="telephone=no">

<!--
    用于设定禁止浏览器从本机的缓存中读取页面内容。
    设定后一旦离开网页就无法从缓冲中再读取
-->
<meta http-equiv="pragma" content="no-cache">

<!-- 禁用缓存（再次访问需重新下载页面） -->
<meta http-equiv="cache-control" content="no-cache">

<!--
    可以用于设定网页的到期时间。
    一旦网页过期，必须到服务器上重新传输
-->
<meta http-equiv="expires" content="0">

<!-- 停留 2 秒钟后自动刷新到 URL 网址 -->
<meta
    http-equiv="Refresh"
    content="2;URL=http://www.example.com/"
>

<!-- 用于 SEO，其中 description 的内容应不超过 150 个字符 -->
<meta
    http-equiv="keywords"
    content="keyword1,keyword2,keyword3"
>
<meta
    http-equiv="description"
    content="This is my page"
>

<!--
    强制页面在当前窗口以独立页面显示，
    用来防止别人在 iframe 里调用自己的页面
-->
<meta http-equiv="Window-target" content="_top">
```

### script 标签 {#html-script-tag}

本文参考资料如下：

- [The Script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
- [HTML Standard - 4.12 Scripting](https://html.spec.whatwg.org/multipage/scripting.html#script)

script 标签用于嵌入可执行脚本或数据，一般用于嵌入一段 JavaScript 脚本，或者指向一个 JavaScript 文件。script 标签也可用于其他语言，比如 WebGL 的 GLSL shader 编程语言脚本，或者 JSON 数据等。

::: tip 用 script 标签载入数据

注意，如果用 script 标签来载入数据（而非脚本）：
- 这些数据必须是以内联的方式嵌入的，并且需要通过 type 属性指定数据的格式。
- 同时需要禁止使用以下属性：`src`、`async`、`nomodule`、`defer`、`crossorigin`、`integrity`、`referrerpolicy`、`fetchpriority`。

比如这样是可以的：

```html
<script id="data" type="application/json">
    {"a": "123"}
</script>
<script>
    const jsonData = JSON.stringify(
        document.querySelector('#data').textContent
    )
</script>
```

但是下面这样是不可以的：

```html
<!-- 这样直接通过 src 属性去指向一个数据文件的方式是不可以的 -->
<script
    id="data"
    type="application/json"
    src="https://bla.bla.com/blabla.json">
</script>
```
:::

::: tip 模板语言

script 标签有个特点是其中的内容不会直接展现在页面上，所以有很多前端模板语言会使用 script 标签来存放 html 模板。我们可以自己写个简单的，像下面这样：

```html
<div class="userInfo"></div>

<script id="template" type="text/template">
    <div>
        <div class="name">{{ userName }}</div>
        <div class="address">{{ userAddress }}</div>
    </div>
</script>

<script type="application/javascript">
    const templateContent = document
        .querySelector('#template')
        .textContent
    const templateData = {
        userName: 'name',
        address: 'address'
    }
    // 一般模版语言的渲染函数实际干的内容类似下面这样
    document
        .querySelector('.userInfo')
        .innerHTML = templateContent
        .replace(/\{\{ userName \}\}/m, templateData.userName)
        .replate(/\{\{ address \}\}/m, templateData.address)
</script>
```

:::

**&lt;script defer&gt;、&lt;script async&gt; 脚本的下载、解析动作与 HTML 解析的时序关系**

从下图可以看书，除了 &lt;script&gt; 会暂停 HTML 的解析，其他比如 &lt;script defer&gt;、&lt;script async&gt;、&lt;script type="module"&gt; 脚本的下载与 HTML 的解析都是并行不会暂停 HTML 的解析的。

![](./attachments/script-async-defer.svg)

&lt;script async&gt;：

- 只对外部脚本有效。
- 请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML。
- 多个 async script 之间的执行顺序是不确定的，取决于谁先被下载完毕。
- 多个 async script 之间的下载开始时间与书写顺序一致，他们是可以并行下载的，下载结束的时间顺序是不确定的。
- 下载完毕后会被直接解析执行，如果此时 HTML 还未被解析完，浏览器会暂停解析 HTML，先执行 JS 脚本。
- async script 一定会在页面的 load 事件之前执行，但与 DOMContentLoaded 事件则没有确定的先后关系。

&lt;script defer&gt;：

- 只对外部脚本有效。
- 请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML。
- 多个 defer script 之间的执行书序和书写顺序一致。
- 多个 async script 之间的下载开始时间与书写顺序一致，他们是可以并行下载的，下载结束的时间顺序是不确定的。
- 下载完成后 JS 脚本不会立即执行，会等到浏览器解析完 HTML 后再执行 JS 脚本。
- 赋予 defer 属性的 script 脚本会在 HTML 文档解析完成后被执行，在此之后才会触发 DOMContentLoaded 事件。
