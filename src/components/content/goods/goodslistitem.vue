<template>
 <div class="goods-item" @click="itemclick">
   <!-- 4.让小的对象传递组件 -->
 <img v-lazy="showImage" :key="showImage" alt="" @load="imageLoad">
 <div class="goods-info">
<p>{{goodsItem.title}}</p>
<span class="price">{{goodsItem.price}}</span>
<span class="collect">{{goodsItem.cfav}}</span>
 </div>
 </div>
</template>

<script>
export default{
props: {
goodsItem:{
  type:Object,
  default(){
    return {}
  }
}
},
computed:{
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
  itemclick(){
    this.$router.push('/detail/' + this.goodsItem.iid)
  }
}
}
</script>

<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 46%;
}
.goods-item img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding-bottom: 10px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
  position: relative;
  color: var(--color-high-text);
}
.collect::before{
  content: '';
  position: absolute;
  left: -17px;
  top: -1px;
  background: url("~assets/img/common/star.svg") 0 0/14px 14px;
  width: 14px;
  height: 14px;
}
</style>
