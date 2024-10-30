<template lang="html">
    <NTS_HomeNav></NTS_HomeNav>
    <NTS_BookList :bookList="bookList"></NTS_BookList>
    <!-- <bar :placeholder="true"></bar> -->
</template>
<script setup>
import bar from '@/components/bar.vue'
import NTS_HomeNav from '@/components/NTS/NTS_HomeNav.vue';
import NTS_BookList from '@/components/NTS/NTS_BookList.vue';
import { ref } from 'vue';
const searchText = ref('');
const bookList = ref([
    {
        id: 1,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 2,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 3,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 4,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 5,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 6,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 7,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 8,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    },
    {
        id: 9,
        name: '《我是一只小小鸟》',
        img: '/NTS_Images/book1.png',
    }
]);
</script>
<style scoped lang="scss">
</style>