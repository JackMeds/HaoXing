<template>
  <div>
    <Header></Header>
    <div class="title">希腊</div>
    <van-divider />
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
          this.newsList = res.data.filter((item) => item.time === "2");
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
.title {
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  margin: 10px;
}
</style>
