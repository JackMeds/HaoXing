<template>
    <van-tabbar v-model="active" route>
    <van-tabbar-item icon="eye-o" to="/"></van-tabbar-item>
    <van-tabbar-item icon="service-o" to="/two"></van-tabbar-item>
    <van-tabbar-item icon="list-switch" to="/three"></van-tabbar-item>
    <van-tabbar-item icon="contact-o" to="/four"></van-tabbar-item>
  </van-tabbar>
  </template>
  
  <script>
  export default {
      data() {
      return {
        active: 0,
      };
    },
  
  }
  </script>
  
  <style>
  
  </style>