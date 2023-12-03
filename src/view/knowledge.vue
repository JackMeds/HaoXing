<template>
  <div>
    <Header></Header>
    <div class="title">周边商场</div>
    <van-divider />
    <van-card
      v-for="(item, index) in knowledgelist"
      :key="index"
      @click="detail(item.shopid)"
      :num="item.num"
      :price="item.price"
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://localhost:3000/' + item.pic"
    />
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
      knowledgelist: [],
    };
  },
  methods: {
    getInfo() {
      this.$axios
        .get("http://localhost:3000/shoplist")
        .then((res) => {
          console.log(res.data)
          this.knowledgelist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detail(shopid) {
      this.$router.push("/knowledgeDetail/" + shopid);
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>