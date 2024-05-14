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
            <img
                width="280"
                src="../assets/xcx_black.jpg"
            >

          </el-tab-pane>
          <el-tab-pane label="公众号">
<!--没有公众号-->
          </el-tab-pane>
          <el-tab-pane label="联系作者">
           这是中国地质大学软件工程专业<br>
            软件过程综合实践实习项目<br>
            队员：xx<br>
            我们的项目已在GitHub开源<br>

            <el-link href="https://github.com/wzwzwz1/pqq" target="_blank">-> 点我跳转GitHub <-</el-link>
            <br>
          </el-tab-pane>

        </el-tabs>
        <el-button slot="reference" class="item" icon="el-icon-mobile-phone"></el-button>
      </el-popover>

      <el-popover placement="left" width="300"  trigger="click" v-model="showChat">
        <template slot="reference">
          <el-tooltip class="item" effect="dark" content="聊天" placement="left">
            <el-button icon="el-icon-message"></el-button>
          </el-tooltip>
        </template>
        <div class="chat-container">

          <div class="messages-container">
          <div class="message" v-for="(msg, index) in messages" :key="index" :class="{ 'is-user': msg.isUser }">
            <img src="../assets/bot-avatar.png" class="avatar">
            <div class="bubble">
              {{ msg.text }}
            </div>
          </div>
          </div>


          <div class="chat-input">
            <el-input v-model="inputText" placeholder="输入消息..." @keyup.enter="sendMsg"></el-input>
            <el-button icon="el-icon-send" @click="sendMsg">发送</el-button>
          </div>
        </div>
      </el-popover>






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
      showGPT:false,
      selectedTab: '下载 APP',
      showChat: false,
      inputText: '',
      messages: [],

      queryCount: 0 , // 添加计数器
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
    toggleGPT() {
      this.showGPT = !this.showGPT;
    },
    sendMsg() {
      if (this.inputText.trim() === '') return;
      this.messages.push({ text: this.inputText, isUser: true });
      this.inputText = ''; // 清空输入框

      // 增加回复逻辑
      let responseText = '';
      let randomDelay = 1000 + Math.random() * 1000;  // 1000ms (1s) 到 2000ms (2s)
      switch (this.queryCount) {
        case 0:
          responseText = 'aaa';
          break;
        case 1:
           randomDelay =4000
          responseText = '响应超时，请重试';
          break;
        case 2:
          responseText = 'ccc';
          break;
        default:
          responseText = 'No more predefined responses.';
      }
      this.queryCount++;  // 增加计数

      // 生成1到2秒之间的随机延迟时间


      setTimeout(() => {
        this.messages.push({ text: responseText, isUser: false });
      }, randomDelay);
    }
,

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

.message {
  display: flex;
  align-items: center;
  margin: 5px;
  word-wrap: break-word;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.bubble {
  padding: 10px;
  border-radius: 20px;
  flex-grow: 1;
}

.message.is-user {
  flex-direction: row-reverse;
}

.message.is-user .bubble {
  background-color: #d3f261;
}

.message:not(.is-user) .bubble {
  background-color: #f3f3f3;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow: hidden;
  border: 1px solid #ccc;
  padding: 5px;
  background-color: white;
}


.messages-container {
  overflow-y: auto;
  flex-grow: 1; /* 让消息区域占据所有剩余的空间 */
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px; /* 根据需要调整 */
}
</style>
