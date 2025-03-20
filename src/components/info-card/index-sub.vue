<template>
  <div class="mt-[2px] w-full">
    <!-- 标题 -->
    <p class="font-normal text-[#333333] title">
      {{ title }}
    </p>
    <van-divider v-if="!noDivider" class="!mt-1 !mb-[10px]" />
    <!-- 内容插槽 -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  noDivider?: boolean;
}>();
</script>

<style lang="less" scoped>
.title {
  font-size: 13px;
}
</style>
