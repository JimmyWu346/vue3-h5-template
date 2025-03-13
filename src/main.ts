import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
import { initializeDarkMode } from "@/utils/dark-mode";
// 导入 i18n 实例
import { i18n } from "./i18n";
import App from "./App.vue";
import router from "./router";

initializeDarkMode();

const app = createApp(App);
app.use(store);
app.use(router);
// 使用 i18n
app.use(i18n);

app.mount("#app");
