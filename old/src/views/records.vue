<template>
  <div>
    <van-nav-bar
      title="浏览记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div v-if="recordsList.length">
      <van-card
      v-for="(item,index) in recordsList"
      :key="index"
        tag="标签"
        :desc="item.detail"
        :title="item.title"
        :thumb="item.img"
        @click="detail(item.id)"
      />
    </div>
    <div v-else><van-empty image="search" description="暂时没有看过的书" /></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import router from "@/router";
onMounted(async () => {
  await getRecord(); // 在组件加载时立即获取数据
  
});
const recordsList = ref([])
const onClickLeft = () => history.back();
const getRecord =() =>{
    const userid = window.sessionStorage.getItem("userid");
      axios
        .get("http://localhost:3000/record?userid=" + userid) // 根据 userid 获取购物车数据
        .then((res) => {
          console.log(res.data);
          recordsList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

};
const detail = (id) => {
  console.log(id)
  router.push("/detail/"+id);
};

  
</script>

<style>
</style>