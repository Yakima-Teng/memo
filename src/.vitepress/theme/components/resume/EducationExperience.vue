<template>
  <div class="work-experience">
    <div v-for="(item, idx) in list" :key="idx" class="item">
      <div class="item-header">
        <div class="left">
          <div class="duration">{{ item.duration }}</div>
          <a v-if="item.link" :href="item.link" class="firm-name" target="_blank" v-html="item.firmName" />
          <div v-else class="firm-name" v-html="item.firmName" />
        </div>
        <div class="right">{{ item.position }}</div>
      </div>
      <div v-if="showDesc" class="item-footer">
        <div v-for="(desc, descIdx) in item.descList" :key="descIdx" class="desc">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  showDesc: boolean
}
defineProps<IProps>()

const list = [
  {
    duration: '2009-09 ~ 2013-07',
    firmName: '沈阳药科大学（<strong>Top5 药学院校、一本</strong>）',
    link: 'https://www.syphu.edu.cn/',
    position: '理学学士 | 药学(食品药学) | CET-6',
    descList: [
      '主要课程：药理学、药剂学、药物分析、药物化学、生物化学、人体解剖生理学、病理学、有机化学、分析化学、中药学、中医学基础、天然药物化学等。',
    ]
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
      }
      .right {
        font-weight: normal;
      }
    }
    .item-footer {
      display: block;
      margin-left: 121pt;
    }
  }
}
</style>
