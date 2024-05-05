<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()
const bookId = route.params.id
const bookDetail = ref({})
const bookImgUrl = ref('')

const showSub = ref(false)
const purchased = ref(false)
const collected = ref(false)

const loggedIn = ref(false)
const userId = ref()
const wallet = ref()
if (window.sessionStorage.getItem('user')) {
  loggedIn.value = true
  userId.value = window.sessionStorage.getItem('userid')
  wallet.value = window.sessionStorage.getItem('wallet')
}
const onClickLeft = () => {
  history.back()
}

const onCollect = () => {
  if (loggedIn.value) {
    axios.post('http://localhost:3000/record', {
      userId: userId.value,
      bookId: bookId,
    }).then(res => {
      showToast(res.data.message)
      collected.value = true
    })
  } else {
    showToast('请先登录')
  }
}

const onSubscribe = () => {
  if (loggedIn.value) {
    showSub.value = true
  } else {
    showToast('请先登录')
  }
}

const onBuyNow = (price) => {
  axios.post('http://localhost:3000/record/buy', {
    userId: userId.value,
    bookId: bookId,
    price: price,
  }).then(res => {
    showToast(res.data.message)
    purchased.value = true
    showSub.value = false
  })
}

const onRead = (textFile) => {
  router.push(`/read?textFile=${textFile}`)
}

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/newsList/${bookId}`)
  bookDetail.value = res.data[0]
  bookImgUrl.value = `http://localhost:3000/uploads/cover/${bookDetail.value.img}`
  // 查询购买和收藏记录
  if (loggedIn.value) {
    const collectStatusRes = await axios.get(`http://localhost:3000/record/collect?userId=${userId.value}&bookId=${bookId}`)
    const purchaseStatusRes = await axios.get(`http://localhost:3000/record/purchase?userId=${userId.value}&bookId=${bookId}`)
    purchased.value = purchaseStatusRes.data.success
    collected.value = collectStatusRes.data.success
  }
})
</script>

<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

    <div class="flex justify-center mt-3">
      <van-image
        width="120"
        height="170"
        :src="bookImgUrl"
        class="flex"
      />
    </div>
    <div class="flex flex-col items-center">
      <h1 class="text-xl mt-5">
        {{ bookDetail.title }}
      </h1>
      <h2 class="mt-2"> 作者：<span class="font-bold">{{ bookDetail.writer }}</span></h2>
    </div>
    <van-grid :column-num="3">
      <van-grid-item>
        9.3分
      </van-grid-item>
      <van-grid-item>
        14.5万人在读
      </van-grid-item>
      <van-grid-item>
        {{ bookDetail.tolenum }}万字
      </van-grid-item>
    </van-grid>
    <div class="px-5 pt-2">
      <p class="text-lg font-bold">简介</p>
      <p class="mt-2">{{ bookDetail.detail }}</p>
    </div>
    <div class="px-2 flex justify-center mt-5">
      <div class="flex w-1/2">
        <van-button type="success" block v-if="collected">已收藏</van-button>
        <van-button type="success" v-else block @click="onCollect">收藏</van-button>
      </div>
      <div class="flex w-1/2">
        <van-button type="primary" v-if="purchased" block @click="onRead(bookDetail.text_file_name)">阅读</van-button>
        <van-button type="primary" v-else block @click="onSubscribe">￥{{ bookDetail.price }} 订阅</van-button>
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="showSub"
    position="bottom"
    :style="{ height: '25vh' }"
  >
    <div class="relative h-full bg-gray-50">
      <div class="px-5 pt-3">
        <h4 class="text-lg font-bold mb-2">确认购买</h4>
        <p class="text-3xl">￥ <span class="font-bold">{{ bookDetail.price }}</span></p>
      </div>
      <div class="absolute bottom-0 left-0">
        <div class="w-screen flex flex-col  px-5 py-5 bg-gray-100">
          <van-button type="primary" @click="onBuyNow(bookDetail.price)">立即支付</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
