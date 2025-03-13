import { createI18n } from "vue-i18n";
import en from "./lang/en";
import zh from "./lang/zh";

// 导入语言包
const messages = {
  zh,
  en
};

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: "zh", // 设置默认语言
  fallbackLocale: "en", // 设置备用语言
  messages // 设置语言包
});
