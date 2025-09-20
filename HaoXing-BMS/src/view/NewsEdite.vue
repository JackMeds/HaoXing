<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>书籍列表</span>
          <el-button type="primary" @click="addUser">添加小说</el-button>
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
        <el-table-column label="序号" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小说名称" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小说封面" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.img }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="180" prop="detail">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{
                getdetail(scope.row.detail)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小说分类" width="180">
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
              @click="handleDelete(scope.row.id)"
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
      <el-form :model="newsList">
        <el-form-item label="小说名称" :label-width="formLabelWidth">
          <el-input v-model="newsList.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说封面" :label-width="formLabelWidth">
          <el-input v-model="newsList.img" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详情" :label-width="formLabelWidth">
          <el-input v-model="newsList.detail" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说分类" :label-width="formLabelWidth">
          <el-input v-model="newsList.time" autocomplete="off" />
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
      dialogTitle: "添加小说",
      dialogBtn: "添加",
      newsList: {
        title: "",
        detail: "",
        time: "",
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
      this.dialogTitle = "添加小说";
      this.dialogBtn = "添加";
      this.newsList = {
        title: "",
        detail: "",
        time: "",
      };
    },

    submit() {
      if (this.newsList.id > 0) {
        //修改小说
        this.$http
          .post(
            "http://localhost:3000/newsList/upd/" + this.newsList.id,
            this.newsList
          )
          .then((res) => {
            //console.log(res);
            if (res.statusText == "OK") {
              //修改成功
              ElNotification({
                title: "提示",
                message: "修改信息成功",
                type: "success",
              });
              this.cancel(); //清空表单
              this.getUsers(); //获取数据
            } else {
              ElNotification({
                title: "提示",
                message: "修改信息失败",
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
          this.newsList.title.length == 0 &&
          this.newsList.detail.length == 0
        ) {
          //不可添加，需要写内容
          ElMessage({
            message: "表单内容不能为空",
            type: "warning",
          });
        } else {
          this.$http
            .post("http://localhost:3000/newsList/add", {
              title: this.newsList.title,
              detail: this.newsList.detail,
              time: this.newsList.time,
            })
            .then((res) => {
              console.log(res);
              if (res.data.code == 1) {
                ElNotification({
                  title: "提示",
                  message: "添加小说成功",
                  type: "success",
                });
                //隐藏添加对话框

                this.dialogFormVisible = false;

                //清空文本框
                this.newsList = {
                  name: "",
                  detail: "",
                  time: "",
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
        .get("http://localhost:3000/newsList")
        .then((res) => {
          console.log(res.data);
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
      this.newsList = {
        id: obj.id,
        title: obj.title,
        detail: obj.detail,
        time: obj.time,
      };
      //修改显示信息
      this.dialogBtn = "修改";
      this.dialogTitle = "修改小说";
    },

    //删除
    handleDelete(id) {
      this.$http
        .post("http://localhost:3000/newsList/del/" + id)
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
        .post("http://localhost:3000/newsList/list", {
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
    getdetail(detail) {
      if (detail.length > 10) {
        return detail.slice(0, 10) + '...';
      } else {
        return detail;
      }
    }
  },
};
</script>

<style>
</style>