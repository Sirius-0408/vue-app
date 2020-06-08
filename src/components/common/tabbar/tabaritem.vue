<!--  -->
<template>
 <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isactive"> <slot  name="item-icon"></slot></div>
    <div v-else > <slot name="item-icon-active"></slot></div>
     <div :style="activestyle">
         <slot name="item-text"></slot>
     </div>


 </div>

</template>

<script>

export default {
props: {
    path:String,
    activecolor: {
       type:String,
       default:'red'
    }
} ,
data() {
return {

}
},
computed: {
  isactive(){
      return this.$route.path.indexOf(this.path) !== -1
  },
  activestyle(){
      return this.isactive ? {color:this.activecolor} : {}
  }
},
methods: {
 itemclick(){
    this.$router.replace(this.path)

 }
},

}
</script>
<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 50px;
    padding-top: 5px;
    font-size: 12px;
}
.tab-bar-item img{
    width: 25px;
    height: 25px;
}

</style>
