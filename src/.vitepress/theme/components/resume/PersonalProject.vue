<template>
  <div class="project-experience">
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
// import icon3d from '../../assets/icon-3d.svg'
import iconLog from '../../assets/icon-log.svg'

const list = [
  {
    icon: iconLog,
    link: 'https://www.verybugs.com',
    projectName: '日志监控平台 | verybugs.com',
    keyword: 'Node (koa) + MySQL (sequelize) + Redis + Vue',
    // img: 'https://cdn.orzzone.com/verybugs/bug-script-report.png',
    descList: [
      // '这是一款经过多个项目检验过的、<strong>线上运行了一年多的、商业逻辑闭环的正式产品</strong>（该架构不支持高并发）。',
      // '该平台包括管理平台、<a href="https://github.com/Yakima-Teng/better-monitor" target="_blank">客户端 JS SDK（已开源）</a>、服务端三个部分。功能方面：① 支持 JS 运行时错误日志、接口日志、用户行为日志/自定义日志的上报；② 支持 PV、UV、浏览器信息的统计；③ 支持性能日志上报（FP等）；④ 支持多用户、多项目；⑤ 支持区分会员级别、支付/订单管理、邮箱验证、定时任务。',
      // 'SDK 的开发考虑了很多细节，比如：① 日志会先储存在队列中，收集到一定数量后再上报。② 离开页面时会将未上报数据进行上报，并优先采用可靠性更高的 navigator.sendBeacon API；③ 黑名单支持正则表达式，命中的日志不会上报。',
      '该日志平台支持：JS 运行时错误日志、接口日志、用户行为日志/自定义日志、PV、UV、浏览器统计、页面性能日志。用户可以在线付费升级会员等级以支持更长的日志存储周期。',
      '<span class="num">①</span> 后端使用 Node.js koa 框架开发接口，使用 Sequelize 实现与 MySQL 数据库的交互。',
      '<span class="num">②</span> 官网使用 vite-ssg 实现预渲染以支持网站 SEO。后台管理系统使用 Vue3 + Element Plus 开发。',
      '<span class="num">③</span> 使用 Rollup 打包工具构建了<a href="https://github.com/Yakima-Teng/better-monitor" target="_blank">客户端日志上报 JS SDK（已开源）</a>。',
      '<span class="num">④</span> 使用 jsonwebtoken 实现 JWT 鉴权机制。',
      '<span class="num">⑤</span> 使用 node-schedule 对实时性要求不高的统计数据进行定时更新，对数据库历史数据进行定时清理。',
      '<span class="num">⑥</span> 使用 koa-compress 对动态生成的、较大的日志文件实现 gzip 压缩下载。',
      '<span class="num">⑦</span> 使用 nodemailer 实现邮箱验证码功能，使用 svg-captcha 实现图片验证码功能。',
      '<span class="num">⑧</span> 使用 Redis 实现统计数据缓存。',
      '<span class="num">⑨</span> 项目支持通过执行本地脚本自动 SSH 到远程服务器上进行文件更新与项目部署（使用 PM2）。',
    ]
  },
  // {
  //   icon: icon3d,
  //   link: 'https://www.veryhouses.com',
  //   projectName: '二三维转换 | veryhouses.com',
  //   keyword: 'Node + MySQL + Fabric.js + Three.js',
  //   img: 'https://cdn.orzzone.com/veryhouses/veryhouses-3d.png',
  //   descList: [
  //     '支持创建两种类型的项目：默认类型（支持二三维转换）、涂鸦类型（仅支持二维）。产品核心逻辑是：<strong>用户绘制二维俯视图后，可通过修改属性调整三维立体图的样式</strong>。二维部分使用 fabric.js 实现，三维部分使用 three.js 实现。',
  //     '支持实时更新项目快照、分享项目。非涂鸦模式下：① 支持圆柱、球、环等形状的二三维转换；② 支持逐点绘制多边形；③ 支持通过框选的方式绘制矩形；④ 支持图层管理。',
  //     // '体验账号：demo@demo.com，密码：demo123456（可直接点登录页右下角的“使用体验账号”按钮）。',
  //   ]
  // },
]
</script>

<style lang="scss" scoped>
.project-experience {
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
