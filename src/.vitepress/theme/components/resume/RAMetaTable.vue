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
  {
    title: '其他信息',
    detail: '1991年生人，定居在上海市浦东新区周浦镇，毗邻张江科学城国际医学园区。',
    href: '',
    style: { width: '100%' }
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
