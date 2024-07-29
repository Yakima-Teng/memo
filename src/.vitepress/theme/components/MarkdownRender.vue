<template>
  <div class="markdown-render vp-doc">
    <Content />
  </div>
</template>

<script setup lang="ts">
import '../stylesCode'
</script>

<style lang="scss" scoped>
.markdown-render {
  display: block;
  max-width: var(--site-width);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 30px;
  background-color: var(--color-light);
}
@media screen and (max-width: 819px) {
  .markdown-render {
    padding: 26px;
    min-height: calc(100vh - 100px);
  }
}
</style>
