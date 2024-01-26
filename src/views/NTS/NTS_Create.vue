<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>制作有声小说</span>
        </template>
    </van-nav-bar>
    <div class="Menu_Container">
        <div class="top">
            <p>{{ novel.name ? novel.name : "请选择小说" }}</p>
            <p>{{ novel.chapter ? novel.chapter : "请选择章节" }}</p>
        </div>
        <div class="bottom">
            <div class="left" @click="showDefault()">
                <p>全文声线</p>
                <p>{{ defaultVoice ? defaultVoice : "以进行AI识别" }}</p>
            </div>
            <div class="right">
                <div class="top" @click="inputKey()">
                    <p>{{ APIKey ? APIKey : "输入OpenAI API key" }}</p>
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
            <p v-if="normalNovel">{{ novel.content }}</p>
            <van-highlight :keywords="highlightContent" :source-string="novel.content" highlight-class="custom-class" />
        </van-tab>
        <van-tab title="角色声线选择（AI）" class="roles">
        </van-tab>
    </van-tabs>
    <div class="Bottom_Bar">
        <div class="left">
            <p>开始制作</p>
        </div>
        <div class="right">
            <p>重置</p>
        </div>
    </div>
    <van-dialog v-model:show="showInputKey" title="请输入OpenAI API key" show-cancel-button>
        <van-cell-group inset style="margin: 10px 20px;">
            <van-field v-model="APIKey" label="key" placeholder="请输入OpenAI API key" />
        </van-cell-group>
    </van-dialog>
    <van-popup v-model:show="showDefaultVoice" overlay position="bottom" round class="DefaultVoiceList">
        <van-picker title="选择全文默认声线" :columns="DefaultVoiceColumns" @confirm="onConfirmDefaultVoice"
            @cancel="onCancelDefaultVoice" style="background-color: rgb(255, 255, 255);" />
    </van-popup>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';

const instance = getCurrentInstance();
const axios = instance.appContext.config.globalProperties.$axios;

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
        name: '神器的小说',
        chapter: '第一章',
        content: "“这种旧时代的东西，你真的练成了？”秦诚冲了过去，看着粗大树干上的清晰手印，惊疑不定。\n\n旧时代散落在故纸堆里的术，从体术到冥想，再到采气术、内养法等，各种记载相当的零散。\n\n现如今这些被称作散术，也有很多人称它们为旧术。\n\n这些年，秦诚虽然一直在接触，但是内心深处却始终有所怀疑，真的能练成吗？\n\n王煊的表现让他大受触动，血肉手掌居然可以在粗大而坚硬的树干上留下清晰的手印，旧术……真的有路可走？！\n\n“按照就旧时代的说法，我这些不算什么。”王煊摇头，人很英挺，在皎洁月辉下像是附着淡淡的白雾。\n\n秦诚叹气：“你别拿过去来比较，我压根就没相信过，事实上，那些记载许多都早已被证伪。”\n\n秦诚也在练旧术，他深知有多难，仅一些冥想术足以让人精神分裂。\n\n在与新星有密切联系的今天，深空中科技灿烂，有几人还会相信这些？未练心中就已动摇。\n\n然而，正是在这种背景下，王煊、秦诚等人初进大学时，就有人找上他们，问他们是否愿意进行与旧术有关的研究。\n\n王煊以前就接触过散术，顿时很感兴趣，当场便答应了。\n\n至于秦诚，根本就不信这些，只是后来听到这个研究与某些财阀有关，据悉投入资金很大，他才惊异，抱着试试看的态度加入进来。\n\n早期，他们一边在自己所在的院系学原本的专业课，一边利用课余时间去参与所谓的“旧术研究”。\n\n他们发现，所谓的研究，其实主要还是让他们自己来练。\n\n并且开始有专人为他们准备特殊的食物，一切都是为了更好的练成某些散术。\n\n他们越发觉得，这项“研究”很不简单，教他们散术的两位老教授，竟然是从新星调过来的。\n\n很快，有些人就坚持不住了，主动退出，因为练旧术很辛苦，颇为枯燥。\n\n最主要的是，在如今这个年代，人们对旧时代故纸堆里的术持怀疑态度。\n\n不过，退出的人虽然不少，但新加入的却更多。\n\n因为背后有财阀支持，这项“研究”投入的资金很大，开始加大力量挑选更多合适的人参与进来。\n\n不仅是在这座城市，旧土各地都在进行，主要是以高校的学生为主，为了调动积极性，有不菲的薪酬激励。\n\n当初报名的人非常多，但是当大规模选拔后，又经过大半年的淘汰，最终只留下五十人左右。\n\n这些人大多数都转学了，集中到王煊与秦诚所在的这所大学，一边继续原本的专业，一边组成一个“旧术实验班”。\n\n并不是所有人都如同王煊般，最初是因为兴趣加入。\n\n转学来的人都已经被承诺，毕业后，最起码会保证他们一份得体且薪资很高的工作。\n\n至此，所有人都意识到，这项“研究”很不同寻常，不然为何要花费这样大的力气进行？\n\n实验班的“旧术教材”都有些来头，有博物馆的孤本，也有财阀的稀珍收藏，还有某些宗教的经文。\n\n比如某一内养法，在旧时代就很出名，但最终却失传了。\n\n数年前，有人在一座坟墓中发现，让它重见天日，如今被整理出来，成为实验班的研读物之一。\n\n此外，旧术实验班所有学生的饮食至此都有专人准备，非常讲究。\n\n随着了解，许多人深感惊异，部分食材竟极其珍贵与稀有，在旧土很难获取，是从深空运过来的。\n\n教他们采气术的老教授曾感慨，这些食材纵使在新星也都昂贵的吓死人，更何况是自深空运来。\n\n有些食材即便有钱也买不到。\n\n其中一些食材产于新星深海，有抗衰老的作用，有些食材则能大补血气，还有些食材可保人精力健旺。\n\n对于练各种散术的人来说，食补非常重要。\n\n老教授曾说，个别食材颇受新星一些身份背景惊人的老辈人物所喜，因为可以延缓衰老。\n\n可见，这次的“旧术研究”多么受重视。\n\n尤其令人吃惊的是，不久后，新星竟然来了二十几位新生加入这个实验班。\n\n从来都是旧土的学生向往新星，希冀去留学，而这次却反过来了。\n\n随着这些年轻男女的到来，陆续传出一些小道消息，让旧术实验班的学生渐渐了解到部分真相。\n\n“有些组织、有些研究机构、有些财阀，在追求长生不老！”\n\n当初这句话着实在旧术实验班中引发不小的震动，许多人都被惊住了。\n\n在现代人看来，那种追求很可笑，虚无缥缈。\n\n然而，历代以来，似乎所有走到相应高度的人都在孜孜以求。\n\n早在先秦时代，关于列仙、方士等传说，就已让后世人向往不已，连君王都不能免俗。\n\n但是，从秦皇到汉武，再到其他后来者，都失败了，求不到长生药，不可能有人成功。\n\n走到如今这个时代，所谓神话等更是早已被证伪，怎么可能存在？\n\n但是，偏偏是科技璀璨的新星传来这样的消息。\n\n“确切的说，是某些财阀中的老者，掌权的人物，想要获得更为久远的寿命。”\n\n虽然有人做了补充，但当时还是引发实验班中一片哗然。\n\n历史总是惊人的相似，历代以来，某些步入晚年的大人物似乎都很不甘心，希冀年轻，渴望有活力的身体。\n\n当年，王煊与秦诚低语，曾编排过那些大人物。\n\n“老头子们日渐衰败，自然渴求年轻，不然怎么欣赏美女？身有亿万家资，却无法再挥霍，换成是我，也想再活五百年啊！”\n\n“老太太们，绝对比老头子们更狠，韶华逝去，昔日美貌如今爬满皱纹，对于掌握大量资源、拥有强大话语权的女强人来说，老去，绝对是天敌！如果有一线可能，老太太们必然比老头子们还要疯狂，会想尽办法恢复青春！”\n\n当时，来自新星的几名年轻男女听到两人的低语后，全都猛翻白眼，因为这似乎涉及到他们各自的一些长辈。"
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

const onConfirmDefaultVoice = ({ selectedValues }) => {
    defaultVoice.value = SoundList.find(elm => elm.voice === selectedValues[0])?.name || '';
    showDefaultVoice.value = false;
};
const onCancelDefaultVoice = () => {
    showDefaultVoice.value = false;
};


//AI identify
const showInputKey = ref(false);

const APIKey = ref('');

const inputKey = () => {
    showInputKey.value = true;
};

const AIidentify = async () => {
    try {
        const response = await axios.post('/NTS/handlenovel', {
            params: {
                content: novel.value.content,
                key: APIKey.value
            }
        });
        console.log(response);
        highlightContent.value = ['的'];
        normalNovel.value = false;
    } catch (error) {
        console.log(error);
        normalNovel.value = false;
    }
};

</script>
<style scoped lang="scss">
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
    margin-bottom: 70px;

    .novel {
        font-size: 16px;
        line-height: 20px;
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

    .DefaultVoiceList {
        height: 300px;
    }
}
</style>