<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>收藏列表</span>
          <el-row>
            <el-col :span="4">
              <el-input v-model="sous" autocomplete="off" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="sou">查询</el-button></el-col
            >
          </el-row>
        </div>
      </template>

      <el-table
        :data="
          tableData.slice((currenPage - 1) * pageSize, pageSize * currenPage)
        "
        border
      >
        <el-table-column label="小说名" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户id" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.userid }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小说简介" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.detail }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小说id" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.shopid }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.writer }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.userid, scope.row.shopid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
        v-model:page-size="pageSize"
        v-model:current-page="currenPage"
      />
    </el-card>
  </div>
</template>

<script>
import { ElMessage, ElNotification } from "element-plus";
export default {
  name: "User",
  data() {
    return {
      sous: "",
      pageSize: 5,
      currenPage: 1,
      dialogTitle: "添加商品",
      dialogBtn: "添加",
      shoplist: {
        title: "",
        desc: "",
        shopid: "",
        pic: "",
        price: "",
        name: "",
      },
      dialogFormVisible: false,
      tableData: [],
      results: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    //取消
    cancel() {
      this.dialogFormVisible = false;
      this.dialogTitle = "添加商品";
      this.dialogBtn = "添加";
      this.shoplist = {
        title: "",
        desc: "",
        shopid: "",
        pic: "",
        price: "",
        name: "",
      };
    },
    // 获取数据
    getUsers() {
      this.$http
        .get("http://localhost:3000/gouwucar/hou")
        .then((res) => {
          // console.log(res.data.Users);
          if (res.statusText == "OK") {
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除
    handleDelete(userid,shopid) {
      const GOU={
        userid:userid,
        shopid:shopid
      }
      this.$http
      .post("http://localhost:3000/shoplist/del/" + GOU)
        .then((res) => {
          console.log(res);
          if (res.statusText == "OK") {
            ElMessage({
              message: "删除成功",
              type: "success",
            });
            this.getUsers();
          } else {
            ElMessage.error("失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addUser() {
      this.dialogFormVisible = true;
    },
    // 搜索
    sou() {
      var sss = this.sous;
      console.log(sss);
      this.$http
        .post("http://localhost:3000/shoplist", {
          sous: sss,
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>