<template>
  <div>
    <backBar></backBar>
    <div>
      <h2 class="title">{{ list.title }}</h2>
      <van-image :src="'http://localhost:3000/' + list.pic" /><br />
      {{ list.desc }}
      <van-row>
        <van-col span="12">
          <van-button
            icon="cart-o"
            style="
              position: fixed;
              right: 20px;
              bottom: 20px;
              text-align: right;
              font-weight: 600;
            "
            @click="addToCart"
            type="success"
          >
            加入购物车
          </van-button>
        </van-col>
      </van-row>
    </div>

    <van-dialog v-model="showDialog" title="提示" @confirm="showDialog = false">
      {{ dialogMessage }}
    </van-dialog>
  </div>
</template>

<script>
import backBar from "@/components/backBar";
export default {
  components: {
    backBar,
  },

  data() {
    return {
      id: "",
      list: {},
      showDialog: false,
      dialogMessage: "",
      users: {},
      success: true,
    };
  },

  watch: {
    "$route.params.id": function (newId) {
      this.id = newId;
      this.getData();
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getData();
    this.getUserId();
  },
  methods: {
    getUserId() {
      const username = window.sessionStorage.getItem("user");
      if (username) {
        this.$axios
          .get("http://localhost:3000/users?username=" + username)
          .then((res) => {
            if (res.data.length > 0) {
              this.users = res.data[0]; // 修改赋值给users
              console.log(this.users);
            } else {
              console.log("用户不存在");
            }
          })
          .catch((err) => {
            console.log("获取数据失败");
          });
      } else {
        console.log("用户未登录");
      }
    },
    getData() {
      this.$axios
        .get("http://localhost:3000/shoplist/")
        .then((res) => {
          if (res.statusText == "OK" && res.data.length > 0) {
            this.list = res.data[this.id - 1];
          } else {
            console.log("获取数据失败");
          }
        })
        .catch((err) => {
          console.log("获取数据失败");
        });
    },
    addToCart() {
      const userid = window.sessionStorage.getItem("userid");
      const shopid = this.list.shopid;

      if (userid && shopid) {
        // 添加userid和shopid的有效性验证
        this.$axios
          .post("http://localhost:3000/gouwucar/", {
            userid: userid,
            shopid: shopid,
          })
          .then((res) => {
            if ((res.data = "useid")) {
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
  },
};
</script>

<style scoped>
* {
  padding: 2px;
}
.title {
  font-size: 20px;
  text-align: center;
}
</style>
