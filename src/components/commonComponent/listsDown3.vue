<template>
  <div class="container">
    <div class="header">
      <div class="title">{{listsdown3.title}}</div>
    </div>
    <div class="lists">
      <div class="list" v-for="(item, index) in  title_list" :key="index">
		<img :src="item.img" class="img"/>
        <div class="container-detail"@click="psy_test(item.id)" >

          <div class="title">{{item.subject}}</div>
          <div class="others">{{item.introduce}}</div>

          <!--<div class="player">
            <template v-if="item.number">
              <i class="iconfont "></i>
              <span>{{item.number}}</span>
            </template>
            <i class="iconfont"></i>
            <span>{{item.crown}}</span>
          </div>
          -->

        </div>
     
      </div>
    </div>

  </div>
</template>
<script>
    import updateList from '@/components/commonComponent/updateList'
    export default {

        props: {
            listsdown3: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                title_list: [],
            }
        },
        components: {
            'update-list': updateList
        },
        methods:{
            psy_test(title_id){
                this.$router.push({path:'/psy_test',query:{id:title_id}});//传递参数
            }
        },

        mounted:function(){
            this.$axios.get("/axios/get_title_bykinds",
                    {
                        params:{
                            kinds:'depressed'
                        }
                    })
                    .then((res) => {
                         if(res!=null){
                        this.title_list=res;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
        },
    }
</script>
<style lang="stylus" scoped>
  .container
    background-color #ffffff
    padding 10px
    box-sizing border-box
    .header
      height 40px
      line-height 40px
      width 100%
      .title
        float left
        font-weight bold
      .more
        float right
        font-size 0.9em
        color #666666
    .lists
      overflow hidden
      .classify-lists
        display flex
        justify-content flex-start
        .classify-list
          color #666666
          padding 0 6px
          border-radius 17px
          font-size 0.85em
          margin-right 5px
          border 1px solid #666666
      .list
        margin-top 10px
        display flex
        justify-content flex-start
        .img
          margin-top:0px;
          width 60px
          height 60px
          border 1px solid #e8e8e8
        .container-detail
          width 100%
          padding-bottom 4px
          margin-left 4px
          border-bottom 1px solid #eaeaea
          .title
            font-size 1.1em
            color #333333
            font-weight 500
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            width  100%
          .others
            color #999999
            font-size .9em
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            width 100%
          .player
            display block
            font-size 0.9em
            i
              float left
              margin-left 4px
            span
              float left
              color #999999
              margin-left 4px
</style>
