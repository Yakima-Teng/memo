# 实现vue的数据双向绑定

## 1、页面结构

```html
<div id="app">
    <h3>数据的双向绑定</h3>
    <div class="cell">
        <div class="text" v-text="myText"></div>
        <input class="input" type="text" v-model="myText" >
    </div>
</div>
```

## 2、创建类

```javascript
class myVue{
    constructor (options){
        // 传入的配置参数
        this.options = options;
        // 根元素
        this.$el = document.querySelector(options.el);
        // 数据域
        this.$data = options.data;

        // 保存数据model与view相关的指令，当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
        this._directives = {};
        // 数据劫持，重新定义数据的 set 和 get 方法
        this._obverse(this.$data);
        // 解析器，解析模板指令，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
        this._compile(this.$el);
    }
}
```

这里我们定义了 myVue 构造函数，并在构造方法中进行了一些初始化操作，
上面做了注释，这里我就不在赘述，
主要来看里面关键的两个方法 _obverse 和 _compile。
首先是 _observe 方法，他的作用就是处理传入的 data ，
并重新定义 data 的 set 和 get 方法，
保证我们在 data 发生变化的时候能跟踪到，并发布通知，
主要用到了 Object.defineProperty() 这个方法。

## 3、_observe

```javascript
//_obverse 函数，对data进行处理，重写data的set和get函数
_obverse(data){
    let val ;
    //遍历数据
    for( let key in data ){
        // 判断是不是属于自己本身的属性
        if( data.hasOwnProperty(key) ){
            this._directives[key] = [];
        }

        val = data[key];
        //递归遍历
        if ( typeof val === 'object' ) {
            //递归遍历
            this._obverse(val);
        }

        // 初始当前数据的执行队列
        let _dir = this._directives[key];

        //重新定义数据的 get 和 set 方法
        Object.defineProperty(this.$data,key,{
            enumerable: true,
            configurable: true,
            get: function () {
                return val;
            },
            set: function (newVal) {
                if ( val !== newVal ) {
                    val = newVal;
                    // 当 myText 改变时，触发 _directives 中的绑定的Watcher类的更新
                    _dir.forEach(function (item) {
                        //调用自身指令的更新操作
                        item._update();
                    })
                }
            }
        })
    }
}
```

上面的代码也很简单，注释也都很清楚，不过有个问题就是，
我在递归遍历数据的时候，偷了个小懒 --，
这里我只涉及到了一些简单的数据结构，复杂的例如循环引用的这种我没有考虑进入，
大家可以自行补充一下哈~

接着我们来看看 _compile 这个方法，它实际上是一个解析器，
其功能就是解析模板指令，并将每个指令对应的节点绑定更新函数，
添加监听数据的订阅者，一旦数据有变动，就收到通知，
然后去更新视图变化，具体实现如下：

## 4、_compile

```javascript
_compile(el){
    //子元素
    let nodes = el.children;
    for( let i = 0 ;  i < nodes.length ; i++ ){
    	let node = nodes[i];
    	// 递归对所有元素进行遍历，并进行处理
    	if( node.children.length ){
    		this._compile(node);
    	}

        //如果有 v-text 指令 , 监控 node的值 并及时更新
        if( node.hasAttribute('v-text')){
            let attrValue = node.getAttribute('v-text');
            //将指令对应的执行方法放入指令集
            this._directives[attrValue].push(new Watcher('text',node,this,attrValue,'innerHTML'))
        }

    	//如果有 v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
        if( node.hasAttribute('v-model') && ( node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){
            let _this = this;
            //添加input时间
            node.addEventListener('input',(function(){
            	let attrValue = node.getAttribute('v-model');
            	//初始化赋值
            	_this._directives[attrValue].push(new Watcher('input',node,_this,attrValue,'value'));
                return function () {
                    //后面每次都会更新
                    _this.$data[attrValue] = node.value;
            	}
            })())
        }
    }
}
```

上面的代码也很清晰，我们从根元素 #app 开始递归遍历每个节点，
并判断每个节点是否有对应的指令，这里我们只针对 v-text 和 v-model，
我们对 v-text 进行了一次 new Watcher()，
并把它放到了 myText 的指令集里面，对 v-model 也进行了解析，
对其所在的 input 绑定了 input 事件，并将其通过 new Watcher() 与 myText 关联起来，
那么我们就应该来看看这个 Watcher 到底是什么？

Watcher 其实就是订阅者，是 _observer 和 _compile 之间通信的桥梁用来绑定更新函数，
实现对 DOM 元素的更新。

## 5、Watcher

```javascript
class Watcher{
    /*
    * name  指令名称，例如文本节点，该值设为"text"
    * el    指令对应的DOM元素
    * vm    指令所属myVue实例
    * exp   指令对应的值，本例如"myText"
    * attr  绑定的属性值，本例为"innerHTML"
    * */
    constructor (name, el, vm, exp, attr){
        this.name = name;
        this.el = el;
        this.vm = vm;
        this.exp = exp;
        this.attr = attr;

        //更新操作
        this._update();
    }

    _update(){
    	this.el[this.attr] = this.vm.$data[this.exp];
    }
}
```

每次创建 Watcher 的实例，都会传入相应的参数，
也会进行一次 _update 操作，上述的 _compile 中，
我们创建了两个 Watcher 实例，不过这两个对应的 _update 操作不同而已，
对于 div.text 的操作其实相当于 div.innerHTML=h3.innerHTML = this.data.myText ，
对于 input 相当于 input.value=this.data.myText,
这样每次数据 set 的时候，我们会触发两个 _update 操作，
分别更新 div 和 input 中的内容~

## 6、使用

废话不多说，赶紧测试一下吧~

先初始化一下~

```javascript
//创建vue实例
const app = new myVue({
    el : '#app' ,
    data : {
        myText : 'hello world'
    }
})
```

我们顺利的实现了一个简单的双向绑定，棒棒哒 ~

## 参考资料

- [JavaScript设计模式之观察者模式](https://juejin.cn/post/6844903698154389517)
