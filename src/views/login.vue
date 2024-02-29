<template>
  <div class="auth-container">
    <van-tabs v-model:active="activeTab">
      <van-tab title="登录">
        <form @submit.prevent="login">
          <van-field
            v-model="loginForm.username"
            label="用户名"
            required
          ></van-field>
          <van-field
            v-model="loginForm.password"
            label="密码"
            type="password"
            required
          ></van-field>
          <van-button type="primary" native-type="submit">登录</van-button>
        </form>
      </van-tab>
      <van-tab title="注册">
        <form @submit.prevent="register">
          <van-field
            v-model="registerForm.username"
            label="用户名"
            required
          ></van-field>
          <van-field
            v-model="registerForm.password"
            label="密码"
            type="password"
            required
          ></van-field>
          <van-button type="primary" native-type="submit">注册</van-button>
        </form>
      </van-tab>
    </van-tabs>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import axios from "axios";
import { showToast } from "vant";
export default {
  name: "AuthComponent",
  setup() {
    const activeTab = ref("login");
    const loginForm = ref({ username: "", password: "" });
    const registerForm = ref({ username: "", password: "" });

    const login = () => {
      // console.log('Login form submitted:', loginForm.value);
      axios
        .get("http://localhost:3000/users?username=" + loginForm.value)
        .then((response) => {
          const users = response.data;

          const foundUser = users.find(
            (user) =>
              user.username === loginForm.value.username &&
              user.password === loginForm.value.password
          );
          console.log(loginForm.value.username );
          console.log(loginForm.value.password );
          if (foundUser) {
            showToast("登录成功");
            // toast("登录成功");
            window.sessionStorage.setItem("user", this.username);
            window.sessionStorage.setItem("userid", foundUser.userid);
            router.push("/four");
            // this.$router.push({
            //   path: "/four",
            // });
          } else {
            showToast("用户名或密码错误");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const register = () => {
      console.log("Register form submitted:", registerForm.value);
      // 这里可以添加注册逻辑
    };

    return {
      activeTab,
      loginForm,
      registerForm,
      login,
      register,
    };
  },
};
</script>
  
  <style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
  