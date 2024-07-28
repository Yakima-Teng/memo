<template>
  <div :class="['book-header', { 'uni-app': isUniApp, electron: isElectron }]">
    <div class="book-header-padding" />
    <div class="book-header-inner">
      <div class="icon-wrapper">
        <img :src="iconLeft" alt="" class="icon-navigation" @click="goBack">
      </div>
      <div class="icon-wrapper">
        <img :src="iconRight" alt="" class="icon-navigation" @click="goForward">
      </div>
      <div class="icon-wrapper">
        <img :src="iconRefresh" alt="" class="icon-navigation" @click="doRefresh">
      </div>
      <div class="icon-wrapper">
        <img :src="isDark ? iconDark : iconLight" alt="" class="icon-navigation" @click="toggleDarkMode">
      </div>
      <CustomLink url="/memo">
        <img :src="iconHome" alt="" class="icon-navigation">
      </CustomLink>

      <CustomLink v-if="false" url="http://192.168.10.210:8888/memo">
        调试专用
      </CustomLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import { useData } from "vitepress";
import CustomLink from "../components/CustomLink.vue";
import iconHome from '../assets/icon-home.svg'
import iconLeft from '../assets/icon-left.svg'
import iconRight from '../assets/icon-right.svg'
import iconRefresh from '../assets/icon-refresh.svg'
import iconDark from '../assets/icon-dark.svg'
import iconLight from '../assets/icon-light.svg'

// 亮白模式和暗黑模式
const isDark = useData().isDark
// 我们的移动端安卓apk的useragent里带有uni-app标志
const isUniApp = ref(false)
// 我们的PC客户端的useragent里带有Electron标志
const isElectron = ref(false)

const goBack = () => history.go(-1)
const goForward = () => history.go(1)
const doRefresh = () => location.reload()
const toggleDarkMode = () => {
  isDark.value = !isDark.value
}

onMounted(() => {
  isUniApp.value = window.navigator.userAgent.includes('uni-app')
  isElectron.value = window.navigator.userAgent.includes('Electron')
})
</script>

<style lang="scss">
html.dark {
  .book-header {
    .book-header-inner {
      background-color: rgba(80, 80, 80, 1);
    }
  }
}
</style>
<style lang="scss" scoped>
.book-header {
  @media print {
    display: none;
  }
  &.uni-app {
    .book-header-inner {
      top: auto;
    }
  }
  .book-header-padding {
    display: block;
    width: 100%;
    height: 40px;
    margin-top: env(safe-area-inset-top);
  }
  .book-header-inner {
    position: fixed;
    z-index: 10;
    top: calc(env(safe-area-inset-bottom) + 0px);
    padding-top: env(safe-area-inset-top);
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    max-width: var(--site-width);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: rgba(200, 200, 200, .6);
  }
  .icon-navigation {
    display: block;
    width: auto;
    height: 40px;
    user-select: none;
    cursor: pointer;
    padding: 6px 8px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
