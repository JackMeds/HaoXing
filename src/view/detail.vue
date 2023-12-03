<template>
    <div v-if="newsLoaded">
      <backBar></backBar>
      <h1>{{ currentNews.title }}</h1>
      <p>地域：{{ timeMap[currentNews.time] }}</p>
      <div class="contain">{{ currentNews.detail }}</div>
      <van-button
        style="text-align: right; font-weight: 600"
        type="info"
        @click="next"
        >下一篇</van-button
      >
    </div>
    <div v-else>数据加载中...</div>
  </template>
  
  <script>
  import backBar from "@/components/backBar";
  export default {
    components: { backBar },
    data() {
      return {
        id: this.$route.params.id,
        news: [],
        isLoading: true,
        timeMap: {
          '1': '中国',
          '2': '希腊',
          '3': '日本',
        },
      };
    },
    created() {
      this.getInfo();
    },
    computed: {
      newsLoaded() {
        return this.news.length > 0 && !this.isLoading;
      },
      currentNews() {
        return this.news.find((item) => item.id === Number(this.id)) || {};
      },
    },
    methods: {
      getInfo() {
        this.$axios
          .get("http://localhost:3000/newslist")
          .then((res) => {
            if (res.statusText === "OK") {
              if (Array.isArray(res.data)) {
                this.news = res.data; // 将返回的数组直接赋值给 this.news
              } else {
                console.log("返回数据不是数组形式");
              }
            } else {
              console.log("获取失败");
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
      next() {
        let id = Number(this.id) + 1;
        let nextRoute = "/detail/" + id;
        if (this.news.length > id) {
          if (this.$route.fullPath !== nextRoute) {
            // 判断当前路由是否与目标路由相同
            this.$router.push(nextRoute);
            this.id = id; // 更新 id 的值
          } else {
            console.log("已经是最后一篇了");
          }
        } else {
          console.log("已经是最后一篇了");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    padding: 2px;
  }
  h1 {
    font-size: 18px;
    text-align: center;
  }
  .p{
    font-style: italic;
  font-weight: bold;
  }
  .contain {
    text-indent: 36px;
    font-style: italic;
  font-weight: bold;
  }
  </style>