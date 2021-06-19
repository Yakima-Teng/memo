# http缓存控制

## 1、强缓存和协商缓存

浏览器缓存控制分为强缓存和协商缓存，协商缓存必须配合强缓存使用。
首先浏览器第一次跟一个服务器请求一个资源，
服务器在返回这个资源和response header的同时，
会根据开发者要求或者浏览器默认，在response的header加上相关字段的http response header。

浏览器在请求已经访问过的URL时，会判断是否使用缓存，判断是否使用缓存主要是判断缓存是否在有效期内。

**1.1、当浏览器对某个资源的请求命中了强缓存时，利用[Expires]或者[Cache-Control]这两个http response header实现**

- [Expires]描述的是一个绝对时间，依据的是客户端的时间，
用GMT格式的字符串表示，如Expires:Thu,31 Dec 2037 23:55:55 GMT，
下次浏览器再次请求同一资源时，会先从客户端缓存中查找，
找到这个资源后拿出它的[Expires]与当前时间做比较，
如果请求时间在[Expires]规定的有效期内就能命中缓存，
这样就不用再次到服务器上去缓存一遍，节省了资源。
但正因为是绝对时间，如果客户端的时间被随意篡改，
这个机制就实效了，所以我们需要[Cache-Control]。

- [Cache-Control]描述的是一个相对时间，在进行缓存命中时都是利用浏览器时间判断。
[Expires]和[Cache-Control]这两个header可以只启用一个，
也可以同时启用，同时启用时[Cache-Control]优先级高于[Expires]。

**1.2、当浏览器对某个资源的请求没有命中强缓存（即缓存过期后），就会发起一个请求到服务器，
验证协商缓存是否命中（即验证缓存是否有更新，虽然有效期过了，但我还能继续使用它吗？），
如果命中则还是从客户端中加载。
协商缓存利用的是[Last-Modified,If-Modified-Since]和[ETag,If-None-Match]这两对header来管理的。**

- [Last-Modified,If-Modified-Since]：原理和上面的[Expires]相同，服务器会响应一个Last-Modified字段,表示最近一次修改缓存的时间,
当缓存过期后, 浏览器就会把这个时间放在If-Modified-Since去请求服务器,判断缓存是否有更新。
区别是它是根据服务器时间返回的header来判断缓存是否存在，
但有时候也会出现服务器上资源有变化但修改时间没有变化的情况，
这种情况我们就需要[ETag,If-None-Match]。

- [ETag,If-None-Match]：原理与上面相同，区别是浏览器向服务器请求一个资源，
服务器在返回这个资源的同时，在response的header中加上一个Etag字段，
这个字段是服务器根据当前请求的资源生成的**唯一标识字符串**，
只有资源有变化这个串就会发生改动。
当缓存过期后,浏览器会把这个字符串放在If-None-Match去请求服务器,
比较字符串的值判断是否有更新,
Etag的优先级比Last-Modified的更高, Etag的出现是为了解决一个缓存文件在短时间内被多次修改的问题,**因为Last-Modified只能精确到秒**。

- [ETag,If-None-Match]这么厉害我们为什么还需要[Last-Modified,If-Modified-Since]呢？
有一个例子就是，**分布式系统尽量关掉ETag，因为每台机器生成的ETag不一样**，[Last-Modified,If-Modified-Since]和[ETag,If-None-Match]一般都是同时启用。

## 2、304 Not Modified

The HTTP 304 Not Modified client redirection response code
indicates that there is no need to retransmit the requested resources.
It is an implicit redirection to a cached resource.
This happens when the request method is safe, like a GET or a HEAD request,
or when the request is conditional and uses a If-None-Match or a If-Modified-Since header.

The equivalent 200 OK response would have included the headers Cache-Control,
Content-Location, Date, ETag, Expires, and Vary.

Many developer tools' network panels of browsers create extraneous requests
leading to 304 responses, so that access to the local cache is visible to developers.

## 参考

- [HTTP状态码及缓存控制](https://www.jianshu.com/p/9dcc076ad1b8)
- [304 Not Modified](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)
- [Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe)
