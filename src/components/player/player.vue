<template>
  <div>

    <div class="test_two_box"  >
    <el-row>
        <div  class="song-img" style="padding-top:  0%">
          <img src=" https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1477043087,1626055460&fm=26&gp=0.jpg" style="padding-top: 0%;"height="250px" width="100%"/>
        </div>

      <el-col :span="4"  style="padding-top:
        el-popover
          trigger="hover
      <div style="text-align: center ">

        <el-button
          @click="changeVolume(-10)"
          icon="el-icon-minus"
          circle></el-button>
        <el-button
          @click="changeVolume(10)"
          icon="el-icon-plus"
          circle></el-button>
        <el-button
          @click="play"
          id="play"
          slot="reference"
          :icon="music.isPlay?'el-icon-refresh':'el-icon-caret-right'"
          circle></el-button>
        <el-button
          icon="el-icon-star-off"
          circle
          circle></el-button>
        <el-button
          icon="el-icon-download"
          circle
          circle></el-button>
      </div>

      <el-col :span="14"  style="padding-left: 20px">
        <el-slider
          @change="changeTime"
          :format-tooltip="formatTime"
          :max="music.maxTime"
          v-model="music.currentTime"
          style="width: 100%;"></el-slider>
      </el-col>

      <el-col :span="6" style="padding: 9px 0px 0px 10px;color:#909399;font-size: 13px">
        {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
      </el-col>

    </el-row>

    <audio ref="music" loop autoplay>
          <source src="http://img-cdn2.515ppt.com/sound/00/30/33/18/303318_857c5693de74650ff9c3eb55d58f44a4.mp3" type="audio/mpeg">
        </audio>
    </div>

    <el-divider></el-divider>
    <el-row>

      <el-col :span="75" style="font-size:19px;color: #02060a">{{detail}}</el-col>     <el-button type="primary" icon="el-icon-plus"style=" margin-left: 2%;padding-bottom: 7px;padding-right: 15px;padding-left: 2px;padding-top: 7px;background-color: #ff875d"">订阅</el-button>
      <el-col :span="8">{{rtitle}}</el-col>
    </el-row>
    <br><br>
    <el-row>
      <el-col :span="15"> {{rdesp}} </el-col>
    </el-row>
    <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
      <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
      <div class="reply-info" >
        <div
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
        >
        </div>
      </div>
      <div class="reply-btn-box" v-show="btnShow">
        <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
      </div>
    </div>
    <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
      <div class="author-info">
        <span class="author-name">{{item.comment_author}}</span>
        <span class="author-time">{{item.comment_time}}</span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply">{{item.content}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

    const clickoutside = {
        // 初始化指令
        bind(el, binding, vnode) {
            function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
            }
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.vueClickOutside = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        update() {},
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.vueClickOutside);
            delete el.vueClickOutside;
        },
    };
    export default {
        name: "TestTwo",
        mounted(){
            this.initVideo();
        },
        activated() {
            if(this.$route.query.audio != null){
            this.$refs.music.src=this.$route.query.audio.audio_url;
            this.detail=this.$route.query.audio.audio_description;
            }
            this.$axios.get("/axios/get_comment_audio",
                    {
                        params:{
                        audio_id:this.$route.query.audio.audio_id
                        }
                    })
                    .then((res) => {
      					 //console.log(res);
                         if(res!=null)
                                this.comments=res;
                         //console.log(this.comments);
                    })
                    .catch((error) => {
                        console.log(error);
            });
        },

        name:'ArticleComment',
        data(){
            return{
                music:{
                    isPlay:true,
                    currentTime:0,
                    maxTime:0,
                    volume:80
                },

                rdesp:'',
                rtitle:'',
                btnShow: false,
                index:'0',
                replyComment:'',
                myName:'Lana Del Rey',
                myId:19870621,
                to:'',
                toId:-1,
                comments:[],
                comment_list:[],
                detail:"",
            }
        },
        mounted(){
            this.$nextTick(()=>{
                setInterval(this.listenMusic,1000)
            })
        },
        directives: {clickoutside},
        methods: {
            listenMusic(){
                if(!this.$refs.music){
                    return
                }
                if(this.$refs.music.readyState){
                    this.music.maxTime = this.$refs.music.duration
                }
                this.music.isPlay=!this.$refs.music.paused
                this.music.currentTime = this.$refs.music.currentTime
            },
            play(){
                if(this.$refs.music.paused){
                    this.$refs.music.play()
                }else{
                    this.$refs.music.pause()
                }
                this.music.isPlay=!this.$refs.music.paused
                this.$nextTick(()=>{
                    document.getElementById('play').blur()
                })
            },
            changeTime(time){
                this.$refs.music.currentTime = time
            },
            changeVolume(v){
                this.music.volume += v
                if(this.music.volume>100){
                    this.music.volume = 100
                }
                if(this.music.volume<0){
                    this.music.volume = 0
                }
                this.$refs.music.volume = this.music.volume/100
            },
            formatTime(time){
                let it = parseInt(time)
                let m = parseInt(it/60)
                let s = parseInt(it%60)
                return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
            },


        queryones(id,sum){
                /*在这里进行跨域请求*/
                this.axios({
                    method: "post",
                    url: "/api/PsychoSys/showres.action?id="+id+"&fsource="+sum
                })
                    .then(res => {
                        this.rtitle=res.data[0].rtitle;
                        this.rdesp=res.data[0].rdesp;
                    }).catch(function(err) {
                    console.log(err);
                });
                /*在这里进行跨域请求*/
            },

            inputFocus(){
                var replyInput = document.getElementById('replyInput');
                replyInput.style.padding= "8px 8px"
                replyInput.style.border ="2px solid blue"
                replyInput.focus()
            },
            showReplyBtn(){
                this.btnShow = true
            },
            hideReplyBtn(){
                this.btnShow = false
                //var replyInput = document.getElementById('replyInput');
                //replyInput.style.padding= "10px"
                //replyInput.style.border ="none"
            },
            sendComment(){
                if(!this.replyComment){
                    this.$message({
                        showClose: true,
                        type:'warning',
                        message:'评论不能为空'
                    })
                }
                else if(this.$store.state.user==''){
                        	alert("评论前请先登录账号！");
                        	this.$router.push({
                            path: '/personal',
                        	});
                }
                else{
                    let input =  this.replyComment;
                    let timeNow = new Date();
                    let time= timeNow.toLocaleString();
					this.$axios.get("/axios/comment_audio",
                    {
                        params:{
                            content:input,
                            comment_author:this.$store.state.user,
                            audio_id:this.$route.query.audio.audio_id,
                            comment_time:time,
                        }
                    })
                    .then((res) => {
                        if(res==true){
                            alert("评论成功！");
                        }
                        else
                            alert("评论失败！请重试！");
                        this.$router.push({
                            path: '/player',
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                }
            },
            onDivInput: function(e) {
                this.replyComment = e.target.innerHTML;
            },
            dateStr(date){
                //获取js 时间戳
                var time=new Date().getTime();
                //去掉 js 时间戳后三位，与php 时间戳保持一致
                time=parseInt((time-date)/1000);
                //存储转换值
                var s;
                if(time<60*10){//十分钟内
                    return '刚刚';
                }else if((time<60*60)&&(time>=60*10)){
                    //超过十分钟少于1小时
                    s = Math.floor(time/60);
                    return  s+"分钟前";
                }else if((time<60*60*24)&&(time>=60*60)){
                    //超过1小时少于24小时
                    s = Math.floor(time/60/60);
                    return  s+"小时前";
                }else if((time<60*60*24*30)&&(time>=60*60*24)){
                    //超过1天少于30天内
                    s = Math.floor(time/60/60/24);
                    return s+"天前";
                }else{
                    //超过30天ddd
                    var date= new Date(parseInt(date));
                    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
                }
            }
        },
    }
</script>
<style lang="stylus" scoped>
  .my-reply
    padding 10px
    background-color #fafbfc
    .header-img
      display inline-block
      vertical-align top
    .reply-info
      display inline-block
      margin-left 5px
      width 90%
      @media screen and (max-width:1200px) {
        width 80%
      }
      .reply-input
        min-height 20px
        line-height 22px
        padding 10px 10px
        color #ccc
        background-color #fff
        border-radius 5px
        &:empty:before
          content attr(placeholder)
        &:focus:before
          content none
        &:focus
          padding 8px 8px
          border 2px solid blue
          box-shadow none
          outline none
    .reply-btn-box
      height 25px
      margin 10px 0
      .reply-btn
        position relative
        float right
        margin-right 15px
  .my-comment-reply
    margin-left 50px
    .reply-input
      width flex
  .author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
  .author-title
    padding 10px
    .header-img
      display inline-block
      vertical-align top
    .author-info
      display inline-block
      margin-left 5px
      width 60%
      height 40px
      line-height 20px
      >span
        display block
        cursor pointer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .author-name
        color #000
        font-size 18px
        font-weight bold
      .author-time
        font-size 14px
    .icon-btn
      width 30%
      padding 0 !important
      float right
      @media screen and (max-width : 1200px){
        width 20%
        padding 7px
      }
      >span
        cursor pointer
      .iconfont
        margin 0 5px
    .talk-box
      margin 0 50px
      >p
        margin 0
      .reply
        font-size 16px
        color #000
    .reply-box
      margin 10px 0 0 50px
      background-color #efefef
</style>


