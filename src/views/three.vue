<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab title="书架">
        <div v-if="loggedIn">
          <van-grid :column-num="3">
          <van-grid-item
            @click="detail(i.id)"
            v-for="(i, index) in bookList"
            :key="index"
          >
            <van-image
              width="100"
              height="150"
              :src="i.img"
            />
            <div>{{ i.title }}</div>
          </van-grid-item>
        </van-grid>
        </div>
       <div v-else>
        <van-empty  description="请先登录" />
       </div>
      </van-tab>
      <van-tab title="我的收藏">内容 2</van-tab>
      <van-tab title="我的订阅">内容 3</van-tab>
    </van-tabs>
    <bar></bar>
  </div>
</template>

<script setup>
import bar from "../components/bar.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import router from "@/router";

const bookList = ref([]);
const active = ref(0);
const detail = (id) => {
  router.push('detail/'+id)
};

const getInfo = async () => {
  try {
    const res = await axios.get("http://localhost:3000/tag");
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
const loggedIn = ref(false);
if (window.sessionStorage.getItem("user")) {
  loggedIn.value = true;
}
onMounted(async () => {
  await getInfo(); // 在组件加载时立即获取数据
  const userid = window.sessionStorage.getItem("userid");
      axios
        .get("http://localhost:3000/gouwucar?userid=" + userid) // 根据 userid 获取购物车数据
        .then((res) => {
          console.log(res.data);
          bookList.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
});
</script>


<style>
/* 样式内容 */
</style>
