<template>
  <div class="headerbox" @click="Info">
    <el-dropdown @command="logout">
      <span class="el-dropdown-link">
        {{username}}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      username:""
    }
  },
  mounted(){
    var user=window.sessionStorage.getItem("admininfo");
    if(user!=null){
      this.username = user;
    }
  },
  methods:{
    Info(){
      this.$router.push("/userInfo")
    },
    logout(){
      // console.log(1111)
      // 清空session的值
      window.sessionStorage.clear();
      this.$router.push({
        path:"/"
      })
    }
  }
};
</script>

<style scoped>
.headerbox{
    text-align: right;
    height: 50px;
    border-bottom: 2px solid rgb(228, 226, 226);
}
.el-dropdown-link{
    cursor: pointer;
    padding-top: 20px;
}
.el-dropdown-link:focus{
    outline: none;
}
</style>