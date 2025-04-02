<template>
  <div class="pt-[15px] px-[12px] pb-[12px] info-container">
    <!-- 标题 -->
    <div class="flex items-center">
      <img v-if="icon" :src="icon" class="w-[22px] h-[22px]" />
      <span class="ml-[7px] font-normal text-[#333333] title">{{ title }}</span>
    </div>
    <van-divider v-if="!noDivider" class="!mt-[8px] !mb-[10px]" />
    <!-- 内容插槽 -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  noDivider?: boolean;
}>();
</script>

<style lang="less" scoped>
.info-container {
  width: 100%;
  opacity: 1;
  border-radius: 6.84px;
  background: #ffffff;
}

.title {
  font-size: 14px;
}
</style>
