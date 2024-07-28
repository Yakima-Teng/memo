<template>
  <div class="resume-title">{{ title }}</div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.resume-title {
  display: block;
  text-align: center;
  font-size: 20pt;
  font-weight: normal;
  line-height: 1.1;
  padding-bottom: 5pt;
}
</style>
