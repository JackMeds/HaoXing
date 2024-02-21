<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>我的有声小说</span>
        </template>
    </van-nav-bar>
    <van-cell v-for="item in bookList">
        <template #icon>
            <div class="image-wrapper" @click="toPlay({title:item.title, img:item.img})">
                <img :src="item.img" alt="">
            </div>
        </template>
        <template #title>
            <div class="title" @click="toPlay({title:item.title, img:item.img})">
                <span class="BookName">{{ item.title }}</span>
                <span>全一章</span>
                <span>{{ item.updatedAt }}</span>
            </div>
        </template>
        <template #right-icon>
            <div class="right-icon" @click="deleteBook(item.title)">
                <van-icon name="delete-o" size="30px" color="#FF4242" />
            </div>
        </template>
    </van-cell>
</template>
<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showConfirmDialog } from 'vant';

const onClickLeft = () => history.back();

const router = useRouter();

const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

const bookList = ref([]);
const collectBookList = ref([]);
onMounted(() => {
    axios.get('/NTS/GetBookList').then(res => {
        console.log(res.data);
        bookList.value = res.data.data.data;
        bookList.value.forEach(item => {

            // 假设 item.updatedAt 是您要格式化的时间字符串
            const isoString = item.updatedAt;
            console.log(isoString); // 输出ISO字符串
            // 将ISO字符串转换为Date对象
            const date = new Date(isoString);

            // 格式化日期和时间
            // 您可以根据需要调整以下格式
            const formattedDate = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedTime = date.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // 将日期和时间组合在一起
            const displayString = `${formattedDate} ${formattedTime}`;
            item.updatedAt = displayString // 输出格式化后的日期时间

        });
    });
});

const toPlay = ({title, img}) => {
    router.push({
        path: '/NTS/NTS_Play',
        query: {
            novelID: 1,
            chapterID: 0,
            novelName: title,
            chapterName: "全一章",
            NovelImg: img
        }
    });
}

const deleteBook = (title) => {
    showConfirmDialog({
        title: '删除！',
        message:
            '确定要删除吗（永久！）',
    })
        .then(() => {
            // on confirm
            axios.post('/NTS/deleteUserSoundBook', {
                novelName: title
            }).then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                    bookList.value = bookList.value.filter(item => item.title != title);
                }
            });
        })
        .catch(() => {
            // on cancel
        });
}

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
}
</style>