<template>
  <div class="pdf-preview">
    <van-nav-bar
      :title="`PDF预览 (${currentPage}/${totalPages})`"
      left-arrow
      @click-left="onBack"
    />
    <div class="pdf-container">
      <canvas ref="pdfCanvas" />
      <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
    </div>
    <div class="pagination !pb-[35px]">
      <div>
        <van-button size="small" class="!h-[31px] !w-[50px]" @click="zoomOut"
          >-</van-button
        >
        <van-button
          size="small"
          class="!h-[31px] !w-[50px] !ml-[2px]"
          @click="zoomIn"
          >+</van-button
        >
      </div>
      <div class="flex justify-center items-center">
        <van-button
          :disabled="currentPage === 1"
          size="small"
          type="primary"
          class="!h-[30px]"
          @click="prevPage"
        >
          上一页
        </van-button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <van-button
          size="small"
          type="primary"
          :disabled="currentPage === totalPages"
          class="!h-[30px]"
          @click="nextPage"
        >
          下一页
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Loading, Button } from "vant";
import * as pdfjsLib from "pdfjs-dist";

// 设置 Worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const props = {
  url: "https://vendavelnet-my.sharepoint.com/personal/welcom_wegroupltd_net/_layouts/15/download.aspx?UniqueId=f8a597b8-dc9a-408a-acf3-a72d56a84914&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJlOWU1MzE0MC0wMTU1LTRiMzYtYTg5Ni1kODQ0MDUyYmM2MmEiLCJhcHBfZGlzcGxheW5hbWUiOiJ3ZS1zZXJ2aWNlcyIsImFwcGlkIjoiOGNjZjEwZjEtMTBiOC00NWI0LThmYzctODUzNmIyOTRmNDRkIiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL3ZlbmRhdmVsbmV0LW15LnNoYXJlcG9pbnQuY29tQDQwN2MxMGJhLTZhNjUtNGI2Zi1hMTdkLWYxNjE4ZThjMGVlZiIsImV4cCI6IjE3NDI4ODkwMzcifQ.CgoKBHNuaWQSAjY0EgsI9K-Mmuzc9T0QBRoOMjAuMTkwLjE0NC4xNzAqLE1lUVpZL21XNjJoNHhGOW5nT2dFVWozaWlNU0c2a0RWdFFjMGRPSG1wVGM9MJwBOAFCEKGN4-FjgABA51KdLdKy4TBKEGhhc2hlZHByb29mdG9rZW5yKTBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwM2EzN2VmZjhmQGxpdmUuY29tegEyggESCboQfEBlam9LEaF98WGOjA7vmgEGd2VsY29togEVd2VsY29tQHdlZ3JvdXBsdGQubmV0qgEQMTAwMzIwMDNBMzdFRkY4RrIBPGFsbGZpbGVzLndyaXRlIGFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZMgBAQ.tuKXWBw_KtDMKYhEyHayHxOFZrX9cCZyiID409llS98&ApiVersion=2.0"
};

const pdfCanvas = ref(null);
const loading = ref(true);
const router = useRouter();
let pdfDoc = null; // PDF 文档对象
const currentPage = ref(1); // 当前页码
const totalPages = ref(0); // 总页数
const zoomLevel = ref(100); // 当前缩放比例（默认 100%）
let scale = 1; // 当前缩放比例

const onBack = () => {
  router.back();
};

// 渲染指定页面
const renderPage = async pageNum => {
  if (!pdfDoc) return;

  loading.value = true;
  try {
    const page = await pdfDoc.getPage(pageNum);

    const canvas = pdfCanvas.value;
    const context = canvas.getContext("2d");

    // 清除画布之前的内容
    context.clearRect(0, 0, canvas.width, canvas.height);

    const viewport = page.getViewport({ scale });

    // 设置 canvas 尺寸（内部绘图尺寸）
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    loading.value = false;
  } catch (error) {
    console.error("页面渲染失败:", error);
    loading.value = false;
  }
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    renderPage(currentPage.value);
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    renderPage(currentPage.value);
  }
};

// 放大
const zoomIn = () => {
  if (zoomLevel.value < 300) {
    zoomLevel.value += 10;
    scale = zoomLevel.value / 100; // 更新 scale 为新的缩放比例
    renderPage(currentPage.value); // 重新渲染当前页
  }
};

// 缩小
const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 10;
    scale = zoomLevel.value / 100; // 更新 scale 为新的缩放比例
    renderPage(currentPage.value); // 重新渲染当前页
  }
};

onMounted(async () => {
  try {
    if (!props.url) {
      throw new Error("URL 为空");
    }
    const pdfUrl = props.url.startsWith("http")
      ? props.url
      : `https://${props.url}`;

    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    totalPages.value = pdfDoc.numPages;
    currentPage.value = 1;
    await renderPage(currentPage.value);
  } catch (error) {
    console.error("PDF 加载失败:", error);
    loading.value = false;
  }
});
</script>

<style scoped>
.pdf-preview {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.pdf-container {
  flex: 1;
  overflow: auto;
  text-align: center;
}

/* 去除 canvas 的 max-width 限制 */
canvas {
  display: block;
  margin: 0 auto;
}

.pagination {
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f5f5f5;
}
</style>
