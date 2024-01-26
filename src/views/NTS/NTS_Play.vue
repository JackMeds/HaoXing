<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>播放有声小说</span>
        </template>
    </van-nav-bar>
    <div class="infor-box">
        <div class="image-wrapper">
            <img src="/NTS_Images/book1.png" alt="">
        </div>
        <div class="right-wrapper">
            <div class="text-wrapper">
                <p class="currentAudioName">{{ currentAudioName }}</p>
                <p class="currentAudioChapter">{{ currentAudioChapter }}</p>
            </div>
            <!-- 点赞、收藏、评论 -->
            <div class="button-wrapper">
                <div class="button">
                    <img src="/NTS_Images/like-o.png" alt="">
                    <p>点赞</p>
                </div>
                <div class="button">
                    <img src="/NTS_Images/collect-o.png" alt="">
                    <p>收藏</p>
                </div>
                <div class="button">
                    <img src="/NTS_Images/comment.png" alt="">
                    <p>评论</p>
                </div>
            </div>
        </div>
    </div>
    <van-tabs v-model:active="active" animated>
        <van-tab title="原文">原文</van-tab>
        <van-tab title="评论">评论</van-tab>
    </van-tabs>

    <div class="bottom-placeholder"></div>
    <div class="audio-player-box">
        <audio-player ref="audioPlayer" :audio-list="audioList.map(elm => elm.url)" :before-play="handleBeforePlay"
            :show-prev-button="false" :show-next-button="false" theme-color="#efb336" />
    </div>
</template>
<script setup>
import AudioPlayer from '@liripeng/vue-audio-player';
import { ref } from 'vue';

const onClickLeft = () => history.back();

const currentAudioName = ref('默认有声书播放有声小说播放有声小说播放有声小说播放有声小说');
const currentAudioChapter = ref('默认有声书播放有声小说播放有声小说播放有声小说播放有声小说');

const audioList = ref([
    {
        name: 'audio1',
        url: 'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
    }
]);
const handleBeforePlay = (index) => {
    currentAudioName.value = audioList.value[index].name;
};

const active = ref(0);
</script>
<style scoped lang="scss">
.infor-box {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    border-radius: 6px;
    background-color: #ffffff;

    .right-wrapper {
        margin-left: 10px;
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .text-wrapper {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            .currentAudioName {
                font-size: 20px;
                color: #333333;
                margin-bottom: 10px;
            }

            .currentAudioChapter {
                font-size: 14px;
                color: #999999;
            }
        }

        .button-wrapper {
            display: flex;
            justify-content: space-between;

            .button {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                img {
                    width: 30px;
                    height: 30px;
                }

                p {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
    }

    .image-wrapper {
        position: relative;
        width: 30%;
        padding-bottom: 40%;
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
}

.bottom-placeholder {
    height: 100px;
}

.audio-player-box {
    background-color: #ffffff;
    height: 100px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    z-index: 999;
    position: fixed;
    bottom: 0px;

    .audio-player {
        margin: 0 auto;
        width: 90%;
    }
}
</style>