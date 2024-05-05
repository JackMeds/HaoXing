<script setup>
import bar from '../components/bar.vue'
import Recommend from '../views/recommend/index.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'
import { getRandomItems } from '@/utils/utils.js'
import Collect from '@/views/collect.vue'
import Subscribe from '@/views/subscribe.vue'

const randomShelf = ref([])
const randomSubscribe = ref([])
const bookList = ref([])
const active = ref(0)
const userid = ref()
const detail = (id) => {
  router.push('detail/' + id)
}

const getInfo = async () => {
  try {
    const res = await axios.get('http://localhost:3000/tag')
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}
const loggedIn = ref(false)
if (window.sessionStorage.getItem('user')) {
  loggedIn.value = true
  userid.value = window.sessionStorage.getItem('userid')
}
onMounted(async () => {
  const bookRes = await axios.get('http://localhost:3000/newsList')
  randomShelf.value = getRandomItems(bookRes.data, 5)
  randomSubscribe.value = getRandomItems(bookRes.data, 3)
})
</script>

<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab title="书友推荐">
        <Recommend />
      </van-tab>
      <van-tab title="书架">
        <div v-if="loggedIn">
          <Collect />
        </div>
        <div v-else>
          <van-empty description="请先登录" />
        </div>
      </van-tab>
      <van-tab title="我的订阅">
        <div v-if="loggedIn">
          <Subscribe />
        </div>
        <div v-else>
          <van-empty description="请先登录" />
        </div>
      </van-tab>
    </van-tabs>
    <bar></bar>
  </div>
</template>
