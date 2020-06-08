<!--  -->
<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物</div></nav-bar>
    <tab-control
      class="tabcontrol"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends"/>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      class="tab"
    />

  <!-- 2.使用goodslist -->
      <good-list :goods="showGoods"/>
       </scroll>
       <back-top @click.native="backClick" v-show="isshowbacktop"/>
</div>
</template>

<script>
import HomeSwiper from './childcomps/homeswiper';
import RecommendView from './childcomps/homerecommendView';

import TabControl from 'components/content/tabControl/tabControl';
import NavBar from 'components/common/navbar/navbar';
import GoodList from 'components/content/goods/goodslist';

import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from 'common/utils.js'

import Scroll from 'components/common/scroll/scroll';
import BackTop from 'components/content/backTop/backTop'

export default {
components: {
  HomeSwiper,
  RecommendView,
  TabControl,
  NavBar,
  GoodList,
  Scroll,
  BackTop
},
data () {
  return {
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
    },
    currentType:'pop',
    isshowbacktop:false,
    tabOffsetTop:0,
    isTabFixed:false,
    saveY:0
  }
},
computed:{
  showGoods(){
    return this.goods[this.currentType].list
  }
},
// 切换保持原来的状态
activated(){
  this.$refs.scroll.refresh()
  this.$refs.scroll.scrollTo(0,this.saveY,0)
},
deactivated(){
  // 保存y值
this.saveY = this.$refs.scroll.getScrollY()
},
created () {
  // 请求多个数据
  this.getHomeMultidata()
  // 1.请求商品数据
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')

},
mounted(){
  // refresh bug处理 bus事件总线
  const refresh = debounce(this.$refs.scroll.refresh, 50)
  this.$bus.$on('itemImageLoad', () => {
    refresh()
  })
},
methods: {
  // 加载更多
  loadMore(){
    this.getHomeGoods(this.currentType)
  },
  // 事件监听相关
  tabClick(index){
    switch(index){
        case 0:
        this.currentType = 'pop'
        break
        case 1:
        this.currentType = 'new'
        break
        case 2:
        this.currentType= 'sell'
        break
    }
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
  },
  backClick(){
    this.$refs.scroll.scrollTo(0,0)
  },
  contentScroll(position){
    // 判断backtop是否显示
    this.isshowbacktop = (-position.y) > 1000
    // 决定是否吸顶
    this.isTabFixed = (-position.y) > this.tabOffsetTop
  },
  // 监听image高度
  swiperImageLoad(){
  this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

  },
  // 网络请求相关
  getHomeMultidata(){
    getHomeMultidata().then(res =>{
    this.banners=res.data.banner.list;
    this.recommends=res.data.recommend.list;
  })
  },
  getHomeGoods(type){
    const page = this.goods[type].page + 1
    // res获得数据
    getHomeGoods(type,page).then(res => {
      // ...是把一个数组的数据解析并塞到另一个数组里面
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    })
  }
}
}
</script>
<style scoped>
.home-nav{
background-color: var(--color-tint);
 color: #fff;

}
#home{

  height: 100vh;
  position: relative;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
.tabcontrol{
position: relative;
background: #fff;
height: 45px;
z-index: 9;

}
</style>
