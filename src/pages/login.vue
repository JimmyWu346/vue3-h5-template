<template>
  <div class="min-h-screen relative">
    <!-- 顶部背景 -->
    <img src="@/assets/bg.png" class="h-[198px]" />
    <!-- 主体内容 -->
    <div class="absolute top-[156px] w-full">
      <!-- welcome -->
      <div class="ml-[28px]">
        <img src="@/assets/login-welcome.png" class="w-[259px]" />
        <p class="text-gray-700 welcome__text">{{ $t("message.hello") }}</p>
      </div>
      <!-- Login Form -->
      <div class="space-y-[21px] px-5 mt-[55px]">
        <input
          v-model="username"
          type="text"
          :placeholder="$t('placeHolderUsername')"
          class="w-full px-4 py-3 border h-[53px] border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 login-input"
        />
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('placeHolderPwd')"
            class="w-full px-4 py-3 h-[53px] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 login-input"
          />
          <button
            aria-label="TogglePassword"
            type="button"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            @click="togglePassword"
          >
            <img
              v-show="showPassword"
              class="h-[17px] w-[17px]"
              src="@/assets/pwd-close.png"
            />
            <img
              v-show="!showPassword"
              class="h-[17px] w-[17px]"
              src="@/assets/pwd-view.png"
            />
          </button>
        </div>

        <van-button
          type="primary"
          block
          class="btn-submit"
          color="#ff5722"
          @click="handleLogin"
        >
          {{ $t("message.login") }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/modules/user-info";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const userStore = useUserStore();
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (!username.value || !password.value) {
    showToast(t("loginRequired"));
    return;
  }

  await userStore.loginByUsernameAction({
    username: username.value,
    password: password.value
  });

  showToast(t("showSuccessToast"));

  await userStore.getUserInfoAction();
  router.push("/home");
};
</script>

<style lang="less" scoped>
:root {
  --van-field-input-text-color: #333;
  --van-button-primary-background-color: #ff5722;
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
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 24.7px;
  color: white;
  text-align: left;
  vertical-align: top;
}
</style>
