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
                <div class="button" @click="like()">
                    <img src="/NTS_Images/like-o.png" alt="">
                    <p>点赞 {{ likeCount }}</p>
                </div>
                <div class="button" @click="collect()">
                    <img src="/NTS_Images/collect-o.png" alt="">
                    <p>收藏 {{ collectCount }}</p>
                </div>
                <div class="button">
                    <img src="/NTS_Images/comment.png" alt="">
                    <p>评论 {{ commentCount }}</p>
                </div>
            </div>
        </div>
    </div>
    <van-tabs v-model:active="active" animated>
        <van-tab title="原文" class="pre-line">{{ novel }}</van-tab>
        <van-tab title="评论">评论</van-tab>
    </van-tabs>

    <div class="bottom-placeholder"></div>
    <div class="audio-player-box">
        <audio-player ref="audioPlayer" :audio-list="audioList.map(elm => elm.url)" :show-prev-button="false"
            :show-next-button="false" theme-color="#efb336" />
    </div>
</template>
<script setup>
import AudioPlayer from '@liripeng/vue-audio-player';
import { getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;
const router = useRouter();

//接受参数
let novelID = router.currentRoute.value.query.novelID;
let chapterID = router.currentRoute.value.query.chapterID;
let novelName = router.currentRoute.value.query.novelName;
let chapterName = router.currentRoute.value.query.chapterName;
let novel = ref('');

//获取小说
const getnovel = () => {
    axios.get('/NTS/getnovel', {
        params: {
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        novel.value = res.data.data.data;
    }).catch(err => {
        console.log(err);
    });
}
//获取小说信息
const likeCount = ref(0);
const collectCount = ref(0);
const commentCount = ref(0);
const soundBookId = ref(0);
const getnovelInfor = () => {
    axios.get('/NTS/getnovelInfor', {
        params: {
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        // {
        //     "id": 2,
        //         "userid": 1,
        //             "title": "[凌晨] 信使",
        //                 "content": "SoundBooks/[凌晨] 信使_1706531092149.mp3",
        //                     "img": null,
        //                         "likeCount": 0,
        //                             "collectCount": 0,
        //                                 "commentCount": 0,
        //                                     "viewCount": 0,
        //                                         "createdAt": "2024-01-29T12:26:56.000Z",
        //                                             "updatedAt": "2024-01-29T12:26:56.000Z",
        //                                                 "usersid": null,
        //                                                     "soundBookId": null
        // }
        likeCount.value = res.data.data.data.likeCount;
        collectCount.value = res.data.data.data.collectCount;
        commentCount.value = res.data.data.data.commentCount;
        soundBookId.value = res.data.data.data.id;
    }).catch(err => {
        console.log(err);
    });
}
//findSoundBookByNovelName
const findSoundBookByNovelName = () => {
    axios.get('/NTS/findSoundBookByNovelName', {
        params: {
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        audioList.value[0].url = `http://127.0.0.1:3000/${res.data.data.data}`;
    }).catch(err => {
        console.log(err);
    });
}
//查询点赞状态
const checkLikeStatus = () => {
    axios.get('/NTS/getLikeStatus', {
        params: {
            userId: 1,
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        likeCount.value = res.data.data.likeCount;
    }).catch(err => {
        console.log(err);
    });
}
//onMounted
onMounted(() => {
    getnovel();
    getnovelInfor();
    findSoundBookByNovelName();
});

const onClickLeft = () => history.back();

const currentAudioName = ref(novelName);
const currentAudioChapter = ref(chapterName);

const audioList = ref([
    {
        name: 'audio1',
        url: ''
    },
]);


const active = ref(0);
//like
const like = () => {
    //查询点赞状态
    axios.get('/NTS/getLikeStatus', {
        params: {
            userId: 1,
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        console.log(res.data.data.isLike);
        likeCount.value = res.data.data.likeCount;
        console.log(soundBookId.value);
        if (res.data.data.isLike == false) {
            //未点赞
            console.log('未点赞dh');
            console.log(novelName)
            axios.post('/NTS/likeSoundBook', {
                userId: 1,
                novelName: novelName,
                likeCount: likeCount.value,
                soundBookId: soundBookId.value
            }).then(res => {
                console.log(likeCount.value);
                likeCount.value+=1;
                console.log(likeCount.value);
            }).catch(err => {
                console.log(err);
            });
        } else {
            //已点赞
            console.log('已点赞dh');
            axios.post('/NTS/dislikeSoundBook', {
                userId: 1,
                novelName: novelName,
                likeCount: likeCount.value,
                soundBookId: soundBookId.value
            }).then(res => {
                console.log(likeCount.value);
                likeCount.value-=1;
                console.log(likeCount.value);
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
}
//collect
const collect = () => {
    //查询点赞状态
    axios.get('/NTS/getCollectStatus', {
        params: {
            userId: 1,
            novelName: novelName
        }
    }).then(res => {
        console.log(res.data);
        console.log(res.data.data.isCollect);
        collectCount.value = res.data.data.collectCount;
        console.log(soundBookId.value);
        if (res.data.data.isCollect == false) {
            //未点赞
            console.log('未收藏dh');
            console.log(novelName)
            axios.post('/NTS/collectSoundBook', {
                userId: 1,
                novelName: novelName,
                collectCount: collectCount.value,
                soundBookId: soundBookId.value
            }).then(res => {
                console.log(collectCount.value);
                collectCount.value+=1;
                console.log(collectCount.value);
            }).catch(err => {
                console.log(err);
            });
        } else {
            //已点赞
            console.log('已收藏dh');
            axios.post('/NTS/uncollectSoundBook', {
                userId: 1,
                novelName: novelName,
                collectCount: collectCount.value,
                soundBookId: soundBookId.value
            }).then(res => {
                console.log(collectCount.value);
                collectCount.value-=1;
                console.log(collectCount.value);
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
}

</script>
<style scoped lang="scss">
.pre-line {
    white-space: pre-wrap;
    padding: 10px;
    padding-bottom: 40px;
}

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
            padding: 0 20px;
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