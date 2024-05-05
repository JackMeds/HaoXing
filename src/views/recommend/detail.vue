<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { readableDate } from '@/utils/formateDate.js'

const route = useRoute()
const id = route.params.id
const recData = ref([])
const commentData = ref([])
const commentContent = ref('')

const onCommentPub = () => {
  axios.post(`http://localhost:3000/comment`, {
      userid: window.sessionStorage.getItem('userid'),
      content: commentContent.value,
      recommendId: id
    })
    .then(res => {
      commentContent.value = ''
      // refresh data
      axios.get(`http://localhost:3000/recommend/${id}`)
        .then(res => {
          recData.value = res.data
        })

      axios.get(`http://127.0.0.1:3000/comment?recommendId=${id}`)
        .then(res => {
          commentData.value = res.data
        })
    })
}

const onClickLeft = () => {
  history.back()
}

onMounted(() => {
  axios.get(`http://localhost:3000/recommend/${id}`)
    .then(res => {
      recData.value = res.data
    })

  axios.get(`http://127.0.0.1:3000/comment?recommendId=${id}`)
    .then(res => {
      commentData.value = res.data
    })
})
</script>

<template>
  <van-nav-bar
    title="评论"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
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
        <div>
          <van-icon name="comment-o"></van-icon>
          <span class="ml-2">{{ item.comment_count }}</span>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 w-full px-5 py-3 flex">
      <van-field v-model="commentContent" placeholder="发表评论……" />
      <van-button type="primary" class="shrink-0" @click="onCommentPub">发表</van-button>
    </div>
    <div class="mt-5 mb-3">
      <h2 class="text-lg font-bold">评论区</h2>
    </div>
    <div>
      <div
        v-for="item in commentData" :key="item.id"
        class="px-3 py-2 bg-gray-50 mb-2"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="bg-gray-100 w-8 h-8 rounded-full">
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
        <p class="mt-3 pl-3">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
