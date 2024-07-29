<template>
  <div class="site-header">
    <CustomLink class="logo" url="/">
      <img src="https://cdn.orzzone.com/orzzone/logo.png" alt="" class="logo">
    </CustomLink>
    <div class="right">
      <CustomLink
        v-for="item in menus"
        :class="['menu', { active: item.href === path }]"
        :url="item.href"
      >
        {{ item.label }}
      </CustomLink>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vitepress";
import CustomLink from './CustomLink.vue'
import { menus } from "../scripts/constant";

const route = useRoute()

const path = route.path.replace(/\.html.*$/, '')
</script>

<style lang="scss" scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--site-width);
  padding: 0 30px;
  height: 100px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #4285f4;
  .logo {
    width: 90px;
    height: 90px;
  }
  .right {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
    align-self: flex-end;
    .menu {
      padding: 1em;
      background-color: var(--color-light-opacity8);
      font-size: 1em;
      color: var(--color-dark);
      font-weight: 700;
      &.active {
        background-color: var(--color-light);
      }
      &:hover {
        color: var(--color-light);
        background-color: var(--color-gray);
      }
    }
  }
}
@media screen and (max-width: 819px) {
  .site-header {
    padding: 0 8px;
    .logo {
      display: none;
    }
    .right {
      width: 100%;
      justify-content: space-around;
      .menu {
        padding: 0.5em;
        width: 2em;
        text-align: center;
      }
    }
  }
}
</style>
