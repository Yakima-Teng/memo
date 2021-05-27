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
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' }
        ],
        // navbar: true,
        sidebar: [
            '/',
            // '/SUMMARY',
            ['/SUMMARY', 'Explicit link text'],
            ['/软技能/科学上网', 'test']
        ],
        sidebarDepth: 2,
        displayAllHeaders: true,
        lastUpdated: '最近更新时间', // string | boolean
    }
}
