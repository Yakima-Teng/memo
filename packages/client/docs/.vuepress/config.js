module.exports = {
    title: '前端程序员备忘录',
    description: '《前端程序员备忘录》是前端基础知识和前端面试题的集锦。',
    base: '/memo/',
    head: [
        ['link', { rel: 'icon', href: 'https://www.orzzone.com/projects/cdn/favicon.ico' }]
    ],
    themeConfig: {
        logo: 'https://www.orzzone.com/projects/cdn/favicon.png',
        nav: [
            { text: '首页', link: '/' },
            { text: '总论', link: '/SUMMARY' },
            { text: '作者博客', link: 'https://www.orzzone.com' }
        ],
        navbar: true,
        sidebarDepth: 0,
        displayAllHeaders: true,
        lastUpdated: '最近更新时间', // string | boolean
        sidebar: [
            ['/SUMMARY', '总论'],
            {
                title: 'ES语法',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/ES语法/call、apply、bind区别', 'call、apply、bind区别'],
                    ['/ES语法/assign', 'assign'],
                    ['/ES语法/ES5中的闭包、作用域、变量（函数）提升', '闭包、作用域、变量提升'],
                    ['/ES语法/forEach循环、for-of循环和for-in循环', 'forEach、for-of、for-in循环'],
                    ['/ES语法/IIFE与分号', 'IIFE与分号'],
                    ['/ES语法/JS中除了使用new关键字还有什么方法可以创建对象', '除了使用new关键字还有什么方法可以创建对象'],
                    ['/ES语法/JS原型与原型链', 'JS原型与原型链'],
                    ['/ES语法/判断JS全局变量是否存在', '判断JS全局变量是否存在'],
                    ['/ES语法/判断对象是否相等', '判断对象是否相等'],
                    ['/ES语法/合并对象属性', '合并对象属性'],
                    ['/ES语法/IE8下parseInt兼容问题', 'IE8下parseInt兼容问题'],
                    ['/ES语法/数据类型', '数据类型'],
                    ['/ES语法/说明生成器函数的写法，以及yield语句的作用', '说明生成器函数的写法，以及yield语句的作用'],
                ],
            },
            {
                title: '样式',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/样式/css之三列布局', 'css之三列布局'],
                    ['/样式/input框加入disabled属性后字体颜色变淡', 'input框加入disabled属性后字体颜色变淡'],
                    ['/样式/z-index', 'z-index'],
                    ['/样式/图片在父元素中水平、垂直居中', '图片在父元素中水平、垂直居中'],
                    ['/样式/弹性盒模型', '弹性盒模型'],
                    ['/样式/弹性盒（flexbox）实现竖向九宫格', '弹性盒（flexbox）实现竖向九宫格'],
                    ['/样式/清除浮动的原理', '清除浮动的原理'],
                    ['/样式/简述position属性各个值的区别', '简述position属性各个值的区别'],
                    ['/样式/边距塌陷及其修复', '边距塌陷及其修复'],
                    ['/样式/高性能动画', '高性能动画'],
                ],
            },
            {
                title: 'DOM操作',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/DOM操作/DOM基础', 'DOM基础'],
                    ['/DOM操作/事件', '事件'],
                ],
            },
            {
                title: 'HTML5',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/HTML5/IE8不支持媒体查询和HTML5新header、article等元素的解决方法', 'IE8不支持媒体查询和H5新元素'],
                    ['/HTML5/常用meta标签', '常用meta标签'],
                ],
            },
            {
                title: '算法',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/算法/二分法查找', '二分法查找'],
                    ['/算法/二叉树及其遍历', '二叉树及其遍历'],
                    ['/算法/冒泡排序', '冒泡排序'],
                    ['/算法/快速排序', '快速排序'],
                    ['/算法/数组奇左偶右不使用额外空间', '数组奇左偶右不使用额外空间'],
                    ['/算法/数组扁平化', '数组扁平化'],
                    ['/算法/求一个数组中第二大的元素', '求一个数组中第二大的元素'],
                    ['/算法/深拷贝', '深拷贝'],
                ],
            },
            {
                title: '源码',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/源码/jquery源码中的window和undefined', 'jquery源码中的window和undefined'],
                    ['/源码/如果要自己开发一套实现数据双向绑定的系统，有何思路', '如果要自己开发一套实现数据双向绑定的系统，有何思路'],
                    ['/源码/说明jquery的bind和on的区别', '说明jquery的bind和on的区别']
                ],
            },
            {
                title: '运维',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/运维/linux系统和常用命令', 'linux系统和常用命令'],
                    ['/运维/MySQL启动失败故障排查', 'MySQL启动失败故障排查'],
                    ['/运维/Vim编辑器常用快捷键', 'Vim编辑器常用快捷键'],
                ],
            },
            {
                title: '综合',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/综合/函数式编程的特点', '函数式编程的特点'],
                    ['/综合/响应式页面设计的原理', '响应式页面设计的原理'],
                    ['/综合/常用的异步处理方法', '常用的异步处理方法'],
                    ['/综合/常见的前端优化技巧', '常见的前端优化技巧'],
                    ['/综合/移动端click事件延时', '移动端click事件延时'],
                    ['/综合/移动端常见问题', '移动端常见问题'],
                    ['/综合/页面加载', '页面加载'],
                    ['/综合/高频率触发的事件的性能优化', '高频率触发的事件的性能优化'],
                ],
            },
            {
                title: '软技能',
                initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
                children: [
                    ['/软技能/科学上网', '科学上网'],
                ],
            },
            {
                title: '实用网站',   // required
                path: '/其他/实用网站',      // optional, link of the title, which should be an absolute path and must exist
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1,    // optional, defaults to 1
                children: [],
            },
            {
                title: '955工作生活平衡名单',   // required
                path: 'https://github.com/formulahendry/955.WLB',      // optional, link of the title, which should be an absolute path and must exist
                collapsable: false, // optional, defaults to true
                sidebarDepth: 1,    // optional, defaults to 1
                children: [],
            },
        ],
    }
}
