const {generateSidebarMenus} = require('../../build/generate-sidebar-menu')
const sidebarMenus = generateSidebarMenus()

module.exports = {
  title: '前端程序员备忘录',
  description: '《前端程序员备忘录》是前端基础知识和前端面试题的集锦。',
  base: '/memo/',
  head: [
    ['link', {rel: 'icon', href: 'https://www.orzzone.com/projects/cdn/favicon.ico'}]
  ],
  themeConfig: {
    logo: 'https://www.orzzone.com/projects/cdn/favicon.png',
    nav: [
      {text: '首页', link: '/'},
      {text: '总论', link: '/SUMMARY'},
      {text: '作者博客', link: 'https://www.orzzone.com'},
      {text: '去github点赞', link: 'https://github.com/Yakima-Teng/memo'}
    ],
    navbar: true,
    sidebarDepth: 1,
    displayAllHeaders: true,
    lastUpdated: '最近更新时间', // string | boolean
    sidebar: sidebarMenus,
  },
  markdown: {
    linkify: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-imsize'))
    },
  },
}
