<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 路线列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                 <el-input v-model="query.chooseCity" placeholder="城市" class="handle-input100 mr10"></el-input>
                 <el-input v-model="query.username" placeholder="用户名" class="handle-input300 mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="userName" label="用户名" width="100"  align="center"></el-table-column>
                <el-table-column prop="routeName" label="自定义路线名" width="150" align="center"></el-table-column>
                <el-table-column prop="chooseCity" label="城市" width="80" align="center"></el-table-column>
                <el-table-column prop="backgroundurl" label="图片(查看大图)" width="80" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.backgroundurl"
                            :preview-src-list="[scope.row.backgroundurl]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="cityName" label="所选地点"  align="center"></el-table-column>
                <el-table-column prop="expectedDuration" label="历时" width="100"  align="center"></el-table-column>
                <el-table-column prop="remarks" label="备注"  width="120" align="center"></el-table-column>
                <el-table-column prop="id" label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row,scope.row.id)"
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
    </div>
</template>

<script>
import { 
    getRouteList,
    delRoutes
    } from '../../api/index';
export default {
    name: 'traveltable',
    data() {
        return {
            query: {
                chooseCity:'',
                username:'',
                pageIndex: 1,
                pageSize: 10,
            },
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            value:""
        };
        
    },
    created() {
        this.getRoute();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getRoute() {
            getRouteList(this.query).then(res => {
                this.tableData = res.data.partList;
                this.pageTotal = res.data.total;
            });
        },
        delRoute(id){
            delRoutes(id).then(res => {
                console.log(res)
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getRoute();
        },
        // 删除操作
        handleDelete(index,row,id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                    this.pageTotal-=1;
                    this.delRoute(id)
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.query.pageSize=val;
            this.$set(this.query);
            this.getRoute();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
             this.query.pageIndex=val;
             this.$set(this.query);
            this.getRoute();
             console.log(`当前页: ${val}`);
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
</style>
