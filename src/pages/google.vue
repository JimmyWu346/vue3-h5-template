<template>
  <div class="pdf-preview">
    <van-nav-bar title="PDF预览" left-arrow @click-left="onBack" />
    <div class="pdf-container">
      <iframe
        v-if="pdfUrl"
        :src="previewUrl"
        width="100%"
        height="100%"
        frameborder="0"
      />
      <van-loading v-else size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Loading } from "vant";

const props = {
  url: "https://vendavelnet-my.sharepoint.com/personal/welcom_wegroupltd_net/_layouts/15/download.aspx?UniqueId=56fccd4a-258a-49b9-b9b7-da5d3e2596b0&Translate=false&tempauth=v1.eyJzaXRlaWQiOiJlOWU1MzE0MC0wMTU1LTRiMzYtYTg5Ni1kODQ0MDUyYmM2MmEiLCJhcHBfZGlzcGxheW5hbWUiOiJ3ZS1zZXJ2aWNlcyIsImFwcGlkIjoiOGNjZjEwZjEtMTBiOC00NWI0LThmYzctODUzNmIyOTRmNDRkIiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL3ZlbmRhdmVsbmV0LW15LnNoYXJlcG9pbnQuY29tQDQwN2MxMGJhLTZhNjUtNGI2Zi1hMTdkLWYxNjE4ZThjMGVlZiIsImV4cCI6IjE3NDI4ODI1OTkifQ.CgoKBHNuaWQSAjY0EgsI_tWAy4zZ9T0QBRoOMjAuMTkwLjE0NC4xNzEqLFk3a1VEenhtQ3FYc2ZvbzZHTmFrZjhhYW8ydmhWZFVzT2ZqelQ0aEtTTGc9MJwBOAFCEKGN3b3H0ABA51KYfM_8GvNKEGhhc2hlZHByb29mdG9rZW5yKTBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwM2EzN2VmZjhmQGxpdmUuY29tegEyggESCboQfEBlam9LEaF98WGOjA7vmgEGd2VsY29togEVd2VsY29tQHdlZ3JvdXBsdGQubmV0qgEQMTAwMzIwMDNBMzdFRkY4RrIBPGFsbGZpbGVzLndyaXRlIGFsbHNpdGVzLnJlYWQgYWxsc2l0ZXMud3JpdGUgYWxscHJvZmlsZXMucmVhZMgBAQ.JAi8-8St0zT-jT5libEbbuVPC-J6jlOo59NE597K5Xc&ApiVersion=2.0"
};

const pdfUrl = ref("");
const router = useRouter();

// 使用 Google Docs Viewer 生成预览 URL
const previewUrl = computed(() => {
  if (!pdfUrl.value) return "";
  return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl.value)}&embedded=true`;
});

const onBack = () => {
  router.back();
};

onMounted(() => {
  if (props.url) {
    pdfUrl.value = props.url.includes("http")
      ? props.url
      : `https://${props.url}`;
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
  overflow: hidden;
}
</style>
