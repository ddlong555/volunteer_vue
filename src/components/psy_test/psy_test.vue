<template>
  <div id="app">
  <el-container>
        <el-header>
          <el-col  class="title" align=center style="font-size: 20px;font-weight: bold;margin-top: 15px">{{title.subject}}</el-col>
        </el-header>

    <el-main>
         <el-col  style="font-size: 18px;font-weight: bold;">题目介绍：</el-col>
        <br>
        <el-col >
           {{title.introduce}}
        </el-col>
      <el-col >
        <img v-bind:src="title.img"style="height: 100%;width: 100%;" >
      </el-col>
        <el-row>
          <el-col :span="45"></el-col>
        </el-row>
        <br><br>


          <el-col    >
            <el-button type="danger"  style="margin-left: 35%" @click="showoption()">开始测试</el-button>
          </el-col>
      </el-main>
        </el-container>
  </div>
</template>


<script>
    export default {
        activated(){
            var id= this.$route.query.id;
            this.queryones(id);//需要触发的函数
        },
        data() {
            return {
                title:{
                	id:0,
                	kinds:'',
                    subject:'',
                    introduce:'',
                    img:'',
                }

            }
        },
        methods: {
            //  根据id显示某个表
            queryones(id){
                /*在这里进行跨域请求*/
                    /*获取题集信息*/
                    this.$axios.get("/axios/get_title_byid",
                    {
                        params:{
                            id:id
                        }
                    })
                    .then((res) => {
                         if(res!=null)
                                this.title=res;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    //获取题集的题目
                    this.$axios.get("/axios/get_question",
                    {
                        params:{
                            title_id:id
                        }
                    })
                    .then((res) => {
                    	 //console.log(res);
                         if(res!=null)
                                this.$store.state.question_list=res;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
					
                },
            //  根据类型查询
            showoption(){
                //开始测试，路由的跳转,把id给start页面传递过去
                this.$router.push({
                    path:"/psy_test_start",
                    query:{
                       count:0,
                       id:this.title.id
                    },
                })
            },
        }

    };
</script>

<style>
  .image{
    width:300px;
    height: 300px;
    margin-top: 8%;

  }
  .Center{
    width: 24%;
    height: 50%;
    margin-left: 11%;
    margin-top: 8%;
  }

</style>
