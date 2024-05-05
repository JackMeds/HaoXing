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
        :desc="item.detail"
        :title="item.title"
        :thumb="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
        @click="$router.push(`/detail/${item.id}`)"
      />
    </div>
    <div v-else>
      <van-empty image="search" description="没有找到想要的" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HaoXingSearch',

  data() {
    return {
      searchInfo: '',
      bookList: [],
    }
  },

  mounted() {
  },

  methods: {
    onSearch() {
      this.$axios
        .post('http://localhost:3000/newsList/list', {
          sous: this.searchInfo,
        })
        .then((res) => {
          this.bookList = res.data
          console.log(this.bookList)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    onCancel() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
