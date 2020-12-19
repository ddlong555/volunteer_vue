<template>
  <div class="homeBox">
    <!-- 弹出窗口 -->
    <div class="top">
    <div class="login-container" >

      <div class="click-logo" v-if="is_login===false">
        <router-link @click.native="gotologin" to="/personal">
          <div class="title">登录</div>
        </router-link>
      </div>
      <div class="click-logo" v-else-if="is_login===true">
        <div class="title">欢迎您！{{user.name}}</div>
      </div>
    </div>
    <img src="https://s1.ax1x.com/2020/06/10/toxWu9.jpg" class="back" />
    </div>
    <div >
     <span style="margin-left: 20%">收藏</span>
      <div class="vLine" style="border-left: solid 2px #ccc;
        height: 40px;
        vertical-align: middle;
        display: inline-block;
        margin-left: 20%;
        margin-top: 15px;">
      </div>
      <span style="margin-left: 15%"> 订阅</span>
    </div>
    <div style="margin-top: 5%;">
    <div style="background-color: white;margin-left: 22%">
      <img src="https://s1.ax1x.com/2020/06/10/tox3AP.jpg" height="50px" width="42px" >
      <div style="margin-top: 1%;margin-left: 2%">下载 </div>
    </div>
    <div style="background-color: white;margin-top:-83px;margin-left: 68%">
      <img src="https://s1.ax1x.com/2020/06/10/tox07q.png" height="50px" width="40px" >
      <div style="margin-top: 1%;margin-left: 6%">已购 </div>
    </div>
    </div>
    <div style="margin-top: 6%;">
      <div style="background-color: white;margin-left: 22%">
        <router-link  to="/personal2">
        <img src="https://s1.ax1x.com/2020/06/10/toxNcQ.png" height="50px" width="40px" >
        <div style="margin-top: 1%;margin-left: 2%">
       定制
        </div>
        </router-link>
      </div>
      <div style="background-color: white;margin-top:-80px;margin-left: 68%">
        <img src="https://s1.ax1x.com/2020/06/10/toxrNV.png" height="50px" width="46px" >
        <div style="margin-top: -2%;margin-left: 6%">记录 </div>
      </div>
    </div>

    <li class="nav-item justify-content-end" >

      <a class="nav-link " href="#" v-on:click="logout"style="color:rgba(245,149,31,0.59);padding-left: 78%;font-size:12px;">
        退出当前帐号
      </a>

    </li>
    <div class="card"  v-for="(item, index) in item" :key="index"  v-if="index < 4" >
      <img  :src="item.src"  alt="头像" style=" float:left;height: 130px;  width:100%; border-radius: 15px;">
      <div  class="goodsType" style="margin-left: 25%">
        {{ item.goodsType }}
      </div>
    </div>

    <div id="myModal" class="modal" style="padding-top: 180px">
      <!-- 弹窗内容 -->
      <div class="modal-content">

      <el-card style="width:100%;" >
          <div slot="header" class="clearfix">
            <span>登录</span>
          </div>
          <table>
            <tr>
              <td>用户名*</td>
              <td>
                <el-input v-model="user.name"placeholder="请输入名字" ></el-input>
              </td>
            </tr>
            <tr>
              <td>邮箱*</td>
              <td>
                <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
              </td>
            </tr>
            <tr>
              <td>密码*</td>
              <td>
                <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
              </td>
            </tr>
            <br />
            <tr>
              <td colspan="2">
                <el-button style="width: 320px" type="primary" :disabled="ischeck" @click="doLogin">登录</el-button>
                <br /> <br />

                <label><input name="accept" type="checkbox" value="true" v-model="checked" />首次登陆会自动创建新账号<br></br>且代表同意《用户服务协议》和《隐私政策》</label>
              </td>

            </tr>
          </table>
        </el-card>
      </div>

    </div>







  </div>



</template>

<script>


    // 弹窗js
    function open_window(){
        //获取弹窗所在div
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        window.onclick = function(event) {
            //关闭弹窗
            if (event.target == modal) modal.style.display = "none";
        }
    }

    function close_window(){
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }

    export default {
        data() {



            return{
                imgUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3987166397,2421475227&fm=26&gp=0.jpg.jpg',

                user:{
                    name:'',
                    email:'',
                    password:'',
                },
                item: [
                    {goodsType: '转载声明',src: 'https://s1.ax1x.com/2020/06/10/toj3DI.jpg',},
                    { goodsType: '关于我们',  src: 'https://s1.ax1x.com/2020/06/10/tojvMd.jpg',},
                    {goodsType: '商务合作', src: 'https://s1.ax1x.com/2020/06/10/tovBWD.jpg',},
                    {goodsType: '加入我们',src: 'https://s1.ax1x.com/2020/06/10/tovhY8.jpg',},
                ],
                is_login:false,
                checked:false,
                value: null,
                iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'] // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
            }
        },



        computed:{
            ischeck: function(){
                return !this.checked;
            }
        },

        methods:{

            logout:function(){
                //发送请求
                this.is_login=false;

            },
            gotologin(){
                open_window();
                this.user={name:'',email:'',password:''};
                this.checked=false;
            },
            doLogin(){
                this.$axios.get("/axios/login",
                    {
                        params:{
                            username:this.user.name,
                            password:this.user.password,
                            email:this.user.email,
                        }
                    })
                    .then((res) => {
                        if(res==true){
                            this.is_login=true;
                            this.$store.state.user=this.user.name;
                            alert("登录成功！");
                        }
                        else
                            alert("登录/注册失败！");
                        close_window();
                        this.$router.push({
                            path: '/personal',
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },



    }
</script>




<style lang="stylus" scoped>
  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: white;
  }
  .card {
    margin-top: 2%;
    margin-left: 7%;
    display:inline-block;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 40%;
    height:15%;
    border-radius: 15px;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .goodsdetail{
    font-size:12px;
    color: rgba(0, 0, 0, 0.47);

  }
    .top{
      display:inline-block
      margin-top 5%
      display:inline
    }
    .back{
      margin-top: -98px;
      margin-left: 40%;
      width 60%
    }
  .login-container{
    margin-top:10%
    margin-left 5%
    width: 60px;
    height: 60px;
    border-radius: 50px;
    background-color: rgba(38, 35, 35, 0.29);
  }

  .title{
    padding-top 30%
    width: 360rpx;
    height: 360rpx;
    line-height: 360rpx;
    text-align: center;
    font-size: 56rpx;
    color: #383838;
  }

  /* 弹窗 (background) */
  .modal {
    display: none; /* 默认隐藏 */
    position: fixed;
    z-index: 1;
    padding-top: 100px;

    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);

  }

  .modal-content {
    /*position: relative;*/
    position: relative;
    background-color: #fefefe;
    margin: auto;
    border: 1px solid #888;
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s

  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover {
    color: #fff;
    background-color: rgba(251, 156, 125, 0.31);
    border-color: rgba(251, 156, 125, 0.35);
  }
  .el-button--primary {
    color: #fff;
    background-color: rgba(251, 143, 66, 0.77);
    border-color: rgba(251, 143, 66, 0.79);
  }
  @-webkit-keyframes animatetop {
    from {top:-200px; opacity:0}
    to {top:0; opacity:1}
  }

  @keyframes animatetop {
    from {top:-200px; opacity:0}
    to {top:0; opacity:1}
  }

  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover, .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

</style>

