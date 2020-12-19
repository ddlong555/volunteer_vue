<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-col  class="title" align=center style="font-size: 20px;font-weight: bold;margin-top: 15px;color: #dd6161">{{subject}}</el-col>
      </el-header>
      <el-main>
        <el-col  style="font-size: 18px;font-weight: bold;">测试结果：</el-col>
        <br> <br> <br>
        <el-col style="font-size: 18px;font-weight: bold;">
          {{comment}}
        </el-col>
        <el-row>
          <el-col :span="45"></el-col>
        </el-row>
        <br><br>

        <el-col    >
          <el-button type="danger"  style="margin-left: 35%" @click="showoption()">返回大厅</el-button>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>
<style>

  .center{
    width: 24%;
    height: 50%;
    margin-left: 11%;
    margin-top: 8%;
  }
</style>

</style>
<script>

    export default {
		activated(){
        	var title_id= this.$route.query.title_id;
            var sum= this.$route.query.sum;
            this.queryones(title_id,sum);//需要触发的函数
        },
        data() {
            return {
                comment:'',
            }
        },
        methods: {
            //  根据id显示某个表
            queryones(title_id,sum){
                /*在这里进行跨域请求*/
                this.$axios.get("/axios/get_result",
                    {
                        params:{
                            title_id:title_id,
                            sum:sum
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.comment=res;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //  根据类型查询
            showoption(){
                //开始测试，路由的跳转,把id和subject给另一个页面传递过去
				this.$router.push({
                    path:"/Home",
                })
                //开始测试，路由的跳转,把id和subject给另一个页面传递过去
            }
        }

    };
</script>

      