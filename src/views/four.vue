<template>
  <div style="background-color: #dcdada;">
    <div style="display: flex; margin: 10px">
      <!-- 消息 -->
      <van-icon size="30" name="chat-o" badge="9" />
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
        <div class="name">游客123</div>
        <van-button class="loginbtn" color="#7232df" round plain @click="login"
          >点击登录</van-button
        >
        <span class="person" @click="person">个人主页</span>
      </div>
    </div>
    <!-- 功能 -->
    <div style="background-color:  #dcdada; padding: 15px 0;">
      <van-cell-group inset >
      <van-cell title="账户" value="余额" />
      <van-cell title="收藏" value="" />
      <van-cell title="订阅" value="" />
      <van-cell title="阅读记录" value="" label="" />
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
      <van-cell title="阅读勋章" value="" is-link/>
    </van-cell-group>
    </div>
  </div>

  <bar></bar>
</template>
  <script setup>
import bar from "../components/bar.vue";
import router from "@/router";
const login = () => {
  // console.log("登录");
  router.push('/login')

};
const setting = () =>{
  router.push('/setting')
}
</script>
    
<style scoped >

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