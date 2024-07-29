<template>
  <a class="custom-link" :href="href">
    <slot name="default" />
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

interface IProps {
  url: string
}
const props = defineProps<IProps>()

const href = computed(() => {
  return withBase(props.url)
})
</script>

<style lang="scss">

</style>
