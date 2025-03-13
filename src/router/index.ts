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

const router = createRouter({
  history: createWebHashHistory(),
  routes
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
  setPageTitle(to.meta.title);

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
