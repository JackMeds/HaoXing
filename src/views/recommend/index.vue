<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

import { readableDate } from '@/utils/formateDate.js'

const router = useRouter()
const userid = window.sessionStorage.getItem('userid')

const recData = ref([])
const showPlusRec = ref(false)
const recommendContent = ref('')

const user = ref({
  username: '',
  userid: '',
  avatar: '',
})

const onComment = (recId) => {
  // 判断是否登录
  if (window.sessionStorage.getItem('user')) {
    router.push(`/recommend/${recId}`)
  } else {
    showToast('请先登录')
  }
}

const onLike = (hasLiked, recommendId) => {
  // 判断是否登录
  if (window.sessionStorage.getItem('user')) {
    if (hasLiked) {
      // showToast('已赞')
      axios.post(`http://localhost:3000/like/cancel`, {
          userid,
          recommendId,
        })
        .then(res => {
            axios.get(`http://localhost:3000/recommend/likes?userid=${userid}`)
              .then((res) => {
                recData.value = res.data
              })
          }
        )
    } else {
      // showToast('没有赞')
      axios.post(`http://localhost:3000/like/create`, {
          userid,
          recommendId,
        })
        .then(res => {
            console.log(res)
            axios.get(`http://localhost:3000/recommend/likes?userid=${userid}`)
              .then((res) => {
                recData.value = res.data
              })
          }
        )
    }

  } else {
    showToast('请先登录')
  }
}

const onRecommendPlus = () => {
  // 判断是否登录
  if (window.sessionStorage.getItem('user')) {
    showPlusRec.value = true
  } else {
    showToast('请先登录')
  }
}

const onPublish = () => {
  // getUserInfo
  user.value.username = window.sessionStorage.getItem('user')
  user.value.userid = window.sessionStorage.getItem('userid')

  axios.post('http://localhost:3000/recommend', {
    userid: user.value.userid,
    content: recommendContent.value
  }).then((res) => {
    // console.log(res, 'success')
    showToast('发表成功')
    showPlusRec.value = false
    recommendContent.value = ''

    // refresh data
    axios.get('http://localhost:3000/recommend')
      .then((res) => {
        // console.log(res.data)
        recData.value = res.data
      })
  })
}

onMounted(() => {
  axios.get(`http://localhost:3000/recommend/likes?userid=${userid}`)
    .then((res) => {
      recData.value = res.data
    })
  // console.log(recData.value)
})

</script>

<template>
  <div class="relative w-screen pb-15">
    <div
      v-for="item in recData" :key="item.id"
      class="px-3 py-2"
    >
      <div class="bg-gray-50 rounded px-2 py-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="bg-gray-100 w-10 h-10 rounded-full">
              <van-image
                round
                fit="cover"
                :src="`http://localhost:3000/uploads/avatar/${item.avatar}`"
              />
            </div>
            <p class="ml-2">{{ item.username }}</p>
          </div>
          <p>{{ readableDate(item.date) }}</p>
        </div>
        <p class="mt-2 px-3">{{ item.content }}</p>
        <div class="flex justify-between mt-4 px-6">
          <div @click="onComment(item.id)">
            <van-icon name="comment-o"></van-icon>
            <span class="ml-2">{{ item.comment_count }}</span>
          </div>
          <div @click="onLike(item.has_liked, item.id)">
            <van-icon name="like-o" v-if="item.has_liked === 0"></van-icon>
            <van-icon name="like" color="red" v-if="item.has_liked === 1"></van-icon>
            <span class="ml-2">{{ item.like_count }}</span>
          </div>

        </div>
      </div>
    </div>

    <div class="fixed bottom-30 right-5" @click="onRecommendPlus">
      <div class="w-10 h-10 bg-blue-500 rounded-full center">
        <van-icon name="plus" color="white" />
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="showPlusRec"
    position="bottom"
    :style="{ height: '100vh' }"
  >
    <div class="relative h-full">
      <van-field
        v-model="recommendContent"
        rows="12"
        autosize
        type="textarea"
        placeholder="写下这一刻的想法……"
      />
      <div class="absolute bottom-0 left-0">
        <div class="w-screen flex justify-between px-5 py-5 bg-gray-100">
          <van-button type="default" @click="showPlusRec=false">取消</van-button>
          <van-button type="primary" @click="onPublish">发表</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
