import {POP, NEW, SELL} from "./const";
import BackTop from 'components/content/backTop/backTop'
import {BACKTOP_DISTANCE} from "common/const.js"

export const backTopMixin = {
  data() {
    return {
      isshowbacktop:false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
        },
      listenShowBackTop(position){
        this.isshowbacktop = -position.y > BACKTOP_DISTANCE
        }
  },
  components:{
    BackTop
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
