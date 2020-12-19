<template>
  <div id="app">
    <img :src="imgUrl" style="width: 300px;padding-left: 40px;padding-top: 50px;">
    <p id="a"style="padding-left: 130px;font-size: 20px">标题233333333 {{ rawHtml }}</p><p><br></p>
    <p id="b"style="padding-left: 30px;font-size: 15px">balabala {{ raw2Html }}</p>

  </div>

</template>
<script>
    export default {
        data() {
            return {

            }

            var a = new Vue({
                el: "#app",                 //绑定的元素
                data: {
                    rawHtml: '<span style="color:#3685f0">标题</span>'  //元素内数据代码 message
                }
            })
            var b = new Vue({
                el: "#app",                 //绑定的元素
                data: {
                    raw2Html: '<span style="color:rgba(114,109,130,0.94)">文本</span>'  //元素内数据代码 message
                }
            })
        }
    }

</script>

<style scoped>


</style>
