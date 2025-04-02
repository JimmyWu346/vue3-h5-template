<template>
  <p
    ref="container"
    class="flex items-center min-h-[16px]"
    :class="{ 'items-baseline': isWrapped }"
  >
    <span class="title text-[#646a73ff] text-[11px] whitespace-nowrap">
      {{ title + "：" }}
    </span>

    <span
      v-if="isContentContainsStars(content)"
      ref="contentSpan"
      :class="textClass"
    >
      {{ content || "-" }}
    </span>

    <span v-else ref="contentSpan" :class="textClass">
      {{ content || "-" }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";

const props = defineProps<{
  title: string;
  content: string | number | null | undefined;
  noTruncate?: boolean;
}>();

// 动态计算 textClass
const textClass = computed(() => [
  "text-[12px] text-[#1f2329ff] ml-[-4px]",
  isContentContainsStars(props.content) ? "mt-[6px]" : "mt-[0.7px]",
  !props.noTruncate ? "truncate" : ""
]);

// 判断内容是否包含 '****'
function isContentContainsStars(
  content: string | number | null | undefined
): boolean {
  if (typeof content === "string") {
    return content.indexOf("****") !== -1;
  }
  return false;
}

// 获取 DOM 元素
const container = ref<HTMLElement | null>(null);
const contentSpan = ref<HTMLElement | null>(null);

// 记录是否换行
const isWrapped = ref(false);

// 检测换行函数
const checkWrap = () => {
  if (contentSpan.value) {
    const span = contentSpan.value;
    const lineHeight = parseFloat(getComputedStyle(span).lineHeight);
    const height = span.offsetHeight;

    // 如果高度大于一行的高度，说明有换行
    isWrapped.value = height > lineHeight * 1.2; // 1.2 是容差，防止误判
  }
};

// 在组件挂载后检测换行
onMounted(() => {
  checkWrap();
});

// 监听 content 和 noTruncate 变化，重新检测换行
watch(
  () => [props.content, props.noTruncate],
  () => {
    // 使用 nextTick 确保 DOM 更新后再检测
    nextTick(() => {
      checkWrap();
    });
  }
);

// 监听窗口大小变化（可选，处理响应式布局）
const onResize = () => {
  checkWrap();
};
onMounted(() => {
  window.addEventListener("resize", onResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style scoped>
.items-baseline {
  align-items: baseline;
}
</style>
