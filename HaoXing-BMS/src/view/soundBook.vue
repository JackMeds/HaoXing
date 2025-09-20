<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>有声书列表</span>
                    <el-row>
                        <el-col :span="4">
                            <el-input v-model="sous" autocomplete="off" />
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="sou">查询</el-button></el-col>
                    </el-row>
                </div>
            </template>

            <el-table :data="tableData.slice((currenPage - 1) * pageSize, pageSize * currenPage)
                " border>
                <el-table-column label="ID" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.id }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="用户ID" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.userid }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="小说名" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.title }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="小说链接" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.content }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="喜欢数量" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.likeCount }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.title)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="tableData.length" v-model:page-size="pageSize"
                v-model:current-page="currenPage" />
        </el-card>
        <!-- 弹窗 -->
        <el-dialog v-model="dialogFormVisible" :title="dialogTitle" :show-close="false">
            <el-form :model="shoplist">
                <el-form-item label="小说名" :label-width="formLabelWidth">
                    <el-input v-model="shoplist.pic" autocomplete="off" />
                </el-form-item>
                <el-form-item label="小说链接" :label-width="formLabelWidth">
                    <el-input v-model="shoplist.title" autocomplete="off" />
                </el-form-item>
                <el-form-item label="喜欢数量" :label-width="formLabelWidth">
                    <el-input v-model="shoplist.desc" autocomplete="off" />
                </el-form-item>
                <el-form-item label="收藏数量" :label-width="formLabelWidth">
                    <el-input v-model="shoplist.shopid" autocomplete="off" />
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
        this.getSoundBook();
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
        getSoundBook() {
            this.$http
                .get("http://vip.upcraft.cn:3000/NTS/GetBookList")
                .then((res) => {
                    console.log(res.data.data);
                    if (res.statusText == "OK") {
                        this.tableData = res.data.data.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //删除
        handleDelete(novelName) {
            console.log(novelName);
            this.$http
                .post("http://vip.upcraft.cn:3000/NTS/deleteUserSoundBook", {
                    userid: 1,
                    novelName: novelName
                })
                .then((res) => {
                    console.log(res);
                    if (res.statusText == "OK") {
                        ElMessage({
                            message: "删除成功",
                            type: "success",
                        });
                        this.getSoundBook();
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
                .post("http://vip.upcraft.cn:3000/shoplist", {
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

<style></style>