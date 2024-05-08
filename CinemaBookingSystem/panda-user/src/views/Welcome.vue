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
      <div class="footer-mini">
        <el-link href="https://cs.cug.edu.cn/" target="_blank">Copyright© 2020-2024 · 中国地质大学（武汉）计算机学院</el-link>
      </div>
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
      kw: '',
      xcx:'http://127.0.0.1:8181//images/bill/2024/05/08/a6fd2de1b83b409bae1df54c8ab57c61.png',
    }
  },
  created() {
    this.getCinemaInfo()
    this.isToken = window.sessionStorage.getItem("token")
    const userPicture = JSON.parse(window.sessionStorage.getItem('loginUser')).userPicture
    const picture = JSON.parse(userPicture)
    if(picture === null || picture.length === 0) return;
    this.url = this.global.base + picture[0]
    console.log(this.url)
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
.nav-menu .el-menu-item {
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease;
  padding: 10px 20px;
  border-radius: 2px; /* 添加圆角效果 */
  background: white; /* 背景色，需要根据你的页面背景调整 */
}

.nav-menu .el-menu-item:hover {
  transform: translateY(-2px); /* 轻微向上移动以增强视觉效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* 修改阴影样式和大小，使其更柔和 */
}

/* 维持其他已有样式 */
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px !important;
  z-index: 1000;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  width: 100%;
}

.header-inner {
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.logo, .mini-app-dropdown {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 给logo和小程序控件之间增加一些间隔 */
}



.nav-menu {
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0 auto;
  border-bottom: 0px solid #eee !important;
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
  transform: rotate(180deg) scale(1.1);
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
