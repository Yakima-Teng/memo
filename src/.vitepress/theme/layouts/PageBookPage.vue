<template>
  <div class="page-book-page">
    <BookHeader />
    <MarkdownRender />
  </div>
</template>

<script setup lang="ts">
import MarkdownRender from '../components/MarkdownRender.vue'
import BookHeader from "../components/BookHeader.vue";
</script>

<style lang="scss">
html.dark {
  .page-wrapper.book-page {
    background-color: #464646;
    .page-post {
      box-sizing: border-box;
      border: 1px solid rgba(80, 80, 80, 1);
    }
    .markdown-render {
      background-color: #000000;
    }
  }
}

.page-wrapper.book-page {
  background-color: #464646;
}
.page-book-page {
  display: block;
  margin: 0 auto;
  max-width: var(--site-width);
  min-height: 100vh;
  .site-header {
    width: auto;
    max-width: 100%;
  }
  .markdown-render {
    width: auto;
    max-width: 100%;
    min-height: calc(100vh - 40px);
  }
}
</style>
