<script setup>
import { ref } from 'vue'
import axios from 'axios'

const onClickLeft = () => history.back()

const loggedIn = ref(false)
const userId = ref()
const wallet = ref()
if (window.sessionStorage.getItem('user')) {
  loggedIn.value = true
  wallet.value = window.sessionStorage.getItem('wallet')
  userId.value = window.sessionStorage.getItem('userid')
}
const showCharge = ref(false)
const chargeAmount = ref()

const onCharge = () => {
  axios.post('http://localhost:3000/users/recharge', {
    userId: userId.value,
    chargeAmount: chargeAmount.value
  }).then(res => {
    let tempVal = Number(wallet.value) + Number(chargeAmount.value)
    wallet.value = tempVal
    window.sessionStorage.setItem('wallet', tempVal)
    showCharge.value = false
  })
}
</script>

<template>
  <van-nav-bar
    title="我的账户"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div v-if="loggedIn">
    <div style="text-align: center;color: gold;margin-top: 30px;">
      <van-icon color="" name="gold-coin-o" size="100px" />
    </div>
    <div style="text-align: center;font-size: 18px;color: darkgray;line-height: 26px;"> 我的余额</div>
    <div style="text-align: center;font-size: 28px;color:black;line-height: 36px;font-weight: 800;">¥{{ wallet }}</div>
    <div style="width: 100px;text-align: center;margin: 50px auto;" @click="showCharge=true">
      <van-button type="primary" size="large">充值</van-button>
    </div>
  </div>
  <div v-else>
    <van-empty description="请先登录" />
  </div>
  <van-popup
    v-model:show="showCharge"
    position="bottom"
    :style="{ height: '25vh' }"
  >
    <div class="relative h-full bg-gray-50">
      <div class="px-5 pt-3">
        <h4 class="text-lg font-bold mb-2">请输入充值金额</h4>
        <van-field
          v-model="chargeAmount"
          type="digit"
          placeholder="充值金额"
        />
      </div>
      <div class="absolute bottom-0 left-0">
        <div class="w-screen flex flex-col  px-5 py-5 bg-gray-100">
          <van-button type="primary" @click="onCharge">充值</van-button>
        </div>
      </div>
    </div>
  </van-popup>
</template>
