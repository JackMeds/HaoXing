<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>制作有声小说</span>
        </template>
    </van-nav-bar>
    <div class="Menu_Container">
        <div class="top" @click="openNovelList()">
            <p>{{ novel.name ? novel.name : "请选择小说" }}</p>
            <p>{{ novel.chapter ? novel.chapter : "请选择章节" }}</p>
        </div>
        <div class="bottom">
            <div class="left" @click="showDefault()">
                <p>全文声线</p>
                <p>{{ defaultVoice ? defaultVoice : "默认设置" }}</p>
            </div>
            <div class="right">
                <div class="top" @click="inputKey()">
                    <p class="ellipsis-text">{{ APIKey ? APIKey : "输入OpenAI API key" }}</p>
                    <p>{{ APIKey ? "欢迎使用" : "以进行AI识别" }}</p>
                </div>
                <div class="bottom" @click="AIidentify()">
                    <p>AI识别</p>
                    <p>识别小说角色</p>
                </div>
            </div>
        </div>
    </div>
    <van-tabs v-model:active="tabs_active" sticky swipeable class="tabs">
        <van-tab title="原文预览" class="novel">
            <div class="noRole" v-if="!showNovel">
                <p>请先选择小说</p>
            </div>
            <p v-if="normalNovel" class="pre-line">{{ novel.content ? novel.content : "" }}</p>
            <van-highlight class="pre-line" :keywords="highlightContent" :source-string="novel.content"
                highlight-class="custom-class" />
        </van-tab>
        <van-tab title="角色声线选择（AI）" class="roles">
            <div class="noRole" v-if="!showRoleList">
                <p>请先进行AI识别，才能分析出小说角色</p>
            </div>
            <van-cell-group v-if="showRoleList">
                <van-cell is-link v-for="(item, index) in PreProcess.Roles" :value="item.voiceName" size="large"
                    style="padding: 15px 20px;" @click="setVoice(item.RoleID)">
                    <template #title>
                        <span class="custom-title">{{ item.RoleName }}</span>
                        <van-tag type="primary"></van-tag>
                    </template>

                </van-cell>
            </van-cell-group>
        </van-tab>
    </van-tabs>
    <div class="Bottom_Bar">
        <div class="left" @click="doNTS()">
            <p>开始制作</p>
        </div>
        <div class="right" @click="reset()">
            <p>重置</p>
        </div>
    </div>
    <van-popup v-model:show="showNovelList" overlay position="bottom" round class="DefaultVoiceList">
        <van-picker title="选择小说" :columns="NovelColumns" @confirm="onConfirmNovel" @cancel="onCancelNovelList"
            style="background-color: rgb(255, 255, 255);" />
    </van-popup>
    <van-dialog v-model:show="showInputKey" title="请输入OpenAI API key" show-cancel-button>
        <van-cell-group inset style="margin: 10px 20px;">
            <van-field v-model="APIKey" label="key" placeholder="请输入OpenAI API key" />
        </van-cell-group>
    </van-dialog>
    <van-popup v-model:show="showDefaultVoice" overlay position="bottom" round class="DefaultVoiceList">
        <van-picker title="选择全文默认声线" :columns="DefaultVoiceColumns" @confirm="onConfirmDefaultVoice"
            @cancel="onCancelDefaultVoice" style="background-color: rgb(255, 255, 255);" />
    </van-popup>
    <van-popup v-model:show="showVoice" overlay position="bottom" round class="DefaultVoiceList">
        <van-picker title="选择角色声线" :columns="VoiceColumns" @confirm="onConfirmVoice" @cancel="onCancelVoice"
            style="background-color: rgb(255, 255, 255);" />
    </van-popup>
    <div v-show="showLoading" class="loading">
        <div class="littleBox"><van-loading size="24px" color="#000" vertical>加载中...</van-loading></div>
    </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();

const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

//打开小说列表
const showNovelList = ref(false);
const showNovel = ref(false);
const NovelColumns = [];
const onConfirmNovel = ({ selectedValues }) => {
    showNovelList.value = false;
    normalNovel.value = true;
    showRoleList.value = false;
    defaultVoice.value = '';
    axios.get('/NTS/getnovel', {
        params: {
            novelName: selectedValues[0]
        }
    }).then((response) => {
        console.log(response.data.data);
        novel.value = {
            novelID: 0,
            chapterID: 0,
            name: selectedValues[0],
            chapter: "全一章",
            content: response.data.data.data
        };
        showNovel.value = true;
        console.log(novel.value);
    }).catch((error) => {
        console.log(error);
    });
};
const onCancelNovelList = () => {
    showNovelList.value = false;
};
const openNovelList = () => {
    axios.get('/NTS/getnovellist').then((response) => {
        console.log(response.data);
        response.data.data.data.forEach((elm) => {
            NovelColumns.push({
                text: elm,
                value: elm,
            });
        });
        showNovelList.value = true;
    }).catch((error) => {
        console.log(error);
    });
};

//预处理数据
const PreProcess = ref({
    novelID: 0,
    chapterID: 0,
    novelName: '',
    chapterName: '',
    content: [],
    Roles: []
});

// 声音列表
var SoundList = [
    {
        voice: "zh-CN-Xiaoxiao",
        rgb: "rgb(255, 192, 203)",
        name: "小晓-中国大陆",
        listen: "/voice/pure_zh-CN-Xiaoxiao.mp3",
    },
    {
        voice: "zh-CN-Xiaoyi",
        rgb: "rgb(173, 216, 230)",
        name: "小艺-中国大陆",
        listen: "/voice/pure_zh-CN-Xiaoyi.mp3",
    },
    {
        voice: "zh-CN-Yunjian",
        rgb: "rgb(255, 255, 224)",
        name: "云健-中国大陆",
        listen: "/voice/pure_zh-CN-Yunjian.mp3",
    },
    {
        voice: "zh-CN-Yunxi",
        rgb: "rgb(144, 238, 144)",
        name: "云曦-中国大陆",
        listen: "/voice/pure_zh-CN-Yunxi.mp3",
    },
    {
        voice: "zh-CN-Yunxia",
        rgb: "rgb(152, 251, 152)",
        name: "云霞-中国大陆",
        listen: "/voice/pure_zh-CN-Yunxia.mp3",
    },
    {
        voice: "zh-CN-Yunyang",
        rgb: "rgb(230, 230, 250)",
        name: "云阳-中国大陆",
        listen: "/voice/pure_zh-CN-Yunyang.mp3",
    },
    {
        voice: "zh-HK-HiuGaai",
        rgb: "rgb(255, 228, 181)",
        name: "曉佳-中国香港",
        listen: "/voice/pure_zh-HK-HiuGaai.mp3",
    },
    {
        voice: "zh-HK-HiuMaan",
        rgb: "rgb(211, 211, 211)",
        name: "曉文-中国香港",
        listen: "/voice/pure_zh-HK-HiuMaan.mp3",
    },
    {
        voice: "zh-HK-WanLung",
        rgb: "rgb(240, 230, 140)",
        name: "雲龍-中国香港",
        listen: "/voice/pure_zh-HK-WanLung.mp3",
    },
    {
        voice: "zh-TW-HsiaoChen",
        rgb: "rgb(224, 255, 255)",
        name: "小真-中国台湾",
        listen: "/voice/pure_zh-TW-HsiaoChen.mp3",
    },
    {
        voice: "zh-TW-YunJhe",
        rgb: "rgb(240, 255, 240)",
        name: "雲哲-中国台湾",
        listen: "/voice/pure_zh-TW-YunJhe.mp3",
    },
    {
        voice: "zh-TW-HsiaoYu",
        rgb: "rgb(240, 128, 128)",
        name: "小玉-中国台湾",
        listen: "/voice/pure_zh-TW-HsiaoYu.mp3",
    },
];

const novel = ref(
    {
        novelID: 0,
        chapterID: 0,
        name: '',
        chapter: '',
        content: ''
    }
);



const onClickLeft = () => history.back();

const tabs_active = ref(0);

const highlightContent = ref(['']);

const normalNovel = ref(true);

//Choose Default Voice
const showDefaultVoice = ref(false);

const DefaultVoiceColumns = [];

const showDefault = () => {
    SoundList.forEach((elm) => {
        DefaultVoiceColumns.push({
            text: elm.name,
            value: elm.voice
        });
    });
    showDefaultVoice.value = true;
};

const defaultVoice = ref('');
const defaultVoiceValue = ref('');

const onConfirmDefaultVoice = ({ selectedValues }) => {
    defaultVoiceValue.value = selectedValues[0];
    defaultVoice.value = SoundList.find(elm => elm.voice === selectedValues[0])?.name || '';
    showDefaultVoice.value = false;
};
const onCancelDefaultVoice = () => {
    showDefaultVoice.value = false;
};


//AI identify
const showInputKey = ref(false);
const showLoading = ref(false);
const showRoleList = ref(false);

const APIKey = ref('');

const inputKey = () => {
    showInputKey.value = true;
};

const AIidentify = async () => {
    if (!APIKey.value) {
        showInputKey.value = true;
        return;
    }
    showLoading.value = true;
    try {
        const response = await axios.post('/NTS/handlenovel', {
            content: novel.value.content,
            APIKey: APIKey.value
        });
        showLoading.value = false;
        showRoleList.value = true;
        console.log(response.data);
        console.log(response.data.data);
        // console.log(JSON.parse(response.data.data).content);
        console.log(response.data.data.content);
        PreProcess.value = response.data.data;
        response.data.data.content.forEach((elm) => {
            highlightContent.value.push(elm.text);
        });
        normalNovel.value = false;
    } catch (error) {
        console.log(error);
        normalNovel.value = false;
    }
};

//Set Voice
const showVoice = ref(false);
const VoiceColumns = [];
const temporaryID = ref('');

const setVoice = (RoleID) => {
    SoundList.forEach((elm) => {
        VoiceColumns.push({
            text: elm.name,
            value: elm.voice
        });
    });
    showVoice.value = true;
    temporaryID.value = RoleID;
};
const onConfirmVoice = ({ selectedValues }) => {
    showVoice.value = false;
    PreProcess.value.Roles.forEach((elm) => {
        if (elm.RoleID === temporaryID.value) {
            elm.voice = selectedValues[0];
            elm.voiceName = SoundList.find(elm => elm.voice === selectedValues[0])?.name || '';
            elm.rgb = SoundList.find(elm => elm.voice === selectedValues[0])?.rgb || '';
        }
    });
    temporaryID.value = '';
    console.log(PreProcess.value);
};

const onCancelVoice = () => {
    showVoice.value = false;
};

//do process
const doProcess = async () => {
    try {
        let markedText = novel.value.content;
        //提纯markedText文本,删除其中的/n换行符
        markedText = markedText.replace(/\n/g, '');
        PreProcess.value.content.forEach((keyword, index) => {
            markedText = markedText.split(keyword.text).join(`\0${keyword.text}\0`);
        });
        // console.log(markedText);
        // 按标记分割文本
        const segments = markedText.split('\0');

        // 组装 JSON 对象数组
        const result = segments.map(segment => {
            const keywordIndex = PreProcess.value.content.findIndex(keyword => keyword.text === segment);
            return {
                text: segment,
                voice: PreProcess.value.Roles.find(elm => elm.RoleID === PreProcess.value.content[keywordIndex]?.RoleID)?.voice || defaultVoiceValue.value || 'zh-CN-Xiaoxiao',
                rgb: PreProcess.value.Roles.find(elm => elm.RoleID === PreProcess.value.content[keywordIndex]?.RoleID)?.rgb || 'default',
            };
        }).filter(segment => segment.text !== '');
        //删除result中text小于5个字的元素
        for (let i = 0; i < result.length; i++) {
            if (result[i].text.length < 5) {
                result.splice(i, 1);
                i--;
            }
        }
        // console.log(result);
        // result.push({
        //     text: '完完完完完完完完完完完完完完',
        //     voice: 'zh-CN-Xiaoxiao',
        //     rgb: 'default',
        // });
        return result;
    } catch (error) {
        console.log(error);
    }
};
//NTS
const doNTS = async () => {
    showLoading.value = true;
    await doProcess().then(async (result) => {
        // console.log(result);
        try {
            const response = await axios.post('/NTS/nts', {
                userid: 1,
                novelID: novel.value.novelID,
                chapterID: novel.value.chapterID,
                novelName: novel.value.name,
                markedNovel: result
            });
            showLoading.value = false;
            console.log(response.data);
            showFinish();
        } catch (error) {
            console.log(error);
        }
    }).catch(() => {
        showLoading.value = false;
    });
};
const showFinish = () => {
    showConfirmDialog({
        title: '制作完毕',
        message:
            '是否进行播放？',
    })
        .then(() => {
            //跳转到播放页
            router.push({
                path: '/NTS/NTS_Play',
                query: {
                    novelID: novel.value.novelID,
                    chapterID: novel.value.chapterID,
                    novelName: novel.value.name,
                    chapterName: novel.value.chapter,
                    NovelImg: '/NTS_Images/book1.png'
                }
            });
        })
        .catch(() => {
            // on cancel
        });
};

//reset
const reset = () => {
    showConfirmDialog({
        title: '重置',
        message:
            '是否重置？',
    })
        .then(() => {
            //刷新页面
            window.location.reload();
        })
        .catch(() => {
            // on cancel
        });
};
</script>
<style scoped lang="scss">
.pre-line {
    white-space: pre-wrap;
}

.ellipsis-text {
    width: 200px;
    /* 或者您希望的固定宽度 */
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    /* 隐藏超出容器的内容 */
    text-overflow: ellipsis;
    /* 当文本超出容器范围时显示省略号 */
}

.Menu_Container {
    height: 210px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
        height: 80px;
        background-color: #f7f7f7;
        border-radius: 6px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 40px;

        p:nth-child(1) {
            font-size: 20px;
            color: #333333;
        }

        p:nth-child(2) {
            margin-top: 5px;
            font-size: 12px;
            color: #333333;
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;

        .left {
            width: 120px;
            height: 120px;
            background-color: #FFDB7E;
            border-radius: 6px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            justify-content: center;

            p:nth-child(1) {
                margin-left: 20px;
                font-size: 18px;
                color: #333333;
            }

            p:nth-child(2) {
                margin-left: 20px;
                margin-top: 5px;
                font-size: 12px;
                color: #333333;
            }
        }

        .right {
            flex-grow: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .top {
                height: 55px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 0;
                background-color: #FFAD7E;

                p:nth-child(1) {
                    margin-left: 20px;
                    font-size: 18px;
                    color: #333333;
                }

                p:nth-child(2) {
                    margin-left: 20px;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #333333;
                }
            }

            .bottom {
                height: 55px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #FF867E;
                border-radius: 6px;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

                p:nth-child(1) {
                    margin-left: 20px;
                    font-size: 18px;
                    color: #333333;
                }

                p:nth-child(2) {
                    margin-left: 20px;
                    margin-top: 5px;
                    font-size: 12px;
                    color: #333333;
                }
            }
        }
    }
}

.tabs {
    margin: 10px;
    margin-bottom: 80px;

    .novel {
        font-size: 16px;
        line-height: 20px;
    }

    .noRole {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #333333;
    }
}

.Bottom_Bar {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #ffffff;
    padding-top: 10px;

    .left {
        margin: 0 5px 10px 10px;
        flex-grow: 5;
        height: 50px;
        background-color: #FFDB7E;
        border-radius: 6px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            font-size: 18px;
            color: #333333;
        }
    }

    .right {
        margin: 0 10px 10px 5px;
        flex-grow: 1;
        height: 50px;
        background-color: #FF867E;
        border-radius: 6px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            font-size: 18px;
            color: #333333;
        }
    }
}

.DefaultVoiceList {
    height: 300px;
}

.loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    color: #000000;
    z-index: 999;

    .littleBox {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>