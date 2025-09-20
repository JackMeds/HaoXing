<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
// // @ is an alias to /src
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: "HomeView",
  components: {
    Aside,
    Header,
  },
};
</script>
<style scoped>
.el-aside {
  background-color: rgb(255, 255, 255);
  height: 100vh;
}
.el-header {
  background-color: rgb(255, 255, 255);
  padding-left: 0px;
  padding-right: 0px;
}
.el-main {
  background-color: rgb(255, 255, 255);
}
</style>
