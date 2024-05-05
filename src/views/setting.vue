<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import axios from 'axios'

const router = useRouter()
const onClickLeft = () => history.back()
const showAvatarMod = ref(false)
const avatarFile = ref()
const loggedIn = ref(false)
const userId = ref(0)

if (window.sessionStorage.getItem('user')) {
  loggedIn.value = true
  userId.value = window.sessionStorage.getItem('userid')
}

const onAvatarUp = () => {
  if (loggedIn.value) {
    let avatarFormData = new FormData()
    avatarFormData.append('avatarFile', avatarFile.value[0].file)
    avatarFormData.append('userId', userId.value)
    axios.post('http://localhost:3000/avatar', avatarFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      // console.log(res)
      showToast('上传成功')
      showAvatarMod.value = false
      router.push('/four')
    })
  } else {
    showToast('请先登录')
  }
}
</script>

<template>
  <van-nav-bar
    title="设置"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-cell title="修改头像" is-link @click="showAvatarMod=true" />
  <van-popup
    v-model:show="showAvatarMod"
    position="bottom"
    :style="{ height: '25vh' }"
  >
    <van-form @submit="onAvatarUp">
      <van-cell-group inset>
        <van-field name="coverUploader" :rules="[{ required: true, message: '请上传文件' }]">
          <template #input>
            <van-uploader
              v-model="avatarFile"
              max-count="1"
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          上传
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

