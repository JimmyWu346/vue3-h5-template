import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "home",
          hideNavBar: false,
          cachedViews: true
        }
      },
      {
        path: "me",
        name: "Me",
        component: () => import("@/views/me/index.vue"),
        meta: {
          title: "me",
          hideNavBar: false,
          noCache: true
        }
      },
      {
        path: "detail",
        name: "Detail",
        component: () => import("@/views/detail/index.vue"),
        meta: {
          title: "detail",
          noCache: true,
          hiddenTabbar: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login.vue"),
    meta: {
      title: "登录",
      noCache: true
    }
  }
];

export default routes;
