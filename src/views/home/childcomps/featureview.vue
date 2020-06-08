<template>
 <div class="feature" @click="itemClick">
   <a href="#">
     <img src="~assets/img/home/cloth.jpg" alt="">
   </a>
 </div>
</template>

<script>
 export default {
   methods:{
     itemClick(){
       this.$router.push('/detail')

     }
   },
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style>
.feature img{
  width: 100%;
  height: 1000px;
}

</style>
