<!-- NovelReader.vue -->
<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" >
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>
    <div class="novel-content">
      <h1>{{ currentChapter.chapter_name }}</h1>
      <p v-for="(paragraph, index) in currentChapter.content" :key="index">
        {{ paragraph }}
      </p>
    </div>
    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        <van-button type="primary" @click="prevChapter">上一章</van-button>
      </van-grid-item>
      <van-grid-item>
        <van-button type="primary"  @click="nextChapter">下一章</van-button>
      </van-grid-item>
    </van-grid>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      chapters: [
        { title: "第一章", content: ["什么，太庙被雷电击中了，祖宗牌位可有损坏？”看着边关发来的急奏，本就忧心忡忡的崇祯皇帝一下子瘫坐在了龙椅上。","众所周知，“太庙”是古代皇帝的宗庙，在“家天下”的古代，太庙是一个国家核心权力的象征，皇帝更是“天”的子孙，"] },
        { title: "第二章", content: ["第二章内容"] },
        // 更多章节内容
      ],
      currentChapterIndex: 0,
    };
  },
  computed: {
    currentChapter() {
      return this.chapters[this.currentChapterIndex];
    },
  },
  mounted(){
    // this.getInfo()
  },
  methods: {
    getInfo(){
        this.$axios
        .get("http://localhost:3000/newsList/chapter")
        .then((res) => {
          let arr = res.data;
          console.log(arr);
          this.chapters=res.data
          console.log(this.chapters);
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    prevChapter() {
      if (this.currentChapterIndex > 0) {
        this.currentChapterIndex--;
      }
    },
    nextChapter() {
      if (this.currentChapterIndex < this.chapters.length - 1) {
        this.currentChapterIndex++;
      }
    },
  },
};
</script>
  
  <style scoped>
/* 可选的样式 */
.novel-content {
  padding: 20px;
}
</style>
  