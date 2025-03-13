// src/store/modules/user.ts
import { defineStore } from "pinia";
import { loginByUsername, getUserInfo } from "@/api/login"; // 你自己的接口路径
import { ref } from "vue";

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
    const drawerOpenIdArr = ref<any[]>([]);

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
          drawerOpenIdArr.value = [];
          resolve(data);
        } catch (err) {
          reject(err);
        }
      });
    }

    async function getUserInfoAction() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await getUserInfo();
          const data = res.data.data || {};
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
      // 原来 commit("CLEAR_LOCK") 的地方看逻辑需要做什么
    }

    return {
      // state
      accessToken,
      refreshToken,
      userInfo,
      roles,
      roleNames,
      permissions,
      drawerOpenIdArr,

      // actions
      loginByUsernameAction,
      getUserInfoAction,
      clearLock
    };
  },
  {
    persist: true // 开启持久化
  }
);
