<template>
  <div>
    <!--flex寮规�х洅瀛愭ā鍨嬶紝justify-content锛氫富鎶� -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 375px">
        <div slot="header" class="clearfix">
          <span>鐧诲綍</span>
        </div>
        <table>
          <tr>
            <td>鐢ㄦ埛鍚�</td>
            <td>
              <el-input v-model="user.name" placeholder="璇疯緭鍏ュ悕瀛�"></el-input>
            </td>
          </tr>
          <tr>
          <td>閭锛堥�夊～锛�</td>
          <td>
            <el-input v-model="user.email" placeholder="璇疯緭鍏ラ偖绠�"></el-input>
          </td>
          </tr>
          <tr>
            <td>瀵嗙爜</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="璇疯緭鍏ュ瘑鐮�" @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"褰撴寜涓媏nter閿殑鏃跺�欎篃浼氭墽琛宒oLogin鏂规硶-->
            </td>
          </tr>
            <br />

          <tr>
            <!-- 鍗犱袱琛�-->
            <td colspan="2">
              <el-button style="width: 300px" type="primary" @click="doLogin">鐧诲綍</el-button>
              <br /> <br />
              <label><input name="accept" type="radio" value="" />棣栨鐧婚檰浼氳嚜鍔ㄥ垱寤烘柊璐﹀彿锛屼笖浠ｈ〃鍚屾剰銆婄敤鎴锋湇鍔″崗璁�嬪拰銆婇殣绉佹斂绛栥�� </label>
            </td>

          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return{
                user:{
                    name:'',
                    email:'',
                    password:'',
                },
                is_login:false,
            }
        },
        methods:{
            doLogin(){//涓�鐐瑰嚮鐧诲綍鎸夐挳锛岃繖涓柟娉曞氨浼氭墽琛�
                this.$axios.get("/login", 
				{
					params:{
							name:this.user.name,
							password:this.user.password,
				}
				})
				.then((res) => {
				 if(res=true)
				 this.is_login=true;
				 else
				 alert("您输入的用户名或密码有误！");
				 this.$router.push({
    			 path: '/personal',
    			 query: {
      			    user:this.user,
      			    is_login:this.is_login,
     			 }
  				 });
				})
				.catch((error) => {
					console.log(error);
				});
            }
        },
    }
</script>

