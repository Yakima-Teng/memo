[[toc]]

## Cache {#cache}

HTTP 缓存见 HTTP 相关章节，本节不再赘述。

### Disk Cache 和 Memory Cache

**Disk Cache**

当你访问一个网站的时候，一些资源（图片、CSS样式文件、JS脚本文件等）可能会被储存到你的硬盘中。这种就就是**硬盘缓存（Disk Cache）**。

硬盘缓存的优点有：

- 可长期保存（数周甚至数月之久）。
- 通常来说，一台机器中硬盘空间相对内存空间来说要多得多，所以硬盘缓存可以存储大量的内容。

硬盘缓存的缺点：

- 访问硬盘中的资源比直接访问内容中的资源要慢一些。

**Memory Cache**

Memory Cache 与 Disk Cache 不同的地方在于，命中 Memory Cache 的资源是被储存在设备的 RAM 中的，这种缓存资源访问起来速度非常快。但是只要你关掉浏览器，这些缓存就会被丢弃，也就是说下一次你重新打开浏览器尝试去访问这些资源时，就已经没有缓存了。

* [Browser Caching Showdown: Disk Cache vs. Memory Cache!”](https://shubhamgautamlog.medium.com/browser-caching-showdown-disk-cache-vs-memory-cache-4551f6ef40c0)
