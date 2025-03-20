<template>
  <van-pull-refresh v-model="pullLoading" @refresh="pullOnLoad">
    <van-loading v-if="loading" size="24px" class="text-center mt-[40%]"
      >加载中...</van-loading
    >
    <!--  mt-[64px] -->
    <div
      v-if="!loading"
      class="main-container px-[15px] min-h-[calc(100vh-64px-50px)]"
    >
      <!-- 主体内容 -->
      <van-tabs v-model:active="active" swipeable>
        <!-- 基本信息 -->
        <!-- <van-tab :title="$t('detail.basicInfo')">
          <InfoCard
            class="mt-1"
            :title="$t('detail.basicInfo')"
            :icon="infoImg"
          >
            <van-row :gutter="[6, 6]">
              <van-col span="24">
                <TextCard
                  :title="$t('detail.companyEnName')"
                  :content="companyInfo.enName"
                />
              </van-col>

              <van-col span="24">
                <TextCard
                  :title="$t('detail.companyChName')"
                  :content="companyInfo.chName"
                />
              </van-col>

              <van-col span="24">
                <TextCard
                  :title="$t('detail.companyAbbr')"
                  :content="companyInfo.abbreviation"
                />
              </van-col>

              <van-col span="12">
                <TextCard
                  :title="$t('detail.jurisdictionArea')"
                  :content="companyInfo.jurisdictionArea"
                />
              </van-col>
              <van-col span="12">
                <TextCard
                  :title="$t('detail.companyType')"
                  :content="companyInfo.typeStr"
                />
              </van-col>

              <van-col span="12">
                <TextCard
                  :title="$t('detail.nextReviewDate')"
                  :content="
                    companyInfo.annualReviewTime &&
                    companyInfo.annualReviewTime.substring(0, 10)
                  "
                />
              </van-col>
              <van-col span="12">
                <TextCard
                  :title="$t('detail.registerDate')"
                  :content="
                    companyInfo.registerTime &&
                    companyInfo.registerTime.substring(0, 10)
                  "
                />
              </van-col>
              <van-col span="12">
                <TextCard
                  :title="$t('detail.registerNo')"
                  :content="companyInfo.registerNo"
                />
              </van-col>
              <van-col span="12">
                <TextCard
                  :title="$t('detail.brNo')"
                  :content="companyInfo.brNo"
                />
              </van-col>

              <van-col span="12">
                <TextCard
                  :title="$t('detail.companyStatus')"
                  :content="companyInfo.statusStr"
                />
              </van-col>

              <van-col span="24">
                <TextCard
                  :title="$t('detail.registerOffice')"
                  :content="companyInfo.registerOffice"
                  :isRows="true"
                />
              </van-col>
            </van-row>
          </InfoCard>
        </van-tab> -->
        <!-- 附件 -->
        <!-- <van-tab :title="$t('detail.attachmentList')">
          <InfoCard
            class="mt-1"
            :title="$t('detail.attachmentList')"
            :icon="groupImg"
          />
        </van-tab> -->
        <!-- 成员 -->
        <van-tab :title="$t('detail.shareholderList')">
          <InfoCard
            class="mt-1"
            title="股东/成员列表"
            :icon="shareholderImg"
            noDividersdfs
          >
            <!-- 股東/成員列表 -->
            <InfoCardSub title="股東/成員列表">
              <van-row :gutter="[10, 10]">
                <van-col
                  v-for="(i, k) in shareholder"
                  :key="k"
                  span="24"
                  class="!mb-[10px]"
                >
                  <TextCardNotText class="grid grid-cols-[65%_35%] gap-[7px]">
                    <TextCardNotText_Text title="股東名稱" :content="i.name" />
                    <TextCardNotText_Text
                      title="類別"
                      :content="i.categoryStr"
                    />

                    <TextCardNotText_Text
                      title="股份百分比"
                      :content="String(i.sharePercentage) + '%'"
                    />
                    <TextCardNotText_Text
                      title="股数"
                      :content="i.shareCount"
                    />

                    <TextCardNotText_Text
                      title="Capital/contribution"
                      :content="i.capitalContribution"
                    />
                    <TextCardNotText_Text
                      title="日期"
                      :content="i.jobDate && i.jobDate.slice(0, 10)"
                    />
                  </TextCardNotText>
                </van-col>

                <!-- 无数据 -->
                <van-col span="24">
                  <p
                    v-if="shareholder.length < 1"
                    class="text-[#646A73] text-[11px] text-center"
                  >
                    无数据
                  </p>
                </van-col>
              </van-row></InfoCardSub
            >

            <!-- 董事列表 -->
            <InfoCardSub title="董事列表">
              <van-row :gutter="[10, 10]">
                <van-col v-for="(i, k) in director" :key="k" span="24">
                  <TextCardNotText class="grid grid-cols-[65%_35%] gap-[7px]">
                    <TextCardNotText_Text title="姓名" :content="i.name" />
                    <TextCardNotText_Text
                      title="状态"
                      :content="i.status == 1 ? '在职' : '离职'"
                    />

                    <TextCardNotText_Text
                      title="日期"
                      :content="i.jobDate && i.jobDate.slice(0, 10)"
                    />
                  </TextCardNotText>
                </van-col>

                <!-- 无数据 -->
                <van-col span="24">
                  <p
                    v-if="shareholder.length < 1"
                    class="text-[#646A73] text-[11px] text-center"
                  >
                    无数据
                  </p>
                </van-col>
              </van-row>
            </InfoCardSub>

            <!-- 授權代表 -->
            <InfoCardSub title="授權代表">
              <van-row :gutter="[10, 10]">
                <van-col v-for="(i, k) in director" :key="k" span="24">
                  <TextCardNotText class="grid grid-cols-[65%_35%] gap-[7px]">
                    <TextCardNotText_Text title="姓名" :content="i.name" />
                  </TextCardNotText>
                </van-col>

                <!-- 无数据 -->
                <van-col span="24">
                  <p
                    v-if="shareholder.length < 1"
                    class="text-[#646A73] text-[11px] text-center"
                  >
                    无数据
                  </p>
                </van-col>
              </van-row>
            </InfoCardSub>

            <!-- 最終受益人 -->
          </InfoCard>
        </van-tab>
      </van-tabs>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "vue";
import InfoCard from "@/components/info-card/index.vue";
import InfoCardSub from "@/components/info-card/index-sub.vue";
import TextCardNotText from "@/components/text-card/index-not-text.vue";
import TextCardNotText_Text from "@/components/text-card/index-not-text__text.vue";
import groupImg from "@/assets/detail/group.png";
import shareholderImg from "@/assets/detail/shareholder.png";
import infoImg from "@/assets/detail/info.png";
import { http } from "@/utils/http";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const pullLoading = ref(false);
const active = ref("");
const id = route.query.id;

const companyInfo = reactive({});
// 成员
const shareholder = reactive([]);
// 董事
const director = reactive([]);
// 授权人
const authorized = reactive([]);
// 控制人
const beneficiary = reactive([]);

const pullOnLoad = async () => {
  pullLoading.value = true;
  await onLoad();
  pullLoading.value = false;
};

const onLoad = async () => {
  loading.value = true;

  const requests = [
    http.request({ url: `/company/${id}`, method: "get" }),
    http.request({ url: `/shareholder/list?companyId=${id}`, method: "get" }),
    http.request({
      url: `/company/director/list?companyId=${id}`,
      method: "get"
    }),
    http.request({
      url: `/company/authorized-representative/list?companyId=${id}`,
      method: "get"
    }),
    http.request({
      url: `/company/beneficiary/list?companyId=${id}`,
      method: "get"
    })
  ];

  try {
    const results = await Promise.allSettled(requests);

    results.forEach((res, index) => {
      if (res.status === "fulfilled") {
        const data = res.value.data;
        switch (index) {
          case 0:
            Object.assign(companyInfo, data);
            // console.log("✅ companyInfo:", data);
            break;
          case 1:
            shareholder.splice(0, shareholder.length, ...data);
            console.log("✅ shareholder:", data);
            break;
          case 2:
            director.splice(0, director.length, ...data);
            console.log("✅ director:", data);
            break;
          case 3:
            authorized.splice(0, authorized.length, ...data);
            console.log("✅ authorized:", data);
            break;
          case 4:
            beneficiary.splice(0, beneficiary.length, ...data);
            console.log("✅ beneficiary:", data);
            break;
        }
      } else {
        console.error(`❌ 第 ${index + 1} 个请求失败:`, res.reason);
      }
    });
  } catch (e) {
    console.error("❌ 请求过程中发生错误:", e);
  } finally {
    loading.value = false;
  }
};

onLoad();
</script>
<style lang="less">
body {
  background-color: var(--color-background-2);
}
</style>
<style lang="less" scoped>
:root {
  --van-field-input-text-color: #333;
  --van-button-primary-background-color: #ff5722;
}

.main-container {
  background-color: var(--color-background-2);
  padding-bottom: 14px;
}

:deep(.van-tabs__nav) {
  background: unset;

  .van-tabs__line {
    background: var(--color-main);
    bottom: 20px;
  }

  .van-tab--active {
    color: var(--color-main);
  }
}

.list-no-data {
}
</style>
