<template>
<scroll ref="scroll" class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>

</scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/scroll'
  import CartListItem from './cartlistitem'
	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem
    },
    computed:{
      cartList() {
		    return this.$store.getters.cartList
      }
    },
    activated(){
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
.cart-list{
   position: absolute;
    top: 44px;
    bottom: 50px;
    width: 100%;
    overflow: hidden;
}
</style>
