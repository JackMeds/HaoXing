<template>
  <div>
    <Header></Header>
    <van-empty description="登录之后可以查看" v-if="isempty" />

    <div v-else>
      <h3 style="text-align: center">陋室</h3>
      <h5 style="text-align: center; color: #ccc">斯是陋室，为吾德馨</h5>
      <van-cell-group>
        <!-- 头像 -->
        <div
          class="head"
          style="display: flex; align-items: center; margin: 10px"
        >
          <div
            style="
              width: 60px;
              height: 60px;
              border-radius: 50%;
              border: 2px solid black;
              overflow: hidden;
              flex-shrink: 0;
            "
          >
            <img style="width: 100%; height: 100%" src="../assets/img/tx.jpg" />
          </div>
          <h3 class="name" style="margin-left: 10px; text-align: right">
            {{ username }}
          </h3>
        </div>

        <div>
          <van-card>
            <template #title>
              <van-grid :column-num="2" center>
                <!-- 修改密码按钮 -->
                <van-grid-item
                  icon="edit"
                  title="展示弹出层"
                  is-link
                  @click="showPopup"
                  text="修改密码"
                />
                <!-- 弹出框 -->
                <van-popup
                  v-model:show="show"
                  :style="{ padding: '60px', width: '60%', height: '30%' }"
                >
                  <van-form class="form">
                    旧密码:
                    <input
                      class="pass"
                      v-model="oldpwd"
                      name="oldpwd"
                      type="password"
                      placeholder="填写原密码"
                      :rules="[{ required: true, message: '请填写原密码' }]"
                    />
                    <br />
                    新密码:
                    <input
                      class="pass"
                      v-model="newpwd"
                      name="newpwd"
                      type="password"
                      placeholder="新密码"
                      :rules="[{ required: true, message: '请填写新密码' }]"
                    />
                    <br />
                    确认密码:
                    <input
                      class="pass"
                      v-model="crmpwd"
                      name="crmpwd"
                      type="password"
                      placeholder="确认密码"
                      :rules="[{ required: true, message: '请填写确认密码' }]"
                    />
                    <br />

                    <div style="margin: 16px">
                      <van-button
                        round
                        block
                        type="primary"
                        native-type="submit"
                        @click="submit"
                      >
                        修改
                      </van-button>
                    </div>
                  </van-form>
                </van-popup>
                <!-- 购物车按钮 -->
                <van-grid-item
                  icon="cart-circle-o"
                  @click="buy"
                  text="购物车"
                />
              </van-grid>
            </template>
          </van-card>
        </div>
        <br />
        <van-cell title="退出" icon="revoke" is-link @click="logout" />
      </van-cell-group>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Tab from "@/components/tab.vue";
import { ref } from "vue";
import axios from "axios";
export default {
  components: { Header, Tab },
  data() {
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    return {
      username: "",
      oldpwd: "",
      newpwd: "",
      crmpwd: "",
      isempty: true,
      show,
      showPopup,
      users: "",
    };
  },
  mounted() {
    const user = window.sessionStorage.getItem("user");
    if (user != null) {
      this.username = user;
      this.isempty = false;
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.submit();
  },
  methods: {
    submit() {
      const username = window.sessionStorage.getItem("user");
      if (username) {
        axios
          .get("http://localhost:3000/users?username=" + username)
          .then((res) => {
            if (res.data.length > 0) {
              this.users = res.data[0]; // 修改赋值给users
              if (this.users.password === this.oldpwd) {
                console.log("原密码相同");
                if (this.newpwd == this.crmpwd) {
                  axios
                    .post("http://localhost:3000/users/repwd", {
                      username: this.username,
                      newpwd: this.newpwd,
                    })
                    .then((res) => {
                      if (res) {
                        this.$toast("修改成功");
                      } else {
                        this.$toast("修改失败");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  console.log("确认密码错误");
                }
              } else {
                console.log("原密码不同");
                this.$toast("原密码不同");
              }
            } else {
              console.log("用户不存在");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("用户未登录");
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.isempty = true;
      this.username = "";
    },
    buy(id) {
      this.$router.push("/shop/");
    },
  },
};
</script>
  
<style scoped>
.form {
  width: 100%;
  margin-top: 30px;
}
.pass {
  width: 80%;
  margin-left: 20px;
  height: 20px;
}
</style>
