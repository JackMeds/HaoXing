<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>播放有声小说</span>
        </template>
    </van-nav-bar>
    <div class="infor-box">
        <div class="image-wrapper">
            <img :src="NovelImg" alt="">
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
        <van-tab title="评论">
            <div class="commentInput">
                <van-field class="commentInputArea" v-model="commentInputData" rows="2" autosize type="textarea"
                    maxlength="50" placeholder="发布一条友善的评论吧" show-word-limit />
            </div>
            <div class="commentBtnContainer">
                <div class="commentBtn" @click="publishComment()">
                    <p>发表评论</p>
                </div>
            </div>
            <div class="commentList">
                <div class="commentItem" v-for="(item, index) in commentList">
                    <!-- 评论 -->
                    <div class="commentMain">
                        <div class="commentItemLeft">
                            <div class="userPic">
                                <img src="/NTS_Images/customer-center.svg" alt="">
                            </div>
                        </div>
                        <div class="commentItemRight">
                            <div class="userName">
                                <p>{{ item.user.nickName }}</p>
                            </div>
                            <div class="commentTime">
                                <p>{{ item.createdAt }}</p>
                            </div>
                            <div class="commentText">
                                <p>{{ item.content }}</p>
                            </div>
                            <div class="function">
                                <div class="reply" @click="doReply(index)">
                                    <img src="/NTS_Images/comment.png" alt="">
                                    <span>回复</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="writeReply" v-if="item.showReplyInput">
                        <div class="commentInput">
                            <van-field class="commentInputArea" v-model="replyInputData" rows="2" autosize type="textarea"
                                maxlength="50" placeholder="发布一条友善的评论吧" show-word-limit />
                        </div>
                        <div class="commentBtnContainer">
                            <div class="commentBtn" @click="publishReply(index)">
                                <p>回复</p>
                            </div>
                        </div>
                    </div>
                    <!-- 回复 -->
                    <div class="replyList">
                        <div class="replyItem" v-for="replyItem in item.replies">
                            <div class="replyItemLeft">
                                <div class="userPic">
                                    <img src="/NTS_Images/customer-center.svg" alt="">
                                </div>
                            </div>
                            <div class="replyItemRight">
                                <div class="userName">
                                    <p>{{ replyItem.user.nickName }}</p>
                                </div>
                                <div class="replyText">
                                    <p>{{ replyItem.content }}</p>
                                </div>
                                <div class="function">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-tab>
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
let NovelImg = router.currentRoute.value.query.NovelImg;
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
                likeCount.value += 1;
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
                likeCount.value -= 1;
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
                collectCount.value += 1;
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
                collectCount.value -= 1;
                console.log(collectCount.value);
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => {
        console.log(err);
    });
}
//查询评论
const commentList = ref([]);
const getComment = async () => {
    try {
        const res = await axios.get(`/NTS/getCommentList`, {
            params: {
                novelName: novelName
            }
        })
        console.log(res.data);
        // 遍历评论列表，为每个评论对象添加showReplyInput属性并初始化为false
        commentList.value = res.data.data.map(comment => {
            comment.showReplyInput = false;
            // // 在回复列表中也为每个回复对象添加showReplyInput属性并初始化为false
            // comment.replies.forEach(reply => {
            //     reply.showReplyInput = false;
            // });
            // 假设 item.updatedAt 是您要格式化的时间字符串
            const isoString = comment.createdAt;
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
            comment.createdAt = displayString // 输出格式化后的日期时间

            return comment;
        });
        console.log(commentList.value);
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getComment();
})

//发布评论
const commentInputData = ref("");
const publishComment = async () => {
    try {
        const res = await axios.post(`/NTS/createComment`, {
            novelName: novelName,
            usersid: 1,
            content: commentInputData.value
        });
        console.log(res.data);
        commentInputData.value = "";
        getComment();
    } catch (error) {
        console.log(error);
    }
}

//打开回复输入框
const replyInputData = ref("");
const showReplyInput = ref(false);
const doReply = (index) => {
    // 遍历评论列表，将除了当前点击的评论外的其他评论的showReplyInput属性设置为false
    commentList.value.forEach((comment, i) => {
        if (i != index) {
            comment.showReplyInput = false;
        }
    });
    // 将当前点击的评论的showReplyInput属性设置为true
    commentList.value[index].showReplyInput = !commentList.value[index].showReplyInput;
}
//发布回复
const publishReply = async (index) => {
    try {
        if (replyInputData.value == "") {
            alert("回复内容不能为空");
            return;
        } else {
            const res = await axios.post(`/NTS/createReply`, {
                commentId: commentList.value[index].id,
                usersid: 1,
                content: replyInputData.value
            });
            console.log(res.data);
            replyInputData.value = "";
            getComment();
        }
    } catch (error) {
        console.log(error);
    }
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


.commentInput {
    width: 95%;
    margin: 0 auto;

    .commentInputArea {
        width: 100%;
    }
}

.commentBtnContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .commentBtn {
        width: 60px;
        height: 30px;
        background-color: #efb336;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;

        p {
            font-size: 14px;
            color: #ffffff;
        }
    }
}


.commentBtnContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .commentBtn {
        margin: 10px;
        width: 100%;
        height: 30px;
        background-color: #efb336;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;

        p {
            font-size: 14px;
            color: #ffffff;
        }
    }
}

.commentList {
    width: 100%;

    .commentItem {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .commentMain {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: row;
        margin: 10px 0;

        .commentItemLeft {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;

            .userPic {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .commentItemRight {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .userName {
                p {
                    font-size: 16px;
                    color: #333333;
                }
            }

            .commentTime {
                p {
                    font-size: 12px;
                    color: #999999;
                }
            }

            .commentText {
                p {
                    font-size: 14px;
                    color: #333333;
                }
            }

            .function {
                display: flex;
                justify-content: space-between;

                .like {
                    display: flex;
                    align-items: center;

                    img {
                        width: 20px;
                        height: 20px;
                    }

                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }

                .reply {
                    display: flex;
                    align-items: center;

                    img {
                        width: 20px;
                        height: 20px;
                    }

                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
        }

        .writeReply {
            width: 100%;

            .replyInput {
                width: 100%;

                .replyInputArea {
                    width: 100%;
                    height: 100px;
                }
            }

            .replyBtnContainer {
                width: 100%;
                display: flex;
                justify-content: flex-end;

                .replyBtn {
                    width: 60px;
                    height: 30px;
                    background-color: #efb336;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 6px;

                    p {
                        font-size: 14px;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.replyList {
    border-top: 1px solid #cacaca;
    width: 80%;
    margin-left: 15%;

    .replyItem {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin: 10px 0;

        .replyItemLeft {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;

            .userPic {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .replyItemRight {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .userName {
                p {
                    font-size: 16px;
                    color: #333333;
                }
            }

            .replyTime {
                p {
                    font-size: 12px;
                    color: #999999;
                }
            }

            .replyText {
                p {
                    font-size: 14px;
                    color: #333333;
                }
            }

            .function {
                display: flex;
                justify-content: space-between;

                .like {
                    display: flex;
                    align-items: center;

                    img {
                        width: 20px;
                        height: 20px;
                    }

                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
        }
    }
}
</style>