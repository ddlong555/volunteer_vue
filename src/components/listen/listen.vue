<template>
  <el-container>
    <el-header>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-download"></i> 下载</span>

    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-time"></i> 历史</span>

    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-sold-out"></i> 已购</span>

    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-star-on"></i> 收藏</span>

    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-question"></i> 帮助</span>

    </el-tab-pane>
  </el-tabs>

      </el-header>

    <el-main>

      <div class="recommend" ref="recommend" >
        <div class="recommend-wrapper"style="padding-top: 50px">
          <lists-down :listsdown="listsDown" />
          <cut-line />
          <router-link  to="/">
          <el-button type="primary" icon="el-icon-plus"style="margin-left: 35%;background-color: #ff875d">添加订阅</el-button>
          </router-link>
          <recommend-ad :commendAD="commendAD"/>
          <cut-line />
          <cut-line />
          <loading-foot />
        </div>
      </div>
    </el-main>
    </el-container>

</template>

<script>
    const URL = "static/woting.json";
    import loadingFoot from '@/components/commonComponent/loadingFoot'
    import lazyRadio from '@/components/commonComponent/lazyRadio'
    import listsDown from '@/components/commonComponent/listsDown'
    import _BScroll from '@/common/js/BScroll'
    import Swiper from '../../../static/swiper'
    import cutLine from '@/components/commonComponent/cutLine'
    import listsWrap from '@/components/commonComponent/listsWrap'
    import recommendAD from '@/components/commonComponent/recommendAd'


    export default {
        data() {
            return {
                listsDown: {},
                commendAD: {},
                activeName: 'first',
            };
        },

        components: {
            'cut-line': cutLine,
            'lists-down': listsDown,
            'loading-foot': loadingFoot,
            'recommend-ad': recommendAD,
        },
        created() {
            this.$nextTick( () => {
                _BScroll(this.$refs.recommend);
            })
        },
        mounted() {
            this.$http.get(URL).then(res => {
                if(res.confirm) {
                    //this.listsDown = res.data.listsdown;
                    this.lazyRadio = res.data.lazyRadio;
                    this.commendAD = res.data.commendAD;
                }
            });
            this.$axios.get("/axios/get_audio",
                    {
                        params:{
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.listsDown = res;
                    })
                    .catch((error) => {
                        console.log(error);
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
    };
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
