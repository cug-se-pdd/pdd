<template>
  <div>
    <el-steps :active="3" align-center>
      <el-step title="选择活动场次"></el-step>
      <el-step title="选择座位"></el-step>
      <el-step title="15分钟内提交"></el-step>
      <el-step title="活动地点取票观影" status="wait"></el-step>
    </el-steps>
    <div class="bill-info-container">
      <!-- 预约状态 -->
      <!-- 未支付，未取消，15分钟内 -->
      <div class="bill-info-status" v-if="payState === false && cancelState === false && (minutes > 0 || seconds > 0)">
        <div class="pay-icon">
          <img src="../../assets/money.png">
        </div>
        <div class="pay-info">
          <div class="pay-info-status">验证</div>
          <div class="pay-info-desc">请在<span>{{minutes}}分钟{{seconds}}秒</span>内完成验证</div>

        </div>
      </div>
      <!-- 未支付，超时取消，15分钟 -->
      <div class="bill-info-status invalid" v-if="payState === false && cancelState === true && cancelTime === null && minutes <= 0 && seconds <= 0">
        <div class="pay-icon">
          <img src="../../assets/bill-invalid.png">
        </div>
        <div class="pay-info">
          <div class="pay-info-status invalid">由于预约超时未提交，已失效</div>

        </div>
      </div>
      <div class="bill-info-status finish" v-if="payState === true">
        <div class="pay-icon">
          <img src="../../assets/finish.png">
        </div>
        <div class="pay-info">
          <div class="pay-info-status finish">已完成</div>
        </div>
      </div>
      <div class="bill-info-status invalid" v-if="cancelState === true && cancelTime !== null">
        <div class="pay-icon">
          <img src="../../assets/bill-invalid.png">
        </div>
        <div class="pay-info">
          <div class="pay-info-status invalid">预约已取消</div>
        </div>
      </div>

      <!-- 预约信息 -->
      <div class="bill-info-desc">
        <div class="bill-info-header">
          <span>预约编号: {{billInfo.billId}}</span>
          <span class="bill-info-helper">
            (有预约问题可拨打客服电话<div>{{billInfo.sysSession.sysHall.sysCinema.cinemaPhone}}</div>，
            工作时间: {{billInfo.sysSession.sysHall.sysCinema.workStartTime}}-{{billInfo.sysSession.sysHall.sysCinema.workEndTime}})</span>
        </div>

        <table class="order-table">
          <thead>
          <tr>
            <th>活动</th>
<!--            <th>语言版本</th>-->
            <th>活动时间</th>
<!--            <th>座位{{billInfo.url}}</th>-->
            <th>座位</th>
            <th>提示信息</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="movie-name">《{{billInfo.sysSession.sysMovie.movieName}}》</td>
<!--            <td class="movie-name">{{billInfo.sysSession.languageVersion}}</td>-->
            <td class="showtime">{{billInfo.sysSession.sessionDate}} {{billInfo.sysSession.playTime}} - {{billInfo.sysSession.endTime}}</td>
            <td>
              <span class="hall">{{billInfo.sysSession.sysHall.hallName}}</span>
              <div class="seats">
                <span class="bill-seat" v-for="item in billSeats" :key="item"> {{item}} </span>
              </div>
            </td>
            <td>
              <span>{{billInfo.sysSession.sessionTips}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 活动地点信息、提交预约 -->
      <div class="bill-info-area">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="18">




        <div class="cinema-info">
          <span class="bill-cinema-name">{{ billInfo.sysSession.sysMovie.movieName }}</span>
          <div class="bill-cinema-info">
            <span>活动要求：
              {{ billInfo.sysSession.sysMovie.movieArea }} </span>


          </div>
        </div>

        <!-- 统一位置的Upload和Image组件 -->

        <div class="upload-image-container">
          <!-- 上传组件：当还未支付且未取消，并且时间还剩余时显示 -->

          <el-upload
            v-if="payState === false && cancelState === false && (minutes > 0 || seconds > 0)"
            action="#"
            list-type="picture-card"
            :file-list="poster"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :on-change="handleChangeP"
            :on-success="handleSuccessP"
            :on-error="handleError"
            ref="posterRef"
            :http-request="submitFileP"
            class="upload-component"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
            </div>
            <div class="tag">
              <el-tag type="info">按活动要求上传验证图片</el-tag>
            </div>
          </el-upload>


          <!-- 图像显示组件：当支付已完成或条件不满足显示上传组件时显示 -->
          <div v-else class="image-component">
<!--            <el-image-->
<!--              fit="cover"-->
<!--              class="default-img"-->
<!--              v-for="(item,index) in billInfo.url"-->
<!--              :key="index"-->
<!--              :src="item"-->
<!--              :preview-src-list="billInfo.url">-->
<!--            ></el-image>-->
            <el-carousel :interval="4000" type="card" height="400px">
              <el-carousel-item  v-for="(item,index) in billInfo.url"
                                 :key="index"
                                 :src="item">
                <el-image style="width: 400px; height: 400px" :src="item" :fit="contain"/>
              </el-carousel-item>
            </el-carousel>

            <img src="../../assets/hxm.png">


          </div>



        </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="button-row">
          <el-col :span="12">
            <div class="button-group" v-if="payState === false && cancelState === false && (minutes > 0 || seconds > 0)">
              <el-button @click="payForBill" type="primary" style="margin-right: 10px;" round>提交预约</el-button>
              <el-button @click="cancelForBill" type="danger" round>取消预约</el-button>
            </div>
          </el-col>
        </el-row>




      </div>

    </div>
    </div>

</template>

<script>
import moment from 'moment'
export default {
  name: "BillDetail",
  data() {
    return {
      billId: this.$route.params.billId,
      billInfo: {
        sysSession: {
          sysMovie: {},
          sysHall: {
            sysCinema: {
              user: {}
            }
          }
        },
        url:[]
        ,
      },
      billSeats: [],
      payState: null,
      url:null,
      cancelState: null,
      cancelTime: null,
      //计时
      minutes: 15,
      seconds: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      poster: [],
      pictureList: [],
      imageSrc:[],
      httpURL: this.global.base
    }
  },
  created() {
    this.getBillInfo()
  },
  mounted() {
    this.add()
  },
  methods: {
    async getBillInfo() {
      // console.log("this.billId:", this.billId); // 输出 this.billId 的值
      const { data : res } = await axios.get('sysBill/' + this.billId)
      if(res.code !== 200) return this.$message.error('获取信息失败')
      let userId = JSON.parse(window.sessionStorage.getItem('loginUser')).userId
      if (userId !== res.data.userId) {
        this.$alert('非法操作！操作非本人预约。', '非法操作预约警告', {
          confirmButtonText: '我知道了',
          callback: action => {
            this.$router.push('/bill')
          }
        })
        return
      }
      this.billInfo = res.data

      this.cancelTime = this.billInfo.cancelTime
      this.url=this.billInfo.url
      this.imageSrc=this.billInfo.url


      console.log(this.billInfo)
      // 截止时间
      console.log(this.billInfo.deadline)
      //处理预约座位信息
      this.billSeats = JSON.parse(this.billInfo.seats)
      this.payState = this.billInfo.payState
      this.cancelState = this.billInfo.cancelState
      console.log('the create_time'+this.billInfo.createTime)
      this.billInfo.url = JSON.parse(this.billInfo.url).map((obj, index) => {
        return this.httpURL + obj
      })
      this.computeLeftTime()
    },
    async payForBill() {
      await this.submitFileP()
      //更新预约状态
      this.billInfo.payState = true
      this.billInfo.url=JSON.stringify(this.pictureList)
      //更新预约信息和场次座位信息
      axios.defaults.headers.put['Content-Type'] = 'application/json'
      const { data: res} = await axios.put('sysBill', JSON.stringify(this.billInfo))
      if(res.code !== 200) return this.$message.error('支付失败')
      this.payState = true
      this.$alert('预约成功！您可以前往个人中心查看预约信息', '预约通知', {
        confirmButtonText: '我知道了',
        callback: action => {
          this.$router.push('/bill')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleRemove(file) {
      console.log(file);
    },
    handleChangeP(file, filelist) {
      this.poster = filelist
      console.log(this.poster)
    },
    handleSuccessP(response) {
      this.pictureList.push(response.data)
      this.addForm = JSON.stringify(this.pictureList)
      this.editForm = JSON.stringify(this.pictureList)
    },
    handleError(err) {
      console.log(err)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async submitFileP() {
      const _this = this
      for (let i = 0; i < this.poster.length; i++) {
        let formData = new FormData()
        if (this.poster[i].status === 'success') {
          let s = this.poster[i].url
          this.pictureList.push(s.substring(s.indexOf('/images')))
          continue
        }
        let file = this.poster[i].raw
        formData.append('file', file)
        await axios.post('upload/bill', formData).then(response => {
          _this.pictureList.push(response.data.data)
        })
      }
    },
    handleDownload(file) {
      console.log(file);
    },
    async cancelForBill() {
      //更新预约状态
      this.billInfo.cancelState = true
      this.billInfo.cancelTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      // 获取场次座位信息
      const { data : curSession } = await axios.get('sysSession/find/' + this.billInfo.sessionId)
      let sessionSeats = JSON.parse(curSession.data.sessionSeats)
      // 解析出预约选择的座位，更新座位信息
      for(let seat of this.billSeats){
        let row = seat.substring(0, seat.indexOf('排'))
        let col = Number.parseInt(seat.substring(seat.indexOf('排') + 1, seat.length - 1))
        sessionSeats[row][col - 1] = 0
      }
      // 更新预约信息和场次座位信息
      axios.defaults.headers.put['Content-Type'] = 'application/json'
      const { data: res } = await axios.put('sysBill/cancel',JSON.stringify({sysBill: this.billInfo, sessionSeats: JSON.stringify(sessionSeats)}))
      if(res.code !== 200) return this.$message.error('取消失败')

      this.payState = false
      this.cancelState = true
      this.$alert('取消成功！您可以前往个人中心查看预约信息', '取消通知', {
        confirmButtonText: '我知道了',
        callback: action => {
          this.$router.push('/billDetail/' + this.billInfo.billId)
        }
      })
    },
    computeLeftTime() {
      let cur = new Date()
      let createTime = new Date(this.billInfo.createTime)
      let diff = 15 * 60 - (cur - createTime) / 1000
      if (diff < 0) {
        this.minutes = 0
        this.seconds = 0
      } else {
        this.minutes = Math.floor(diff / 60)
        this.seconds = Math.floor(diff % 60)
      }
    },
    handleExceed(){
      this.$message.error('活动封面不能超过一张!')
    },
    //计时转换数字格式
    num: function (n) {
      return n < 10 ? '0' + n : '' + n
    },
    //计时走动
    add: function () {
      let _this = this
      let time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0
          window.clearInterval(time)
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
  },
  watch: {
    second: {
      handler (newVal) {
        this.num(newVal)
      }
    },
    minute: {
      handler (newVal) {
        this.num(newVal)
      }
    }
  },
  computed: {
    second: function () {
      return this.num(this.seconds)
    },
    minute: function () {
      return this.num(this.minutes)
    }
  }
}
</script>

<style scoped>
.el-step {
  margin: 40px auto;
}

.bill-info-container{
  width: 80%;
  margin: 0 auto 40px auto;
}

.bill-info-status{
  height: 120px;
  background: #FFFBF2;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.pay-icon{
  width: 40px;
  height:40px;
  margin-left: 50px;
}

.pay-icon>img{
  width: 100%;
  height: 100%;
}

.pay-info{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.pay-info-status{
  color: #FAAF00;
  font-size: 24px;
  font-weight: 700;
}

.pay-info-desc{
  color: #999;
  font-size: 13px;
}

.pay-info-desc>span{
  font-size: 16px;
  color: #faaf00;
  margin: 5px 5px;
}

.bill-info-status.finish{
  background: #F4FFF8;
}

.bill-info-status.invalid{
  background: #FFE0E0;
}

.pay-info-status.finish{
  color: #26CE61;
}

.pay-info-status.invalid{
  color: #faaaaa;
}

.bill-info-header{
  display: flex;
  justify-content: space-between;
}

.bill-info-header>span>div{
  color: #f03d37;
}

.bill-info-helper{
  color: #999;
  font-size: 13px;
  display: flex;
  margin-bottom: 8px;
}

.order-table{
  width: 100%;
  border: 1px solid #e5e5e5;
  border-spacing: 0;
  margin-bottom: 60px;
}

.order-table thead {
  background-color: #f7f7f7;
}

.order-table thead th {
  font-size: 16px;
  color: #333;
  width: 20%;
  padding: 14px 0;
  font-weight: 400;
}

.order-table td {
  text-align: center;
  padding: 20px 0;
  color: #333;
}

.order-table .movie-name {
  font-size: 16px;
}

.order-table .showtime {
  font-size: 14px;
  color: #f03d37;
}

.order-table .cinema-name {
  font-size: 14px;
}

.order-table .hall {
  display: inline-block;
  font-size: 14px;
  color: #424242;
  font-weight: 700;
  margin-right: 10px;
  vertical-align: top;
}

.order-table .seats {
  display: inline-flex;
  text-align: left;
  flex-wrap: wrap;
}

.order-table .seats span{
  margin-right: 5px;
}

.bill-info-area{

}

.bill-cinema-name{
  font-weight: 700;
}

.bill-cinema-info{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.submit-bill{
  margin-top: 40px;
  position: absolute;

}
.upload
{
  margin-top: 40px;
  margin-right: 10%;
}

.submit-bill span{
  color: #f03d37;
  font-size: 32px;
  font-weight: 700;
}

.submit-bill span:before{
  content: '￥';
  font-size: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.button-row {
  margin-top: 20px; /* 调整按钮与上方元素的距离 */
}

.button-group {
  text-align: center; /* 确保所有按钮都在其列内居中 */
}
.upload-image-container
{
  text-align: center; /* 确保所有按钮都在其列内居中 */
  margin-top: 20px;
}
.cinema-info
{
  text-align: center;

}
.tag
{
  margin-top: 8px;
  text-align: center;
}

</style>
