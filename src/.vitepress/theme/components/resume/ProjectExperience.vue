<template>
  <div class="project-experience">
    <div v-for="(item, idx) in list" :key="idx" class="item">
      <div class="item-header">
        <div class="left">
          <div>{{ item.duration }}</div>
          <a v-if="item.link" :href="item.link" target="_blank" class="name">{{ item.projectName }}</a>
          <div v-else class="name">{{ item.projectName }}</div>
        </div>
        <div class="right">{{ item.role }}</div>
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
const list = [
  // 可视化项目
  {
    duration: '2021-12 ~ 2024-01',
    projectName: '筑绘通 PC 端 | pinlandata.com',
    link: 'https://www.pinlandata.com',
    role: 'Vue3 + Vue-Router + Pinia + Element Plus',
    // img: 'https://cdn.orzzone.com/demo-editor-snapshot.png',
    descList: [
      '筑绘通是一款类似 CAD 的在线建筑 BIM 编辑平台，核心工作台页面构件种类多、表单多、充斥着异步事件监听和三级及以上的联动交互，<strong>代码工程复杂度和运行时性能要求较高</strong>。我在项目中担任<strong>前端负责人</strong>的角色。',
      '<span class="num">①</span> 负责团队文档建设，开发任务分配和进度跟进。负责团队 OKR 的建立和落地。负责面试和绩效考核工作。',
      '<span class="num">②</span> 将 C++ 侧暴露的 API（画布操作命令、事件监听、模型数据等）封装成 SDK，降低了业务开发上手难度。',
      '<span class="num">③</span> 在编码时大量应用设计模式和 OOP 思想以提高代码可维护性，并对性能做了大量优化。',
      '<span class="num">④</span> 组织通用项目模板的开发，以提高开发基于筑绘通能力的第三方定制化项目的效率。',
      '<span class="num">⑤</span> 负责日常团队 code review，推进 ESLint、TypeScript 在项目中的落地。',
      // '* 项目中对画布的操作使用的是公司自研库，出于兴趣因素我用开源的 Fabric.js 和 Three.js 搭建了一个在线的 2D 转 3D 工具，支持逐点绘制多边形等操作。'
      // '筑绘通是一款支持<strong>多人实时协同</strong>的工程设计工具（自研 BIM 平台，类似在线 CAD），可以帮助设计师实现高质量设计，支持 2D/3D。',
      // '该项目构件种类多、表单多、充斥着异步事件监听和联动交互，<strong>代码工程复杂度和运行时性能要求都很高</strong>。',
      // '我们进行了不断调整，直观结果是 <strong>bug 下降约 20 个点</strong>。',
      // '① 技术方面：数据懒读取、结果缓存、垃圾回收、虚拟列表、引入 TS、顺序保证、监听优化、节流防抖等。',
      // '② 架构方面：采用面向对象思想、分离业务/功能代码、注意设计模式、隔离脏代码（不过早优化）等。',
      // '③ 其他方面：把关联调方的 API、引导产品需求、核心功能尽量安排给高阶开发人员等。',
      // '<div class="highlight">* 如贵司无类似项目，为便于理解，可将其类比为支持协同的<strong>低代码平台</strong>。</div>'
    ]
  },
  // 互金、混合APP
  {
    duration: '2018-09 ~ 2021-07',
    projectName: '好买基金混合 APP',
    role: 'React + React-Router + Redux + 手写样式',
    descList: [
      '好买基金是一款支持在线基金交易的混合 APP，在小米应用商店中<strong>下载量超千万</strong>。其中 H5 部分是一个 <strong>400+ 页面的大型 Webpack 项目</strong>，它们会被用在 APP、微信公众号等端上，有很多兼容适配工作。我在项目中担任<strong>技术带队</strong>角色。',
      '<span class="num">①</span> 显著降低了 APP 中全量/增量 H5 资源包的大小和项目的编译时间。',
      '<span class="num">②</span> 稳步推进 ESLint 的落地。',
      '<span class="num">③</span> 封装了常用方法库和键盘组件等业务组件。',
      '<span class="num">④</span> 指导团队成员，并持续性地在团队内输出优秀代码实践。',
      // '为提高编译效率，支持了<strong>编译一次按模块/页面精度输出多份不同产物</strong>的特性。随着不断迭代，H5 部分成了 <strong>400+ 页面的大型 Webpack 项目</strong>，其编译已<strong>由 IO 密集型变成了计算密集型</strong>。在常规优化的基础上，通过条件编译等方式<strong>将编译时间从一小时降到一刻钟</strong>，APP 中<strong>全量/增量 H5 资源包的大小也得到了显著下降</strong>。',
      // '项目对产线问题的排查要求较高，为能<strong>快速定位问题</strong>：① 忽略无需上报的错误信息；② 在接口中追加表示调用次序的参数以判断用户行为。③ 在灰度 debug 包中增加中转页面方便快速调试本地页面（减少打包频次）。',
    ]
  },
  // {
  //   duration: '',
  //   projectName: '全栈项目',
  //   role: '个人独立开发',
  //   descList: [
  //
  //   ],
  // }
]
</script>

<style lang="scss" scoped>
.project-experience {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 14pt;
  font-size: 11pt;
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 9pt;
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
      gap: 12pt;
      .name {
        font-weight: bold;
      }
    }
    .right {
      font-weight: bold;
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
      width: 42%;
      height: auto;
      margin-right: 8pt;
      margin-bottom: 0;
    }
    .desc-list {
      font-size: 11pt;
      text-align: justify;
      margin-top: -8pt;
      line-height: 1.8;
      .desc-item {
        width: 100%;
        margin: 3pt 0;
        :deep(.num) {
          position: relative;
          top: -1.2pt;
        }
        :deep(.highlight) {
          font-weight: bold;
          color: #ff0000;
        }
      }
    }
  }
}
</style>
