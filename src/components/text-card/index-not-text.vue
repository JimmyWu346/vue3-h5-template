<template>
  <div class="px-[10px] py-[10px] container bg-[#f1f3f4]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  content: string;
}>();
</script>

<style lang="less" scoped>
.container {
  border-radius: 4px;
}
</style>
