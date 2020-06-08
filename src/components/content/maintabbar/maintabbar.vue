<template>
   <tab-bar>
      <tab-bar-item path="/home" activecolor="#ff5777">
        <img slot="item-icon" src="~assets/img/tabbar/1.svg">
        <img slot="item-icon-active" src="~assets/img/tabbar/1-active.svg">
         <div slot="item-text">首页</div>
      </tab-bar-item>
       <tab-bar-item path="/category" activecolor="#ff5777">
 <img slot="item-icon" src="~assets/img/tabbar/2.svg">
  <img slot="item-icon-active" src="~assets/img/tabbar/2-active.svg">
         <div slot="item-text">分类</div>
       </tab-bar-item>
        <tab-bar-item path="/cart" activecolor="#ff5777">
 <img slot="item-icon" src="~assets/img/tabbar/3.svg">
  <img slot="item-icon-active" src="~assets/img/tabbar/3-active.svg">
         <div slot="item-text">购物车</div>
        </tab-bar-item>
         <tab-bar-item path="/profile" activecolor="#ff5777">
 <img slot="item-icon" src="~assets/img/tabbar/4.svg">
  <img slot="item-icon-active" src="~assets/img/tabbar/4-active.svg">
         <div slot="item-text">我的</div>
         </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/tabbar'
import TabBarItem from '@/components/common/tabbar/tabaritem'
 export default {
   data () {
     return {

     }
   },
   components: {
   TabBar,
  TabBarItem
   }
 }
</script>

<style>


</style>
