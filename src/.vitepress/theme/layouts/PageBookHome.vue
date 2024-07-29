<template>
  <div class="page-book-home">
    <BookHeader />

    <MarkdownRender />
  </div>
</template>

<script lang="ts" setup>
import MarkdownRender from '../components/MarkdownRender.vue'
import BookHeader from "../components/BookHeader.vue";
</script>

<style lang="scss">
.page-wrapper.book-home {
  background-color: #464646;
  min-height: 100vh;
}
html.dark {
  .page-wrapper.book-home {
    background-color: #464646;
    .page-book-home {
      box-sizing: border-box;
      border: 1px solid rgba(80, 80, 80, 1);
    }
    .markdown-render {
      background-color: #000000;
      ul {
        li {
          color: #ffffff;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.page-book-home {
  display: block;
  margin: 0 auto;
  max-width: var(--site-width);
  :deep(.markdown-render) {
    width: auto;
    ul {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;
      margin: 25px auto 40px;
      background-color: transparent;
      li {
        display: block;
        width: 100%;
        padding: 0 10px;
        color: #000000;
        font-size: 16px;
        font-weight: normal;
        line-height: 20px;
        border-bottom: 3px dashed skyblue;
        text-align: left;
        a {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
