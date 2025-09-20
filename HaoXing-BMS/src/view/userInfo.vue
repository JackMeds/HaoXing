<template>
  

  <el-descriptions
    title="个人信息"
    direction="vertical"
    :column="4"
    :size="size"
    border
  >
    <el-descriptions-item label="姓名">damin</el-descriptions-item>
    <el-descriptions-item label="电话">18100000000</el-descriptions-item>
    <el-descriptions-item label="家庭地址" :span="2">111111111</el-descriptions-item>
    <el-descriptions-item label="学校地址">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name:"userinfo",
}

</script>

<style>

</style>