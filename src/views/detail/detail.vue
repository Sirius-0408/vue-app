<template>
 <div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content"
     ref="scroll"
     :probe-type="3"
     @scroll="contentScroll">
     <detail-swiper :top-images="topImages"/>
     <detail-base-info :goods="goods"/>
     <detail-shop-info :shop="shop"/>
     <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
     <detail-param-info ref="params" :param-info="paramInfo"/>
     <detail-comment-info ref="comment" :comment-info="commentInfo"/>
     <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
     <detail-bottom-bar @addToCart="addToCart"/>
     <back-top @click.native="backClick" v-show="isshowbacktop"/>
 </div>
</template>

<script>
import DetailNavBar from './childcomps/detailnavbar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from "common/utils.js"
import {backTopMixin} from "common/mixin.js"
import {mapActions} from 'vuex'

import DetailSwiper from './childcomps/detailswiper'
import DetailBaseInfo from './childcomps/detailbaseinfo'
import DetailShopInfo from './childcomps/detailshopinfo'
import DetailGoodsInfo from './childcomps/detailgoodsinfo'
import DetailParamInfo from './childcomps/detailparaminfo'
import DetailCommentInfo from './childcomps/dtailcommentinfo'
import DetailBottomBar from './childcomps/detailbottombar'

import Scroll from 'components/common/scroll/scroll'
import GoodsList from 'components/content/goods/goodslist'
 export default {
   name:'Detail',
   components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
   },
  //  引入mixin中的const
   mixins:[backTopMixin],
    data () {
     return {
       iid:null,
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       paramInfo:{},
       commentInfo:{},
       recommends:[],
       themeTopY:[],
       getThemeTopY:null,
       currentIndex: 0,

     }
   },
   created(){
      // 1.保存传入的iid
     this.iid = this.$route.params.iid
    //  2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        // 2获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4保存商品详细信息
        this.detailInfo = data.detailInfo
        //5获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 6取出评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
       this.recommends = res.data.list
      })
      // 4.给getThemeTopY赋值 防抖操作
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopY.push(Number.MAX_VALUE)
      },50)
   },
   methods:{
     ...mapActions(['addCart']),
     imageLoad(){
       this.$refs.scroll.refresh()
       this.getThemeTopY()
     },
     titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500)
      },
      contentScroll(position){
        // 获取y值
        const positionY = -position.y
        // positiony和主题值对比
        let length = this.themeTopY.length
        for(let i = 0;i < length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 回到顶部
        // 判断backtop是否显示
        this.listenShowBackTop(position)

      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        // 2.将商品添加到购物车
        this.addCart(product).then(res => {
         this.$toast.show(res)
        })
      }
   }

 }
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 50px);
  overflow: hidden;

}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
