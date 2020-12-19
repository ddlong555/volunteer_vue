<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-wrapper">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in swiperAD" :key="item">
          <img :src="item.pic_url"  style="width: 100%;height:100%"/>
        </el-carousel-item>
      </el-carousel>
      <cut-line />
      <lists-wrap :listswrap="guessLike" :maxLength="18" />
      <cut-line />

      <lazy-radio :lazyRadio="lazyRadio"/>

      <loading-foot />
    </div>
  </div>
</template>

<script>
    const URL = "static/recommend.json";

    import loadingFoot from '@/components/commonComponent/loadingFoot'
    import lazyRadio from '@/components/commonComponent/lazyRadio'
    import listsDown from '@/components/commonComponent/listsDown'
    import swiperAd from '@/components/commonComponent/swiperAD'
    import _BScroll from '@/common/js/BScroll'
    import Swiper from '../../../static/swiper'
    import flexLists from '@/components/commonComponent/flexLists'
    import cutLine from '@/components/commonComponent/cutLine'
    import listsWrap from '@/components/commonComponent/listsWrap'
    import recommendFreeVue from '@/components/commonComponent/recommendFree.vue';
    import recommendAD from '@/components/commonComponent/recommendAd'
    export default {
        data() {
            return {
                swiperAD: [],
                quickNews: [],
                guessLike: {},
                recommend: {},
                listsDown: {},
                commendAD: {},
                history: {},
                listenList: {},
                lazyRadio: {},
                fyCommand: {}
            }
        },
        components: {
            'swiper-ad': swiperAd,
            'cut-line': cutLine,
            'lists-wrap': listsWrap,
            'lists-down': listsDown,
            'recommend-ad': recommendAD,
            'lazy-radio': lazyRadio,
            'loading-foot': loadingFoot
        },
        created() {
            this.$nextTick( () => {
                _BScroll(this.$refs.recommend);
            })
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
                                this.guessLike=res;
                    })
                    .catch((error) => {
                        console.log(error);
            });
            this.$axios.get("/axios/get_audio",
                    {
                        params:{
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.lazyRadio=res;
                    })
                    .catch((error) => {
                        console.log(error);
            });
            this.$http.get(URL).then(res => {
                if(res.confirm) {
                    //this.swiperAD = res.data.swiperAD;
                    this.quickNews = res.data.quickNews;
                    //this.guessLike = res.data.guessLike;
                    //this.recommend = res.data.recommend;
                    this.listsDown = res.data.listsdown;
                    this.history = res.data.history;
                    this.commendAD = res.data.commendAD;
                    //this.listenList = res.data.listenList;
                    //this.lazyRadio = res.data.lazyRadio;
                    this.fyCommand = res.data.fyCommand;
                }
            });
        },
        updated() {
            new Swiper('.flex-container');
            new Swiper('.quickNews-swiper',{
                direction : 'vertical',
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                autoplay: true,
                speed: 700,
                loop: true,
                autoplayDisableOnInteraction : false,
            });
        }
    }
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl';
  .recommend
    padding 0
    margin 0
    position absolute
    top 0px
    left 0
    right 0
    bottom 0
    background-color #f8f8f8
    overflow hidden
    .quickNews
      padding  0 10px
      box-sizing border-box
      background-color #fff
      height 40px
      box-size border-box
      .quickNews-container
        width 100%
        height 100%
        border-top 1px solid #f8f8f8
        display flex
        justify-content space-around
        line-height 40px
        .quickNews-logo
          color #f86442
          font-weight 600
          font-style italic
        .quickNews-swiper
          width 80%
          height 100%
          overflow hidden
          .swiper-slide
            overflow hidden
            text-overflow ellipsis
            white-space: nowrap
            width 100%
            height 100%
        .quick-more
          width 18px
          height 18px
          border-radius 50%
          background-color #d9d9d9
          margin-top 10px
    .guessLike
      background-color #ffffff
      padding 0 10px
      box-size border-box
      .guessLike-header
        height 40px
        line-height 40px
        .guessLike-title
          float left
          font-weight bold
        .guessLike-click
          margin 0 10px
          color #f86442
          float left
          font-size 0.9em
        .guessLike-more
          float right
      .guessLike-wrapper
        padding 5px 0
        display block
        clear both
        .guessLike-lists
          display flex
          justify-content space-between
          flex-wrap wrap
          .guessLike-list
            width 112px
            margin 5px 0
            overflow hidden


  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }











</style>
