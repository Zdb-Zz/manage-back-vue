<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 话题列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.classification" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                 <el-input v-model="query.topicName" placeholder="话题" class="handle-input300 mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="classification" label="类型" width="150"  align="center"></el-table-column>
                <el-table-column prop="icon" label="图片(查看大图)" width="120" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.icon"
                            :preview-src-list="[scope.row.icon]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="话题"  align="center"></el-table-column>
                <el-table-column prop="id" label="操作" width="100" align="center">
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
    getTopicType,
    getTopicList,
    delTopics
    } from '../../api/index';
export default {
    name: 'topicTable',
    data() {
        return {
            query: {
                classification:'',
                topicName:'',
                pageIndex: 1,
                pageSize: 10,
            },
            options: [],
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            value:""
        };
        
    },
    created() {
        this.getTopicType();
        this.getTopic();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getTopicType() {
            getTopicType().then(res => {
                for(var i=0;i<res.data.length;i++){
                    this.options.push({
                        value:res.data[i],
                        label:res.data[i]
                    })
                }
                console.log(this.options);
            });
        },
        getTopic() {
            getTopicList(this.query).then(res => {
                this.tableData = res.data.partList;
                this.pageTotal = res.data.total;
            });
        },
        delTopic(id){
            delTopics(id).then(res => {
                console.log(res)
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            console.log(this.query)
            this.getTopic();
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
                    this.delTopic(id)
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.query.pageSize=val;
            this.$set(this.query);
            this.getTopicList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
             this.query.pageIndex=val;
             this.$set(this.query);
            this.getTopicList();
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
