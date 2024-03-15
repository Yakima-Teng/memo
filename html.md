[[toc]]

## HTML {#html}

### HTML页面的渲染 {#html-render}

todo。

### 常用meta标签 {#html-meta}

```html
<!-- 设定页面使用的字符集 -->
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 国产360浏览器默认采用高速模式渲染页面 -->
<meta name="renderer" content="webkit">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1, user-scalable=no"
>

<!-- 禁止设备检测手机号和邮箱 -->
<meta name="format-detection" content="telephone=no,email=no">

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

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">

<!-- Sets whether a web application runs in full-screen mode for iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!--
    Sets the style of the status bar for a web application for iOS.
    This meta tag has no effect unless you first specify full-screen mode
    as described in apple-apple-mobile-web-app-capable
-->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!--
    Enables or disables automatic detection of
    possible phone numbers in a webpage in Safari on iOS.
-->
<meta name="format-detection" content="telephone=no">

<!--
    用于设定禁止浏览器从本地机的缓存中调阅页面内容
    设定后一旦离开网页就无法从Cache中再调出
-->
<meta http-equiv="pragma" content="no-cache">

<!-- 禁用缓存（再次访问需重新下载页面） -->
<meta http-equiv="cache-control" content="no-cache">

<!-- 可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输 -->
<meta http-equiv="expires" content="0">

<!-- 停留2秒钟后自动刷新到URL网址 -->
<meta http-equiv="Refresh" content="2;URL=http://www.example.com/">

<!-- for SEO，其中页面描述应不超过150个字符 -->
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 强制页面在当前窗口以独立页面显示，用来防止别人在框架里调用自己的页面 -->
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
    const jsonData = JSON.stringify(document.querySelector('#data').textContent)
</script>
```

但是下面这样是不可以的：

```html
<!-- 这样直接通过 src 属性去指向一个有效的数据文件的方式是不可以的 -->
<script id="data" type="application/json" src="https://bla.bla.com/blabla.json"></script>
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
    const templateContent = document.querySelector('#template').textContent
    const templateData = {
        userName: 'name',
        address: 'address'
    }
    // 一般模版语言的渲染函数实际干的内容类似下面这样
    document.querySelector('.userInfo').innerHTML = templateContent
        .replace(/\{\{ userName \}\}/m, templateData.userName)
        .replate(/\{\{ address \}\}/m, templateData.address)
</script>
```

:::

**defer、async 脚本的下载、解析动作与 HTML 解析的时序关系**

![](./attachments/script-async-defer.svg)

async：

- 只对外部脚本有效。
- 请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML。
- 多个 async script 之间的执行顺序是不确定的，取决于谁先被下载完毕。
- 多个 async script 之间的下载开始时间与书写顺序一致，他们是可以并行下载的，下载结束的时间顺序是不确定的。
- 下载完毕后会被直接解析执行，如果此时 HTML 还未被解析完，浏览器会暂停解析 HTML，先执行 JS 脚本。
- async script 一定会在页面的 load 事件之前执行，但与 DOMContentLoaded 事件则没有确定的先后关系。

defer：

- 只对外部脚本有效。
- 请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML。
- 多个 defer script 之间的执行书序和书写顺序一致。
- 多个 async script 之间的下载开始时间与书写顺序一致，他们是可以并行下载的，下载结束的时间顺序是不确定的。
- 下载完成后 JS 脚本不会立即执行，会等到浏览器解析完 HTML 后再执行 JS 脚本。
- 赋予 defer 属性的 script 脚本会在 HTML 文档解析完成后被执行，在此之后才会触发 DOMContentLoaded 事件。
