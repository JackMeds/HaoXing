<template>
    <div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>分类列表</span>
            <el-button type="primary" @click="addUser">添加标签</el-button>
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
          <el-table-column label="地域" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="地域id" width="180">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ scope.row.time }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.userid)"
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
      <!-- 弹窗 -->
      <el-dialog
        v-model="dialogFormVisible"
        :title="dialogTitle"
        :show-close="false"
      >
        <el-form :model="userList">
          <el-form-item label="地域" :label-width="formLabelWidth">
            <el-input v-model="userList.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地域id" :label-width="formLabelWidth">
            <el-input v-model="userList.sex" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="submit">
              {{ dialogBtn }}
            </el-button>
            <el-button @click="cancel">取消</el-button>
          </span>
        </template>
      </el-dialog>
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
        dialogTitle: "添加用户",
        dialogBtn: "添加",
        userList: {
          username: "",
          password: "",
          sex: "",
          tel: "",
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
        this.dialogTitle = "添加用户";
        this.dialogBtn = "添加";
        this.userList = {
          username: "",
          password: "",
          sex: "",
          tel: "",
        };
      },
  
      submit() {
        if (this.userList.userid > 0) {
          //修改用户
          this.$http
            .post("http://localhost:3000/userList/upd/" + this.userList.userid, this.userList)
            .then((res) => {
              //console.log(res);
              if (res.statusText == "OK") {
                //修改成功
                ElNotification({
                  title: "提示",
                  message: "修改用户成功",
                  type: "success",
                });
                this.cancel(); //清空表单
                this.getUsers(); //获取数据
              } else {
                ElNotification({
                  title: "提示",
                  message: "修改用户失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //添加操作
          if (
            this.userList.username.length == 0 &&
            this.userList.password.length == 0
          ) {
            //不可添加，需要写内容
            ElMessage({
              message: "表单内容不能为空",
              type: "warning",
            });
          } else {
            let addForm = {
              name: this.userList.username,
              password: this.userList.password,
              sex: this.userList.sex,
              tel: this.userList.tel,
            };
            this.$http
              .post("http://localhost:3000/users/add", {
                username: this.userList.username,
                password: this.userList.password,
                sex: this.userList.sex,
                tel: this.userList.tel,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  ElNotification({
                    title: "提示",
                    message: "添加用户成功",
                    type: "success",
                  });
                  //隐藏添加对话框
  
                  this.dialogFormVisible = false;
  
                  //清空文本框
                  this.userList = {
                    name: "",
                    password: "",
                    sex: "",
                    tel: "",
                  };
                  this.getUsers();
                } else {
                  ElNotification({
                    title: "提示",
                    message: "添加失败",
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      },
      // 获取数据
      getUsers() {
        this.$http
          .get("http://localhost:3000/tag")
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
      //编辑
      handleEdit(obj) {
        //显示对话框
        this.dialogFormVisible = true;
        //数据赋值
        this.userList = {
          userid: obj.userid,
          username: obj.username,
          password: obj.password,
          sex: obj.sex,
          tel: obj.tel,
          imgurl: obj.imgurl,
        };
        //修改显示信息
        this.dialogBtn = "修改";
        this.dialogTitle = "修改用户";
      },
  
      //删除
      handleDelete(userid) {
        this.$http
          .post("http://localhost:3000/userList/del/"+userid)
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
        console.log(sss)
        this.$http
          .post("http://localhost:3000/userList/list", {
            sous: sss,
          })
          .then((res) => {
            console.log(res.data)
          this.tableData = res.data
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