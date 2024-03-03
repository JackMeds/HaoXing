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
        <van-button round type="primary" @click=shoucang()>收藏</van-button>
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
      record:[],
    };
  },

  mounted() {
    this.getInfo();
    this.getRecord()
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
    shoucang(){
      const userid = window.sessionStorage.getItem("userid");
      const shopid = this.id;

      if (userid && shopid) {
        // 添加userid和shopid的有效性验证
        this.$axios
          .post("http://localhost:3000/gouwucar/", {
            userid: userid,
            shopid: this.$route.params.id,
          })
          .then((res) => {
            if ((res.data = "useid")) {
              this.showToast('提示内容');
              // 如果成功加入购物车
              this.dialogMessage = "添加成功！";
            } else {
              this.dialogMessage = "添加失败！";
            }
          })
          .catch((err) => {
            console.log("加入收藏失败");
          })
          .finally(() => {
            this.showDialog = true;
          });
      } else {
        this.showToast = "您还未登录！";
        this.showDialog = true;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getRecord(){
      this.record.userid=window.sessionStorage.userid
      //获取当前时间
      const date = new Date();
      const year = date.getFullYear();
      const month = this.formatTimeUnit(date.getMonth() + 1);
      const day = this.formatTimeUnit(date.getDate());
      const hours = this.formatTimeUnit(date.getHours());
      const minutes = this.formatTimeUnit(date.getMinutes());
      const seconds = this.formatTimeUnit(date.getSeconds());
      this.record.creatTime=`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      this.record.id=this.$route.params.id
      console.log(this.record);
      if (this.record.userid) {
        // 添加userid和shopid的有效性验证
        this.$axios
          .post("http://localhost:3000/record/add", {
            id:this.record.id,//书本id
            userid:this.record.userid,
            createTime:this.record.creatTime     
          })
          .then((res) => {
            if ((res.data = "useid")) {
              this.showToast('提示内容');
              // 如果成功加入购物车
              this.dialogMessage = "添加成功！";
            } else {
              this.dialogMessage = "添加失败！";
            }
          })
          .catch((err) => {
            console.log("加入购物车失败");
          })
          .finally(() => {
            this.showDialog = true;
          });
      } else {
        this.dialogMessage = "您还未登录！";
        this.showDialog = true;
      }
    },
    formatTimeUnit(unit) {
      // 将单个数字格式化为两位数，例如：1 -> '01', 12 -> '12'
      return unit < 10 ? '0' + unit : unit;
    }
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