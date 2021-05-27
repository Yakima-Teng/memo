## 常用meta标签

``` html
<!-- 设定页面使用的字符集 -->
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 国产360浏览器默认采用高速模式渲染页面 -->
<meta name="renderer" content="webkit">

<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

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

<!-- Sets the style of the status bar for a web application for iOS. This meta tag has no effect unless you first specify full-screen mode as described in apple-apple-mobile-web-app-capable -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Enables or disables automatic detection of possible phone numbers in a webpage in Safari on iOS. -->
<meta name="format-detection" content="telephone=no">

<!-- 用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出 -->
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
