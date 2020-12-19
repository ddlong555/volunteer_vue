<template>
           <div id="app">
            <ul class="list-group">
                <li class="list-group-item" v-for="item in comment_list" :key="item.id">
                    <span class="badge">评论人：  {{item.comment_author}}</span>
                    {{item.content}}
                </li>
            </ul>
        </div>
</template>
    <script src="node_modules\vue\dist\vue.js"></script>
    <script>
        let commentBox = {//定义评论组件
            data(){//进行数据的绑定,记住组件内的数据是一个方法
                return{
                    user:'',
                    content:''
                }
            },
            template:"#temp",
            methods:{
                add(){//评论添加函数
                    //获取当前评论
                    let comment = {id:Date.now(),user:this.user,content:this.content};
                    //从localStorage读取列表
                    let list = JSON.parse(localStorage.getItem('cmts')|| '[]');//若不存在cmts则返回空数组，避免json解析出错
                    if(comment.user&&comment.content)//进行判空
                    list.unshift(comment);
                    localStorage.setItem('cmts',JSON.stringify(list));
                    this.user=this.content='';//清空评论列表
                    //利用$emit()方法来调用父组件的方法
                    this.$emit('plocalcoments');
                }
            }
        }
        let vm = new Vue({
            el:"#app",
            data:{
                list:[]
            },
            components:{
                box:commentBox
            },
            created(){
                //实例创建后加载评论
                this.localComents();
            },
            methods:{
                localComents(){
                    let list = localStorage.getItem('cmts'||'[]');//若不存在cmts则返回空数组，避免json解析出错
                    this.list = JSON.parse(list);//刷新数据
                }
            }
        });
    </script>
</html> 