<template>
  <div>
    <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#409eff"
        background-color="#ffffff"
        text-color="#303133"
        router>
      <el-menu-item v-for="item in menuList" :key="item.id" :index="item.path">{{ item.name }}</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuList: [
        {
          id: 1,
          name: '活动热度榜',
          path: '/rankingList/totalBoxOfficeList'
        },
        {
          id: 2,
          name: '南望山校区热度榜',
          path: '/rankingList/domesticBoxOfficeList'
        },
        {
          id: 3,
          name: '未来城校区热度榜',
          path: '/rankingList/foreignBoxOfficeList'
        }
      ],
    }
  },
  methods:{
  },

}
</script>

<style scoped>
.el-menu{
  display: flex;
  justify-content: space-between;
}

.el-menu-item{
  font-size: 16px;
}


</style>
