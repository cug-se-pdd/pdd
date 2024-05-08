<template>
  <div id="app">
    <router-view></router-view>
    <SideToolbar></SideToolbar>

  </div>
</template>

<script>
import './assets/css/global.css'
import SideToolbar from './components/SideToolbar.vue'
export default {
  name: 'app',
  components: {
    SideToolbar
  }
}
</script>

<style>

</style>
