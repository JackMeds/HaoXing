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
    <van-dialog v-model:show="showInputKey" title="AI 配置" show-cancel-button @confirm="saveAPIConfig" @cancel="onCancelAPIConfig">
        <van-cell-group inset style="margin: 10px 20px;">
            <van-field v-model="APIKey" label="Key" placeholder="请输入 API key" />
            <van-field v-model="APIUrl" label="网址" placeholder="请输入 API 地址" />
            <van-field v-model="APIModel" label="模型" placeholder="请输入模型名称" />
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
import { getCurrentInstance, ref, onMounted } from 'vue';
import { showConfirmDialog } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

// 获取动态声线列表
const SoundList = ref([]);

// 加载声线列表
const loadSoundList = async () => {
    try {
        const response = await axios.get('/NTS/getSoundList');
        console.log(response.data.data);
        SoundList.value = response.data.data.map((sound) => ({
            voice: sound.voice,
            rgb: sound.rgb,
            name: sound.name,
            listen: sound.listen,
        }));
    } catch (error) {
        console.error('Failed to load sound list:', error);
    }
};

// 在组件加载时获取声线
onMounted(loadSoundList);

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
        novel.value = {
            novelID: 0,
            chapterID: 0,
            name: selectedValues[0],
            chapter: "全一章",
            content: response.data.data.data
        };
        showNovel.value = true;
    }).catch((error) => {
        console.log(error);
    });
};
const onCancelNovelList = () => {
    showNovelList.value = false;
};
const openNovelList = () => {
    axios.get('/NTS/getnovellist').then((response) => {
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

const PreProcess = ref({
    novelID: 0,
    chapterID: 0,
    novelName: '',
    chapterName: '',
    content: [],
    Roles: []
});

const novel = ref({
    novelID: 0,
    chapterID: 0,
    name: '',
    chapter: '',
    content: ''
});

const onClickLeft = () => history.back();
const tabs_active = ref(0);
const highlightContent = ref(['']);
const normalNovel = ref(true);

const showDefaultVoice = ref(false);
const DefaultVoiceColumns = [];
const showDefault = () => {
    DefaultVoiceColumns.splice(0, DefaultVoiceColumns.length);
    SoundList.value.forEach((elm) => {
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
    defaultVoice.value = SoundList.value.find(elm => elm.voice === selectedValues[0])?.name || '';
    showDefaultVoice.value = false;
};
const onCancelDefaultVoice = () => {
    showDefaultVoice.value = false;
};

// AI identify
const showInputKey = ref(false);
const showLoading = ref(false);
const showRoleList = ref(false);

const APIKey = ref(localStorage.getItem('NTS_APIKey') || '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');
const APIUrl = ref(localStorage.getItem('NTS_APIUrl') || 'https://openrouter.ai/api/v1');
const APIModel = ref(localStorage.getItem('NTS_APIModel') || 'x-ai/grok-4-fast:free');

const saveAPIConfig = () => {
    localStorage.setItem('NTS_APIKey', APIKey.value);
    localStorage.setItem('NTS_APIUrl', APIUrl.value);
    localStorage.setItem('NTS_APIModel', APIModel.value);
    showInputKey.value = false;
};

const onCancelAPIConfig = () => {
    APIKey.value = localStorage.getItem('NTS_APIKey') || '';
    APIUrl.value = localStorage.getItem('NTS_APIUrl') || 'https://api.openai.com';
    APIModel.value = localStorage.getItem('NTS_APIModel') || 'gpt-3.5-turbo';
    showInputKey.value = false;
}

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
            APIKey: APIKey.value,
            APIUrl: APIUrl.value,
            APIModel: APIModel.value
        });
        showLoading.value = false;
        showRoleList.value = true;
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

// Set Voice
const showVoice = ref(false);
const VoiceColumns = [];
const temporaryID = ref('');

const setVoice = (RoleID) => {
    VoiceColumns.splice(0, VoiceColumns.length);
    SoundList.value.forEach((elm) => {
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
            elm.voiceName = SoundList.value.find(elm => elm.voice === selectedValues[0])?.name || '';
            elm.rgb = SoundList.value.find(elm => elm.voice === selectedValues[0])?.rgb || '';
        }
    });
    temporaryID.value = '';
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