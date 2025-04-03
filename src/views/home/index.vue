<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="h-screen relative main-container px-[15px] pt-[27px]">
      <!-- 搜索框 -->
      <van-sticky>
        <van-search
          v-model="searchValue"
          class="rounded-md"
          show-action
          :placeholder="$t('homeSearchPLH')"
          @search="onSearch"
        >
          <template #action>
            <div class="text-[var(--color-main)]" @click="onClickButton">
              {{ $t("homePage.search") }}
            </div>
          </template>
        </van-search>
      </van-sticky>

      <!-- 主体内容 -->
      <div class="mt-[22px]">
        <van-list
          v-if="!refreshing"
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          :finished-text="$t('homePage.noMore')"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in tableList"
            :key="index"
            class="item-block px-[13px] py-4 h-[75px] w-full bg-white mt-[15px] flex justify-between"
            @click="goInfo(item)"
          >
            <!-- 左 -->
            <div class="left">
              <van-text-ellipsis :content="item.abbreviation" class="left-t" />
              <div class="flex left-b overflow-hidden">
                <van-text-ellipsis :content="item.jurisdictionArea" />
                <span v-if="item.jurisdictionArea && item.typeStr">{{
                  "&nbsp;|&nbsp;"
                }}</span>
                <div
                  class="truncate"
                  style="line-height: var(--van-text-ellipsis-line-height)"
                >
                  {{ item.typeStr }}
                </div>
              </div>
            </div>
            <!-- 右 -->
            <div class="right">
              <div :style="{ color: item.statusColor }" class="right-t">
                <van-text-ellipsis
                  style="width: fit-content"
                  :content="item.statusStr"
                />
              </div>
              <div class="right-b">
                {{ item.registerTime && item.registerTime.substring(0, 10) }}
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { useRouter } from "vue-router";
import { companyFetchPage } from "@/api/common";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { onMounted } from "vue";

onMounted(() => {
  document.body.style.backgroundColor = "#f7f8f9"; // 当前页面背景色
});

defineOptions({
  name: "Home"
});

const router = useRouter();
const { t } = useI18n();

const tableList = reactive([]);
const loading = ref(false);
const loadingQ = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const page = ref(1);
const limit = ref(10);
const searchValue = ref("");

const goInfo = item => {
  router.push({
    path: `/detail`,
    query: {
      navTitle: item.abbreviation,
      id: item.id
    }
  });
};

// 下拉刷新
const onRefresh = async () => {
  finished.value = false;
  page.value = 1;
  tableList.length = 0;
  try {
    const params = {
      page: page.value,
      limit: limit.value,
      companyName: searchValue.value
    };
    const response = await companyFetchPage(params);
    const newData = response?.data?.records || [];
    tableList.push(...newData);
    if (newData.length < limit.value) {
      finished.value = true;
    } else {
      page.value += 1;
    }
  } catch (error) {
    console.error(t("homePage.error"), error);
  } finally {
    refreshing.value = false;
  }
};

// 数据获取
const onLoad = async () => {
  if (finished.value || loadingQ.value) return;
  loadingQ.value = true;
  try {
    const params = {
      page: page.value,
      limit: limit.value,
      companyName: searchValue.value
    };
    const response = await companyFetchPage(params);
    setTimeout(() => {
      const newData = response?.data?.records || [];
      tableList.push(...newData);
      if (newData.length < limit.value) {
        finished.value = true;
      } else {
        page.value += 1;
      }

      loading.value = false;
      loadingQ.value = false;
    });
  } catch (error) {
    console.error(t("homePage.error"), error);
    loading.value = false;
    loadingQ.value = false;
  }
};

// 重置分页
const resetPagination = async () => {
  finished.value = false;
  page.value = 1;
  tableList.length = 0;
  await onLoad();
};

// 搜索事件
const onSearch = () => {
  resetPagination();
};

// 搜索按钮点击
const onClickButton = () => {
  resetPagination();
};

// 初始加载
onLoad();
</script>

<style lang="less" scoped>
:root {
  --van-field-input-text-color: #333;
  --van-button-primary-background-color: #ff5722;
}

.main-container {
  height: 100%;
  min-height: 100vh;
  .item-block {
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0px 2px 4px #00000012;

    .left {
      max-width: 61%;
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      flex-direction: column;
      justify-content: center;

      .left-t {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 17.38px;
        color: #383838;
        text-align: left;
        vertical-align: top;
      }

      .left-b {
        margin-top: 5px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17.38px;
        color: #613910;
        text-align: left;
        vertical-align: top;
      }
    }

    .right {
      max-width: 31%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      align-content: center;
      flex-direction: column;
      justify-content: center;

      .right-t {
        font-size: 11px;
        font-weight: 400;
        line-height: 23px;
        text-align: center;
        min-width: 65px;
        max-width: max-content;
        padding-inline: 10px;
        height: 23px;
        border-radius: 4px;
        border: 1px solid #e5e5e5 !important;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .right-b {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17.38px;
        color: #a6a6a6;
        margin-top: 5px;
        text-align: right;
        min-height: 17.396px;
      }
    }
  }
}
</style>
