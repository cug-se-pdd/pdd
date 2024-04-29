<template>
  <div>
    <!--面包屑导航区域-->
    <div class="board">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动地点管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动地点信息管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--分页控件-->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>

    <!--卡片视图-->
    <el-card class="box-card" v-for="cinema in paginatedCinemas" :key="cinema.cinemaId">
      <!--表格显示活动地点信息-->
      <el-form :model="cinema" label-width="150px">
        <el-form-item label="活动地点名称: " prop="cinemaName">
          <el-input class="el-input-show" v-model="cinema.cinemaName" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动地点地址: " prop="cinemaAddress">
          <el-input class="el-input-show" v-model="cinema.cinemaAddress" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动地点电话: " prop="cinemaPhone">
          <el-input class="el-input-show" v-model="cinema.cinemaPhone" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动时间: ">
          <el-input class="el-input-show-time" v-model="cinema.workStartTime" disabled></el-input>
          至
          <el-input class="el-input-show-time" v-model="cinema.workEndTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="拥有场馆类型: ">
          <el-tag v-for="hall in JSON.parse(cinema.hallCategoryList)" :key="hall">{{hall}}</el-tag>
        </el-form-item>
        <el-form-item label="活动地点图片: ">
          <span v-for="item in JSON.parse(cinema.cinemaPicture)">
            <el-popover placement="left" trigger="click" width="300">
              <img :src="global.base + item" width="200%"/>
              <img slot="reference" :src="global.base + item" :alt="item"
                   style="max-height: 300px; max-width: 300px; padding: 10px"/>
            </el-popover>
          </span>
        </el-form-item>
        <el-form-item label="" prop="cinemaName">
          <el-button type="primary" @click="showEditDialog">修改活动地点信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>



    <!--修改活动地点对话框-->
    <el-dialog title="修改活动地点" :visible.sync="editDialogVisible" width="60%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="150px">
        <el-form-item label="活动地点名称" prop="cinemaName">
          <el-input v-model="editForm.cinemaName"></el-input>
        </el-form-item>
        <el-form-item label="活动地点地址" prop="cinemaAddress">
          <el-input v-model="editForm.cinemaAddress"></el-input>
        </el-form-item>
        <el-form-item label="活动地点电话" prop="cinemaPhone">
          <el-input v-model="editForm.cinemaPhone"></el-input>
        </el-form-item>
        <el-form-item label="开始营业时间" prop="workStartTime">
          <el-time-picker
            v-model="editForm.workStartTime"
            value-format="HH:mm"
            placeholder="选择开始营业时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束营业时间" prop="workEndTime">
          <el-time-picker
            v-model="editForm.workEndTime"
            value-format="HH:mm"
            placeholder="选择结束营业时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="拥有场馆类型" prop="hallCategoryList">
          <el-input class="el-input-hall" placeholder="请输入添加场馆类别名称" v-model="inputHall" clearable></el-input>
          <el-button type="primary" @click="addHallCategory()">添加</el-button>
        </el-form-item>
        <el-form-item >
          <el-tag
            v-for="(item, index) in halls"
            :key="index"
            closable
            @close="deleteHallCategory(index)">
            {{item}}
          </el-tag>
        </el-form-item>

        <el-form-item label="活动地点图片">
          <el-upload action="" list-type="picture-card"
                     :auto-upload="false"
                     :file-list="pics"
                     :on-change="handleChange"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                     ref="pictureEditRef"
                     :http-request="submitFile">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail"
                   :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete"
                      @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <!--放大预览-->
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editCinemaInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import global from "../../assets/css/global.css"
  export default {
    data() {
      return {
        currentPage: 1, // 当前页码
        pageSize: 2, // 每页显示的条数
        totalCount: 0, // 数据总数
        allCinemas: [], // 所有影院数据
        paginatedCinemas: [], // 当前页显示的影院数据

        //控制对话框的显示与隐藏
        editDialogVisible: false,
        editForm: {},
        cinemaInfo: {},
        editFormRules: {
          cinemaName: [
            { required: true, message: '请输入活动地点名称', trigger: 'change' }
          ],
          cinemaAddress: [
            { required: true, message: '请输入活动地点地址', trigger: 'change' }
          ],
          cinemaPhone: [
            { required: true, message: '请输入活动地点电话', trigger: 'change' }
          ]
        },
        inputHall: '',

        dialogImageUrl: '',
        dialogVisible: false,
        hideUpload: false,
        //添加删除图片 动态绑定图片列表
        pics: [],
        //添加删除场馆类别 动态绑定场馆列表
        halls: [],
        // 发送给后端的JSON图片数组
        pictureList: [],
        picNums: 0,
        deletePicList: []
      }
    },
    created() {
      this.fetchCinemas(); // 在组件创建时获取影院数据
      this.getCinemaInfo()
    },
    methods: {
      async fetchCinemas() {
        try {
          const response = await axios.get("sysCinema"); // 获取所有影院
          this.allCinemas = response.data.data;
          this.totalCount = this.allCinemas.length; // 设置数据总数
          this.paginateCinemas(); // 根据当前页和每页大小设置数据
        } catch (error) {
          console.error("Error fetching cinemas:", error);
        }
      },
      paginateCinemas() {
        // 根据当前页和每页大小设置分页后的影院数据
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.paginatedCinemas = this.allCinemas.slice(start, end);
      },
      handleCurrentChange(newPage) {
        this.currentPage = newPage; // 设置当前页
        this.paginateCinemas(); // 更新分页后的数据
      },
      handleSizeChange(newPageSize) {
        this.pageSize = newPageSize; // 设置每页大小
        this.paginateCinemas(); // 更新分页后的数据
      },



      async getCinemaInfo() {
        const _this = this
        await axios.get('sysCinema').then(resp => {
          _this.cinemaInfo = resp.data.data
        })
        _this.pics = []
        _this.halls = []

        for (const item of JSON.parse(this.cinemaInfo.cinemaPicture)) {
          let pic = {}
          pic['name'] = ''
          pic['url'] = this.global.base + item
          this.pics.push(pic)
        }
        for (const item of JSON.parse(this.cinemaInfo.hallCategoryList)) {
          this.halls.push(item)
        }
      },
      // 显示修改对话框，回显数据
      async showEditDialog() {
        this.editForm = this.cinemaInfo
        this.editDialogVisible = true
      },
      // 监听修改对话框的关闭事件
      editDialogClosed() {
        this.$refs.editFormRef.resetFields()
        this.$refs.pictureEditRef.clearFiles()
        this.pics = []
        this.pictureList = []
        this.halls = []
        this.getCinemaInfo()
      },
      // 取消修改
      cancelEdit() {
        this.editDialogVisible = false
        this.deletePicList.splice(0, this.deletePicList.length)
      },
      async editCinemaInfo() {
        await this.submitFile()
        this.editForm.cinemaPicture = JSON.stringify(this.pictureList)
        this.editForm.hallCategoryList = JSON.stringify(this.halls)
        this.$refs.editFormRef.validate(async valid => {
          const _this = this
          if (!valid) return
          let success = true
          axios.defaults.headers.put['Content-Type'] = 'application/json'
          await axios.put('sysCinema/update', JSON.stringify(_this.editForm)).then(resp => {
            if (resp.data.code !== 200){
              this.$message.error('修改活动地点信息失败！')
              success = false
            }
          })
          if (!success) return
          this.editDialogVisible = false
          await this.getCinemaInfo()
          this.$message.success('修改活动地点信息成功！')
          for(let item of this.deletePicList) {
            await axios.get('/upload/delete?filePath=' + item.substring(item.indexOf('/images')))
          }
        })
      },
      addHallCategory() {
        if (this.inputHall === '' || this.inputHall === null) {
          this.$alert('场馆类别添加失败！原因：所添加的场馆类别不能为空。', '场馆类别添加异常', {
            confirmButtonText: '我知道了'
          })
          return
        } else if (!this.halls.includes(this.inputHall)) {
          this.halls.push(this.inputHall)
        } else {
          console.log('已存在')
          this.$alert('场馆类别添加失败！原因：所添加的场馆类别已存在。', '场馆类别添加异常', {
            confirmButtonText: '我知道了'
          })
        }
        this.inputHall = ''
      },
      deleteHallCategory(index) {
        this.halls.splice(index, 1)
        console.log(this.halls)
      },
      handleRemove(file, fileList) {
        const filePath = file.url
        console.log(filePath)
        const idx = this.pics.findIndex(x => x.url === filePath)
        if (file.status === 'success') {
          this.deletePicList.push(file.url)
        }
        this.pics.splice(idx, 1)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleChange(file, filelist){
        this.pics = filelist.slice(0)
      },
      handleSuccess(response){
        this.pictureList.push(response.data)
        this.editForm = JSON.stringify(this.pictureList)
      },
      handleError(err){
        console.log(err)
      },
      async submitFile() {
        const _this = this
        for (let i = 0; i < this.pics.length; i++){
          let formData = new FormData()
          if (this.pics[i].status === 'success') {
            let s = this.pics[i].url
            this.pictureList.push(s.substring(s.indexOf('/images')))
            continue
          }
          let file = this.pics[i].raw
          formData.append('file', file)
          await axios.post('upload/cinema', formData).then(response =>{
            _this.pictureList.push(response.data.data)
          })
        }
      }
    }
  }
</script>

<style scoped>
.el-tag{
  margin: 0 10px 10px 0;
}
.row{
  white-space: nowrap;
  margin-top: 10px;
  padding: 0 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.row2{
  margin-top: 20px;
}
.el-input-show{
  width: 420px;
}
.el-input-show-time{
  width: 100px;
}
.el-input-hall {
  width: 240px;
  margin: 0 20px 0px 0;
}
</style>
