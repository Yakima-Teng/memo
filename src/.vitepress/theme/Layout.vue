<template>
  <div :class="['page-wrapper', frontmatter.layout || 'post']">
    <PageHome v-if="frontmatter.home" />
    <PageResume v-else-if="frontmatter.layout === 'cv'" />
    <PageBlog v-else-if="frontmatter.layout === 'blog'" />
    <PageBookHome v-else-if="frontmatter.layout === 'book-home'" />
    <PageBookPage v-else-if="frontmatter.layout === 'book-page'" />
    <PageBadminton v-else-if="frontmatter.layout === 'badminton'" />
    <NotFound v-else-if="page.isNotFound" />
    <PagePost v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'

import NotFound from './layouts/NotFound.vue'
import PageHome from './layouts/PageHome.vue'
import PagePost from './layouts/PagePost.vue'
import PageResume from './layouts/PageResume.vue'
import PageBadminton from "./layouts/PageBadminton.vue";
import PageBookHome from './layouts/PageBookHome.vue'
import PageBookPage from './layouts/PageBookPage.vue'
import PageBlog from "./layouts/PageBlog.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter, page } = useData()

onMounted(async () => {
  document.oncontextmenu = () => false
})
</script>
