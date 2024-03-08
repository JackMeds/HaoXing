<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>我的有声小说</span>
        </template>
    </van-nav-bar>
    <van-cell v-for="item in bookList">
        <template #icon>
            <div class="image-wrapper" @click="toPlay({ title: item.title, img: item.img })">
                <img :src="item.img" alt="">
            </div>
        </template>
        <template #title>
            <div class="title" @click="toPlay({ title: item.title, img: item.img })">
                <!-- <span class="BookName">{{ item.title }}</span> -->
                <van-text-ellipsis class="BookName" :content="item.title" />
                <span>全一章</span>
                <span>{{ item.updatedAt }}</span>
            </div>
        </template>
        <template #right-icon>
            <div class="right-icon" @click="triggerFileInput(item.title)">
                <van-icon name="photo-o" size="30px" />
            </div>
            <div class="right-icon" @click="deleteBook(item.title)">
                <van-icon name="delete-o" size="30px" color="#FF4242" />
            </div>
        </template>
    </van-cell>
    <input type="file" @change="handleFileChange" style="display: none" ref="fileInput">
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

const toPlay = ({ title, img }) => {
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

const fileInput = ref(null);
let currentTitle = ref(''); // 用于存储当前选择上传图片的项目标题

function triggerFileInput(title) {
    currentTitle.value = title; // 保存当前标题
    fileInput.value.click();
}

function handleFileChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const formData = new FormData();
        formData.append('novelName', currentTitle.value);
        formData.append('image', files[0]);

        axios.post('/NTS/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                    console.log('图片上传成功');
                    // 根据需要更新书籍列表或执行其他操作
                }
            })
            .catch(error => {
                console.error('图片上传失败', error);
            });
    } else {
        console.log('没有选择图片');
    }
    // 清空文件输入以允许再次上传同一文件
    fileInput.value.value = null;
}

const changeImg = (title) => {
    // 获取文件输入元素，这里假设你有一个ID为'imageInput'的文件输入
    const imageInput = document.getElementById('imageInput');

    if (imageInput.files.length > 0) {
        const formData = new FormData();

        // 添加小说名称和图片到FormData
        formData.append('novelName', title);
        formData.append('image', imageInput.files[0]); // 这里只上传第一个选中的文件

        // 使用axios发送包含文件和标题的POST请求
        axios.post('/NTS/uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
                // 这里可以处理成功上传后的逻辑，例如更新书籍列表
                console.log('图片上传成功');
                bookList.value = bookList.value.filter(item => item.title != title);
            }
        }).catch(error => {
            console.error('图片上传失败', error);
        });
    } else {
        console.log('没有选择图片');
    }
};

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
        margin-left: 10px;
    }
}
</style>