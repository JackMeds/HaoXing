<template>
  <div>
    <Header />
    <div style="height: 200px"></div>
    <!-- 表单 -->
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
        <van-field
          v-model="password1"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请输入确认密码' }]"
        />
        <van-field
          v-model="tel"
          name="电话"
          label="电话"
          placeholder="请输入电话"
          :rules="[{ required: true, message: '请输入电话' }]"
        />
        <van-field
          v-model="sex"
          name="性别"
          label="性别"
          placeholder="请输入性别"
          :rules="[{ required: true, message: '请输入性别' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <!-- 跳转注册 -->
    <van-row justify="center">
      <router-link to="/login" class="reg">返回登陆页</router-link>
      <van-col span="2"></van-col>
    </van-row>

    <Tab />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/header.vue";
import Tab from "@/components/tab.vue";
export default {
  name: "Reg",
  components: { Header, Tab },

  data() {
    return {
      username: "",
      password: "",
      password1: "",
      sex: "",
      tel: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.password == this.password1) {
        axios
          .post("http://localhost:3000/users/add", {
            username: this.username,
            password: this.password,
            sex: this.sex,
            tel: this.tel,
          })
          .then((res) => {
            if (res.data.code == 1) {
              this.$toast("注册成功");
              this.$router.push("/login");
            } else {
              this.$toast("注册失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        showFailToast("确认密码错误");
      }
    },
  },
};
</script>

<style scoped>
.reg {
  color: #1989fa;
}
</style>
