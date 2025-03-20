<script setup lang="ts">
import { useRoute } from "vue-router"; // 导入 useRoute
// 获取当前路由
const route = useRoute(); // vue-router 的 route 对象

const onClickLeft = () => {
  history.back();
};
</script>
<template>
  <van-nav-bar
    fixed
    z-index="8"
    placeholder
    :title="route.query?.navTitle as string"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<style lang="less" scoped>
:deep(.van-nav-bar__arrow) {
  color: #231e1c;
  font-weight: bold;
}
:deep(::v-deep .van-nav-bar__content) {
  height: 64px;
}
</style>
