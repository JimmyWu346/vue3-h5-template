<template>
  <van-tabbar
    v-model="active"
    :placeholder="true"
    fixed
    active-color="#646A73"
    inactive-color="#646A73"
    class="h-[50px]"
    :route="true"
  >
    <!-- <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :to="item.to"
    >
      {{ $t(item.title) }}
      <template #icon="props">
        <img :src="props.active ? item.icon_acitve : item.icon" />
      </template>
    </van-tabbar-item> -->
    <van-tabbar-item :to="tabbarData[0].to">
      {{ $t(tabbarData[0].title) }}
      <template #icon="props">
        <img
          :src="props.active ? tabbarData[0].icon_acitve : tabbarData[0].icon"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item :to="tabbarData[1].to">
      {{ $t(tabbarData[1].title) }}
      <template #icon="props">
        <img
          :src="props.active ? tabbarData[1].icon_acitve : tabbarData[1].icon"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
// 1、引入项目静态图，没有配置路径别名的用../
import HOME_ONE from "@/assets/home.png";
import HOME_TWO from "@/assets/home_act.png";
import ME_ONE from "@/assets/me.png";
import ME_TWO from "@/assets/me_act.png";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: HOME_ONE,
    icon_acitve: HOME_TWO,
    title: "home",
    to: {
      name: "Home"
    }
  },
  {
    icon: ME_ONE,
    icon_acitve: ME_TWO,
    title: "me",
    to: {
      name: "Me"
    }
  }
]);
</script>
