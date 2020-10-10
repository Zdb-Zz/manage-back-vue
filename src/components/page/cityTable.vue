<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 景点列表
                </el-breadcrumb-item>
                 <el-button style="float:right" type="primary" icon="el-icon-search" @click="handleAdd">新增景点</el-button>
            </el-breadcrumb>
           
        </div>
        <div class="container">
            <div class="handle-box">
                 <el-input v-model="query.city" placeholder="城市" class="handle-input100 mr10"></el-input>
                 <el-input v-model="query.name" placeholder="景点" class="handle-input100 mr10"></el-input>
                 <el-input v-model="query.scenicSpot" placeholder="景区" class="handle-input300 mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="name" label="景点"   align="center"></el-table-column>
                <el-table-column prop="city" label="城市"  align="center"></el-table-column>
                 <el-table-column prop="scenicSpot" label="景区"  align="center"></el-table-column>
                <el-table-column prop="imgview" label="图片(查看大图)"  align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.imgview"
                            :preview-src-list="[scope.row.imgview]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" align="center">
                    <template slot-scope="scope">
                         <el-button
                            type="text"
                            icon="el-icon-s-opportunity"
                            @click="handleDetails(scope.$index, scope.row)"
                        >详情</el-button>
                         <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
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
         <!-- 新增弹出框 -->
        <el-dialog title="详情" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                 <el-form-item label="景点">
                    <el-input  v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input  v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionFile" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                <el-form-item label="景区">
                    <el-input v-model="form.scenicSpot"></el-input>
                </el-form-item>
                 <el-form-item label="经度">
                    <el-input  v-model="form.longitude"></el-input>
                </el-form-item>
                
                <el-form-item label="纬度">
                    <el-input  v-model="form.latitude"></el-input>
                </el-form-item>
               
                <el-form-item label="介绍">
                    <el-input  v-model="form.introduce"></el-input>
                </el-form-item>
                <el-form-item label="推荐打卡时间">
                    <el-input  v-model="form.dakatime"></el-input>
                </el-form-item>
                 <el-form-item label="打卡名人">
                    <el-input  v-model="form.dakapeople"></el-input>
                </el-form-item>
                <el-form-item label="著名文章">
                    <el-input  v-model="form.famousallusions"></el-input>
                </el-form-item>
                <el-form-item label="小标题">
                    <el-input  v-model="form.smalltitle"></el-input>
                </el-form-item>
                <el-form-item label="文章1">
                    <el-input  v-model="form.word1"></el-input>
                </el-form-item>
                <el-form-item label="图片1">
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg1" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                 <el-form-item label="文章2">
                    <el-input v-model="form.word2"></el-input>
                </el-form-item>
               <el-form-item label="图片2">
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg2" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                <el-form-item label="文章3">
                    <el-input  v-model="form.word3"></el-input>
                </el-form-item>
                <el-form-item label="图片3">
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg3" list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="upload">新 增</el-button>
                <el-button @click="addVisible = false">取 消</el-button>
            </span>
        </el-dialog>
         <!-- 详情弹出框 -->
        <el-dialog title="详情" :visible.sync="detailsVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                 <el-form-item label="景点">
                    <el-input :disabled="true" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input :disabled="true" v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.imgview" 
                        :preview-src-list="[form.imgview]">
                    </el-image>
                </el-form-item>
                <el-form-item label="景区">
                    <el-input :disabled="true" v-model="form.scenicSpot"></el-input>
                </el-form-item>
                 <el-form-item label="经度">
                    <el-input :disabled="true" v-model="form.longitude"></el-input>
                </el-form-item>
                
                <el-form-item label="纬度">
                    <el-input :disabled="true" v-model="form.latitude"></el-input>
                </el-form-item>
               
                <el-form-item label="介绍">
                    <el-input :disabled="true" v-model="form.introduce"></el-input>
                </el-form-item>
                <el-form-item label="推荐打卡时间">
                    <el-input :disabled="true" v-model="form.dakatime"></el-input>
                </el-form-item>
                 <el-form-item label="打卡名人">
                    <el-input :disabled="true" v-model="form.dakapeople"></el-input>
                </el-form-item>
                <el-form-item label="著名文章">
                    <el-input :disabled="true" v-model="form.famousallusions"></el-input>
                </el-form-item>
                <el-form-item label="小标题">
                    <el-input :disabled="true" v-model="form.smalltitle"></el-input>
                </el-form-item>
                <el-form-item label="文章1">
                    <el-input :disabled="true" v-model="form.word1"></el-input>
                </el-form-item>
                <el-form-item label="图片1">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img1" 
                        :preview-src-list="[form.img1]">
                    </el-image>
                </el-form-item>
                 <el-form-item label="文章2">
                    <el-input :disabled="true" v-model="form.word2"></el-input>
                </el-form-item>
               <el-form-item label="图片2">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img2" 
                        :preview-src-list="[form.img2]">
                    </el-image>
                </el-form-item>
                <el-form-item label="文章3">
                    <el-input :disabled="true" v-model="form.word3"></el-input>
                </el-form-item>
                <el-form-item label="图片3">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img3" 
                        :preview-src-list="[form.img3]">
                    </el-image>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailsVisible = false">取 消</el-button>
            </span>
        </el-dialog>
             <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="id">
                    <el-input :disabled="true" v-model="form.id"></el-input>
                </el-form-item>
                 <el-form-item label="景点">
                    <el-input  v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                  <el-form-item label="图片">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.imgview" 
                        :preview-src-list="[form.imgview]">
                    </el-image>
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionFile" list-type="picture" ref="upload">
                        <el-button size="small" type="primary">修改图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                <el-form-item label="景区">
                    <el-input  v-model="form.scenicSpot"></el-input>
                </el-form-item>
                 <el-form-item label="经度">
                    <el-input  v-model="form.longitude"></el-input>
                </el-form-item>
                <el-form-item label="纬度">
                    <el-input v-model="form.latitude"></el-input>
                </el-form-item>
                
                <el-form-item label="介绍">
                    <el-input v-model="form.introduce"></el-input>
                </el-form-item>
                <el-form-item label="打卡时间">
                    <el-input v-model="form.dakatime"></el-input>
                </el-form-item>
                 <el-form-item label="打卡名人">
                    <el-input v-model="form.dakapeople"></el-input>
                </el-form-item>
                <el-form-item label="著名文章">
                    <el-input v-model="form.famousallusions"></el-input>
                </el-form-item>
                <el-form-item label="小标题">
                    <el-input v-model="form.smalltitle"></el-input>
                </el-form-item>
                <el-form-item label="文章1">
                    <el-input v-model="form.word1"></el-input>
                </el-form-item>
                 <el-form-item label="图片1">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img1" 
                        :preview-src-list="[form.img1]">
                    </el-image>
                  <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg1" list-type="picture" ref="upload">
                        <el-button size="small" type="primary">修改图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                 <el-form-item label="文章2">
                    <el-input v-model="form.word2"></el-input>
                </el-form-item>
                 <el-form-item label="图片2">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img2" 
                        :preview-src-list="[form.img2]">
                    </el-image>
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg2" list-type="picture" ref="upload">
                        <el-button size="small" type="primary">修改图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
                <el-form-item label="文章3">
                    <el-input v-model="form.word3"></el-input>
                </el-form-item>
                 <el-form-item label="图片3">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.img3" 
                        :preview-src-list="[form.img3]">
                    </el-image>
                    <div>
                        <el-upload class="upload-demo" action="auto" :http-request="uploadSectionImg3" list-type="picture" ref="upload">
                        <el-button size="small" type="primary">修改图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
                        </el-upload>
                        <!-- <el-button size="small" type="primary" @click="upload">提交</el-button> -->
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { 
    getCityList,
    updateCity,
    addCity,
    delCity
    } from '../../api/index';
export default {
    name: 'routetable',
    data() {
        return {
            query: {
                city:'',
                name:'',
                scenicSpot:'',
                pageIndex: 1,
                pageSize: 10,
            },
            tableData: [],
            editVisible: false,
            detailsVisible:false,
            addVisible:false,
            pageTotal: 0,
            form: {},
            value:"",
            url : 'http://120.55.48.156/',
            uploadFile: "",
            uploadImg1:"",
            uploadImg2:"",
            uploadImg3:"",
            imageUrl:"",

        };
        
    },
    created() {
        this.getCity();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getCity() {
            getCityList(this.query).then(res => {
                this.tableData = res.data.partList;
                this.tableData.forEach(element => {
                    element.imgview = this.url+element.imgview
                });
                this.pageTotal = res.data.total;
            });
        },
        updateData(){
            updateCity(this.form).then(res=>{
                 console.log(res)
            })
        },
        addData(){
            addCity(this.form).then(res=>{
                console.log(res)
            })
        },
        delData(id){
            delCity(id).then(res=>{
                console.log(res)
            })
        },
        
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getCity();
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
                    this.delData(id)
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            this.query.pageSize=val;
            this.$set(this.query);
            this.getCity();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
             this.query.pageIndex=val;
             this.$set(this.query);
            this.getCity();
             console.log(`当前页: ${val}`);
        },
         // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
         // 详情操作
        handleDetails(index, row) {
            this.idx = index;
            this.form = row;
            this.detailsVisible = true;
        },
         // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$set(this.form);
            this.updateData();
            this.$message.success(`修改成功`);
        },
        handleAdd(){
            this.form = {};
            this.$set(this.form);
            this.addVisible=true;
        },
        addCityHandel(){
            if(this.form.name == undefined){
               alert("请输入景点名称")
            }else if(this.form.city == undefined){
               alert("请输入景点城市")
            }else if(this.form.scenicSpot == undefined){
               alert("请输入景区名称")
            }else{
                this.$set(this.form);
                this.addData();
                this.addVisible=false
            }
        },
         uploadSectionFile(param) {
            let fileObj = param.file;
            const isLt2M = fileObj.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
                return;
            }
            if (fileObj.type === "image/jpeg") {
                this.uploadFile = new File([fileObj], new Date().getTime() , {
                type: "image/jpeg"
                });
            } else if (fileObj.type === "image/png") {
                this.uploadFile = new File([fileObj], new Date().getTime() , {
                type: "image/png"
                });
            } else {
                this.$message.error("只能上传jpg/png文件");
                return;
            }
            },
             uploadSectionImg1(param) {
            let fileObj = param.file;
            const isLt2M = fileObj.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
                return;
            }
            if (fileObj.type === "image/jpeg") {
                this.uploadImg1 = new File([fileObj], new Date().getTime() , {
                type: "image/jpeg"
                });
            } else if (fileObj.type === "image/png") {
                this.uploadImg1 = new File([fileObj], new Date().getTime() , {
                type: "image/png"
                });
            } else {
                this.$message.error("只能上传jpg/png文件");
                return;
            }
            },
             uploadSectionImg2(param) {
            let fileObj = param.file;
            const isLt2M = fileObj.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
                return;
            }
            if (fileObj.type === "image/jpeg") {
                this.uploadImg2 = new File([fileObj], new Date().getTime() , {
                type: "image/jpeg"
                });
            } else if (fileObj.type === "image/png") {
                this.uploadImg2 = new File([fileObj], new Date().getTime() , {
                type: "image/png"
                });
            } else {
                this.$message.error("只能上传jpg/png文件");
                return;
            }
            },
             uploadSectionImg3(param) {
            let fileObj = param.file;
            const isLt2M = fileObj.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
                return;
            }
            if (fileObj.type === "image/jpeg") {
                this.uploadImg3 = new File([fileObj], new Date().getTime() , {
                type: "image/jpeg"
                });
            } else if (fileObj.type === "image/png") {
                this.uploadImg3 = new File([fileObj], new Date().getTime() , {
                type: "image/png"
                });
            } else {
                this.$message.error("只能上传jpg/png文件");
                return;
            }
            },
            upload() {
            let param = new FormData(); // FormData 对象
            param.append("file", this.uploadFile); // 文件对象
            param.append("img1", this.uploadImg1); // 文件对象
            param.append("img2", this.uploadImg2); // 文件对象
            param.append("img3", this.uploadImg3); // 文件对象
            this.$axios({
                method: "post",
                url: "/pic/upload",
                data: param
            })
                .then(response => {
                    this.form.imgview = response.data.data.imgview
                    this.form.img1 = response.data.data.img1
                    this.form.img2 = response.data.data.img2
                    this.form.img3 = response.data.data.img3
                    }).then(()=>{
                        this.$message({
                        message: '上传成功',
                        type: 'success'
                        });
                        this.addCityHandel()
                    }
                    ).catch(error => {
                this.$message.error("上传失败,请稍后重试");
                });
            },
            update() {
                let param = new FormData(); // FormData 对象
                param.append("file", this.uploadFile); // 文件对象
                param.append("img1", this.uploadImg1); // 文件对象
                param.append("img2", this.uploadImg2); // 文件对象
                param.append("img3", this.uploadImg3); // 文件对象
                this.$axios({
                    method: "post",
                    url: "/pic/upload",
                    data: param
                })
                .then(response => {
                    if(response.data.data.imgview!=null){
                        this.form.imgview = response.data.data.imgview
                    }
                    if(response.data.data.img1!=null){
                        this.form.img1 = response.data.data.img1
                    }
                    if(response.data.data.img2!=null){
                       this.form.img2 = response.data.data.img2
                    }
                    if(response.data.data.img3!=null){
                        this.form.img3 = response.data.data.img3
                    }
                    }).then(()=>{
                        this.$message({
                        message: '上传成功',
                        type: 'success'
                        });
                        this.saveEdit()
                         this.$refs.upload.clearFiles();
                         this.getCity();
                    }
                    ).catch(error => {
                this.$message.error("上传失败,请稍后重试");
                });
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
