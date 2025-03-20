<template>
  <p class="flex items-center h-[16px]">
    <span class="title text-[#646a73ff] text-[11px] whitespace-nowrap">
      {{ title + "：" }}
    </span>
    <span class="text-[12px] text-[#1f2329ff] ml-[-4px] mt-[0.7px] truncate">
      {{ content || "-" }}
    </span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  content: string | number;
}>();
</script>
