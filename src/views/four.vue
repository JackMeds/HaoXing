<script setup>
import bar from '../components/bar.vue'
import router from '@/router'
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import axios from 'axios'

const loggedIn = ref(false)
const username = ref('')
const userId = ref()
const wallet = ref('')
const avatarUrl = ref('avatar.png')
// 页面加载时检查本地存储中是否存在登录状态
if (window.sessionStorage.getItem('user')) {
  loggedIn.value = true
  username.value = window.sessionStorage.getItem('user')
  userId.value = window.sessionStorage.getItem('userid')
  wallet.value = window.sessionStorage.getItem('wallet')
}

const news = () => {
  if (loggedIn.value) {
    router.push('/news')
  } else {
    showToast('请先登录')
  }
}

const unlogin = () => {
  window.sessionStorage.removeItem('user')
  window.sessionStorage.removeItem('userid')
  window.sessionStorage.removeItem('wallet')
  loggedIn.value = false
  router.push('/')
}

const login = () => {
  router.push('/login')
}

const setting = () => {
  router.push('/setting')
}

onMounted(() => {
  if (loggedIn.value) {
    axios.get(`http://localhost:3000/users/wallet?userId=${userId.value}`)
      .then(res => {
        const data = res.data[0]
        console.log(data)
        wallet.value = data.wallet
        avatarUrl.value = data.avatar
        window.sessionStorage.setItem('wallet', data.wallet)
      })
  }
})
</script>

<template>

  <div class="bg-gray-100 py-5 min-h-screen">
    <div class="flex justify-between px-3">
      <!-- 消息 -->
      <!--      <van-icon-->
      <!--        size="30"-->
      <!--        name="chat-o"-->
      <!--        badge="0"-->
      <!--        :badge-props="{showZero: false}"-->
      <!--        @click="news"-->
      <!--      />-->
      <!-- 设置 -->
      <van-icon size="30" name="setting-o" @click="setting" class="ml-auto" />
    </div>
    <!-- 头像、名称 -->
    <div class="flex items-center my-3 px-3">
      <van-image
        round
        width="5rem"
        height="5rem"
        fit="cover"
        :src="`http://localhost:3000/uploads/avatar/${avatarUrl}`"
      />
      <div class="ml-5">
        <div class="text-2xl font-bold" v-if="loggedIn">{{ username }}</div>
        <van-button v-else class="loginbtn" color="#7232df" round plain @click="login"
        >点击登录
        </van-button
        >
      </div>
    </div>
    <!-- 功能 -->
    <div>
      <van-cell-group inset>
        <!--        <van-cell title="修改头像" />-->
        <van-cell title="账户" :value="wallet" @click="router.push('/wallet')" />
        <van-cell title="小说上传" @click="router.push('/upload')" />
        <van-cell title="浏览记录" value="" label="" @click="router.push('/records')" />
      </van-cell-group>
    </div>
    <div class="py-5">
    </div>
    <div>
      <van-cell-group inset>
        <van-cell title="读完" value="" label="今年暂无读完的书" />
      </van-cell-group>
    </div>
    <div class="py-5" v-if="loggedIn">
      <van-cell-group inset>
        <van-cell title="退出登录" @click="unlogin" value="" is-link />
      </van-cell-group>
    </div>
  </div>
  <bar></bar>
</template>

