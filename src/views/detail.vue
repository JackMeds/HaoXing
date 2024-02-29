<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>
    <div class="pic">
      <van-image width="120" height="170"
      :src="'http://localhost:3000/' + list.img" 
       />
      <div>
        {{ list.title }}
      </div>
      作者：<strong>{{ list.writer }}</strong>
    </div>
    <van-grid  :column-num="3">
  <van-grid-item>
    9.3分
  </van-grid-item>
  <van-grid-item>
    14.5万人在读
  </van-grid-item>
  <van-grid-item>
    {{ list.tolenum }}万字
  </van-grid-item>
</van-grid>

    <div style="padding-left: 20px; font-size: 18px">简介：</div>
    <div style="padding-left: 26px; font-size: 18px; line-height: 200%">
      {{ list.detail }}
      <div style="text-align: center;" >
        <van-button round type="primary" @click=shoucang(list.id)>收藏</van-button>
        <van-button round type="primary" @click="read(list.id)">开始阅读</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HaoXingDetail",

  data() {
    return {
      id: this.$route.params.id,
      list: [],
    };
  },

  mounted() {
    this.getInfo();
    console.log(this.id);
  },

  methods: {
    getInfo() {
      this.$axios
        .get("http://localhost:3000/newsList")
        .then((res) => {
          let arr = res.data;
          console.log(arr);
          arr.map((element) => {
            if (element.id == this.id) {
              this.list = element;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    read(id){
        this.$router.push('/read')
    },
    shoucagn(id){

    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.pic {
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 25px;
}
</style>