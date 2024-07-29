<template>
  <div class="component-refund-fee">
    <div class="table">
      <div class="table-title">退款说明</div>
      <div class="table-note">
        * 为减少鸽子行为，特制定以下规则。<br />
        * 鸽子费会在活动结束后计算最终费用前进行扣除。<br />
        * 每个人一开始有 10 只鸽子，每次报名会增加 1 只鸽子。
      </div>
      <el-table :data="tableDataRefundFee" border style="width: 100%;" size="small">
        <el-table-column prop="beforeDays" label="提前天数" align="center" width="100" />
        <el-table-column prop="refundFee" label="退款说明（报名送的鸽子会退回）" align="left">
          <template #default="scope">
            <div v-html="scope.row.refundFee" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tableDataRefundFee = [
  { beforeDays: '3天及以上', refundFee: '100%全额退款' },
  { beforeDays: '2天', refundFee: '退 70%，<br />或消耗 2 只鸽子退100%' },
  { beforeDays: '1天', refundFee: '退 50%，<br />或消耗 3 只鸽子退100%' },
  { beforeDays: '活动当天', refundFee: '不支持退款，<br />建议自己找人替' }
]
</script>

<style lang="scss" scoped>
.component-refund-fee {
  padding: 15px 0;
  .table {
    display: block;
    .table-title {
      display: block;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      line-height: 1.5;
      color: #ff0000;
    }
    .table-note {
      display: block;
      font-size: 12px;
      line-height: 1.8;
      padding: 15px 0;
    }
  }
}
</style>
