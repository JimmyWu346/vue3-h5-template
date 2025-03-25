<template>
  <van-pull-refresh v-model="pullLoading" @refresh="pullOnLoad">
    <van-loading v-if="loading" size="24px" class="text-center mt-[40%]">{{
      $t("detail.loading")
    }}</van-loading>
    <!--  mt-[64px] -->
    <div
      v-if="!loading"
      class="main-container px-[15px] min-h-[calc(100vh-64px-50px)]"
    >
      <!-- 主体内容 -->
      <van-tabs v-model:active="active" swipeable>
        <!-- 基本信息 -->
        <van-tab v-if="sys_company_info_get" :title="$t('detail.basicInfo')">
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
        </van-tab>

        <!-- 附件 -->
        <van-tab
          v-if="sys_company_files_get"
          :title="$t('detail.attachmentList')"
        >
          <InfoCard
            class="mt-1"
            :title="$t('detail.attachmentList')"
            :icon="groupImg"
          >
            <div
              v-for="(i, k) in files"
              :key="k"
              class="flex justify-between items-center file-list-item"
              @click="clickFile(i)"
            >
              <div class="w-[calc(100%-83px-20px)] flex items-center">
                <FileIcon :fileName="i.name" :icon="i.icon" />
                <span
                  class="w-[calc(100%-28px)] truncate text-[#646A73FF] file-list-item__name ml-[3px]"
                  >{{ i.name }}</span
                >
              </div>
              <div class="w-[83px] text-[#A6A6A6] file-list-item__time">
                {{ i.time && i.time.substring(0, 16) }}
              </div>
            </div>
          </InfoCard>
        </van-tab>
        <!-- 成员 -->
        <van-tab :title="$t('detail.shareholderList')">
          <InfoCard
            class="mt-[4px] pb-[8px]"
            :title="$t('detail.shareholderTitle')"
            :icon="shareholderImg"
            noDivider
          >
            <!-- 股東/成員列表 -->
            <div class="mt-[8px]" />
            <InfoCardSub
              v-if="sys_company_shareholder_get"
              :title="$t('detail.shareholderTitle')"
            >
              <van-row :gutter="[10, 10]">
                <van-col
                  v-for="(i, k) in shareholder"
                  :key="k"
                  span="24"
                  class="!mb-[10px]"
                >
                  <TextCardNotText class="grid grid-cols-[65%_35%] gap-[7px]">
                    <TextCardNotText_Text
                      :title="$t('detail.shareholderName')"
                      :content="i.name"
                    />
                    <TextCardNotText_Text
                      :title="$t('detail.category')"
                      :content="i.categoryStr"
                    />

                    <TextCardNotText_Text
                      :title="$t('detail.sharePercentage')"
                      :content="String(i.sharePercentage) + '%'"
                    />
                    <TextCardNotText_Text
                      :title="$t('detail.shareCount')"
                      :content="i.shareCount"
                    />

                    <TextCardNotText_Text
                      :title="$t('detail.capitalContribution')"
                      :content="i.capitalContribution"
                    />
                    <TextCardNotText_Text
                      :title="$t('detail.date')"
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
                    {{ $t("detail.noData") }}
                  </p>
                </van-col>
              </van-row></InfoCardSub
            >

            <!-- 董事列表 -->
            <InfoCardSub
              v-if="sys_company_director_get"
              :title="$t('detail.directorTitle')"
            >
              <van-row :gutter="[10, 10]">
                <van-col
                  v-for="(i, k) in director"
                  :key="k"
                  class="!mb-[10px]"
                  span="24"
                >
                  <TextCardNotText class="grid grid-cols-[65%_35%] gap-[7px]">
                    <TextCardNotText_Text
                      :title="$t('detail.name')"
                      :content="i.name"
                    />
                    <TextCardNotText_Text
                      :title="$t('detail.status')"
                      :content="
                        i.status == 1
                          ? $t('detail.active')
                          : $t('detail.inactive')
                      "
                    />

                    <TextCardNotText_Text
                      :title="$t('detail.date')"
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
                    {{ $t("detail.noData") }}
                  </p>
                </van-col>
              </van-row>
            </InfoCardSub>

            <!-- 授權代表 -->
            <InfoCardSub
              v-if="sys_company_authorized_get"
              :title="$t('detail.authorizedTitle')"
            >
              <van-row :gutter="[10, 10]">
                <van-col
                  v-for="(i, k) in authorized"
                  :key="k"
                  class="!mb-[10px]"
                  span="24"
                >
                  <TextCardNotText class="grid grid-cols-[100%_35%] gap-[7px]">
                    <TextCardNotText_Text
                      :title="$t('detail.name')"
                      :content="i.name"
                    />
                  </TextCardNotText>
                </van-col>

                <!-- 无数据 -->
                <van-col span="24">
                  <p
                    v-if="shareholder.length < 1"
                    class="text-[#646A73] text-[11px] text-center"
                  >
                    {{ $t("detail.noData") }}
                  </p>
                </van-col>
              </van-row>
            </InfoCardSub>

            <!-- 最終受益人 -->
            <InfoCardSub
              v-if="sys_company_beneficiary_get"
              :title="$t('detail.beneficiaryTitle')"
            >
              <template #title-right>
                <div class="ml-[2px]" @click="togglerName">
                  <img
                    v-show="showBeneficiaryName"
                    class="h-[17px] w-[17px]"
                    src="@/assets/pwd-view.png"
                  />
                  <img
                    v-show="!showBeneficiaryName"
                    class="h-[17px] w-[17px]"
                    src="@/assets/pwd-close.png"
                  />
                </div>
              </template>
              <van-row :gutter="[10, 10]">
                <van-col
                  v-for="(i, k) in beneficiary"
                  :key="k"
                  class="!mb-[10px]"
                  span="24"
                >
                  <TextCardNotText class="grid grid-cols-[100%_35%] gap-[7px]">
                    <TextCardNotText_Text
                      :title="$t('detail.name')"
                      :content="showBeneficiaryName ? i.name : '****'"
                    />
                  </TextCardNotText>
                </van-col>

                <van-col span="24">
                  <p
                    v-if="shareholder.length < 1"
                    class="text-[#646A73] text-[11px] text-center"
                  >
                    {{ $t("detail.noData") }}
                  </p>
                </van-col>
              </van-row>
            </InfoCardSub>
          </InfoCard>
        </van-tab>
      </van-tabs>
      <!-- 成员__输入框 -->
      <van-dialog
        v-if="showBeneficiaryInput"
        v-model:show="showBeneficiaryInput"
        :title="$t('detail.confirmPassword')"
        show-cancel-button
        show-confirm-button
        confirmButtonColor="#"
      >
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('placeHolderPwd')"
          class="w-full px-4 py-3 h-[53px] border-gray-200 focus:outline-none border-t-[0.5px] border-b-[0.5px] border-t-[#ff58331a] border-b-[#ff58331a]"
        />

        <template v-slot:footer>
          <div class="flex justify-between">
            <van-button
              block
              plain
              type="primary !border-0 "
              color="gray"
              @click="cancelDialog"
              >{{ $t("detail.cancel") }}</van-button
            >
            <van-button
              block
              plain
              type="success !border-0 "
              color="#ff5733"
              @click="checkOutUserPwd"
              >{{ $t("detail.confirm") }}</van-button
            >
          </div>
        </template>
      </van-dialog>
    </div>
  </van-pull-refresh>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref, computed } from "vue";
import InfoCard from "@/components/info-card/index.vue";
import InfoCardSub from "@/components/info-card/index-sub.vue";
import TextCardNotText from "@/components/text-card/index-not-text.vue";
import FileIcon from "@/components/file-icon/index.vue";
import TextCardNotText_Text from "@/components/text-card/index-not-text__text.vue";
import groupImg from "@/assets/detail/group.png";
import shareholderImg from "@/assets/detail/shareholder.png";
import infoImg from "@/assets/detail/info.png";
import { http } from "@/utils/http";
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
import { useUserStore } from "@/store/modules/user-info";
import { loginByUsername } from "@/api/login"; // 你自己的接口路径
import { onMounted } from "vue";
import { iconFileType } from "./file";

defineOptions({
  name: "Detail"
});

onMounted(() => {
  document.body.style.backgroundColor = "#f7f8f9"; // 当前页面背景色
});

// 基本信息
const sys_company_info_get = computed(() => {
  return userStore.permissions.includes("sys_company_info_get"); // 根据实际的权限标识修改
});
// 最终受益人列表
const sys_company_beneficiary_get = computed(() => {
  return userStore.permissions.includes("sys_company_beneficiary_get"); // 根据实际的权限标识修改
});
// 授权列表
const sys_company_authorized_get = computed(() => {
  return userStore.permissions.includes("sys_company_authorized_get"); // 根据实际的权限标识修改
});
// 董事列表
const sys_company_director_get = computed(() => {
  return userStore.permissions.includes("sys_company_director_get"); // 根据实际的权限标识修改
});
// 股东成员列表
const sys_company_shareholder_get = computed(() => {
  return userStore.permissions.includes("sys_company_shareholder_get"); // 根据实际的权限标识修改
});
// 附件列表
const sys_company_files_get = computed(() => {
  return userStore.permissions.includes("sys_company_files_get"); // 根据实际的权限标识修改
});

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const loading = ref(false);
const pullLoading = ref(false);
const active = ref("");
const showBeneficiaryName = ref(false);
const showBeneficiaryInput = ref(false);
const password = ref("");
const showPassword = ref(false);
const id = route.query.id;

const companyInfo = reactive({});
// 成员
const shareholder = reactive([]);
// 董事
const director = reactive([]);
// 授权人
const authorized = reactive([]);
// 最终受益人
const beneficiary = reactive([]);
// 文件
const files = reactive([]);

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
    }),
    http.request({
      url: `/api/storage/files`,
      method: "post",
      data: {
        storageKey: "1",
        password: "",
        companyId: id,
        orderBy: "name",
        orderDirection: "asc"
      }
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
          case 5:
            files.splice(0, files.length, ...data.files);

            files.forEach(item => {
              item["icon"] = getFileIconName(item);
            });

            console.log("✅ files:", data);
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

const togglerName = async () => {
  if (beneficiary.length < 1) {
    showToast({
      message: t("detail.noData"),
      type: "fail",
      duration: 1000
    });
    return;
  }
  if (showBeneficiaryName.value) {
    showBeneficiaryName.value = false;
  } else {
    showBeneficiaryInput.value = true;
  }
};

const cancelDialog = () => {
  showBeneficiaryInput.value = false;
  password.value = "";
};

const checkOutUserPwd = async () => {
  if (!password.value) {
    showToast(t("placeHolderPwd"));
    return;
  }

  try {
    const username = userStore.userInfo.username;
    const res = await loginByUsername(username, password.value);
    const data = res.data;
    console.log("🚀 ~ checkOutUserPwd ~ data:", data);
  } catch (err) {
    showToast(t("detail.passwordError"));
    console.error("❌ 密码错误:", err);
    return;
  }

  showToast(t("showSuccessToast"));
  showBeneficiaryInput.value = false;
  password.value = "";
  showBeneficiaryName.value = true;
  return;
};

const clickFile = async i => {
  // 文件夹
  if (i.type == "FOLDER") {
    router.push({
      path: `/files`,
      query: {
        path: i.name,
        id: companyInfo.id,
        navTitle: i.name
      }
    });
  } else {
    if (i.icon === "pdf") {
      router.push({
        path: `/pdfViewer`,
        query: {
          url: i.url,
          navTitle: "pdf预览"
        }
      });
    } else if (i.icon === "image") {
    } else {
      showToast("暂不支持");
    }
  }
};

function getFileIconName(file) {
  let iconName;
  if (file.type === "BACK" || file.type === "FOLDER" || file.type === "ROOT") {
    return file.type.toLowerCase();
  } else {
    let fileSuffix = getFileSuffix(file.name);
    let fileType = getFileType(file.name);
    if (iconFileType.indexOf(fileSuffix) !== -1) {
      iconName = fileSuffix;
    } else if (fileType) {
      iconName = fileType;
    } else {
      iconName = "file";
    }
  }
  return iconName;
}
const fileTypeMap = {
  image: ["gif", "jpg", "jpeg", "png", "bmp", "webp", "ico"],
  video: ["mp4", "webm", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
  audio: ["mp3", "wav", "wma", "ogg", "aac", "flac", "m4a"],
  text: [
    "scss",
    "sass",
    "kt",
    "gitignore",
    "bat",
    "properties",
    "yml",
    "css",
    "js",
    "md",
    "xml",
    "txt",
    "py",
    "go",
    "html",
    "less",
    "php",
    "rb",
    "rust",
    "script",
    "java",
    "sh",
    "sql"
  ],
  executable: ["exe", "dll", "com", "vbs"],
  archive: ["7z", "zip", "rar", "tar", "gz"],
  pdf: ["pdf"],
  office: ["doc", "docx", "csv", "xls", "xlsx", "ppt", "pptx"],
  three3d: ["dae", "fbx", "gltf", "glb", "obj", "ply", "stl"],
  document: ["txt", "pages", "epub", "numbers", "keynote"]
};
function getFileSuffix(name) {
  let lastIndex = name.lastIndexOf(".");
  if (lastIndex === -1) {
    return "other";
  }
  return name.substring(lastIndex + 1).toLowerCase();
}
function getFileType(name) {
  let fileType;
  for (let key in fileTypeMap) {
    let suffix = getFileSuffix(name);
    if (fileTypeMap[key].indexOf(suffix) !== -1) {
      fileType = key;
      break;
    }
  }
  return fileType;
}
onLoad();
</script>
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

:deep(.van-dialog) {
  top: 50%;
  width: 90%;
}

.file-list-item {
  &__name {
    font-size: 11px;
  }

  &__time {
    font-size: 10px;
  }
}
</style>
