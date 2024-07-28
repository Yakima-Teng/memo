import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    assetsInclude: ['**/*.awebp'],
    server: {
      proxy: {
        '/api': {
          target: 'https://www.orzzone.com',
          changeOrigin: true
        }
      }
    }
  },
  base: '/memo/',
  title: "峰间的云",
  // 这样就不会有默认的标题后缀了
  titleTemplate: false,
  description: "滕运锋的个人博客",
  head: [
    ['link', { rel: 'shortcut icon', href: 'https://cdn.orzzone.com/orzzone/logo.png' }],
    // [
    //   'meta',
    //   {
    //     name: 'viewport',
    //     content: 'width=device-width, initial-scale=1.0, viewport-fit=cover, minimum-scale=1, maximum-scale=1.0, user-scalable=0'
    //   }
    // ],
    [
      'script',
      {
        src: 'https://cdn.orzzone.com/verybugs/better-monitor.min.js',
        crossorigin: 'anonymous',
        'data-project-id': '24',
      }
    ],
    [
      'script',
      {
        src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
      }
    ],
  ],
  markdown: {
    lineNumbers: true,
    toc: { level: [2, 3, 4, 5] },
    languageAlias: {
      mysql: 'sql',
    }
  },
  sitemap: {
    hostname: 'https://www.orzzone.com',
  },
  lastUpdated: true,
  rewrites: {
    // 'memo/index.md': 'memo/single.md',
  },
})
