<template>
  <div class="page-container">
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  // A4纸规格尺寸：210mm×297mm
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 6pt;
}
</style>
