<template>
  <div class="section-box">
    <div class="box-header">
      <div class="left">
        <slot name="headerLeft" />
      </div>
      <div class="right">
        <slot name="headerRight" />
      </div>
    </div>
    <div class="box-body">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.section-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-top: 6pt;
  .box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: 13pt;
    font-weight: normal;
    line-height: 1.8;
    border-bottom: 0.75pt dashed #000000;
    width: 100%;
    .left {
      font-weight: bold;
    }
    .right {
      font-size: 9pt;
    }
  }
  .box-body {
    margin-top: 12pt;
    width: 100%;
  }
}
</style>
