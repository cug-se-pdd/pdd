<template>
  <el-container>
    <el-header>
      <div class="header-inner">
        <a href="/welcome" class="logo">
<!--        <a @click="toWelcome" class="logo">-->
          <img style="width: 270px; height: 68px; margin-top: 6px;" src="../assets/homeLogo.jpg">
<!--          <p style="width: 270px; height: 68px; margin-top: 10px; font-size: 40px; background-color: #2d98f3" >{{this.cinemaInfo.cinemaName.substring(0, this.cinemaInfo.cinemaName.indexOf('（'))}}</p>-->
        </a>
        <el-menu
            :default-active="activeUrl"
            class="nav-menu"
            mode="horizontal"
            :router="true"
            active-text-color="#409EFF"
            text-color="#000000">
          <el-menu-item :index="item.path" v-for="item in menuList" :key="item.id">{{item.name}}</el-menu-item>
        </el-menu>
        <div class="searchContainer">
          <el-input v-model="kw" class="searchBar" placeholder="搜索活动"></el-input>
          <el-button id="searchBtn" icon="el-icon-search" type="primary" circle @click="search"></el-button>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :src="url" :size="50">{{url === '' || url === null ? 'user': ''}}</el-avatar>
            <i class="el-icon-arrow-down el-icon--right icon-arrow"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userMenu" v-if="isToken">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" v-if="isToken">退出</el-dropdown-item>
            <el-dropdown-item command="login" v-if="!isToken">登录</el-dropdown-item>
            <el-dropdown-item command="register" v-if="!isToken">注册账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view>

      </router-view>
    </el-main>
    <el-footer>
      <div class="footer-mini"></div>
      <div class="footer">
        <img style="width: 800px; height: 300px" src="../assets/register-footer.jpg">
<!--        <p style=" font-size: 40px; background-color: white">看活动，就上-{ {{this.cinemaInfo.cinemaName}} }</p>-->
      </div>
      <el-backtop></el-backtop>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      isToken: '',
      cinemaInfo: '',
      url: '',
      activeUrl: this.$route.path.substring(0, this.$route.path.indexOf('/',1) === -1 ? this.$route.path.length : this.$route.path.indexOf('/',1)),
      menuList: [
        {
          id: 1,
          name: '首页',
          path: '/home'
        },
        {
          id: 2,
          name: '活动',
          path: '/movie'
        },
        {
          id: 3,
          name: '热门',
          path: '/rankingList'
        },
        {
          id: 4,
          name: '关于我们',
          path: '/aboutUs'
        }
      ],
      //搜索关键字
      kw: ''
    }
  },
  created() {
    this.getCinemaInfo()
    this.isToken = window.sessionStorage.getItem("token")
    const userPicture = JSON.parse(window.sessionStorage.getItem('loginUser')).userPicture
    const picture = JSON.parse(userPicture)
    if(picture === null || picture.length === 0) return;
    this.url = this.global.base + picture[0]
  },
  watch: {
    '$route'() {
      this.activeUrl = this.$route.path.substring(0, this.$route.path.indexOf('/',1) === -1 ? this.$route.path.length : this.$route.path.indexOf('/',1))
    }
  },
  methods: {
    async getCinemaInfo(){
      const _this = this
      await axios.get('sysCinema').then(resp => {
        _this.cinemaInfo = resp.data.data
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
      let tmp = this.kw
      this.$router.push('/search/searchMovie?kw=' + tmp)
      this.kw = ''
    },
    handleCommand(command) {
      if(command === 'logout') {
        window.sessionStorage.clear();
        return this.$router.push('/login')
      }
      this.$router.push('/' + command)
    },
    toWelcome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style scoped>
.el-header {
  position: fixed; /* 设置导航栏为固定位置 */
  top: 0; /* 定位到视口的顶部 */
  left: 0; /* 左对齐到视口 */
  right: 0; /* 右对齐到视口 */
  height: 80px !important;
  z-index: 1000; /* 确保导航栏位于最顶层 */
  background-color: #fff; /* 设置背景颜色为白色，或其他你喜欢的颜色 */
  border-bottom: 1px solid #e6e6e6; /* 保留边框线 */
  width: 100%; /* 使导航栏宽度与视口一致 */
}

/* 为主内容添加上边距，避免被导航栏遮挡 */
.el-main {
  padding-top: 80px; /* 这个值应与 .el-header 的高度相同或稍大 */
}

/* 如果有其他全局的padding或margin可能需要调整 */
body {
  margin: 0; /* 移除默认的margin */
}

.header-inner {
  width: 75%;
  margin: 0 auto;
  display: flex;
}

.logo {
  height: 80px;
  width: 200px;
}

.nav-menu {
  border-bottom: 0px solid #eee !important;
  height: 60px;
  margin: 9px auto;
}

.searchContainer {
  padding: 20px 0;
  display: flex;
}

.searchBar >>> input {
  border-radius: 50px;
}

#searchBtn {
  transform: translate(-100%, 0);
}

.el-dropdown-link {
  width: 70px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-arrow {
  transition: all 0.2s ease-in-out;
}

.el-dropdown-link:hover .icon-arrow {
  transform: rotate(180deg) scale(1);
}

.footer-mini {
  border-top: 1px solid #EEE;
  padding-top: 20px;
  text-align: center;
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
