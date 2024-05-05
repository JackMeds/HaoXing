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
  axios.get(`http://localhost:3000/record/buy?userid=${userid}`)
    .then((res) => {
      recordsList.value = res.data
    })
})
</script>

<template>
  <div class="px-2 mt-3">
    <div class="grid grid-cols-3 gap-2">
      <div
        class="w-full h-40 overflow-hidden"
        v-for="item in recordsList"
        @click="router.push(`/detail/${item.id}`)"
      >
        <div class="w-full h-35 overflow-hidden">
          <van-image
            :src="`http://127.0.0.1:3000/uploads/cover/${item.img}`"
          />
        </div>
        <p class="mt-1 text-gray-700 w-26 truncate">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
