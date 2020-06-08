<template>
  <div id="app">
    <!-- keepalive防止重建  exclude排除在外-->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
   <main-tab-bar/>
  <icon></icon>
  <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from './components/content/maintabbar/maintabbar'
import Icon from './components/content/Icon/Icon.vue'
  import SvgIcon from './components/content/Icon/svg.vue'
export default {
  components: {
  MainTabBar,
  Icon,
  SvgIcon
  }
}
</script>
<style scoped>
@import 'assets/css/base.css';
</style>
