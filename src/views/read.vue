<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const onClickLeft = () => {
  history.back()
}

const bookData = ref('')

onMounted(() => {
  const fileName = route.query.textFile
  // console.log(fileName)
  axios.get(`http://localhost:3000/uploads/text/${fileName}`)
    .then(res => {
      bookData.value = res.data
    })
})
</script>

<template>
  <div class="fixed top-0 left-0 w-screen">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="pt-18 px-2">
    {{ bookData }}
  </div>
</template>

