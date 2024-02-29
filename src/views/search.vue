<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchInfo"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div v-if="bookList.length">
      <van-card
      v-for="(item,index) in bookList"
      :key="index"
        tag="标签"
        :desc="item.detail"
        :title="item.title"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      />
    </div>
    <div v-else>不存在</div>
  </div>
</template>

<script>
export default {
  name: "HaoXingSearch",

  data() {
    return {
      searchInfo: "",
      bookList: [],
    };
  },

  mounted() {},

  methods: {
    onSearch() {
      this.$axios
        .post("http://localhost:3000/newsList/list", {
          sous: this.searchInfo,
        })
        .then((res) => {
          this.bookList = res.data;
          console.log(this.bookList);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onCancel() {
        this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
</style>