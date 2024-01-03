<template lang="html">
    <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
        <template #right>
            <span>制作有声小说</span>
        </template>
    </van-nav-bar>
    <div class="Menu_Container">
        <div class="top">
            <p>请选择小说</p>
            <p>请选择章节</p>
        </div>
        <div class="bottom">
            <div class="left">
                <p>AI</p>
                <p>识别小说角色</p>
            </div>
            <div class="right">
                <div class="top">
                    <p>声线选择</p>
                    <p>默认</p>
                </div>
                <div class="bottom">
                    <p>输入以进行AI识别</p>
                    <p>OpenAI API key</p>
                </div>
            </div>
        </div>
    </div>
    <van-tabs v-model:active="tabs_active" sticky swipeable>
        <van-tab title="原文预览">
            <van-highlight :keywords="dialog" :source-string="NovelText" highlight-class="dialog" />
        </van-tab>
        <van-tab title="角色声线选择">
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
</template>
<script setup>
import { ref } from 'vue';

const onClickLeft = () => history.back();

const tabs_active = ref(0);

const NovelText = ref('慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。');
const dialog = ref(['难题', '终有一天', '答案']);


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
}
</style>