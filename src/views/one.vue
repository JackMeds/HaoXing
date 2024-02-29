<template>
  <div class="contain">
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model="searchInfo"
        show-action
        placeholder="请输入搜索关键词"
        @click="search"
      />
    </form>
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, id) in swipeList" :key="id">
        <van-image
          width="200"
          height="200"
          :src="item.img"
          @click="detail(item,id)"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <van-tabs v-model:active="type" >
      <van-tab
        v-for="(item, id) in typelist"
        :key="id"
        :title="item.title"
      >
        <van-grid :column-num="3">
          <van-grid-item
            @click="detail(i.id)"
            v-for="(i, index) in bookList"
            :key="index"
            v-show="i.time==item.time"
          >
            <van-image
              width="100"
              height="150"
              :src="i.img"
            />
            
            <div>{{ i.title }}</div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
  <bar></bar>
</template>
<script setup>
import bar from "@/components/bar.vue";
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import router from "@/router";
let swipeList = ref([]);
onMounted(async () => {
  await getInfo(); // 在组件加载时立即获取数据
  let i = Math.floor(Math.random() * 10);
  axios
    .get("http://localhost:3000/newsList")
    .then((res) => {
      for (i = 0; i < 4; i++) {
        swipeList.value.push(res.data[i]);
      }
      console.log(swipeList.value)
      bookList = res.data;
      console.log(bookList);
    })
    .catch((err) => {
      console.log(err);
    });
});
// 搜索
const searchInfo = ref("");
const search = () => {
  router.push("/search");
};
const onCancel = () => showToast("取消");
// 分类
const type = ref(0);
let typelist = ref();
let bookList = ref();
const detail = (id) => {
  console.log(id)
  router.push("/detail/"+id);
};
const getInfo = () => {
  axios
    .get("http://localhost:3000/tag")
    .then((res) => {
      console.log(res);
      typelist = res.data;
      console.log(typelist);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
  
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
  /* background-color: #39a9ed; */
}
</style>