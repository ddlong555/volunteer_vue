<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-wrapper">
      <swiper-ad :swiperAD="swiperAD"/>

      <cut-line />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抑郁" name="first"><lists-down3 :listsdown3="listsDown3"/></el-tab-pane>
        <el-tab-pane label="焦虑" name="second"><lists-down5 :listsdown5="listsDown5"/></el-tab-pane>
        <el-tab-pane label="双相" name="third"><lists-down6 :listsdown6="listsDown6"/></el-tab-pane>
      </el-tabs>

      <cut-line />
      <loading-foot />
    </div>
  </div>
</template>

<script>
    const URL = "static/test.json";
    import loadingFoot from '@/components/commonComponent/loadingFoot'
    import lazyRadio from '@/components/commonComponent/lazyRadio'
    import listsDown3 from '@/components/commonComponent/listsDown3'
    import listsDown5 from '@/components/commonComponent/listsDown5'
    import listsDown6 from '@/components/commonComponent/listsDown6'
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
                listsDown3: {},
                listsDown5: {},
                listsDown6: {},
                activeName: 'second'
            }
        },
        components: {
            'swiper-ad': swiperAd,
            'cut-line': cutLine,
            'lists-wrap': listsWrap,
            'lists-down3': listsDown3,
            'lists-down5': listsDown5,
            'lists-down6': listsDown6,

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
            this.$http.get(URL).then(res => {
                if(res.confirm) {
                    //this.swiperAD = res.data.swiperAD;
                    this.listsDown3 = res.data.listsdown3;
                    this.listsDown5 = res.data.listsdown5;
                    this.listsDown6 = res.data.listsdown6;
                    this.listenList = res.data.listenList;

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
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
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














</style>

