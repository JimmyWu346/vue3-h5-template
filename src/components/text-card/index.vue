<template>
  <div class="px-2 py-[9px] container">
    <!-- 标题 -->
    <van-text-ellipsis :content="title" class="title" />
    <!-- 内容 -->
    <van-text-ellipsis
      v-if="isRows"
      :content="content || '-'"
      class="content"
      :rows="5"
    />
    <van-text-ellipsis v-else :content="content || '-'" class="content" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  content: string;
  isRows?: boolean;
}>();
</script>

<style lang="less" scoped>
.container {
  border-radius: 4px;
  background: #f1f3f4;

  .title {
    font-size: 11px;
    font-weight: 400;
    color: #646a73ff;
  }
  .content {
    font-size: 12px;
    font-weight: 400;
    color: #1f2329ff;
  }
}
</style>
