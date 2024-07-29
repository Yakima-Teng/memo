<template>
  <div class="work-experience">
    <div v-for="(item, idx) in list" :key="idx" class="item">
      <div class="item-header">
        <div class="left">
          <div class="duration">{{ item.duration }}</div>
          <a v-if="item.link" :href="item.link" class="firm-name" target="_blank">{{ item.firmName }}</a>
          <div v-else class="firm-name">{{ item.firmName }}</div>
          <div class="tags">
            <div v-for="(tag, tagIdx) in item.tags" :key="tagIdx" class="tag">{{ tag }}</div>
          </div>
        </div>
        <div class="right">{{ item.position }}</div>
      </div>
      <div v-if="showDesc" class="item-footer">
        <div
          v-for="(desc, descIdx) in item.descList"
          :key="descIdx"
          class="desc"
        >
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  filterKeyword: string
  showDesc: boolean
}
const props = defineProps<IProps>()

const list = [
  {
    duration: '2021-12 ~ 2024-01',
    firmName: '上海品览数据科技有限公司',
    link: 'https://www.pinlandata.com/',
    tags: ['创业', '高新', '专精特新'],
    position: '从 0 搭建团队 | 前端负责人',
    keywords: ['IT'],
    descList: [
      '从 0 到 1 搭建前端团队。将研发 bug 中前端 bug 占比从 30% 优化至 10%。',
      '获得2022年上海市重点产业领域人才专项奖励。'
    ],
  },
  {
    duration: '2021-07 ~ 2021-12',
    firmName: '上海壹佰米网络科技有限公司',
    link: 'https://www.100.me/',
    tags: ['上市', '高新'],
    position: '资深前端',
    keywords: ['IT'],
    descList: [
      '优化 Webpack 4项目，负责供应量管理系统中调拨业务的迭代。'
    ],
  },
  {
    duration: '2018-09 ~ 2021-07',
    firmName: '好买财富管理股份有限公司',
    link: 'https://www.howbuy.com/',
    tags: ['上市', '高新'],
    position: '技术带队 | 高级前端',
    keywords: ['IT'],
    descList: [
      '负责公司核心 APP 内交易类业务迭代，处理大部分产线问题。',
      '在团队内起到技术带队的作用，Webpack 3项目优化。'
    ],
  },
  {
    duration: '2015-12 ~ 2018-08',
    firmName: '北京无线天利移动信息技术股份有限公司上海分公司',
    tags: ['上市', '高新'],
    position: '初级前端',
    keywords: ['IT'],
    descList: [
      '独立开发和迭代（前端部分）车险比价投保微信公众号 + PC端 + 混合APP内H5部分。',
      '优秀员工。'
    ],
  },
  {
    duration: '2013-10 ~ 2015-07',
    firmName: '浙江普洛康裕制药有限公司',
    link: 'http://www.apeloa.com/',
    tags: ['上市', '国家高新', '医药工业企业 40 强'],
    position: '国际药品注册',
    keywords: [''],
    descListBackup: [
      '有 FDA、WHO 等国外药政机构的成功申报经验和现场审计经验。',
      '以英语作为主要书面工作语言。'
    ],
    descList: [
      '完成氧氟沙星、左氧氟沙星、盐酸金刚烷胺、伪麻黄碱等化药 API 的国外注册申报工作（FDA、WHO、PMDA、EDQM COS等）。协助子公司进行兽药原料药的国外注册申报工作。参与了左氧氟沙星制剂的乌克兰注册（离职前未办结，资料已提交，在等对方回复）。',
      '负责配合销售部处理海外客户的邮件问询。',
      '2 次参与 FDA 审计，1 次支援兄弟公司 FDA 审计。我的英文打字速度极快（专业级），在面对审计官需要的大量中文资料的英文版需要第二天提交审计的情况下，可以很好地和部门同事一起给力支持（是的，面对大量熟悉的内容时，不太需要动脑，打字速度影响挺大）。',
      '属于部门得力干将。日常工作串联了公司内部的研发、质量研究（QR）、QA、QC、车间、仓库、财务等部门，拥有很好的全局意识。经常借公章、营业执照复印件，经常去公证处（公证处的工作人员都认识我了）。参加过公司英文口语课（总部和子公司一共 6 个名额，除了我其他都是硕士学历）。离职转行 IT 后的头两年，曾先后遇到过：① 合作过的一家对外药品注册公司老板听说我离职后问我愿不愿意去他那边；② 国际注册部经理和我说深圳有个公司有注册经理岗位找他推荐，问我是否有意；③ 总部 QA 经理和我说新的子公司缺注册人员问我是否有意。',
      '工作之余积极参加公司各种活动，获得过羽毛球、气排球、篮球等的团体二/三等奖（均有照片留存）。',
    ],
  },
  {
    duration: '2013-07 ~ 2013-09',
    firmName: '浙江仙居君业药业有限公司',
    link: 'http://www.junyepharm.com/',
    tags: ['国家高新'],
    position: '质量管理',
    keywords: [''],
    descList: [
      '按照 GMP 要求，撰写、维护质量管理 SOP 文件。对车间进行例行检查，指出不符合 SOP 的地方并督促改正。支持车间 GMP 验证（国内）。'
    ],
  },
  {
    duration: '2013-10 ~ 2015-07',
    firmName: '浙江普洛康裕制药有限公司',
    link: 'http://www.apeloa.com/',
    tags: ['上市', '国家高新', '医药工业企业 40 强', '原料药出口第 2 位'],
    position: 'RA',
    keywords: ['pharmacy'],
    descListBackup: [
      '有 FDA、WHO 等国外药政机构的成功申报经验和现场审计经验。',
      '以英语作为主要书面工作语言。'
    ],
    descList: [
      '完成氧氟沙星、左氧氟沙星、盐酸金刚烷胺、伪麻黄碱等化药 API 的国外注册申报工作（FDA、WHO、PMDA、EDQM COS等）。协助子公司进行兽药原料药的国外注册申报工作。参与了左氧氟沙星制剂的乌克兰注册（离职前未办结，资料已提交，在等对方回复）。',
      '负责配合销售部处理海外客户的邮件问询。',
      '2 次参与 FDA 审计，1 次支援兄弟公司 FDA 审计。我的英文打字速度极快（专业级），在面对审计官需要的大量中文资料的英文版需要第二天提交审计的情况下，可以很好地和部门同事一起给力支持（是的，面对大量熟悉的内容时，不太需要动脑，打字速度影响挺大）。',
      '属于部门得力干将。日常工作串联了公司内部的研发、质量研究（QR）、QA、QC、车间、仓库、财务等部门，拥有很好的全局意识。经常借公章、营业执照复印件，经常去公证处（公证处的工作人员都认识我了）。参加过公司英文口语课（总部和子公司一共 6 个名额，除了我其他都是硕士学历）。离职转行 IT 后的头两年，曾先后遇到过：① 合作过的一家对外药品注册公司老板听说我离职后问我愿不愿意去他那边；② 国际注册部经理和我说深圳有个公司有注册经理岗位找他推荐，问我是否有意；③ 总部 QA 经理和我说新的子公司缺注册人员问我是否有意。',
      '工作之余积极参加公司各种活动，获得过羽毛球、气排球、篮球等的团体二/三等奖（均有照片留存）。',
    ],
  },
  {
    duration: '2013-07 ~ 2013-09',
    firmName: '浙江仙居君业药业有限公司',
    link: 'http://www.junyepharm.com/',
    tags: ['国家高新'],
    position: 'QA',
    keywords: ['pharmacy'],
    descList: [
      '按照 GMP 要求，撰写、维护质量管理 SOP 文件。对车间进行例行检查，指出不符合 SOP 的地方并督促改正。支持车间 GMP 验证（国内）。'
    ],
  },
].filter((item) => item.keywords.includes(props.filterKeyword))
</script>

<style lang="scss" scoped>
.work-experience {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 6pt;
  font-size: 11pt;
  .item {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 8pt;
    .item-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .left {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20pt;
        .duration {}
        .firm-name {
          font-weight: normal;
        }
        .tags {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: 3pt;
          margin-left: -16pt;
          .tag {
            font-size: 9pt;
            padding: 0 1pt;
            border: 1px solid #000000;
            color: #000000;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 11pt;
            overflow: hidden;
          }
        }
      }
      .right {
        font-weight: normal;
      }
    }
    .item-footer {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      margin-left: 2em;
      gap: 3pt;
      .desc {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
