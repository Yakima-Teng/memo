<template>
  <ul class="desc-list" :style="{ 'list-style-type': type || 'decimal' }">
    <slot name="default" />
  </ul>
</template>

<script lang="ts" setup>
interface IProps {
  type?: string;
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.desc-list {
  display: block;
  font-size: 11pt;
  margin-left: 1em;
  line-height: 1.8;
  :deep(li) {
    list-style-type: decimal;
    &.space-between {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:before {
        content: '*';
        position: absolute;
        top: 0.2em;
        left: -1em;
      }
    }
  }
}
</style>
