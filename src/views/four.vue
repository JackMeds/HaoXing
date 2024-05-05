<template>
  <div style="background-color: #dcdada;">
    <div style="display: flex; margin: 10px">
      <!-- 消息 -->
      <van-icon size="30" name="chat-o" badge="9" @click="news"/>
      <!-- 设置 -->
      <van-icon size="30" style="margin-left: auto" name="setting-o" @click="setting" />
    </div>

    <!-- 头像、名称 -->
    <div style="display: flex; margin: 10px">
      <van-image
        round
        width="5rem"
        height="5rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
      <div class="right">
        <div class="name" v-if="loggedIn">{{ username }}</div>
        <van-button v-else class="loginbtn" color="#7232df" round plain @click="login"
          >点击登录</van-button
        >
      </div>
    </div>
    <!-- 功能 -->
    <div style="background-color:  #dcdada; padding: 15px 0;">
      <van-cell-group inset >
        <van-cell title="账户" :value="wallet" />
        <van-cell title="收藏" value="" />
        <van-cell title="订阅" value="" />
        <van-cell title="浏览记录" value="" label="" @click="router.push('/records')"/>
      </van-cell-group>
    </div>
    <div style="background-color:  #dcdada; padding: 15px 0;">
      <van-cell-group inset >
        <van-cell title="我在读" value="" label="今年暂无在读的书" />
      </van-cell-group>
    </div>
    <div style="background-color:  #dcdada; padding: 15px 0;">
      <van-cell-group inset >
        <van-cell title="读完" value="" label="今年暂无读完的书" />
      </van-cell-group>
    </div>
    <div style="background-color:  #dcdada; padding: 15px 0;">
      <van-cell-group inset >
        <van-cell title="退出登录" @click="unlogin" value="" is-link/>
      </van-cell-group>
    </div>
  </div>
  <bar></bar>
</template>

<script setup>
import bar from "../components/bar.vue";
import router from "@/router";
import { ref } from "vue";
import { showToast } from "vant";

const loggedIn = ref(false);
const username = ref("");
const wallet = ref('')
// 页面加载时检查本地存储中是否存在登录状态
if (window.sessionStorage.getItem("user")) {
  loggedIn.value = true;
  username.value = window.sessionStorage.getItem("user");
  wallet.value = window.sessionStorage.getItem("wallet");
}

const news =()=>{
  if(loggedIn.value){
  router.push('/news')
  }else{
    showToast("请先登录");
  }
};

const unlogin = () => {
  window.sessionStorage.removeItem("user");
  loggedIn.value = false;
  router.push("/");
};

const login = () => {
  router.push("/login");
};

const setting = () => {
  router.push("/setting");
};

const person = () => {
  router.push("/person");
};
</script>

<style scoped>
.name {
  line-height: 24px;
  font-size: 24px;
  margin: 10px;
}
.loginbtn {
  margin: 0 10px;
}
.person {
  font-size: 14px;
  color: gray;
  margin-left: 80px;
}
</style>
