<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab title="书架">内容 1</van-tab>
      <van-tab title="我的收藏">内容 2</van-tab>
      <van-tab title="我的订阅">内容 3</van-tab>
    </van-tabs>
    <van-grid :column-num="3">
      <van-grid-item @click="detail">
        <van-image
          width="100"
          height="150"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
        />
        名称
      </van-grid-item>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
  <bar></bar>
</template>
  <script setup>
import bar from "../components/bar.vue";
import { ref } from "vue";

const active = ref(0);
const detail = () => {
  console.log(1111);
};
</script > 

    
  <style>
</style>