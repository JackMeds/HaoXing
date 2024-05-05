<template lang="html">
    <van-search v-model="searchText" show-action placeholder="请输入有声小说名" @clearable="true" @search="onSearch" @cancel="onCancel" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant';

const router = useRouter();
const route = useRoute();

const searchText = ref(route.query.searchText);

onMounted(() => {
    if (searchText.value) {
        onSearch();
    }
});

const onSearch = () => {
    showToast('搜索功能暂未开放');
}

const onCancel = () => {
    router.push('/NTS');
}
</script>
<style scoped lang="scss"></style>