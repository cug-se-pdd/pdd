<template>
  <div class="csdn-side-toolbar">
    <!-- 组合按钮 -->
    <el-button-group>
      <el-popover
          placement="left"
          width="300"

          trigger="click"
          v-model="showQR">

        <el-tabs type="border-card">
          <el-tab-pane label="小程序">
            <img src=""
            >

          </el-tab-pane>
          <el-tab-pane label="公众号">

          </el-tab-pane>
          <el-tab-pane label="联系作者">
           这是中国地质大学软件工程专业<br>

            软件过程综合实践实习项目<br>
            队员：xx<br>
            git仓库地址 ：https://github.com/wzwzwz1/pqq<br>
          </el-tab-pane>

        </el-tabs>
        <el-button slot="reference" class="item" icon="el-icon-mobile-phone"></el-button>
      </el-popover>

      <el-tooltip class="item" effect="dark" content="客服" placement="left">
        <el-button icon="el-icon-service" @click="contactSupport"></el-button>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="返回顶部" placement="left">
        <el-button icon="el-icon-arrow-up" @click="goTop"></el-button>
      </el-tooltip>
    </el-button-group>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showQR: false,
      selectedTab: '下载 APP',
      qrTabs: [
        { label: "下载 APP", imgSrc: "https://g.csdnimg.cn/side-toolbar/3.4/images/qr_app.png", desc: "程序员都在用的中文IT技术交流社区" },
        { label: "公众号", imgSrc: "https://g.csdnimg.cn/side-toolbar/3.4/images/qr_wechat.png", desc: "专业的中文 IT 技术社区，与千万技术人共成长" },
        { label: "视频号", imgSrc: "https://g.csdnimg.cn/side-toolbar/3.4/images/qr_video.png", desc: "关注【CSDN】视频号，行业资讯、技术分享精彩不断，直播好礼送不停！" }
      ]
    };
  },
  methods: {
    handleTabChange(value) {
      this.selectedTab = value;
    },
    toggleQR() {
      this.showQR = !this.showQR;
    },
    contactSupport() {
      console.log('联系客服');
    },
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>


<style scoped>
.csdn-side-toolbar {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.el-button-group {
  display: flex;
  flex-direction: column;
}

.item {
  margin-bottom: 10px;
}

.el-button {
  width: 60px;
  height: 60px;
  text-align: center;
}
</style>
