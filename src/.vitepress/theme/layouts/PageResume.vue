<template>
  <div class="page-resume">
    <div v-if="false" class="select-resume no-print">
      <div class="label">请选择简历版本：</div>
      <div class="radios">
        <div
          v-for="item in editionList"
          :key="item.value"
          :class="['radio', { active: edition === item.value }]"
          @click="setEdition(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="btn-print no-print" @click="toPrint">A4纸打印</div>

    <div v-show="edition === 'fullstack'" class="pages">
      <PageContainer>
        <ResumeTitle title="滕运锋的简历（前端负责人、中级 Node.js 后端）" />
        <MetaTable />
        <SectionBox>
          <template #headerLeft>个人简介</template>
          <DescBlock>
            <span>8 年前端开发经验，<strong>5 年团队管理/技术带队经验，有丰富的工程化和项目架构/重构经验</strong>。在混合 APP 开发、性能优化、构建工具定制化上有丰富的落地经验。</span>
            <span>经常阅读英文技术书籍和浏览 GitHub。</span>
            <span>自学能力强，读书时有跳级、保送经历。上海市重点产业领域人才专项奖励获得者。</span>
          </DescBlock>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>工作经历</template>
          <template v-if="false" #headerRight>* 毕业后头 2 年从事药学相关工作，与 IT 无关，列于此处仅出于完整性考虑</template>
          <template #headerRight>* 毕业后头 2 年从事药学相关工作，与 IT 无关，未列于下表</template>
          <WorkExperience filter-keyword="IT" :show-desc="false" />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>前端项目经历</template>
          <template v-if="false" #headerRight>有 3 个维护时长超过 2 年的项目，这里选了最近的 2 个，忽略了微信公众号项目</template>
          <template v-if="false" #headerRight>关于 Node.js：在公司做的比较简单（带数学公式的网页截图、聊天、Excel 导出等），建议看个人项目部分</template>
          <template #headerRight>* 选了 2 个维护时间比较久的项目，其他如微信公众号、uni-app 开发的小程序/APP 等也有涉猎</template>
          <ProjectExperience />
        </SectionBox>
      </PageContainer>

      <PageContainer>
        <SectionBox>
          <template #headerLeft>后端项目经历</template>
          <template v-if="false" #headerRight>有丰富的运维部署经验（本人有 5 台服务器，20 多个域名，大学期间就有自己部署的独立博客了）</template>
          <template #headerRight>个人开发的全栈项目，已上线一年</template>
          <PersonalProject />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>Canvas/Fabric.js/Three.js 项目经历</template>
          <template v-if="false" #headerRight>有丰富的运维部署经验（本人有 5 台服务器，20 多个域名，大学期间就有自己部署的独立博客了）</template>
          <template #headerRight>个人开发的全栈项目，持续迭代中</template>
          <CanvaslProject />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>开源项目 | Github</template>
          <template #headerRight><a href="https://github.com/Yakima-Teng" target="_blank">https://github.com/Yakima-Teng</a></template>
          <OpenSource />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>教育经历</template>
          <EducationExperience :show-desc="false" />
        </SectionBox>
      </PageContainer>
    </div>

    <div v-show="edition === 'ra'" class="pages">
      <PageContainer>
        <ResumeTitle title="滕运锋的简历（国际药品注册）" />
        <RAMetaTable />
        <SectionBox>
          <template #headerLeft>个人简介</template>
          <DescBlock>
            <span>2 年国际药品注册工作经验。</span>
            <span>熟悉药政法规（如 ICH Q7 指南等），可以<strong>非常熟练地撰写 CTD、DMF 文档</strong>。</span>
            <span><strong>有 FDA、WHO 等药政机构的多个药品成功申报经验</strong>（化药 API），有 <strong>多次 FDA 现场审计经验</strong>。</span>
            <span>拥有很好的全局意识，熟悉研发、质量研究（QR）、QA、QC、车间、仓库、销售、财务、公证处等部门/机构组成的工作链。</span>
            <span>自学能力强，读书时有跳级、保送经历，经常阅读英文书籍。上海市重点产业领域人才专项奖励获得者。</span>
          </DescBlock>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>教育经历</template>
          <EducationExperience show-desc />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>工作经历</template>
          <template #headerRight>* 毕业 2 年后从事 IT 相关工作，列于此处仅出于完整性考虑</template>
          <RAWorkExperience />
        </SectionBox>
        <SectionBox>
          <template #headerLeft>个人项目</template>
          TODO：计划开发一个药品注册网站，和一个部署于企业内部支持药品注册工作的 PC 客户端（套 Web 页面）。备注：需要了解一下最新的药政法规对于电子资料的规定。
        </SectionBox>
      </PageContainer>
    </div>

    <div v-show="edition === 'project'" class="pages">
      <PageContainer>
        <SectionBox>
          <template #headerLeft>欢迎来访！</template>
          <div>如果您看到了这个页面，很可能是通过简历上的链接跳转过来的。说明您可能对我的简历比较感兴趣。所以特意准备了这个页面 —— 从下一页开始，可以查看各个项目的一些详细介绍。</div>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>期望的工作氛围等</template>
          <DescList>
            <li>离家越近加分越多（靠近浦东周浦康桥版块）。</li>
            <li>离家近的公司，可以接受薪资适度低一点，但作为交换，不限制非工作时间内个人从事商业经营活动。</li>
            <li>非高薪情况下，主要工作内容是做好自己的业务迭代 + 消化部门 KPI 任务 + 对团队提供技术支持，原则上不担任管理角色，也不接受很卷的岗位（这么说并不表示我是躺平的人，我本身编程上偏极客风格，有较强的洁癖，为了让项目架构更适合工程迭代，上班时间不够我就会用个人时间去做优化，简言之就是你不给我时间去优化代码，强迫症也会迫使我创造条件去优化）。</li>
            <li>不要问我期望薪资，我感觉现在这个行情下我拿不到期望薪资，先尽量在离家近点的地方苟着。</li>
            <li>若公司有多个互联网产品，希望是主要参与核心产品，不接受主要参与边缘产品的岗位。</li>
            <li>本轮正式找工作，计划从 3 月初找到 4 月底。如果公司发出正式 offer，至少给我一周时间决定是否接受。</li>
            <li>不考虑游戏公司、外包公司、没有自己产品的公司、区块链公司。</li>
            <li>不当小工兵（大厂也不干，打脸一下 —— 离家近的话可以当小工兵）。</li>
            <li>互相尊重。我理解现在招聘市场很偏招聘方，但是希望面试前有粗略看过我的简历，面试沟通时平易近人。</li>
            <li>喜欢小而美的团队，最好 C9 或者有钻研精神和工匠精神的同事多一些。</li>
            <li>项目最好复杂一点。判断项目是否复杂，可以直接看贵司现有开发团队出 bug 的频次高不高。复杂不是目的，首先项目本身要有价值。</li>
            <li>IT部门氛围健康，不要有太多内耗。</li>
          </DescList>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>不如交个朋友？</template>
          <DescList>
            <li>如果你有产品、设计、算法、营销推广经验，或者学校背景好或者为博士学历，或者有一定的钻研精神和工匠精神，并且又住得离周浦比较近，欢迎加我微信，平时可以一起打打羽毛球，先交朋友。</li>
            <li>我在社交上的爱好基本只剩羽毛球了，所以最好就是住在附近的，可以一起去周浦体育中心打球，很少有互动的话很难交上朋友。或者也可以</li>
            <li>未来可以看看是否适合一起做点什么事。</li>
          </DescList>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>项目列表</template>
          <template #headerRight>当前页不计数，从下一页开始算第 1 页</template>
          <DescList>
            <li class="space-between"><span>筑绘通（在线 CAD）（工作中的项目）</span> <span>第 1 页</span></li>
            <li class="space-between"><span>叮咚买菜供应链管理系统（工作中的项目）</span> <span>第 2 页</span></li>
            <li class="space-between"><span>好买基金 APP（工作中的项目）</span> <span>第 3 ~ 4 页</span></li>
            <li class="space-between"><span>在线日志系统（个人项目）</span> <span>第 5 ~ 6 页</span></li>
            <li class="space-between"><span>二三维编辑器（个人项目）</span> <span>第 7 页</span></li>
            <li class="space-between"><span>个人博客（个人项目）</span> <span>第 8 页</span></li>
          </DescList>
        </SectionBox>
      </PageContainer>
      <PageResumeBackup />
    </div>

    <!-- 生物信息学 -->
    <div v-show="edition === 'near'" class="pages">
      <PageContainer>
        <ResumeTitle title="就近工作的规划" />
        <SectionBox>
          <template #headerLeft>就近工作的原因和可行性</template>
          <DescBlock>
            <span>不想浪费大量时间在通勤上（日积月累，时间很可观），自己住在周康中间，周边几十个园区，可行性很大。可以有更多个人时间用于成长和陪伴家人。</span>
          </DescBlock>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>周浦特点：生物医药产业已成规模且产学研可闭环 + 宜居</template>
          <DescList>
            <li>政策规划：张江科学城“一心两核”中的“南部科学创新核”，聚焦医学园区发展。</li>
            <li>产（产业）：已有很多生物医药公司。</li>
            <li>学（学校）：已有上海健康医学院（本科）。另有上海交通大学医学院浦东校区（985，2024年下半年竣工，2025年9月投入使用）。这两个学校都是有医学和药学相关专业的。</li>
            <li>研（科研机构）：已有上海健康医学院附属周浦医院（三乙医院）、复旦大学附属肿瘤医院浦东院区（三甲）/上海市质子重离子医院。另有上海交通大学附属上海儿童医学中心张江院区（三甲医院，2024年内启用）。</li>
            <li>娱（生活娱乐）：周浦体育中心（浦东南片地区最大的体育服务综合体）、万达广场（31.8万平方米）、小上海步行街、傅雷图书馆（浦东第二大图书馆）、周浦文化公园。</li>
            <li>行（交通）：18号线（周浦、繁荣路、沈梅路3个地铁站）、16号线（周浦东地铁站）。</li>
          </DescList>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>康桥特点：汽车零部件制造业已成规模 + 张江机器人谷 + 比周浦更多的 IT 岗位</template>
          <DescList>
            <li>张江科学城范围内。</li>
            <li>康桥整体偏制造业（汽车零部件、张江机器人谷）。</li>
            <li>有比周浦更多的IT岗位。</li>
          </DescList>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>可能可以进入的岗位</template>
          <DescList>
            <li>生物信息分析师（待调研，目前看本科可进入，博士主要为一些经理岗，大部分为硕士，说明门槛不高）</li>
            <li>国际药品注册（可达成，自己有国外知名药政机构的成功注册经验和现场审计经验，药学本科学历非常够用，最多硕士，经理岗更看经验。需要概览下目前的国外药政法规，最下补一下英语口语。）</li>
            <li>制造业IT部门（可达成，最好先转 Java（非必要条件））</li>
            <li>互联网公司（尽量不考虑，太轻资产了，不如自己干）</li>
          </DescList>
        </SectionBox>
        <SectionBox>
          <template #headerLeft>自身特点</template>
          <DescList>
            <li>在找 IT 工作时，学校处于劣势，优先级在985、211之后，自己专业也不对口。</li>
            <li>在找 药学工作时，学校有优势，现在可能落后一些了，但优先级至少可以排在211之前，专业上也更对口。</li>
            <li>契合方向：结合药学与编程的交叉工作，且有一定门槛。</li>
            <li>个性不喜欢做太简单的项目，喜欢有难度且长期迭代维护的项目，必须是公司核心业务。</li>
            <li>喜欢自学感兴趣的东西，但也承认会有很多有形无形的行业门槛、学历鄙视链的存在。</li>
          </DescList>
        </SectionBox>
      </PageContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vitepress";

import ResumeTitle from "../components/resume/ResumeTitle.vue";
import DescBlock from "../components/resume/DescBlock.vue";
import MetaTable from "../components/resume/MetaTable.vue";
import SectionBox from "../components/resume/SectionBox.vue";
import WorkExperience from "../components/resume/WorkExperience.vue";
import PageContainer from "../components/resume/PageContainer.vue";
import ProjectExperience from "../components/resume/ProjectExperience.vue";
import EducationExperience from "../components/resume/EducationExperience.vue";
import PersonalProject from "../components/resume/PersonalProject.vue";
import OpenSource from "../components/resume/OpenSource.vue";
import RAMetaTable from "../components/resume/RAMetaTable.vue";
import RAWorkExperience from "../components/resume/RAWorkExperience.vue";
import PageResumeBackup from "../components/resume-detail/PageResumeBackup.vue";
import DescList from "../components/resume/DescList.vue";
import CanvaslProject from "../components/resume/CanvaslProject.vue";

const route = useRoute()
const edition = ref('')
const editionList = [
  { value: 'fullstack', label: '前后端工程师' },
  // { value: 'project', label: '工作期望、项目详情等' },
  // { value: 'ra', label: '国际药品注册' },
  // { value: 'near', label: '就近工作的规划' }
]

const localStorageKey = 'page-resume-edition'
const setEdition = (targetEdition: string) =>{
  if (!editionList.some((d) => d.value === targetEdition)) {
    targetEdition = editionList[0].value
  }

  const urlSearchParams = new URLSearchParams(location.search)
  const urlEdition = urlSearchParams.get('edition')
  if (urlEdition !== targetEdition) {
    location.replace(`${location.origin}${location.pathname}?edition=${targetEdition}`)
    return
  }

  edition.value = targetEdition
  localStorage.setItem(localStorageKey, targetEdition)
}

const toPrint = () => {
  window.print()
}

onBeforeUnmount(() => {
  const html = document.querySelector('html')
  if (html) {
    html.classList.remove('global-background-color')
  }
})
onMounted(() => {
  const html = document.querySelector('html')
  if (html) {
    html.classList.add('global-background-color')
  }

  // 优先取url上的参数（覆盖本地参数）
  const urlEdition = new URLSearchParams(location.search).get('edition')
  if (urlEdition) {
    setEdition(urlEdition)
    return
  }

  const localVal = localStorage.getItem(localStorageKey)
  if (localVal) {
    setEdition(localVal)
    return
  }

  setEdition(editionList[0].value)
})
</script>

<style lang="scss">
html.global-background-color {
  background-color: #464646;
  body {
    background-color: inherit;
  }
}
@media print {
  .page-wrapper.cv {
    overflow-y: visible;
  }
}
</style>

<style lang="scss" scoped>
.page-resume {
  color: #000000;
  line-height: 1.5;
  font-size: 12pt;
  font-family: "Microsoft Yahei",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,sans-serif,Tahoma,serif;
  font-weight: 400;
  background-color: #464646;

  .select-resume {
    position: fixed;
    top: 6pt;
    left: 6pt;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0;
    z-index: 1;
    background-color: #f5f5d5;
    border: 1px solid #000000;
    padding: 2pt;
    .label {
      display: block;
      font-size: 10pt;
      color: #000000;
    }
    .radios {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 3pt;
      .radio {
        padding: 0 2pt;
        width: auto;
        background-color: transparent;
        color: #000000;
        user-select: none;
        cursor: pointer;
        font-size: 10pt;
        border: 1px solid #000000;
        &.active {
          background-color: rgba(0, 0, 0, .3);
        }
      }
    }
  }

  .pages {
    padding: 50px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
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
    border-radius: 0;
    text-align: center;
    border: 1px solid #ff0000;
    box-sizing: content-box;
    user-select: none;
    cursor: pointer;
    transform: rotate(45deg);
    transform-origin: center center;
    background-color: #ffffff;
  }

  @page {
    size: A4;
    margin: 10mm;
  }

  @media print {
    .pages {
      padding: 0;
      gap: 0;
    }
    .page-container {
      border-style: none;
      padding: 0;
    }
    .no-print {
      display: none;
    }
  }
}
</style>
