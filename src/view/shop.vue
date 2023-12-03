<template>
  <div>
    <backBar></backBar>
    <div class="title">购物车</div>
    <van-divider />
    <van-card
      v-for="(item, index) in knowledgelist"
      :key="index"
      :price="item.price"
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://localhost:3000/' + item.pic"
    >
      <template #footer>
        <van-button size="mini" type="danger" @click="deleteCart"
          >删除</van-button
        >
      </template>
    </van-card>
    <Tab></Tab>
  </div>
</template>

<script>
import backBar from "@/components/backBar";
import Tab from "@/components/tab.vue";
import qs from "qs";
export default {
  components: { backBar, Tab },
  data() {
    return {
      knowledgelist: [],
      userid: "", // 添加 userid 属性
      shopid: "",
      countnum: [],
    };
  },
  methods: {
    getInfo() {
      const userid = window.sessionStorage.getItem("userid");
      console.log(userid);
      if (!userid) {
        // 检查是否成功获取到 userid
        console.error("未成功获取到 userid");
        return;
      }
      this.$axios
        .get("http://localhost:3000/gouwucar?userid=" + userid) // 根据 userid 获取购物车数据
        .then((res) => {
          console.log(res.data);
          this.knowledgelist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteCart() {
      this.$axios
        .post("http://localhost:3000/gouwucar/del/", {
          shopid: this.knowledgelist[0].shopid,
          userid: window.sessionStorage.getItem("userid"),
        })
        .then((res) => {
          console.log(删除成功);
        })
        .catch((err) => {
          console.log(err);
        });
        location.reload();
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>
