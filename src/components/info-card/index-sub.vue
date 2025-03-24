<template>
  <div class="mt-[2px] w-full">
    <!-- 标题 -->
    <p class="font-normal text-[#333333] title flex items-center text-[13px]">
      {{ title }}
      <slot name="title-right" />
    </p>
    <van-divider v-if="!noDivider" class="!mt-1 !mb-[10px]" />
    <!-- 内容插槽 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  noDivider?: boolean;
}>();
</script>

<style lang="less" scoped></style>
