<template>
  <van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="newspaper-o" to="/news">妖簿</van-tabbar-item>
  <van-tabbar-item icon="orders-o" to="/knowledge">解妖</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/person">陋室</van-tabbar-item>
</van-tabbar>
</template>

<script>
export default {
    data() {
    return {
      active: 0,
    };
  },

}
</script>

<style>

</style>