<template>
  <div class="page-resume">
    <div class="pages">
      <div class="page no-print">
        <div class="page-number">第1页</div>
        <section class="box">
          <header class="box-header">
            <div>项目经历：筑绘通（在线建筑模型编辑）</div>
            <div>2021年12月~2024年1月</div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <img class="full-width" src="https://cdn.orzzone.com/demo-editor-snapshot.png" alt="">
                <div class="list-item-desc">
                  <div class="paragraph">官网链接：<a href="https://www.pinlandata.com" target="_blank" rel="nofollow noopener noreferrer">https://www.pinlandata.com</a></div>
                  <div class="paragraph">这是一个集dwg建筑模型识别、编辑、出图功能为一体的在线工具。项目难点在于<strong>数据模型种类繁多、异步事件处理频繁、充斥着三级以上的联动交互</strong>，很容易出bug，在组员的支持下，第一年我们就成功将前端团队的bug占比下调了20个百分点。</div>
                  <img class="full-width" src="https://cdn.orzzone.com/2022-bug-ratio.png" alt="">
                  <div class="paragraph">2年时间里，我们主要做了以下事情：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 将项目由Vue2 option API + js重构为Vue3 composition API + ts，数据类型更清晰。</li>
                    <li class="list-item">* 制定代码规范，坚持code review，增强团队成员对代码的敬畏之心。</li>
                    <li class="list-item">* 整理对外定制项目中的常见UI元素，带领组员开发了一套基础项目模板，方便开展新项目。</li>
                    <li class="list-item">* 工作台代码组织优化：①将画布相关API和对象模型单独封装成SDK，从业务代码中抽离。②按需绑定/移除/恢复事件监听。③对对象上不需要立即获取的数据进行lazy读取优化。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第2页</div>
        <section class="box">
          <header class="box-header">
            <div>项目经历：叮咚买菜供应链后台系统</div>
            <div>2021年7月~2021年12月</div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <div class="list-item-desc">
                  <div class="paragraph">这是一个使用Vue2 + Element-UI + Webpack4的典型供应链后台管理系统。我主要负责调拨部分的业务迭代。彼时团队正用乾坤将老应用拆分微前端，但老项目短时间内仍将存在。老项目开发和编译用时长，严重影响了开发/部署效率。故对老项目进行了编译优化。</div>
                  <img class="full-width" src="https://cdn.orzzone.com/webpack4-optimize.png" alt="">
                  <div class="paragraph">本次优化前后核心数据对比结果见上图，其中最有意义的数据是以下3个：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* dev热更新时间：从16秒降至不到1秒，降幅超93%，显著提升了开发效率。</li>
                    <li class="list-item">* build时间：从近6分钟降至1分12秒，降幅超79%，提高了测试/产线环境的发布效率。</li>
                    <li class="list-item">* build产物大小：从90.2MB降至22.3MB，降幅超75%，提升了用户体验（开启gzip后仅4MB）。</li>
                  </ul>
                  <div class="paragraph">主要的优化点有：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 减少无意义的资源引用（效果拔群⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐）</li>
                    <li class="list-item">* 合理设置webpackMode（效果拔群⭐⭐⭐⭐⭐⭐）</li>
                    <li class="list-item">* 升级部分插件（效果一般⭐⭐⭐）</li>
                    <li class="list-item">* 升级node（效果不定⭐⭐）</li>
                    <li class="list-item">* devtool的值注意一下（效果一般⭐⭐⭐）</li>
                    <li class="list-item">* 使用CDN、DLL（效果一般⭐）</li>
                    <li class="list-item">* 更换压缩插件（效果较好⭐⭐⭐⭐）</li>
                    <li class="list-item">* 干掉SourceMap（效果好⭐⭐⭐⭐⭐）</li>
                    <li class="list-item">* 提取公共代码（效果好⭐⭐⭐⭐⭐）</li>
                    <li class="list-item">* 使用缓存（效果一般⭐）</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第3页</div>
        <section class="box">
          <header class="box-header">
            <div>项目经历：好买基金+储蓄罐（2个APP）</div>
            <div>2018年9月~2021年7月</div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <div class="flex-center">
                  <img class="one-fourth-width" src="https://cdn.orzzone.com/howbuy-01.png" alt="">
                  <img class="one-fourth-width" src="https://cdn.orzzone.com/howbuy-02.png" alt="">
                  <img class="one-fourth-width" src="https://cdn.orzzone.com/howbuy-03.png" alt="">
                  <img class="one-fourth-width" src="https://cdn.orzzone.com/howbuy-04.png" alt="">
                </div>
                <div class="list-item-desc">
                  <div class="paragraph">这是hybrid APP，由原生和前端团队公共维护，前端团队负责其中的web部分，web部分按访问协议分为2类：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 远程通过https://协议访问的web页面：发布简单、访问慢</li>
                    <li class="list-item">* 打包到APP本地通过file://协议访问的web资源包：发布麻烦（涉及增量/全量包概念）、访问快</li>
                  </ul>
                  <div class="paragraph">在职期间，对项目进行了一系列技术优化，比较突出的点有：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 减少APP内H5资源包的全量包和增量包大小，其中一个子项目优化后<strong>编译产物大小缩减了78%（4.6M=>1M），编译时间缩减了87%（150秒=>20秒）</strong>。</li>
                    <li class="list-item">* 对于1个项目里输出产物需要同时用于多处（掌机APP、储蓄罐APP、微信/wap端）但每处又不完全一致的情况，支持根据路由配置（示意图见下页附图2）实现<strong>编译一次按模块/页面精度输出多份不同产物</strong>，避免需要编译多次的麻烦。</li>
                    <li class="list-item">* 通过条件编译的方式，将编译最慢的<strong>一个大型webpack项目（400多页面）</strong>的编译时间<strong>由一个多小时缩短到一刻钟以内</strong>。</li>
                  </ul>
                  <div class="paragraph">此外，对项目架构也进行了一系列优化（优化前后H5资源架构对比图见下页附图1）：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 将仓库B代码合并至仓库A的cxg子项目中，去掉了对仓库B的代码维护工作。</li>
                    <li class="list-item">* 对仓库A中asset子项目和cxg子项目将中部分通过不使用webpack的上古项目代码进行迁移，统一使用webpack打包，开发体验趋于一致。</li>
                    <li class="list-item">* 在仓库A中新增vendor子项目，编译出的js供其他3个子项目复用，有效减少了冗余代码。</li>
                    <li class="list-item">* 将低频使用页面，从APP端本地web资源中挪到远程web资源中。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第4页</div>
        <section class="box">
          <header class="box-header">
            <div>项目经历：好买基金+储蓄罐（2个APP）</div>
            <div>2018年9月~2021年7月</div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <div class="list-item-desc">
                  <img class="full-width" src="https://cdn.orzzone.com/h5-structure.png" alt="">
                  <div class="paragraph" style="text-align: center;">附图1：项目架构优化前后H5资源架构对比图</div>
                  <img class="full-width" src="https://cdn.orzzone.com/bundle-by-page.png" alt="">
                  <div class="paragraph" style="text-align: center;">附图2：前端项目独立模块打包示意图</div>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第5页</div>
        <section class="box">
          <header class="box-header">
            <div>个人作品：在线bug监控系统</div>
            <div><a href="https://www.verybugs.com" target="_blank" rel="noopener noreferrer">www.verybugs.com</a></div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <img class="full-width" src="https://cdn.orzzone.com/verybugs/bug-script-report.png" alt="">
                <div class="list-item-desc">
                  <div class="paragraph">实用的bug监控平台，平时公司项目里就可以用（尚未做读写分离，不适用于用户量大的场景）。包含以下子项目：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* PC端管理系统。</li>
                    <li class="list-item">* 日志上报JS SDK（供外部项目集成上报功能）。</li>
                    <li class="list-item">* SSR预渲染的首页/着陆页（方便SEO）。</li>
                    <li class="list-item">* 登录模块。</li>
                    <li class="list-item">* node接口服务（koa + mysql）。</li>
                  </ul>
                  <div class="paragraph">系统简介：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 支持上报JS运行时错误日志、接口日志、行为日志等。</li>
                    <li class="list-item">* 支持统计PV、UV、浏览器信息等。</li>
                    <li class="list-item">* 支持按用户、项目维度来隔离日志，方便阅读日志。</li>
                    <li class="list-item">* 该系统自带角色区分、会员有效期管理、在线支付、订单管理、邮箱验证、定时任务等功能。<span style="color:red;">可作为开发常规网站的模板</span>。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第6页</div>
        <section class="box">
          <header class="box-header">
            <div>个人作品：在线bug监控系统</div>
            <div><a href="https://www.verybugs.com" target="_blank" rel="noopener noreferrer">www.verybugs.com</a></div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <div class="list-item-desc">
                  <img class="full-width" style="width:90%;" src="https://cdn.orzzone.com/verybugs/bug-management.png" alt="">
                  <div class="paragraph" style="text-align: center;">附图1：Bug管理</div>
                  <img class="full-width" style="width:90%;" src="https://cdn.orzzone.com/verybugs/action-log-online.png" alt="">
                  <div class="paragraph" style="text-align: center;">附图2：行为日志在线查看</div>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第7页</div>
        <section class="box">
          <header class="box-header">
            <div>个人作品：二维/三维在线编辑器</div>
            <div><a href="https://www.veryhouses.com" target="_blank" rel="noopener noreferrer">www.veryhouses.com</a></div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <img class="full-width" style="width:76%;margin:0 auto;" src="https://cdn.orzzone.com/veryhouses/veryhouses-2d.png" alt="">
                <img class="full-width" style="width:76%;margin:15px auto 0;" src="https://cdn.orzzone.com/veryhouses/veryhouses-3d.png" alt="">
                <div class="list-item-desc">
                  <div class="paragraph">二维部分基于fabric.js实现。三维部分基于three.js实现。</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 二维工作台中，在简单平面图形的基础上,赋予其三维属性。</li>
                    <li class="list-item">* 二维工作台支持展示和编辑操作。</li>
                    <li class="list-item">* 三维工作台是对二维工作台中对象根据其属性进行的立体化展示。</li>
                    <li class="list-item">* 三维工作台目前仅支持展示，不支持编辑。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>

      <div class="page no-print">
        <div class="page-number">第8页</div>
        <section class="box">
          <header class="box-header">
            <div>个人作品：博客</div>
            <div><a href="https://www.orzzone.com" target="_blank" rel="noopener noreferrer">www.orzzone.com</a></div>
          </header>
          <article class="box-body">
            <ul class="vertical-list">
              <li class="list-item">
                <img class="full-width" src="https://cdn.orzzone.com/orzzone/orzzone-blog.png" alt="">
                <div class="list-item-desc">
                  <div class="paragraph">这是我的个人博客。博客写了<strong>15年</strong>，它不是技术博客，偶尔会有一些技术博文：</div>
                  <ul class="vertical-list pl-2 ft-small">
                    <li class="list-item">* 如何在老项目里推行ESLint代码风格检测：<a href="https://www.orzzone.com/eslint-check.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/eslint-check.html</a>。</li>
                    <li class="list-item">* webpack4项目优化实战：<a href="https://www.orzzone.com/webpack4-project-optimize-in-action.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/webpack4-project-optimize-in-action.html</a>。</li>
                    <li class="list-item">* 从零搭建一个前端项目：<a href="https://www.orzzone.com/start-frontend-project-from-scratch.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/start-frontend-project-from-scratch.html</a>。</li>
                    <li class="list-item">* Element-UI中Select下拉框组件添加虚拟列表：<a href="https://www.orzzone.com/element-ui-select-virtual-list.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/element-ui-select-virtual-list.html</a>。</li>
                    <li class="list-item">* 编译要1小时的Webpack项目优化思路和条件编译方案：<a href="https://www.orzzone.com/webpack-conditional-compile.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/webpack-conditional-compile.html</a>。</li>
                    <li class="list-item">* 浅谈混合APP中H5页面的缓存处理：<a href="https://www.orzzone.com/cache-control-in-hybrid-app.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/cache-control-in-hybrid-app.html</a>。</li>
                    <li class="list-item">* 编写vite插件实现项目内置组件库中组件名的自动生成。</li>
                    <li class="list-item">* 编写vite插件实现在编译产物中集成编译时间和tag/分支信息，便于确认各环境的代码版本。</li>
                    <li class="list-item">* 按钮点击回调的节流处理：<a href="https://www.orzzone.com/button-throttle-in-action.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/button-throttle-in-action.html</a>。</li>
                    <li class="list-item">* Vue防快速连击指令&权限指令的坑：<a href="https://www.orzzone.com/vue-directive.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/vue-directive.html</a>。</li>
                    <li class="list-item">* 公共请求的封装：<a href="https://www.orzzone.com/ajax-utilities.html" target="_blank" rel="noopener noreferrer">https://www.orzzone.com/ajax-utilities.html</a>。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const details = [
  [
    '手机/微信：',
    '<a href="tel:13761556817" rel="nofollow noopener noreferrer">137-6155-6817</a>',
  ],
  [
    '邮箱：',
    '<a href="mailto:yakima.public@gmail.com?subject=from www.orzzone.com/cv" rel="nofollow noopener noreferrer">yakima.public@gmail.com</a>',
  ],
  ['行业：', '制药、建筑 BIM、互联网金融（基金）'],
  ['全栈偏前端：', '<strong>Node、MySQL、Vue/React</strong>'],
]
</script>

<style lang="scss">
.page-wrapper.cv {
  background-color: #f5f5d5;
}
@media print {
  .page-wrapper.cv {
    overflow-y: visible;
  }
}
</style>

<style lang="scss" scoped>
.page-resume {
  height: 100%;
  color: #000000;
  line-height: 1.5;
  background: transparent scroll repeat center center;
  font-size: 12pt;
  font-family: -apple-system,BlinkMacSystemFont,"Microsoft Yahei",Roboto,"Helvetica Neue",Arial,sans-serif,Tahoma,serif;
  font-weight: 400;

  p {
    text-indent: 2em;
    margin: 6pt 0;
  }

  .small {
    text-decoration: none;
    color: #333333;
  }

  .pages {
    padding: 50px 0;
  }

  // A4纸规格尺寸：210mm×297mm
  .page {
    display: block;
    position: relative;
    z-index: 0;
    width: 190mm;
    height: 277mm;
    padding: 10mm;
    margin: 0 auto;
    box-sizing: content-box;
    border-radius: 0;
    background-color: #ffffff;
    overflow: hidden;
    page-break-after: always;
    border: 0.75pt solid #666666;
    &.english {
      $baseFontSize: 10pt;
      font-size: $baseFontSize;
      .profile-desc {
        span {
          font-size: $baseFontSize;
        }
      }
      .box {
        .box-header {
          font-size: $baseFontSize * 1.5;
        }
        .box-body {
          .list-item-header {
            font-size: $baseFontSize;
            .tag {
              font-size: $baseFontSize - 1pt;
            }
          }
          .list-item {
            font-size: $baseFontSize;
            line-height: 1.9;
            .icon-npm {
              height: $baseFontSize * 2;
            }
            a {
              font-size: $baseFontSize;
            }
          }
        }
      }
    }
    &:nth-of-type(n + 2) {
      margin-top: 20px;
    }
    .page-number {
      position: absolute;
      z-index: 1;
      top: 8pt;
      right: 1pt;
      font-size: 10pt;
      transform-origin: center center;
      transform: rotate(45deg);
    }
  }

  .profile-header {
    .header-title {
      display: block;
      text-align: center;
      font-size: 20pt;
      font-weight: normal;
      line-height: 20pt;
    }
    .header-details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      border: 0.75pt dashed #000000;
      padding: 6pt;
      line-height: 1.8;
      margin-top: 12pt;
      .detail {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        width: 50%;
        .detail-title {
          font-weight: 400;
        }
      }
    }
  }

  .profile-desc {
    display: block;
    margin-top: 10pt;
    font-size: 0;
    span {
      font-size: 12pt;
      font-weight: 400;
    }
    strong {
      font-size: 1em;
      font-weight: 600;
    }
    .paragraph {
      margin: 6pt 0;
    }
  }

  .box {
    margin-top: 8pt;
    .box-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      font-size: 18pt;
      line-height: 1.8;
      border-bottom: 0.75pt dashed #000000;
    }
    .box-body {
      margin-top: 12pt;
      .vertical-list {
        display: block;
        &.margin-items {
          & > .list-item {
            &:nth-of-type(n + 2) {
              margin-top: 3pt;
            }
          }
        }
      }
      .list-item {
        display: block;
        width: 100%;
        font-size: 12pt;
        line-height: 22pt;
        &.flex {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3px;
          font-size: 11pt;
        }
        a {
          font-size: 1em;
          text-decoration: underline;
        }
        .icon-npm {
          display: block;
          width: auto;
          height: 22pt;
        }
      }
      .list-item-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 13pt;
        .position {
          display: inline;
          //text-decoration: underline;
        }
        & > div {
          &:nth-of-type(1) {
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            gap: 3px;
            img {
              display: block;
              height: 18pt;
            }
          }
        }
        .tag {
          display: inline-block;
          vertical-align: middle;
          border: 1px solid #666666;
          border-radius: 3px;
          font-size: 10pt;
          padding: 1px 2px 1px;
          line-height: 1.5;
          margin-left: 3pt;
          a {
            text-decoration: none;
          }
        }
      }
      .list-item-body {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 6pt;
      }
      .list-item-desc {
      }
      .full-width {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
      }
      .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .one-fourth-width {
        width: 25%;
      }
      .paragraph {
        margin: 0.8em 0;
      }
      .pl-2 {
        padding-left: 2em;
      }
      .ft-small {
        font-size: 6pt;
      }
      strong {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }

  .btn-print {
    position: fixed;
    z-index: 1;
    top: 6px;
    right: -35px;
    font-size: 14px;
    color: #ff0000;
    height: 40px;
    line-height: 40px;
    width: 120px;
    border-radius: 0%;
    text-align: center;
    border: 1px solid #ff0000;
    box-sizing: content-box;
    user-select: none;
    cursor: pointer;
    transform: rotate(45deg);
    transform-origin: center center;
  }

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    .pages {
      padding: 0;
    }
    .page {
      border-style: none;
      &:nth-of-type(n + 2) {
        margin-top: 0;
      }
    }
    .no-print {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    .btn-print {
      display:none;
    }
    .pages {
      padding: 20px 0;
    }
    .page {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: .2rem;
      border-left-style: none;
      border-right-style: none;
      .page-number {
        top: .16rem;
        right: .02rem;
        font-size: .08rem;
      }
    }
    .profile-header {
      .header-title {
        font-size: .4rem;
      }
      .header-details {
        padding: .12rem;
        margin-top: .24rem;
        .detail {
          width: 100%;
          font-size: .24rem;
        }
      }
    }

    .profile-desc {
      margin-top: .2rem;
      span {
        font-size: .24rem;
      }
      strong {
        font-size: .36rem;
      }
    }

    .box {
      margin-top: .16rem;
      .box-header {
        font-size: .24rem;
        display: block;
        div {
          &:nth-of-type(1) {
            font-weight: bold;
          }
        }
      }
      .box-body {
        margin-top: .24rem;
        .vertical-list {
          &.margin-items {
            & > .list-item {
              &:nth-of-type(n + 2) {
                margin-top: .12rem;
              }
            }
          }
        }
        .list-item {
          font-size: .24rem;
        }
        .list-item-header {
          font-size: .24rem;
          display: block;
          div {
            &:nth-of-type(1) {
              font-weight: bold;
            }
            &:nth-of-type(2) {
              font-size: .22rem;
            }
          }
        }
        .ft-small {
          font-size: .12rem;
        }
      }
    }
  }
}
</style>
