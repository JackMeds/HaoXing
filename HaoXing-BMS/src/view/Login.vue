<template>
  <div class="loginbox">
    <el-row justify="center">
      <el-col :span="6">
        <h2 class="title">有声小说后台管理系统</h2>
      </el-col>
    </el-row>

    <el-row class="row-bg" justify="center">
      <el-col :span="6">
        <el-form :model="form">
          <el-form-item
            ><el-input placeholder="输入用户名" v-model="form.username" />
          </el-form-item>
          <el-form-item
            ><el-input
              placeholder="输入密码"
              type="password"
              v-model="form.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btnlogin" @click="onSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { ElNotification } from "element-plus";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // 实现登录
      if (this.form.username == "admin" && this.form.password == "123") {
        window.sessionStorage.setItem("admininfo",this.form.username)
        ElNotification({
          title: "提示",
          message: "登录成功",
          type: "success",
        });
        this.$router.push({
          path:"/home"
        })
      } else {
        ElNotification({
          title: "提示",
          message: "用户名或密码错误",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.loginbox {
  width: 100%;
  background-image: url(../assets/img/loginbgc.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
.title {
  margin-top: 200px;
  color: rgb(0, 0, 0);
  margin-bottom: 50px;
  text-align: center;
}
.btnlogin {
  width: 100%;
}
</style>