<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import router from '@/router'

import bar from '@/components/bar.vue'
import { getRandomItems } from '@/utils/utils.js'
import Recommend from '@/views/recommend/index.vue'

const bookData = ref([])
const swipeList = ref([])
const recommendList = ref([])
const hotBookList = ref([])
const newBookList = ref([])
const typeList = ref()
const categoryList = ref([])
const currCate = ref()

const recData = ref([])

// 搜索
const searchInfo = ref('')
const search = () => {
  router.push('/search')
}

const detail = (id) => {
  // console.log(id)
  router.push('/detail/' + id)
}

const onRecommendChange = () => {
  recommendList.value = getRandomItems(bookData.value, 6)
}

// const getRandomCategory = (categoryId) => {
//   categoryList.value = getRandomItems(bookData.value, categoryId)
// }

const onCateChange = () => {
  // console.log(currCate.value)
  axios.get(`http://localhost:3000/newsList/tag/${currCate.value}`)
    .then(res => {
      categoryList.value = res.data
      // console.log(res)
    })
}

onMounted(async () => {
  const bookRes = await axios.get('http://localhost:3000/newsList')
  bookData.value = bookRes.data
  swipeList.value = getRandomItems(bookData.value, 4)
  recommendList.value = getRandomItems(bookData.value, 6)
  hotBookList.value = getRandomItems(bookData.value, 5)
  newBookList.value = getRandomItems(bookData.value, 5)
  const typeRes = await axios.get('http://localhost:3000/tag')
  typeList.value = typeRes.data

  axios.get('http://localhost:3000/recommend')
    .then((res) => {
      // console.log(res.data)
      recData.value = res.data
    })
})
</script>

<template>
  <!-- 搜索 -->
  <form action="/">
    <van-search
      v-model="searchInfo"
      show-action
      placeholder="请输入搜索关键词"
      @click="search"
    />
  </form>
  <!--     轮播-->
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item
      class="text-center"
      v-for="(item, id) in swipeList"
      :key="id"
    >
      <van-image
        width="200"
        height="200"
        :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
        @click="detail(item.id)"
      />
    </van-swipe-item>
  </van-swipe>
  <!--  推荐区域  -->
  <div class="px-5 pb-5">
    <div>
      <h2 class="text-lg text-gray-800 font-bold my-3">为你推荐</h2>
      <div class="grid grid-cols-3 gap-2">
        <div
          class="w-full h-35 bg-gray-200 overflow-hidden"
          v-for="item in recommendList"
          @click="router.push(`detail/${item.id}`)"
        >
          <van-image
            :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
          />
        </div>
      </div>
      <div
        class="text-center text-gray-800 mt-2 py-2 bg-gray-100 rounded"
        @click="onRecommendChange"
      >
        <p>换一批</p>
      </div>
    </div>

    <!--  飙升榜  -->
    <div class="pt-5">
      <h2 class="text-lg text-gray-800 font-bold my-3">飙升榜</h2>
      <div>
        <div class="w-full flex gap-2 overflow-x-scroll overflow-y-hidden">
          <div
            class="flex flex-col shrink-0"
            v-for="item in hotBookList"
            @click="router.push(`detail/${item.id}`)"
          >
            <div class="w-26 h-35 bg-gray-200">
              <van-image
                :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
              />
            </div>
            <!--            <p class="mt-1 text-gray-700">Book title</p>-->
          </div>
        </div>
      </div>

    </div>
    <!--  新书榜  -->
    <div class="pt-5">
      <h2 class="text-lg text-gray-800 font-bold my-3">新书榜</h2>
      <div>
        <div class="w-full flex gap-2 overflow-x-scroll">
          <div
            class="flex flex-col shrink-0"
            v-for="item in newBookList"
            @click="router.push(`detail/${item.id}`)"
          >
            <div class="w-26 h-35 bg-gray-200 overflow-hidden">
              <van-image
                :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
              />
            </div>
            <p class="mt-1 text-gray-700 w-26 truncate">{{ item.title }}</p>
          </div>

        </div>
      </div>
    </div>
    <!--      @change="getRandomCategory(4)"-->
    <van-tabs
      @change="onCateChange"
      class="mt-5"
      v-model:active="currCate"
    >
      <van-tab
        v-for="(item, id) in typeList"
        :key="id"
        :title="item.title"
        :name="item.time"
      >
        <div class="grid grid-cols-3 gap-2 mt-2">
          <div
            class="w-full h-35 bg-gray-200 overflow-hidden"
            v-for="item in categoryList"
            @click="router.push(`/detail/${item.id}`)"
          >
            <van-image
              :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
  <div>
    <h2 class="mt-5 text-xl font-bold px-5">书友天地</h2>
    <recommend />
  </div>
  <bar />
</template>

