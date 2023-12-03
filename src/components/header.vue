<template>
  <div>
    <van-nav-bar fixed placeholder>
      <template #left>
        <img class="imgbox" src="../assets/img/logo.png" alt="" />
      </template>
      <template #right>
        <div v-if="isempty">
          <van-icon name="user-circle-o" size="30" />
          <span class="login" @click="goLogin">请登录</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: "",
      isempty: true,
    };
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: "/login",
      });
    },
  },
  mounted() {
    const user = window.sessionStorage.getItem("user");
    if (user != null) {
      this.username = user;
      this.isempty = false;
    }
  },
};
</script>

<style scoped>
.imgbox {
  width: 110px;
  height: 30px;
}


</style>