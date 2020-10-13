<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 游记列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                 <el-input v-model="query.location" placeholder="定位" class="handle-input100 mr10"></el-input>
                 <el-input v-model="query.username" placeholder="用户名" class="handle-input300 mr10"></el-input>
                    <span class="demonstration">创建时间</span>
                       <el-date-picker
                            v-model="value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
                <el-table-column prop="words" label="文本内容" align="center"></el-table-column>
                <!-- <el-table-column prop="imgList" label="图片(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.imgList[0]"
                            :preview-src-list="[scope.row.showuserimg[0]]"
                        ></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="location" label="定位"  align="center"></el-table-column>
                <el-table-column prop="createtime" label="创建时间"  align="center"></el-table-column>
                <el-table-column prop="praseCount" label="点赞数" align="center">
                    <template slot-scope="scope">{{scope.row.praseCount?scope.row.praseCount:0}}</template>
                </el-table-column>
                <el-table-column prop="answerId" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row,scope.row.answerId)"
                        >删除</el-button>
                       <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >图片列表</el-button>
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
             <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-image
                    v-for="(value, key) in form.imgList"
                    :key="key"
                    class="table-td-thumb"
                    :src="value"
                    :preview-src-list="[value]"
                ></el-image>
               
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import { 
    getTravels,
    deleteTravels
    } from '../../api/index';
export default {
    name: 'traveltable',
    data() {
        return {
            query: {
                location: '',
                username: '',
                pageIndex: 1,
                pageSize: 10,
                startTime: '',
                endTime: ''
            },
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            value:""
        };
        
    },
    created() {
        this.getTravelData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getTravelData() {
            getTravels(this.query).then(res => {
                this.tableData = res.data.partList;
                this.pageTotal = res.data.total;
                this.tableData.forEach(element => {
                    element.createtime=moment(element.createtime).format('YYYY-MM-DD hh:mm:ss');
                });
            });
        },
        delTravel(answerId){
            deleteTravels(answerId).then(res => {
                console.log(res)
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            if(this.value[0]==undefined || this.value[1]==undefined){
                this.getTravelData();
            }else{
                this.query.startTime = moment(this.value[0]).format('YYYY-MM-DD hh:mm:ss');
                this.query.endTime =moment(this.value[1]).format('YYYY-MM-DD hh:mm:ss');
                this.getTravelData();
            }
        },
        // 删除操作
        handleDelete(index,row,answerId) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    this.delTravel(answerId)
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.query.pageSize=val;
            this.$set(this.query);
             this.getTravelData();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
             this.query.pageIndex=val;
             this.$set(this.query);
             this.getTravelData();
             console.log(`当前页: ${val}`);
        },
         handleEdit(index, row) {
            console.log(index);
            console.log(row);
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
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

.handle-input300 {
    width: 300px;
    display: inline-block;
}
.handle-input100 {
    width: 100px;
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
.table-td-thumb{
    display: inline-block;
    margin: 5px;
    width: 80px;
    height: 80px
}
</style>
