<template>
  <div class="h-[28px] w-[28px]">
    <img
      v-if="icon == 'folder'"
      class="h-[28px] w-[28px]"
      src="@/assets/file/files.png"
    />
    <img
      v-else-if="icon == 'text'"
      class="h-[25px] w-[27px] p-[1px]"
      src="@/assets/file/file-type-text.svg"
    />
    <img
      v-else-if="icon == 'docx'"
      class="h-[28px] w-[28px]"
      src="@/assets/file/doc.png@2x.png"
    />

    <img
      v-else-if="icon == 'pdf'"
      class="h-[28px] w-[28px]"
      src="@/assets/file/pdf.png@2x.png"
    />
    <img
      v-else-if="icon == 'image'"
      class="h-[25px] w-[25px] p-[1px] pl-[4px]"
      src="@/assets/file/file-type-image.svg"
    />

    <img
      v-else-if="icon == 'xls'"
      class="h-[24px] w-[28px] p-[1px]"
      src="@/assets/file/file-type-xls.svg"
    />

    <img
      v-else-if="icon == 'xlsx'"
      class="h-[24px] w-[28px] p-[1px]"
      src="@/assets/file/file-type-xlsx.svg"
    />
    <img
      v-else
      class="h-[24px] w-[28px] p-[1px]"
      src="@/assets/file/file-type-file.svg"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<style lang="less" scoped></style>
