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
      <InfoCard class="mt-[10px]" :noDivider="true">
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

        <p
          v-if="files.length < 1"
          class="text-[#646A73] text-[11px] text-center"
        >
          {{ $t("detail.noData") }}
        </p>
      </InfoCard>
    </div>

    <van-image-preview
      v-model:show="previewShow"
      :images="images"
      :closeable="true"
      :startPosition="startPosition"
    />
  </van-pull-refresh>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { reactive, ref } from "vue";
import FileIcon from "@/components/file-icon/index.vue";
import { http } from "@/utils/http";
import { useI18n } from "vue-i18n";
import { showToast } from "vant";
import { useUserStore } from "@/store/modules/user-info";
import { watch } from "vue";
import { onMounted } from "vue";
import { iconFileType } from "./file";

defineOptions({
  name: "DetailFile"
});

onMounted(() => {
  document.body.style.backgroundColor = "#f7f8f9"; // 当前页面背景色
});

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const loading = ref(false);
const pullLoading = ref(false);
const id = route.query.id;
const files = reactive([]);
const images = reactive([]);
const previewShow = ref(false);
const startPosition = ref(0);

watch(
  () => route.query,
  () => {
    onLoad(); // query 变了就重新加载
  },
  { immediate: false }
);

const pullOnLoad = async () => {
  pullLoading.value = true;
  await onLoad();
  pullLoading.value = false;
};

const onLoad = async () => {
  loading.value = true;
  const requests = [
    http.request({
      url: `/api/storage/files`,
      method: "post",
      data: {
        storageKey: "1",
        password: "",
        companyId: id,
        orderBy: "name",
        path: route.query.path,
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
            files.splice(0, files.length, ...data.files);

            files.forEach(item => {
              item["icon"] = getFileIconName(item);
            });
            console.log("✅ files:", data.files);

            break;
        }
      } else {
        console.error(`❌ ${t("detail.requestFailed")}:`, res.reason);
      }
    });
  } catch (e) {
    console.error(`❌ ${t("detail.requestError")}:`, e);
  } finally {
    loading.value = false;
  }
};

const clickFile = async i => {
  // 文件夹
  if (i.type == "FOLDER") {
    router.push({
      path: `/files`,
      query: {
        path: route.query.path + "/" + i.name,
        id: id,
        navTitle: i.name
      }
    });
  } else {
    if (i.icon === "pdf") {
      router.push({
        path: `/pdfViewer`,
        query: {
          url: i.url,
          navTitle: t("detail.pdfPreview")
        }
      });
    } else if (i.icon === "image") {
      previewShow.value = true;
      const imagesF = files.filter(f => f.icon === "image").map(f => f.url);

      images.splice(0, images.length, ...imagesF);
      startPosition.value = files
        .filter(f => f.icon === "image")
        .findIndex(
          f => f.icon === "image" && f.name === i.name && f.url === i.url
        );
    } else {
      showToast(t("detail.notSupported"));
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
// 文件分類
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
