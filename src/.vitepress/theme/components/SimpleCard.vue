<template>
  <div class="simple-card">
    <div class="card-title">{{ title }}：</div>
    <ol class="card-details">
      <li v-for="(note, idx) in notes" :key="idx" class="detail">{{ note }}</li>
    </ol>
    <img v-if="cardImageUrl" :src="cardImageUrl" alt="" class="card-image">
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

interface IProps {
  title: string
  notes: string[]
  imageUrl?: string
}
const props = defineProps<IProps>()

const cardImageUrl = computed(() => {
  if (!props.imageUrl) {
    return ''
  }
  return withBase(props.imageUrl)
})
</script>

<style lang="scss" scoped>
.simple-card {
  display: block;
  padding: 16px 0;
  .card-title {
    display: block;
    line-height: 28px;
    margin: 16px 0;
  }
  .card-details {
    list-style: decimal;
    padding-left: 1.25rem;
    margin: 16px 0;
    .detail {
      display: list-item;
      text-align: -webkit-match-parent;
      &:nth-of-type(n + 2) {
        margin-top: 8px;
      }
    }
  }
  .card-image {
    display: block;
    max-width: 100%;
    height: auto;
  }
}
</style>
