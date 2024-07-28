[[toc]]

## 前端优化 {#optimize}

### 常见的前端优化技巧 {#optimize-points}

- 大体
  + 减少服务器请求数：
    * 将多个JS/CSS文件进行合并；
    * 图片不需要经常改动时，可使用CSS sprite；
    * 如果仅单个页面使用某JS/CSS文件，可以直接将文件内容放于html页面中（若多个页面公用相同的JS/CSS）文件，则不该这么做，应该利用好浏览器缓存功能。
  + 加快资源访问速度：
    * CDN。
  + 减小文件大小：
    * 将图片适当压缩；
    * 压缩JS/CSS文件。
  + 提高代码执行效率。
- JS
  + 需要多次使用的值（比如需要遍历的数组对象的length），应先将其存为一个变量，然后调用该变量以减少JS查询的时间；
  + 于页面底部引入脚本，先将页面内容呈现给用户；
  + 提高代码复用率，减少代码冗余。
- CSS
  + 于页面头部引入样式，避免用户看到布局错乱的内容；
  + 不要使用CSS表达式。
- HTML
  + 主要是SEO方面的优化，添加name为keyword和description的meta标签，减少外链，外链上加上rel="nofollow"，标签尽量符合语义，减少不必要的嵌套标签。
- 其他
  + 预解析
    * 比如首页添加&lg;link rel="prerender" href="/about.html" />
  + 利用缓存
    * 比如可以使用百度静态资源公共库(cdn.code.baidu.com)，若用户以前访问过其他引用了相同资源地址的文件的话，缓存的优势就出来了。
- 总结：像压缩图片这种方法对提高网页加载速度的效果是很明显的，但是有些优化方法对于访问量小的小型网站而言并没有啥好呢么必要，比如：如果某JS文件本来就只用100来行，压缩后减少的文件大小对页面访问速度的提高等于没有，对服务器压力的减少也没啥意义。

### 高频率触发的事件的性能优化 {#optimize-high-frequency}

一些事件，比如touchmove可能会被高频率地触发，如果该事件对应的handler函数中需要处理的逻辑较多，可能会导致FPS下降影响程序流畅度，在这种情况下，可以考虑将handler中的执行体放于setTimeout(function () { //执行的代码  }, 0)中，程序会变流畅。

### debounce 防抖 {#debounce}

当事件触发时，函数不立即执行，而是延迟一段时间后再执行。并且这期间只要事件再次被触发，就重新计算延迟时间。所以如果事件被不停触发的话，函数就一直不会被执行。

```javascript
/**
 * 将函数进行防抖处理，生成一个新的防抖函数
 * @param {function|Promise} fn - 需要进行防抖处理的原始函数（可以是async函数）
 * @param {number} [delay = 1000] - 防抖延迟时间，单位 ms
 * @param {boolean} [immediate = false] 不在延迟时间内的每次第一次触发时是否立即执行
 * @param {function} [callback] - 回调函数，用于获取每次最终执行后的结果
 * @return {function} 生成的防抖函数
 */
function debounce(fn, delay = 1000, immediate = false, callback) {
    let timer = 0
    let isFirstTime = false
    let self = this

    function returnFunc(...args) {
        if (timer) {
            clearTimeout(timer)
            timer = 0
        }
        
        const mainTask = () => {
            let errorObj = null
            // apply 第二个入参为数组，call 和 bind 的第二个入参是0到多个arguments
            let result = fn.apply(self, args)
            
            const doCallback = () => {
                if (typeof callback === 'function') {
                    // 第一个参数表示error，第二个参数表示实际结果
                    callback(errorObj, result)
                }
            }

            if (result instanceof Promise) {
                result
                    .then((res) => {
                        result = res
                        doCallback()
                    })
                    .catch((err) => {
                        errorObj = err
                        doCallback()
                    })
            } else {
                doCallback()
            }
        }

        if (immediate && isFirstTime) {
            mainTask()
            isFirstTime = false
        }
        timer = setTimeout(() => {
            mainTask()
            isFirstTime = true
        }, delay)
    }

    return returnFunc
}
```

### throttle 节流 {#throttle}

> 节流的话，当事件被频繁触发时，函数也只会按指定的间隔频率被触发，函数被触发的时间间隔只会大于等于指定时间间隔。节流与防抖的最大区别在于防抖的核心是**延时等待**，节流的核心在于**保证最小时间间隔**。

```javascript
function throttle (fn, delay) {
    let lastTime = 0
    return function () {
        const currentTime = Date.now()
        if (lastTime > 0 && currentTime - lastTime < delay) {
            return
        }
        lastTime = currentTime
        fn.apply(this, arguments)
    }
}
```
