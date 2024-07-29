<template>
  <div class="page-post">
    <SiteHeader v-if="false" />
    <MarkdownRender />
    <SiteFooter v-if="false" />
  </div>
</template>

<script setup lang="ts">
import MarkdownRender from '../components/MarkdownRender.vue'
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
</script>

<style lang="scss">
.page-wrapper.post {
  background-color: var(--color-gray-light);
}
.page-post {
  display: block;
  margin: 0 auto;
  max-width: var(--site-width);
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px 0;
  .site-header {
    width: auto;
    max-width: 100%;
  }
  .markdown-render {
    width: auto;
    max-width: 100%;
    min-height: calc(100vh - 240px);
    background-color: var(--color-light);
    border-radius: 6px;
    padding: 50px 30px 60px;
  }
}
@media screen and (max-width: 819px) {
  .page-post {
    .markdown-render {
      min-height: calc(100vh - 100px);
    }
  }
}
</style>
