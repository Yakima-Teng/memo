<template>
  <div class="canvas-project">
    <div v-for="(item, idx) in list" :key="idx" class="item">
      <div class="item-header">
        <a class="left" :href="item.link" target="_blank">
          <img :src="item.icon" alt="" class="icon">
          <div class="name">{{ item.projectName }}</div>
        </a>
        <div class="right">{{ item.keyword }}</div>
      </div>
      <div class="item-body">
        <img v-if="item.img" :src="item.img" alt="" class="img">
        <div class="desc-list">
          <div
            v-for="(desc, descIdx) in item.descList"
            :key="descIdx"
            class="desc-item"
            v-html="desc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import icon3d from '../../assets/icon-3d.svg'

const list = [
  {
    icon: icon3d,
    link: 'https://www.veryhouses.com',
    projectName: '二三维转换 | veryhouses.com',
    keyword: 'Node + MySQL + Fabric.js + Three.js',
    // img: 'https://cdn.orzzone.com/veryhouses/veryhouses-3d.png',
    descList: [
      '产品底层逻辑是：<strong>用户绘制二维俯视图后，通过调整高度、离地高度等三维属性，使其支持切换为三维立体图</strong>。体验账号：demo@demo.com，密码：demo123456。',
      '<span class="num">①</span> 二维部分使用 Fabric.js 实现，三维部分使用 Three.js 实现。',
      '<span class="num">②</span> [3D] 支持多边形柱、球体、圆环、圆柱体、胶囊、立方体、长方体等立体形状。',
      '<span class="num">③</span> [3D] 支持分享 3D 视图。（<a href="https://www.veryhouses.com/editor/?t=1710771255148#/workbench?id=23&share=1" target="_blank">可点此查看分享示例，无需登录</a>）',
      '<span class="num">④</span> [2D] 支持逐点绘制多边形，支持通过框选的方式绘制矩形，也支持添加圆形、环形等基础形状。',
      '<span class="num">⑤</span> [2D] 支持图层管理，也支持自由涂鸦。',
      '<span class="num">⑥</span> [2D] 支持实时更新项目快照。',
    ]
  },
]
</script>

<style lang="scss" scoped>
.canvas-project {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8pt;
  font-size: 11pt;
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 8pt;
  }
  .item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .left {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 3pt;
      .icon {
        width: auto;
        height: 14pt;
      }
      .name {
        font-weight: normal;
      }
    }
    .right {
      font-weight: bold;
      font-size: 11pt;
    }
  }
  .item-body {
    display: block;
    width: 100%;
    &:after {
      content: '';
      clear: both;
      display: block;
      width: 100%;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
    .img {
      float: left;
      width: 31%;
      height: auto;
      margin-right: 8pt;
      margin-bottom: 8pt;
    }
    .desc-list {
      font-size: 11pt;
      text-align: justify;
      margin-top: -6pt;
      line-height: 1.8;
      .desc-item {
        margin: 3pt 0;
        :deep(.num) {
          position: relative;
          top: -1.2pt;
        }
      }
    }
  }
}
</style>
