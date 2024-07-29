<template>
  <div class="page-home">
    <SnowBalls v-if="false" />
    <div class="bg" />
    <div class="page-main">
      <div class="page-inner">
        <div class="page-title">{{ site.title }}</div>
        <div class="page-desc">
          <p class="paragraph"><span>滕运锋，1991年生人，老家浙江楠溪江。2022年和老婆领证并定居浦东。</span></p>
          <p class="paragraph">
            <span>读书时期有过跳级、保送经历。2013年本科毕业，药学专业。</span>
          </p>
          <p class="paragraph"><span>职业生涯初期从事国际药品注册工作，后自学转行IT，全栈偏前端。</span></p>
          <p class="paragraph">
            <span>看书、码字、打羽毛球，是我花时间的爱好。</span>
          </p>
        </div>
        <div class="card-list">
          <a
              v-for="(item, idx) in links"
              :key="idx"
              class="card"
              :href="item.link"
              :target="item.link.startsWith('http') ? '_blank' : '_self'"
          >
            <div v-if="item.tag" class="tag">{{ item.tag }}</div>
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <CustomLink class="small" url="https://beian.miit.gov.cn/" rel="nofollow noreferrer noopener" target="_blank">浙ICP备18053953号-1</CustomLink>.
      All rights reserved.
      <CustomLink class="small" url="https://www.orzzone.com/sitemap.xml">Sitemap</CustomLink>.
      <br />
      Friendly links:
      <CustomLink class="small" url="http://www.wikimoe.com/" rel="noopener" title="前平面设计师，前网页美工，现任前端设计师。" target="_blank">维基萌</CustomLink>、
      <CustomLink class="small" url="http://www.tipskill.com" rel="noopener" title="探索药学的奇迹" target="_blank">TipSkill药学博客</CustomLink>、
      <CustomLink class="small" url="https://blog.wy310.cn/" rel="noopener" title="记录、分享前端技术" target="_blank">大海爱奔跑</CustomLink>、
      <CustomLink class="small" url="https://www.verystores.com/" rel="noopener" target="_blank">人生小店</CustomLink>、
      <CustomLink class="small" url="https://www.cnblogs.com/minjay/" rel="noopener" target="_blank">minjay26</CustomLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

import SnowBalls from "../components/SnowBalls.vue";
import CustomLink from "../components/CustomLink.vue";

const { site } = useData()

const links = [
  // {
  //   link: 'https://www.verybugs.com',
  //   label: '日志监控'
  // },
  // {
  //   link: 'https://www.veryhouses.com',
  //   label: '三维设计',
  // },
  // {
  //   link: 'https://www.hitodos.com/',
  //   label: 'Hi备忘录',
  // },
  // {
  //   link: '/memo.html',
  //   label: '技术写作'
  // },
  // {
  //   link: '/blog.html',
  //   label: '个人博客'
  // },
  // {
  //   link: 'https://github.com/Yakima-Teng',
  //   label: '开源项目',
  //   // tag: '欢迎Star！'
  // },
  // {
  //   link: '/cv',
  //   label: '个人简历',
  //   tag: '找工作中！'
  // },
]

// const cardGroupList = [
//   {
//     name: '在线工具',
//     children: [
//
//
//       {
//         link: 'https://github.com/Yakima-Teng/simple-server',
//         label: '数据Mock',
//       },
//     ]
//   },
//   {
//     name: '开源项目',
//     children: [
//       {
//         link: 'https://www.verysystems.com/utils-daily',
//         label: 'utils-daily.js',
//       },
//       {
//         link: 'https://github.com/Yakima-Teng/html5-cli',
//         label: 'html5-cli',
//       },
//       {
//         link: 'https://github.com/Yakima-Teng/classic-cli',
//         label: 'classic-cli',
//       },
//       {
//         link: 'https://github.com/Yakima-Teng/IdeaPress',
//         label: 'IdeaPress',
//       },
//       {
//         link: 'https://www.verysystems.com/',
//         label: '非常系统',
//       },
//     ]
//   },
//   {
//     name: '内容阅读',
//     children: [
//       {
//         link: 'https://www.veryideas.com',
//         label: '语文课文',
//       },
//     ]
//   },
// ]
</script>

<style lang="scss">
.page-wrapper.home {
  background-color: #7b7c79;
  min-height: 100vh;
}
.page-home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.9);
  .bg {
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent url('https://cdn.orzzone.com/orzzone/mountain-cloud.jpg') scroll no-repeat center center;
    background-size: cover;
    pointer-events: none;
    animation: 3600ms ease-in-out infinite shining;
    opacity: 0.7;
    @keyframes shining {
      0% {
        opacity: 0.7;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0.7;
      }
    }
  }
  .page-main {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
    .page-inner {
      display: block;
      background-color: rgba(0, 0, 0, 0.6);
      font-size: 16px;
      color: #ffffff;
      padding: 30px;
      width: 61.8%;
      border-radius: 8px;
    }
    .page-title {
      display: block;
      text-align: center;
      font-size: 42px;
      line-height: 1.5;
    }
    .page-desc {
      display: block;
      font-size: 18px;
      line-height: 1.8;
      max-width: 99%;
      margin: 15px auto 0;
      text-indent: 2em;
      .paragraph {
        margin: 15px 0;
        font-size: 0;
        span {
          font-size: 18px;
        }
        a {
          font-size: 18px;
          border-bottom: 1px dashed #ffffff;
        }
      }
    }
    .card-list {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      gap: 8px;
      margin-top: 30px;
    }
    .card {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 50px;
      border: 1px solid rgba(200, 200, 200, 0.8);
      border-radius: 8px;
      box-sizing: border-box;
      .tag {
        position: absolute;
        z-index: 1;
        top: -20px;
        right: -20px;
        font-size: 14px;
        color: #ffffff;
        background-color: #ff0000;
        padding: 0 3px;
        line-height: 2;
        border-radius: 3px;
      }
    }
  }
  .page-footer {
    display: block;
    max-width: var(--site-width);
    padding: 0 30px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    color: #ffffff;
  }
}
@media screen and (max-width: 800px) {
  .page-home {
    .page-main {
      min-height: 100vh;
      .page-inner {
        width: 88%;
        font-size: 12px;
        border-radius: 6px;
        padding: 20px 15px;
      }
      .page-title {
        font-size: 18px;
      }
      .page-desc {
        font-size: 12px;
        line-height: 1.8;
        .paragraph {
          margin: 8px 0;
          span {
            font-size: 14px;
          }
        }
      }
      .card-list {
        margin-top: 30px;
        gap: 15px;
      }
      .card {
        width: 80px;
        height: 40px;
        border-radius: 6px;
      }
    }
    .page-footer {
      display: none;
    }
  }
}
</style>
