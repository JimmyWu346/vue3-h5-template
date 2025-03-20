import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cached-view";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { useUserStore } from "@/store/modules/user-info";
import { i18n } from "@/i18n"; // ✅ 使用全局 i18n 实例

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果 savedPosition 存在，表示是返回到前一个页面
    if (savedPosition) {
      return savedPosition;
    } else {
      // 默认每次切换到新页面时滚动到顶部
      return { top: 0 };
    }
  }
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}
router.beforeEach((to: toRouteType, from, next) => {
  // 获取 store 实例
  const userStore = useUserStore();

  NProgress.start();
  //  通过store判断是否有token，没有则跳转登录页
  if (to.name === "Login") {
    if (userStore.accessToken) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else if (!userStore.accessToken) {
    next({ name: "Login" });
  }

  // 路由缓存
  useCachedViewStoreHook().addCachedView(to);

  // 页面 title
  const translatedTitle = i18n.global.t(to.meta.title);
  setPageTitle(translatedTitle);

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
