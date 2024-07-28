<template>
  <div class="open-source">
    <div v-for="(item, idx) in projectList" :key="idx" class="item">
      <img :src="item.icon" alt="" class="icon">
      <a :href="item.link" class="name" target="_blank">{{ item.name }}：</a>
      <div class="desc">{{ item.desc }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconNpm from '../../assets/icon-npm.svg'
import iconEbook from '../../assets/icon-ebook.svg'
import iconIdea from '../../assets/icon-idea.svg'

const projectList = [
  {
    name: 'jmock',
    icon: iconNpm,
    link: 'https://github.com/Yakima-Teng/jmock',
    desc: '命令行工具，基于 http-server，可通过配置文件自定义数据 MOCK 规则，支持配置请求转发规则。',
  },
  {
    name: 'html5-cli',
    icon: iconNpm,
    link: 'https://github.com/Yakima-Teng/html5-cli',
    desc: '命令行工具，可对传统项目提供 Live Reload 支持，同时也可像 vue-cli 一样作为项目脚手架。',
  },
  {
    name: 'better-monitor',
    icon: iconNpm,
    link: 'https://github.com/Yakima-Teng/better-monitor',
    desc: '客户端 SDK，支持拦截 AJAX 请求、上报 JS 运行时错误等。已集成在线服务。',
  },
  {
    name: 'utils-daily',
    icon: iconNpm,
    link: 'https://github.com/Yakima-Teng/utils-daily',
    desc: '前端开发常用函数库，支持按需引用，支持 TypeScript，使用 Jest 进行单元测试。',
  },
  // {
  //   name: '技术博客',
  //   icon: iconEbook,
  //   link: 'https://github.com/Yakima-Teng/memo',
  //   desc: '支持暗黑模式，提供 PDF、Web APP、安卓/Windows 客户端等阅读媒介。',
  // },
  {
    name: 'IdeaPress',
    icon: iconIdea,
    link: 'https://github.com/Yakima-Teng/IdeaPress',
    desc: '基于 Nuxt.js、MySQL 的 CMS 系统。支持配置 SEO、网站信息、菜单、轮播图、广告位等。',
  },
]
</script>

<style lang="scss" scoped>
.open-source {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0;
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 3pt;
  }
  .icon {
    display: block;
    width: 22pt;
    height: auto;
  }
  .name {
    font-size: 11pt;
  }
  .desc {
    font-size: 10.5pt;
  }
}
</style>
