<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { showToast } from 'vant'

const coverFileList = ref([])
const textFileList = ref([])
const bookName = ref('')
const description = ref('')
const category = ref()
const author = ref('')

const onSubmit = () => {
  let bookFormData = new FormData()
  bookFormData.append('coverFile', coverFileList.value[0].file)
  bookFormData.append('textFile', textFileList.value[0].file)
  bookFormData.append('bookName', bookName.value)
  bookFormData.append('description', description.value)
  bookFormData.append('author', author.value)
  bookFormData.append('category', category.value)

  axios.post('http://localhost:3000/upload', bookFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    console.log(res)
    showToast('上传成功')
  })
}

const onClickLeft = () => {
  history.back()
}
</script>

<template>
  <van-nav-bar
    title="上传"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="py-3 bg-gray-50 min-h-screen">
    <h1 class="text-lg text-center font-bold mb-4">小说上传</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="bookName"
          name="bookName"
          label="标题"
          placeholder="标题"
          :rules="[{ required: true, message: '请填写标题' }]"
        />
        <van-field
          v-model="description"
          name="description"
          label="简介"
          placeholder="简介"
          :rules="[{ required: true, message: '请填写简介' }]"
        />
        <van-field
          v-model="author"
          name="author"
          label="作者"
          placeholder="作者"
          :rules="[{ required: true, message: '请填写作者' }]"
        />
        <van-field
          v-model="category"
          name="category"
          label="分类"
          placeholder="分类"
          :rules="[{ required: true, message: '请填写分类' }]"
        />
        <van-field name="coverUploader" label="封面上传" :rules="[{ required: true, message: '请上传文件' }]">
          <template #input>
            <van-uploader
              v-model="coverFileList"
              max-count="1"
            />
            <!--            :after-read="afterCoverRead"-->

          </template>
        </van-field>
        <van-field name="textUploader" label="文本上传" :rules="[{ required: true, message: '请上传文件' }]">
          <template #input>
            <van-uploader
              v-model="textFileList"
              max-count="1"
              upload-icon="notes"
              accept=".txt"
            />
            <!--       :after-read="afterTextRead"     -->
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          上传
        </van-button>
      </div>
    </van-form>
  </div>
</template>
