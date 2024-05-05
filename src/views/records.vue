<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const router = useRouter()
const recordsList = ref([])
const onClickLeft = () => history.back()

onMounted(() => {
  const userid = window.sessionStorage.getItem('userid')
  axios.get(`http://localhost:3000/record?userid=${userid}`) 
    .then((res) => {
      console.log(res.data)
      recordsList.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div>
    <van-nav-bar
      title="浏览记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
<!--      <template #right>-->
<!--        <van-icon name="search" size="18" />-->
<!--      </template>-->
    </van-nav-bar>

    <div v-if="recordsList.length">
      <van-card
        v-for="item in recordsList"
        :key="item.id"
        :desc="item.detail"
        :title="item.title"
        :thumb="`http://localhost:3000/uploads/cover/${item.img}`"
        @click="router.push(`/detail/${item.id}`)"
      />
    </div>
    <div v-else>
      <van-empty image="search" description="暂时没有看过的书" />
    </div>
  </div>
</template>



