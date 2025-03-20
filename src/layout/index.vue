<script setup lang="ts">
import tabbar from "@/components/tabbar/index.vue";
import NavBar from "@/components/nav-bar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import { useDarkMode } from "@/composables/useToggleDarkMode";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"; // 导入 useRoute

// const cachedViews = computed(() => {
//   return useCachedViewStoreHook().cachedViewList;
// });

const route = useRoute();

// 计算属性：根据路由 meta 判断是否显示 NavBar
const showNavBar = computed(() => {
  return route.meta.hideNavBar ?? true; // 默认值为 true，如果 meta 中未定义
});

const showTabbar = computed(() => {
  return !route.meta.hiddenTabbar; // 默认值为 true，如果 meta 中未定义
});
console.log("🚀 ~ showTabbar ~ showTabbar:", route.meta.hiddenTabbar);
// 要缓存的视图名称列表
const cachedViews = ref(["Home"]);
// const cachedViews = ref([""]);
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <nav-bar v-show="showNavBar" />
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar v-show="showTabbar" />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
