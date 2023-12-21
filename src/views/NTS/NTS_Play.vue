<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>播放有声小说</span>
        </template>
    </van-nav-bar>
        <p class="currentAudioName">{{ currentAudioName }}</p>
        <div class="image-wrapper">
            <img src="/NTS_Images/book1.png" alt="">
        </div>
        <div class="audio-player-box">
            <audio-player ref="audioPlayer" :audio-list="audioList.map(elm => elm.url)" :before-play="handleBeforePlay"
                :show-prev-button="false" :show-next-button="false" theme-color="#FF867E" />
        </div>
</template>
<script setup>
import AudioPlayer from '@liripeng/vue-audio-player';
import { ref } from 'vue';

const onClickLeft = () => history.back();

const currentAudioName = ref('默认有声书');

const audioList = ref([
    {
        name: 'audio1',
        url: 'https://www.0dutv.com/upload/dance/F25F74A0B8FF82503241801D0E2CA5CD.mp3'
    }
]);
const handleBeforePlay = (index) => {
    currentAudioName.value = audioList.value[index].name;
};
</script>
<style scoped lang="scss">
.currentAudioName {
    text-align: center;
    font-size: 16px;
    color: #333333;
    margin-bottom: 10px;
}

.image-wrapper {
    position: relative;
    margin: auto;
    width: 90%;
    padding-bottom: 130%;
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

.audio-player-box {
    position: fixed;
    bottom: 100px;
    width: 100%;
    z-index: 999;

    .audio-player {
        margin: 0 auto;
        width: 90%;
    }
}
</style>