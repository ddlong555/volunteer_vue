<template>
  <el-container  >
        <div  v-for="(d,index) in question" :key="index"  >
          <div v-if="count==index">
            <el-header>
              <el-col class="title"  align=center  style="font-size: 20px;font-weight: bold;margin-top: 5%" >
                第{{count+1}}题:<br><br>{{d.qs_content}}</el-col>
            </el-header>
            <br>
            <br><br>
            <el-main>
            <el-radio-group v-model="checked[index]">
              <div class="myoption" v-for="(o,i) in d.test_answer" :key="i">
                <el-row class="ostyle">
                  <el-col ><el-radio :label="i" >
                    <span class="txt"> {{o.answer_content}}</span>
                  </el-radio>
                  </el-col>
                </el-row>
              </div>
            </el-radio-group>
            </el-main>
          </div>
        </div>
    <el-footer >
      <br><br>
      <el-button type="danger"  icon="el-icon-arrow-left" @click="pre" v-if="count>0"  >上一题</el-button>
      <el-button type="danger"  style="margin-left: 36%"  @click="next" v-if="count<len-1">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      <el-button type="danger"   class="btn3" icon="el-icon-edit"v-if="this.count==this.len-1" @click="result()">查看结果</el-button>
    </el-footer>
    <!-- 按钮组 -->
  </el-container>
</template>
<style>
  .center{
    width: 100%;
    height: 100%;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #E16447;
  }
  .el-button--danger:focus, .el-button--danger:hover {
    background: #f56c6c;
    border-color: #f78989;
    color: #fff;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #FF6440;
    background: #ff7c5e;
  }
  .txt {
    font-size: 19px;
  }
  .el-radio__label {
    font-size: 14px;
  }
  .el-radio {
    color: #00002e;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;

  }
  .txt{
    font-size:19px;
  }
  .ostyle{
    margin-top: 10%;
  }
  .btn3{
    padding-top: 15px;
    padding-bottom: 15px;
    margin-left: 15px;
  }

</style>

<script>
    export default {
        activated(){
        	this.title_id=this.$route.query.id;
            this.count=this.$route.query.count;
            this.queryones(this.count);//需要触发的函数
        },
        data() {
            return {
                count:2,
                question:[],
                checked:[],
                title_id:0,
                len:3,
                sum:0,
            }
        },
        methods: {
            //  根据id显示某个表
            queryones(count) {
                /*在这里进行跨域请求*/
                this.len=this.$store.state.question_list.length;
                this.checked[count]=0;
				this.question=this.$store.state.question_list;
            },
            next() {
                if (this.count++ > this.len-1) this.count = this.len-1;
                this.$router.push({
                    path:"/psy_test_start",
                    query:{
                        count:this.count,
                    }
                })
            },
            pre() {
                if (this.count-- < 0) this.count= 0;
                this.$router.push({
                    path:"/psy_test_start",
                    query:{
                        count:this.count,
                    }
                })
            }
            ,
            result(){
            	var count=0;
                var all=0;
                for(var j=0;j<this.len;j++){
                	if(this.checked[j]==null){
                	alert("请完成所有测试题目！！！");
                	return;
                	}
                    count=this.question[j].test_answer[this.checked[j]].answer_points;
                    if(count==undefined){
                        count=0;
                    }
                    all=Number(all) + Number(count);
                }
                //赋值
                this.sum=all;
                //控制台输出得分
                //console.log(all); 
                //开始测试，路由的跳转,把id和subject给另一个页面传递过去
                this.$router.push({
                    path:"/result",
                    query:{
                        title_id:this.title_id,//题目id
                        sum:this.sum//做的分数
                    }
                })
                //开始测试，路由的跳转,把id和subject给另一个页面传递过去
            },
        }
    };
</script>
