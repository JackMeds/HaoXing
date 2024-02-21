<template lang="html">
    <van-tabs v-model:active="tabs_active" sticky swipeable>
        <van-tab title="全部">
            <div class="book-list">
                <div class="book-list-item" v-for="item in bookList" :key="item.id">
                    <div class="image-wrapper" @click="toPlay(item.title)">
                        <img :src="item.img" alt="">
                    </div>
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </van-tab>
        <van-tab title="收藏">
            <div class="book-list">
                <div class="book-list-item" v-for="item in collectBookList" :key="item.id">
                    <div class="image-wrapper" @click="toPlay(item.title)">
                        <img :src="item.img" alt="">
                    </div>
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </van-tab>
    </van-tabs>
</template>
<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

const bookList = ref([]);
const collectBookList = ref([]);
onMounted(() => {
    axios.get('/NTS/GetBookList').then(res => {
        console.log(res.data);
        bookList.value = res.data.data.data;
    });
    axios.get('/NTS/getUserCollectSoundBook').then(res => {
        console.log(res.data);
        collectBookList.value = res.data.data.data;
    });
});

const toPlay = (title) => {
    router.push({
        path: '/NTS/NTS_Play',
        query: {
            novelID: 1,
            chapterID: 0,
            novelName: title,
            chapterName: "全一章",
        }
    });
}

// Define props to receive the bookList from the parent component
// const props = defineProps({
//     bookList: {
//         type: Array,
//         required: true
//     }
// });

const tabs_active = ref(0);
</script>
<style lang="scss">
.book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;

    .book-list-item {
        width: 48%;
        margin-bottom: 10px;

        .image-wrapper {
            position: relative;
            width: 100%;
            padding-bottom: 133.33%;
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

        p {
            margin-top: 10px;
            font-size: 14px;
            color: #333333;
        }
    }
}
</style>