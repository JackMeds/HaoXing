<template>
  <div>
    <Header></Header>
    <div class="title">妖簿</div>
    <van-divider />
    <div class="container">
      <router-link to="/chinaList" class="box">
        <p>中国</p>
      </router-link>
      <router-link to="/greeceList" class="box">
        <p>希腊</p>
      </router-link>
      <router-link to="/japanList" class="box">
        <p>日本</p>
      </router-link>
    </div>
    <Tab></Tab>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Tab from "@/components/tab.vue";

export default {
  components: { Header, Tab },
};
</script>

<style>
.title {
  text-align: center;
  font-size: 18px;
  line-height: 18px;
  margin: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  max-width: 370px; 
}

.box {
  width: 80%;
  padding: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  text-align: center;
  margin-left: 20px;
  margin-bottom: 15px;
  max-height: 500px;  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.box:nth-child(1) {
  background-image: url("../assets/img/z1.png");
}

.box:nth-child(2) {
  background-image: url("../assets/img/x1.png");
}

.box:nth-child(3) {
  background-image: url("../assets/img/r1.png");
}
</style>
