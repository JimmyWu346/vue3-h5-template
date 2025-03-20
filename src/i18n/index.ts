import { createI18n } from "vue-i18n";
import en from "./lang/en";
import zh from "./lang/zh";
import { useUserStore } from "@/store/modules/user-info"; // 引入 store
import { nextTick } from "vue"; // 导入 nextTick

// 导入语言包
const messages = {
  zh,
  en
};

// 默认语言
const defaultLocale = localStorage.getItem("app-locale") || "zh";

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: defaultLocale, // 设置默认语言
  fallbackLocale: "en", // 设置备用语言
  messages // 设置语言包
});

// 在 i18n 初始化后调用 userStore.setLocal 设置语言
// 确保在应用加载完成后初始化 store
// 在 i18n 初始化后调用 userStore.setLocal 设置语言
nextTick(() => {
  const userStore = useUserStore();
  userStore.setLocal(defaultLocale as any); // 调用 store 的方法设置语言
});
