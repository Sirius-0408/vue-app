<template>
<!-- ref/children获取子组件 -->
 <div class="wrapper" ref="wrapper">
   <div class="content">
   <slot></slot>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
 export default {
   props:{
     probeType:{
       type:Number,
       default:0
     },
     pullUpLoad:{
       type:Boolean,
       default:false
     }
   },
   data () {
     return {
       scroll:null
     }
   },
   components: {

   },
   mounted () {
    //  创建BScroll对象
     this.scroll = new BScroll(this.$refs.wrapper,{
      //  设置可以点击
       click:true,
       probeType:this.probeType,
       pullUpLoad:this.pullUpLoad
     })
    //  监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
     this.scroll.on('scroll',(position) => {
       this.$emit('scroll',position)
     })
    }
    //  监听滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
   },
   methods:{
    //  返回顶部
     scrollTo(x,y,time=1000){
      this.scroll && this.scroll.scrollTo(x,y,time)
     },
     refresh(){
       this.scroll && this.scroll.refresh()
     },
     finishPullUp(){
       this.scroll && this.scroll.finishPullUp()
     },
     getScrollY(){
       return this.scroll ? this.scroll.y : 0
     }
   }
 }
</script>

<style>

</style>
