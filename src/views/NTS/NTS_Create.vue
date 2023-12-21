<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>制作有声小说</span>
        </template>
    </van-nav-bar>
</template>
<script setup>
import { ref } from 'vue';

const onClickLeft = () => history.back();

</script>
<style scoped lang="scss"></style>