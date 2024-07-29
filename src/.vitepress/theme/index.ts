// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import type { Theme } from 'vitepress'
import './style.css'

import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
} satisfies Theme
