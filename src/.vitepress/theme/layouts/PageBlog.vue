<template>
  <div class="page-blog">
    <SiteHeader />
    <MarkdownRender />
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import SiteHeader from '../components/SiteHeader.vue'
import MarkdownRender from '../components/MarkdownRender.vue'
import SiteFooter from "../components/SiteFooter.vue";
</script>

<style lang="scss">
.page-wrapper.blog {
  background-color: var(--color-gray);
  min-height: 100vh;
  .markdown-render {
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 3px;
      a {
        position: relative;
        display: inline;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 21px);
      }
      img {
        width: 18px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page-blog {
  padding: 0;
  .markdown-render {
    min-height: calc(100vh - 240px);
  }
}
</style>
