<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.sex" placeholder="性别" class="handle-select mr10">
                    <el-option key="1" label="男" value="1"></el-option>
                    <el-option key="2" label="女" value="0"></el-option>
                    <el-option key="3" label="无" value=""></el-option>
                </el-select>
                <el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="uid" label="账号"  align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="head" label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.head"
                            :preview-src-list="[scope.row.head]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别"  align="center">
                    <template slot-scope="scope">{{scope.row.sex == 1?'男':'女'}}</template>
                </el-table-column>
                <el-table-column prop="userlv" label="等级"  align="center">
                     <template slot-scope="scope">{{scope.row.userlv?scope.row.userlv:"Lv.0 无业游民"}}</template>
                </el-table-column>

                <el-table-column prop="integral" label="积分" align="center">
                    <template slot-scope="scope">{{scope.row.integral?scope.row.integral:0}}</template>
                </el-table-column>
                <el-table-column prop="userId" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row,scope.row.userId)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <div class="block">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.pageTotal">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                 <el-form-item label="id">
                    <el-input :disabled="true" v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="form.uid"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                 <el-form-item label="积分">
                    <el-input v-model="form.integral"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { 
    fetchData,
    updateData,
    deleteUser 
    } from '../../api/index';
export default {
    name: 'usertable',
    data() {
        return {
            query: {
                sex: '',
                username: '',
                pageIndex: 1,
                pageSize: 10,
            },
            editVisible: false,
            tableData: [],
            pageTotal: 0,
            form: {},
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                this.tableData = res.data.partList;
                this.pageTotal = res.data.total;
            });
        },
        updateUser(){
            updateData(this.form).then(res => {
                console.log(res)
            });
        },
        delUser(userId){
            deleteUser(userId).then(res => {
                console.log(res)
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row,userId) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    this.delUser(userId)
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$set(this.form);
            this.updateUser();
            this.$message.success(`修改成功`);
            
        },
        handleSizeChange(val) {
            this.query.pageSize=val;
            this.$set(this.query);
             this.getData();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
             this.query.pageIndex=val;
             this.$set(this.query);
             this.getData();
             console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
