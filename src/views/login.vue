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
          <div style="text-align: center;">
            <van-button type="primary" native-type="submit">登录</van-button>
          </div>
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
          <van-field
            v-model="registerForm.confirmPassword"
            label="确认密码"
            type="password"
            required
            :rules="[{
              validator: checkPassword,
              message: '两次输入密码不一致'
            }]"
          ></van-field>
          <van-field
            v-model="registerForm.sex"
            label="性别"
            required
          ></van-field>
          <van-field
            v-model="registerForm.tel"
            label="手机号"
            required
            :rules="[{
              validator: checkPhoneNumber,
              message: '请输入有效的手机号码'
            }]"
          ></van-field>
          <div style="text-align: center;">
            <van-button type="primary" native-type="submit">注册</van-button>
          </div>
        </form>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'; // 导入useRouter方法
import { showToast } from "vant";

export default {
  name: "AuthComponent",
  setup() {
    const activeTab = ref("login");
    const loginForm = ref({ username: "", password: "" });
    const registerForm = ref({ username: "", password: "", confirmPassword: "", sex: "", tel: "" });
    
    const router = useRouter(); // 在setup函数中获取router对象

    const login = () => {
      axios
        .get("http://localhost:3000/users?username=" + loginForm.value.username)
        .then((response) => {
          const users = response.data;
          const foundUser = users.find(
            (user) =>
              user.username === loginForm.value.username &&
              user.password === loginForm.value.password
          );
          if (foundUser) {
            showToast("登录成功");
            window.sessionStorage.setItem("user", foundUser.username);
            window.sessionStorage.setItem("userid", foundUser.userid);
            window.sessionStorage.setItem("wallet", foundUser.wallet);
            router.push("/"); // 页面跳转到主页
          } else {
            showToast("用户名或密码错误");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const register = () => {
      axios.post("http://localhost:3000/users/add", {
        username: registerForm.value.username,
        password: registerForm.value.password,
        sex: registerForm.value.sex,
        tel: registerForm.value.tel
      })
      .then(response => {
        showToast("注册成功");
      })
      .catch(error => {
        console.error("注册失败：", error);
        showToast("注册失败，请稍后再试");
      });
    };

    const checkPassword = (rule, value) => {
      if (value !== registerForm.value.password) {
        return false;
      }
      return true;
    };

    const checkPhoneNumber = (rule, value) => {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      return reg.test(value);
    };

    return {
      activeTab,
      loginForm,
      registerForm,
      login,
      register,
      checkPassword,
      checkPhoneNumber
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
