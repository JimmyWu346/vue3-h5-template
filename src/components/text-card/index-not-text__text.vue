<template>
  <p class="flex items-center h-[16px]">
    <span class="title text-[#646a73ff] text-[11px] whitespace-nowrap">
      {{ title + "：" }}
    </span>

    <span
      v-if="isContentContainsStars(content)"
      class="text-[12px] text-[#1f2329ff] ml-[-4px] mt-[6px] truncate"
    >
      {{ content || "-" }}
    </span>

    <span
      v-else
      class="text-[12px] text-[#1f2329ff] ml-[-4px] mt-[0.7px] truncate"
    >
      {{ content || "-" }}
    </span>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  content: string | number | null | undefined;
}>();

// 判断内容是否包含 '****'
function isContentContainsStars(
  content: string | number | null | undefined
): boolean {
  if (typeof content === "string") {
    return content.indexOf("****") !== -1;
  }
  return false;
}
</script>
