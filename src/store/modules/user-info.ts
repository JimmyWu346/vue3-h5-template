// src/store/modules/user.ts
import { defineStore } from "pinia";
import { loginByUsername, getUserInfo, logout } from "@/api/login"; // 你自己的接口路径
import { ref } from "vue";
import { i18n } from "@/i18n"; // 如果你有 i18n 实例
import { Locale } from "vant";
// 引入英文语言包
import enUS from "vant/es/locale/lang/en-US";

export const useUserStore = defineStore(
  "user-info",
  () => {
    // ✅ state
    const accessToken = ref<string>("");
    const refreshToken = ref<string>("");
    const userInfo = ref<any>(null);
    const roles = ref<string[]>([]);
    const roleNames = ref<string[]>([]);
    const permissions = ref<string[]>([]);
    const i18nLocale = ref(localStorage.getItem("app-locale") || "zh");

    function setLocal(locale: "zh" | "en") {
      i18nLocale.value = locale;
      i18n.global.locale.value = locale;
      localStorage.setItem("app-locale", locale);
      if (locale == "en") {
        Locale.use("en-US", enUS);
      } else {
        Locale.use("zh-CN");
      }
    }

    // ✅ actions
    async function loginByUsernameAction(userInfoPayload: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await loginByUsername(
            userInfoPayload.username,
            userInfoPayload.password,
            userInfoPayload.code,
            userInfoPayload.randomStr
          );
          const data = res.data;
          accessToken.value = data;
          refreshToken.value = data;
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }
    async function LogOut() {
      // 登出
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            clearLock();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    }

    async function getUserInfoAction() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getUserInfo();
          const data = res.data || {};
          userInfo.value = data.sysUser;
          roles.value = data.roles || [];
          roleNames.value = data.roleNames || [];
          permissions.value = data.permissions || [];
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }

    function clearLock() {
      userInfo.value = "";
      roles.value = [];
      roleNames.value = [];
      permissions.value = [];
      accessToken.value = "";
      refreshToken.value = "";
    }

    return {
      // state
      accessToken,
      refreshToken,
      userInfo,
      roles,
      roleNames,
      permissions,
      i18nLocale,

      // actions
      loginByUsernameAction,
      LogOut,
      getUserInfoAction,
      clearLock,

      setLocal
    };
  },
  {
    persist: true // 开启持久化
  }
);
