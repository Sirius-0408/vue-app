<template>
 <div class="detail-swiper">
   <swiper class="swiperimg">
     <swiper-item v-for="(item,index) in topImages" :key="index">
       <img :src="item" alt="">
     </swiper-item>
   </swiper>
 </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 export default {
   props:{
     topImages:{
       type:Array,
       default(){
         return []
       }
     }
   },
   data () {
     return {

     }
   },
   components: {
     Swiper,
     SwiperItem
   }
 }
</script>

<style scoped>
.swiperimg{
  height: 300px;
  overflow: hidden;
}

</style>
