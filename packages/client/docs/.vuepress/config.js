module.exports = {
    title: '前端程序员备忘录',
    description: 'Just playing around',
    base: '/memo/',
    themeConfig: {
        logo: 'https://www.orzzone.com/projects/cdn/favicon.ico',
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
