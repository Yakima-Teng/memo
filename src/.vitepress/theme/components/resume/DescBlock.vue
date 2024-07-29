<template>
  <div class="desc-block">
    <slot name="default" />
  </div>
</template>

<style lang="scss">
.desc-block {
  display: block;
  font-size: 0;
  width: 100%;
  * {
    font-size: 11pt;
    font-weight: 400;
    line-height: 1.8;
  }
  strong {
    font-weight: 600;
  }
  .paragraph {
    margin: 6pt 0;
  }
}
</style>
