<template>
  <div class="root-container">
    <Header></Header>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in wsipeList" :key="index">
        <van-image class="img" fit="fill" height="180" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <br />
    <div>
      <van-icon name="new-o" size="30px" color="red" style="padding: 1px" />
    </div>
    <div class="word">今日推荐</div>
    <br />
    <div class="tuijian">
      <img :src="require('../assets/img/tj.png')" width="360" height="220" />
      <div style="text-align: center">
        <p>白泽</p>
        <p>东望山神兽，能人言。</p>
        <a href="your_link"></a>
      </div>
    </div>

    <van-card
      v-for="(item, index) in newsList"
      :key="index"
      tag="111"
      :title="item.title"
      @click="detail(item.id)"
    >
      <template #title>
        <div style="margin: 10px">{{ item.title }}</div>
      </template>
      <template #tags>
        <div style="margin: 10px">
          <van-tag plain type="danger">{{ displayTime(item.time) }}</van-tag>
        </div>
      </template>
    </van-card>
    <Tab></Tab>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Tab from "@/components/tab.vue";
export default {
  components: { Header, Tab },
  data() {
    return {
      search: "", //搜索
      wsipeList: [
        { img: require("../assets/img/b1.jpg") },
        { img: require("../assets/img/b2.jpg") },
        { img: require("../assets/img/b3.jpg") },
        { img: require("../assets/img/b4.jpg") },
      ],
      newsList: [],
      knowledgeList: [],
    };
  },
  methods: {
    getInfo() {
      this.$axios
        .get("http://localhost:3000/newslist")
        .then((res) => {
          this.newsList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detail(id) {
      this.$router.push("/detail/" + id);
    },
    displayTime(time) {
      if (time === "1") {
        return "中国";
      } else if (time === "2") {
        return "希腊";
      } else if (time === "3") {
        return "日本";
      } else {
        return time;
      }
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style>
.img {
  width: 95%;
  margin: 5px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.van-card__content {
  min-height: 50px;
}
.van-card {
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.root-container {
  background-color: rgb(227, 225, 219);
}
.search {
  background-color: rgb(255, 255, 255);
}
.tuijian {
  border: 2px solid #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.tuijian img {
  margin-top: 10px;
  border-radius: 30px;
  margin-left: 20px;
  margin-right: 20px;
}
.word {
  margin-right: 5px;
  font-style: italic;
  font-weight: bold;
}
</style>
