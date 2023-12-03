<template>
  <div>
    <Header />
    <div style="height: 200px"></div>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 跳转注册 -->

    <div style="margin-left: 20px">
      <router-link to="/register" class="reg">没有账户点击注册</router-link>
    </div>

    <Tab />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/header.vue";
import Tab from "@/components/tab.vue";
export default {
  name: "Login",
  components: {
    Header,
    Tab,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      axios
        .get("http://localhost:3000/users?username=" + this.username)
        .then((response) => {
          const users = response.data;

          const foundUser = users.find(
            (user) =>
              user.username === this.username && user.password === this.password
          );

          if (foundUser) {
            this.$toast("登录成功");
            window.sessionStorage.setItem("user", this.username);
            window.sessionStorage.setItem("userid", foundUser.userid);
            this.$router.push({
              path: "/person",
            });
          } else {
            this.$toast("用户名或密码错误");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.reg {
  color: #1989fa;
}
</style>
