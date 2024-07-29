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
      <div v-if="item.descList.length > 0" class="item-footer">
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
const list = [
  {
    duration: '2021-12 ~ 2024-01',
    firmName: '上海品览数据科技有限公司',
    link: 'https://www.pinlandata.com/',
    tags: ['创业', '高新', '专精特新'],
    position: '从 0 搭建团队 | 前端组长',
    keywords: ['IT'],
    descList: [],
  },
  {
    duration: '2021-07 ~ 2021-12',
    firmName: '上海壹佰米网络科技有限公司',
    link: 'https://www.100.me/',
    tags: ['上市', '高新'],
    position: '资深前端',
    keywords: ['IT'],
    descList: [],
  },
  {
    duration: '2018-09 ~ 2021-07',
    firmName: '好买财富管理股份有限公司',
    link: 'https://www.howbuy.com/',
    tags: ['上市', '高新'],
    position: '技术带队 | 高级前端',
    keywords: ['IT'],
    descList: [],
  },
  {
    duration: '2015-12 ~ 2018-08',
    firmName: '北京无线天利移动信息技术股份有限公司上海分公司',
    tags: ['上市', '高新'],
    position: '优秀员工 | 初级前端',
    keywords: ['IT'],
    descList: [],
  },
  {
    duration: '2013-10 ~ 2015-07',
    firmName: '浙江普洛康裕制药有限公司',
    link: 'http://www.apeloa.com/',
    tags: ['上市', '国家高新', '医药工业企业 40 强'],
    position: '国际药品注册',
    keywords: ['IT'],
    descListBackup: [
      '有 FDA、WHO 等国外药政机构的成功申报经验和现场审计经验。',
      '以英语作为主要书面工作语言。'
    ],
    descList: [
      '完成氧氟沙星、左氧氟沙星、盐酸金刚烷胺、伪麻黄碱等化药 API 的国外注册申报工作（FDA、WHO、PMDA、EDQM COS等）。',
      '协助子公司进行兽药原料药的国外注册申报工作。',
      '参与了左氧氟沙星制剂的乌克兰注册（与俄罗斯注册类同）。',
      '负责配合销售部处理海外客户的邮件问询。',
      '2 次参与 FDA 现场审计，1 次支援兄弟公司 FDA 现场审计。',
      '工作之余获得过羽毛球、气排球、篮球等的团体二/三等奖。',
    ],
  },
  {
    duration: '2013-07 ~ 2013-09',
    firmName: '浙江仙居君业药业有限公司',
    link: 'http://www.junyepharm.com/',
    tags: ['国家高新'],
    position: '质量管理',
    keywords: ['IT'],
    descList: [
      '支持车间 GMP 验证（国内）。按照 GMP 要求，撰写、维护质量管理 SOP 文件。',
      '对车间进行例行检查，指出不符合 SOP 的地方并督促改正。',
    ],
  },
]
</script>

<style lang="scss" scoped>
.work-experience {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 8pt;
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
      margin-left: 121pt;
      gap: 6pt;
      .desc {
        display: block;
        width: 100%;
        line-height: 1.5;
      }
    }
  }
}
</style>
