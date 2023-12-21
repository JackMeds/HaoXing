<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>我的有声小说</span>
        </template>
    </van-nav-bar>
    <van-cell>
        <template #icon>
            <div class="image-wrapper">
                <img src="/NTS_Images/book1.png" alt="">
            </div>
        </template>
        <template #title>
            <div class="title">
                <span class="BookName">有声小说名称</span>
                <span>第一章</span>
                <span>2023-10-2</span>
            </div>
        </template>
        <template #right-icon>
            <div class="right-icon">
                <van-icon name="delete-o" size="30px" color="#FF4242" />
            </div>
        </template>
    </van-cell>
</template>
<script setup>
import { ref } from 'vue';

const onClickLeft = () => history.back();

</script>
<style scoped lang="scss">
.van-cell {
    padding: 5px 20px;

    .image-wrapper {
        position: relative;
        width: 60px;
        padding-bottom: 80px;
        /* Adjust the aspect ratio as needed */
        overflow: hidden;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
        }
    }

    .title {
        margin-left: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .BookName {
            font-size: 18px;
            color: #333333;
            margin-right: 10px;
        }

        span {
            font-size: 12px;
            color: #333333;
        }
    }

    .right-icon {
        display: flex;
        justify-content: center;
        align-items: center;

    }
}</style>