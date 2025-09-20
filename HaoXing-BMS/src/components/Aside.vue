<template>
  <el-row class="tac">
    <el-col :span="24">
      <h3 class="title">有声小说后台管理系统</h3>
      <!-- <img src="../assets/img/logo.jpg" alt="" class="logo"> -->
      <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#fff"
        default-active="2"
        text-color="#000"
      >
        <el-menu-item index="/demo">
          <el-icon>
            <TrendCharts />
          </el-icon>
          <span>书籍图表</span>
        </el-menu-item>
        <el-menu-item index="/charts">
          <el-icon>
            <TrendCharts />
          </el-icon>
          <span>轮播图表</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/userManage">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>用户列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <List />
            </el-icon>
            <span>书籍管理</span>
          </template>
          <el-menu-item index="/newsEdite">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>书籍列表</span>
          </el-menu-item>
          <el-menu-item index="/tag">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>分类标签</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <GoodsFilled />
            </el-icon>
            <span>收藏管理</span>
          </template>
          <el-menu-item index="/shopedite">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>订阅列表</span>
          </el-menu-item>
          <el-menu-item index="/gouwu">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>收藏列表</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>有声书管理</span>
          </template>
          <el-menu-item index="/soundBook">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>有声书列表</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Aside',
}
</script>

<style scoped>
.title {
  height: 40px;
  font-size: 19spx;
  /* color: white; */
  margin-top: 10px;
  padding-right: 10px;
}
</style>
