<template>
  <div class="site-footer">
    <div class="footer-left">
      <div class="line">
        <CustomLink
          v-for="item in menus"
          class="menu"
          :url="item.href"
        >
          {{ item.label }}
        </CustomLink>
      </div>
      <div class="line">
        Copyright © {{ year }}. All rights reserved·
        <CustomLink class="small" url="https://beian.miit.gov.cn/" rel="nofollow noreferrer noopener" target="_blank">浙ICP备18053953号-1</CustomLink> ·
        <CustomLink class="small" url="https://www.orzzone.com/sitemap.xml">Sitemap</CustomLink>
      </div>
      <div class="line">
        <CustomLink class="small" url="http://www.wikimoe.com/" rel="noopener" title="前平面设计师，前网页美工，现任前端设计师。" target="_blank">维基萌</CustomLink> ·
        <CustomLink class="small" url="http://www.tipskill.com" rel="noopener" title="探索药学的奇迹" target="_blank">TipSkill药学博客</CustomLink> ·
        <CustomLink class="small" url="https://blog.wy310.cn/" rel="noopener" title="记录、分享前端技术" target="_blank">大海爱奔跑</CustomLink> ·
        <CustomLink class="small" url="https://www.verystores.com/" rel="noopener" target="_blank">人生小店</CustomLink> ·
        <CustomLink class="small" url="https://www.cnblogs.com/minjay/" rel="noopener" target="_blank">minjay26</CustomLink>
      </div>
    </div>
    <div class="footer-right">
      <img src="https://cdn.orzzone.com/orzzone/logo.png" alt="" class="logo">
    </div>
  </div>
</template>

<script lang="ts" setup>
import CustomLink from './CustomLink.vue'
import { menus } from "../scripts/constant";

const year = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--site-width);
  padding: 0 30px;
  height: 140px;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: var(--color-dark);
  background-color: var(--color-gray-light);
  .footer-left {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
    .line {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      line-height: 1.5;
      gap: 8px;
    }
    .menu {
      font-size: 18px;
    }
    a {
      border-bottom: 1px solid var(--color-green);
      color: var(--color-green);
      &:hover {
        background-color: var(--color-green);
        color: var(--color-light);
      }
    }
  }
  .footer-right {
    display: inline-flex;
    .logo {
      display: block;
      width: 100px;
      height: 100px;
    }
  }
}
@media screen and (max-width: 819px) {
  .site-footer {
    display: none;
  }
}
</style>
