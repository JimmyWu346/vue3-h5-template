<script setup lang="ts">
import {
  useDarkMode,
  useToggleDarkMode
} from "@/composables/useToggleDarkMode";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const onClickRight = (event: TouchEvent | MouseEvent) => {
  useToggleDarkMode(event);
};

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === "zh" ? "en" : "zh";
};
</script>

<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight">
    <template #right>
      <!-- 语言切换按钮 -->
      <div class="flex items-center gap-4">
        <span class="cursor-pointer text-[14px]" @click.stop="toggleLanguage">
          {{ locale === "zh" ? "中" : "En" }}
        </span>
        <svg-icon
          class="text-[18px]"
          :name="useDarkMode() ? 'light' : 'dark'"
        />
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
