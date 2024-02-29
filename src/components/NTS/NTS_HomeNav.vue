<template lang="html">
  <van-search v-model="searchText" placeholder="请输入有声小说名" @search="onSearch()" />
  <!-- 轮播图 -->
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in mySwipe" :key="item.image">
      <img :src="item.image" />
      <span>{{item.title}}</span>
    </van-swipe-item>
  </van-swipe>

  <!-- 大按钮菜单 -->
  <div class="button-menu">
    <div class="button-menu-item" @click="toCreate()">
      <img src="/NTS_Images/add.png" alt="">
      <div>
        <p class="largeText">开始制作</p>
        <p class="smallText">有声小说</p>
      </div>
    </div>
    <div class="button-menu-item" @click="toPlay()">
      <img src="/NTS_Images/homePlay.png" alt="">
      <div>
        <p class="largeText">最近</p>
        <p class="smallText">有声小说</p>
      </div>
    </div>
    <div class="button-menu-item" @click="toMy()">
      <img src="/NTS_Images/books.png" alt="">
      <div>
        <p class="largeText">我的</p>
        <p class="smallText">有声小说</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant';

const router = useRouter();

const searchText = ref('');

const onSearch = () => {
  //跳转到搜索页面并携带搜索结果
  router.push({
    path: '/NTS/NTS_Search',
    query: {
      searchText: searchText.value
    }
  });
}

const mySwipe = ref([
  {
    image: '/NTS_Images/book0.png',
    title: '今日推荐'
  },
  {
    image: '/NTS_Images/book1.png',
    title: '今日推荐'
  },
  {
    image: '/NTS_Images/book2.png',
    title: '今日推荐'
  },
  {
    image: '/NTS_Images/book3.png',
    title: '今日推荐'
  }
]);

const toCreate = () => {
  //路由跳转到制作页面
  router.push('/NTS/NTS_Create');
}

const toPlay = () => {
  //路由跳转到播放页面
  router.push({
        path: '/NTS/NTS_Play',
        query: {
            novelID: 1,
            chapterID: 0,
            novelName: "[凌晨] 交错",
            chapterName: "全一章",
            NovelImg: "/NTS_Images/book2.png"
        }
    });
}

const toMy = () => {
  //路由跳转到我的页面
  router.push('/NTS/NTS_My');
}

</script>
<style scoped lang="scss">
.van-search {
  margin: 10px 10px 0 10px;
}

.van-swipe{
  margin: 10px 10px 0 10px;
  height: 200px;
  border-radius: 6px;
  .van-swipe-item{
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span{
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 20px;
      color: #ffffff;
      text-shadow: #000000 0px 0px 10px;
    }
  }
}

.button-menu {
  display: flex;
  height: 123px;
  padding: 10px 0;
  overflow-x: auto;
  user-select: none;

  .button-menu-item {
    flex: 0 0 auto;
    /* 防止子元素缩放，保持原始宽度 */
    width: 123px;
    height: 123px;
    margin-left: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    img {
      width: 35px;
      height: 35px;
      pointer-events: none;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      margin-left: 10px;

      .largeText {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .smallText {
        font-size: 10px;
        color: #000000;
      }
    }
  }

  .button-menu-item:first-child {
    width: 203px;
    background: #FFDB7E;
  }

  .button-menu-item:nth-child(2) {
    width: 123px;
    background: #FFAD7E;
  }

  .button-menu-item:nth-child(3) {
    width: 123px;
    background: #FF867E;
    margin-right: 18px;
  }
}

/* 隐藏滚动条 */
.button-menu::-webkit-scrollbar {
  display: none;
  /* 针对 Chrome, Safari, Opera */
}</style>