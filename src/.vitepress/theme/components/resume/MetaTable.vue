<template>
  <div class="meta-table">
    <div
      v-for="(item, idx) in details"
      :key="idx"
      :style="item.style || {}"
      class="detail"
    >
      <div class="detail-title">{{ item.title }}：</div>
      <a v-if="item.href" :href="item.href" rel="nofollow noopener noreferrer" v-html="item.detail" class="detail-content" />
      <div v-else class="detail-content" v-html="item.detail" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const details = [
  {
    title: '手机/微信',
    detail: '137-6155-6817',
    href: 'tel:13761556817',
  },
  {
    title: '邮箱',
    detail: 'yakima.public@gmail.com',
    href: 'mailto:yakima.public@gmail.com?subject=from www.orzzone.com/cv',
  },
  // {
  //   title: '行业',
  //   detail: '制药、建筑 BIM、互联网金融（基金）',
  //   href: '',
  // },
  {
    title: '技术博客',
    detail: 'orzzone.com/memo',
    href: 'https://www.orzzone.com/memo',
  },
  {
    title: '坐标',
    detail: '浦东周浦',
  },
  {
    title: '资深前端',
    detail: '熟悉 <strong>Vue 全家桶</strong>、React 全家桶、uni-app，Fabric.js、Three.js、Echarts、套壳APP/PC端。',
    href: '',
    style: { width: '100%' }
  },
  {
    title: '中级后端',
    detail: '熟悉 <strong>Node.js</strong>（Koa、Express、Nuxt）、<strong>MySQL</strong>、Redis、EJS、简单运维。',
    href: '',
    style: { width: '100%' },
  },
]
</script>

<style lang="scss" scoped>
.meta-table {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border: 0.75pt dashed #000000;
  padding: 6pt;
  line-height: 1.8;
  width: 100%;
  .detail {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
    .detail-title {
      font-weight: 400;
    }
    .detail-content {
      font-size: 11pt;
    }
  }
}
</style>
