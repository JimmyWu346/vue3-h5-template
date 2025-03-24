<template>
  <div class="relative main-container">
    <!-- 顶部背景 -->
    <img src="@/assets/bg2.jpg" class="w-full h-[333px]" />
    <!-- 主体内容 -->
    <div class="absolute top-5 w-full px-[15px]">
      <p class="text-lg font-bold">{{ userStore.userInfo.fullName }}</p>
      <p class="text-xs font-normal text-color-[#646A73] mt-1 text-[#646A73]">
        {{ userStore.userInfo.email }}
      </p>
      <!-- 切换语言 -->
      <div
        class="flex justify-between px-5 py-3 bg-white rounded-md mt-8"
        @click="toggleLanguage"
      >
        <span>語言 / Language</span>
        <span class="text-[#A6A6A6]">{{ $t("languageNow") }}</span>
      </div>
      <!-- 按钮 -->
      <div class="space-y-[21px] px-5 mt-[168px]">
        <van-button
          type="primary"
          block
          class="btn-submit"
          color="white"
          @click="handleLogout"
        >
          {{ $t("logout") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user-info";
import { showToast } from "vant";
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

onMounted(() => {
  document.body.style.backgroundColor = "#f7f8f9"; // 当前页面背景色
});

const { t } = useI18n();

const router = useRouter();
const userStore = useUserStore();

// 切换语言
const toggleLanguage = () => {
  const value = userStore.i18nLocale === "zh" ? "en" : "zh";
  userStore.setLocal(value);
};

const handleLogout = async () => {
  await userStore.LogOut({});
  showToast(t("showSuccessToast"));
  router.push("/Login");
};
</script>

<style lang="less" scoped>
:root {
  --van-field-input-text-color: #333;
  --van-button-primary-background-color: #ff5722;
}

.main-container {
  background-color: var(--color-background-2);
}

.welcome__text {
  /** 文本1 */
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 30.18px;
  color: rgba(100, 106, 115, 1);
  text-align: left;
  vertical-align: top;
}

.login-input {
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  border: 1.5px solid rgba(208, 211, 213, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-submit {
  border-radius: 6px;
  margin-top: 31px !important;
  height: 53.5px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 24.7px;
  color: black !important;
  text-align: left;
  vertical-align: top;
}
</style>
