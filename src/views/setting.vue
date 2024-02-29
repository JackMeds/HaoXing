<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();
</script>

<style scoped>
</style>