<!--  -->
<template>
  <div class="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
     <cart-list/>
     <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar'
import CartList from './childComps/cartlist'
import CartBottomBar from './childComps/cartbottombar'
export default {
components: {
  NavBar,
  CartList,
  CartBottomBar
},
data() {
return {

}
},
computed: {
  cartLength(){
    return this.$store.getters.cartLength
  }
}
}
</script>
<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;

  }

</style>
