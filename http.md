[[toc]]

## HTTP {#http}

### HTTP协议的主要特点 {#http-characteristics}

- 简单快速：可以理解为每个资源的URI（统一资源定位符）都是固定的，所以在http协议处理起来比较容易
- 灵活：每个http协议的头部都有一个类型，通过一个http协议就能完成不同类型的传输，所以比较灵活
- 无连接（重）：http协议连接一次之后就会断开，不会保持连接
- 无状态（重）：可以理解为服务端和客户端是两种身份，单从http协议中是无法区分两次协议者的身份

### HTTP报文的组成部分 {#http-report}

请求报文：
- 请求行 --- 包含http方法，页面地址，http协议，http版本
- 请求头 --- 包含一些key：value的值，eg： host、Cache-Control，Accept，Cookie等
- 空行 --- 用来告诉服务端往下就是请求体的部分啦
- 请求体 --- 就是正常的query/body参数

响应报文：
- 状态行 --- 包含http方法，http协议，http版本，状态码
- 响应头 --- 包含一些key：value的值，eg： Content-type，Set-cookie, Cache-Control, Date, Server等
- 空行 --- 用来告诉客户端往下就是响应体的部分啦
- 响应体 --- 就是服务端返回的数据

### HTTP方法 {#http-methods}

- GET -- 获取资源
- POST -- 创建一个新的资源
- PUT -- 更新资源，常用来做传输文件，更新整个资源对象
- PATCH -- 更新资源，更新部分属性，例如只更新某个用户的 `nickname` 属性
- DELETE -- 删除资源
- HEAD -- 获取请求报文首部
- OPTIONS -- 询问支持的方法，查询针对请求URI指定的资源支持的方法，在跨域请求中，由客户端（浏览器）发送

> 上述方法，只有 GET 和 POST 才能在 <form /> 表单中使用，
>
> 但是现在也有很多公司使用 Only Post 的规则：接口只接收 POST 请求。

### GET和POST请求的区别 {#http-get-post}

- GET产生的URL地址可以被收藏，而POST不可以
- GET请求会被浏览器主动缓存，而POST不会，除非主动设置
- GET请求参数会被完整的保留在浏览器历史里，而POST的参数不会被保留
- GET请求在URL中传输参数有长度限制，而POST没有
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
- POST比GET更安全，因为GET请求的参数直接暴露在URL上
- GET参数通过URL传输，而POST参数放在request body中

注意：上面有些说法严格来说也是不对的，因为post请求你可以在url上加query参数，服务端也能获取。

> 两种方法除了自身的参数限制、缓存限制，通常情况下它们根本的区别：
>
> GET 不会产生副作用，而 POST 会。

### 常见HTTP状态码

- 1XX --- 指示信息，表示请求已接受，继续处理
  - 100 Continue
  - 101 Switching Protocols
  - 102 Processing
  - 103 Early Hints
- 2XX --- 成功，表示请求已被成功接受
  - 200 --- OK，客户端请求成功
  - 201 Created
  - 202 Accepted
  - 203 Non-Authoritative Information
  - 204 No Content
  - 205 Reset Content
  - 206 Partial Content --- 客户端发送了一个带有Range头的GET请求，视频/音频可能会用到
- 3XX --- 重定向，要完成请求，必需进行近一步操作
  - 301 Moved Permanently --- 重定向，所请求的界面转移到新的url，永久重定向
  - 302 Found --- 同上301，但是是临时重定向
  - 303 See Other
  - 304 Not Modified --- 缓存，服务端告诉客户端有缓存可用，不用重新请求
  - 307 Temporary Redirect
  - 308 Permanent Redirect
- 4XX --- 客户端错误，请求有语法错误或请求无法实现
  - 400 Bad Request， 客户端请求有语法错误
  - 401 Unauthorized, 请求未授权
  - 403 Forbidden, 禁止页面访问
  - 404 Not found， 请求资源不存在
  - 405 Method Not Allowed
- 5XX --- 服务端错误，服务器未能实现合法的请求
  - 500 Internal Server Error, 服务器错误
  - 501 Not Implemented
  - 502 Bad Gateway
  - 503 Server Unavailable, 请求未完成，服务器临时过载或者宕机，一段时间后可恢复正常
  - 504 Gateway Timeout

### 持久连接 {#http-keep-alive}

当使用Keep-alive模式（又称持久连接，连接重用 http1.1的版本才支持）时，Keep-alive功能使客户端到服务端的连接持续有效，当出现服务器的后续请求时，Keep-alive避免了建立或者重新建立连接。

### 管线化

在使用持久连接的情况下，某个连接上的消息传递类似于：

请求1 --> 响应1 --> 请求2 --> 响应2 --> 请求3 --> 响应3

管线化的连接消息传递是类似于：

请求1 --> 请求2 --> 请求3 --> 响应1 --> 响应2 --> 响应3

**相当于客户端一次性把所有的请求打包发送给服务端，同时服务端也一次性打包将所有的返回回传回来**

只有GET和HEAD请求可以进行管线化，而POST有所限制

管线化是通过持久连接完成的，且只有http/1.1版本支持

### TCP三次握手四次挥手 {#tcp-three-four}

#### TCP的特性 {#tcp-characteristics}

- TCP提供一种面向连接的、可靠的字节流服务
- 在一个TCP连接中，仅有两方进行彼此通信。广播和多播不能用于TCP
- TCP使用校验和、确认和重传机制来保证可靠传输
- TCP给数据分节进行排序，并使用累积确认保证数据的顺序不变和非重复
- TCP使用滑动窗口机制来实现流量控制，通过动态改变窗口的大小进行拥塞控制

注意：TCP并不能保证数据一定会被对方接收到，因为这是不可能的。TCP能够做到的是，如果有可能，就把数据递送到接收方，否则就（通过放弃重传并且中断连接这一手段）通知用户。因此准确说TCP也不是100%可靠的协议，它所能提供的是数据的可靠递送或故障的可靠通知。

#### 三次握手与四次挥手

所谓三次握手(Three-way Handshake)，是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。

三次握手的目的是连接服务器指定端口，建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。

在socket编程中，客户端执行connect()时。将触发三次握手。

TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。

客户端或服务器均可主动发起挥手动作，在socket编程中，任何一方执行close()操作即可产生挥手操作。

### TCP/IP的分层管理 {#tcp-ip-layers}

TCP/IP最重要的一个特点就是分层管理，分别为：

- 应用层：决定向用户提供应用服务时的通信活动，http、ftp、dns 都属于这一层
- 安全层(TSL/SSL)：如果是https的请求会存在这一层，**http的请求则无此层，注意！**
- 传输层：传输层对上层应用层提供处于网络连接中两台计算机之间的数据传输
- 网络层：网络层用来处理网络上流动的数据包，数据包是网络传输的最小数据单位
- 链路层：用来处理连接网络的硬件部分，包括控制操作系统、硬件的设备驱动等物理可见部分

### HTTP缓存控制 {#http-cache}

**浏览器缓存控制分为强缓存和协商缓存，协商缓存必须配合强缓存使用**。
首先浏览器第一次跟一个服务器请求一个资源，服务器在返回这个资源和response header的同时，
会根据开发者要求或者浏览器默认，在response的header加上相关字段的http response header。

浏览器在请求已经访问过的URL时，会判断是否使用缓存，判断是否使用缓存主要是判断缓存是否在有效期内。

**1.1、当浏览器对某个资源的请求命中了强缓存时，利用[Expires]或者[Cache-Control]这两个http response header实现**

- [Expires]描述的是一个绝对时间，依据的是客户端的时间，用GMT格式的字符串表示，如Expires:Thu,31 Dec 2037 23:55:55 GMT，下次浏览器再次请求同一资源时，会先从客户端缓存中查找，找到这个资源后拿出它的[Expires]与当前时间做比较，如果请求时间在[Expires]规定的有效期内就能命中缓存，这样就不用再次到服务器上去缓存一遍，节省了资源。但正因为是绝对时间，如果客户端的时间被随意篡改，这个机制就失效了，所以我们需要[Cache-Control]。

- [Cache-Control]描述的是一个相对时间，在进行缓存命中时都是利用浏览器时间判断。

[Expires]和[Cache-Control]这两个header可以只启用一个，也可以同时启用，同时启用时[Cache-Control]优先级高于[Expires]。

**1.2、当浏览器对某个资源的请求没有命中强缓存（即缓存过期后），就会发起一个请求到服务器，验证协商缓存是否命中（即验证缓存是否有更新，虽然有效期过了，但我还能继续使用它吗？），如果命中则还是从客户端中加载。协商缓存利用的是[Last-Modified,If-Modified-Since]和[ETag,If-None-Match]这两对header来管理的。**

- [Last-Modified,If-Modified-Since]：原理和上面的[Expires]相同，服务器会响应一个Last-Modified字段,表示最近一次修改缓存的时间，当缓存过期后, 浏览器就会把这个时间放在If-Modified-Since去请求服务器，判断缓存是否有更新。区别是它是根据服务器时间返回的header来判断缓存是否存在，但有时候也会出现服务器上资源有变化但修改时间没有变化的情况，这种情况我们就需要[ETag,If-None-Match]。

- [ETag,If-None-Match]：原理与上面相同，区别是浏览器向服务器请求一个资源，服务器在返回这个资源的同时，在response的header中加上一个Etag字段，这个字段是服务器根据当前请求的资源生成的**唯一标识字符串**，只有资源有变化这个串就会发生改动。当缓存过期后,浏览器会把这个字符串放在If-None-Match去请求服务器，比较字符串的值判断是否有更新，Etag的优先级比Last-Modified的更高, Etag的出现是为了解决一个缓存文件在短时间内被多次修改的问题,**因为Last-Modified只能精确到秒**。

- [ETag,If-None-Match]这么厉害我们为什么还需要[Last-Modified,If-Modified-Since]呢？有一个例子就是，**分布式系统尽量关掉ETag，因为每台机器生成的ETag不一样**，[Last-Modified,If-Modified-Since]和[ETag,If-None-Match]一般都是同时启用。

**常用场景举例：**

前端 SPA 应用发布后，为了保证客户端总能直接加载最新的静态资源文件，结合 `nginx.conf` 对缓存做出如下配置：

```nginx
server {
  listen 80;
  server_name localhost;
  root /usr/share/app;
  index index.php index.html index.htm;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源文件 缓存30天；
  location ~ \.(css|js|gif|jpg|jpeg|png|bmp|swf|ttf|woff|otf|ttc|pfa)$ {
    expires 30d;
  }

  # `html` 不缓存
  location ~ \.(html|htm)$ {
    add_header Cache-Control "no-store, no-cache, must-relalidate";
  }
}
```

同时为 `index.html` 增加缓存相关的 `<meta />` 标签：

```html
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="expires" content="0">
```

### 303 See Other {#http-303}

303 状态码表示服务器要将浏览器重定向到另一个资源，这个资源的 URI 会被写在响应 Header 的 Location 字段。从语义上讲，重定向到的资源并不是你所请求的资源，而是对你所请求资源的一些描述。

303 常用于将 POST 请求重定向到 GET 请求，比如你上传了一份个人信息，服务器发回一个 303 响应，将你导向一个“上传成功”页面。

不管原请求是什么方法，重定向请求的方法都是 GET（或 HEAD，不常用）。

### 304 Not Modified {#http-304}

HTTP响应码 304 Not Modified 表明不需要传输所请求的资源。它会将请求重定向到已有的缓存资源上。

当请求是GET或者HEAD这种安全请求，会出现这种情况。

开发者本地开发时经常会看到很多304请求，它们实际就是去访问本地的缓存资源的。

### Mixed Content {#mixed-content}

当用户访问一个HTTPS网页时，他们与服务端之间的连接是经过TLS加密的，相对更安全。

如果HTTPS网页中包含的部分内容触发了明文HTTP请求，就会导致部分内容未被加密，也就不安全了。这种页面称为**mixed content page**。
