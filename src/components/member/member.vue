<!--此处为视频界面-->
<template>
 <div class="member" ref="member">
    <div class="member-wrapper">
      <swiper-ad :swiperAD="swiperAD"/>
      <bscroll-x :bscrollX="bscrollX"/>
      <cut-line />
      <lists-wrap :listswrap="VIPHOT" :maxLength="18" />
    </div>
 </div>
</template>
<script>
const URL = "static/member.json";

import memberLists from '@/components/commonComponent/memberLists'
import _BScroll from '@/common/js/BScroll'
import listsWrap from '@/components/commonComponent/listsWrap'
import swiperAd from '@/components/commonComponent/swiperAD'
import bscrollX from '@/components/commonComponent/bscrollX'
import cutLine from '@/components/commonComponent/cutLine'
export default {
  data() {
    return {
      swiperAD: [],
      bscrollX: [],
      VIP: {},
      VIPHOT: {},
      memberList: [],
      memberListTitle: []
    }
  },
  created() {
    this.$nextTick( () => {
      _BScroll(this.$refs.member);
    })
  },
  components: {
    'cut-line': cutLine,
    'swiper-ad': swiperAd,
    'bscroll-x': bscrollX,
    'lists-wrap': listsWrap,

  },
  activated() {
  	this.$axios.get("/axios/get_swiper",
                    {
                        params:{
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.swiperAD=res;
                    })
                    .catch((error) => {
                        console.log(error);
            });
    this.$axios.get("/axios/get_video",
                    {
                        params:{
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.VIPHOT=res;
                    })
                    .catch((error) => {
                        console.log(error);
            });
    this.$http.get(URL).then(res => {
      if(res.confirm) {
        //this.swiperAD = res.data.swiperAD;
        this.bscrollX = res.data.bscrollX;
        //this.VIP = res.data.VIP;
        //this.VIPHOT = res.data.VIPHOT;


      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.member
  padding 0
  margin 0
  position absolute
  top 0px
  left 0
  right 0
  bottom 0
  background-color #f8f8f8
  overflow hidden
</style>

