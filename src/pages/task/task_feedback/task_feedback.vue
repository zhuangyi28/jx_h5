<template>
  <div class="task_feedback">
    <div class="feedback_content">
      <div class="feedback_content_title">反馈内容</div>
      <div class="feedback_content_input">
        <textarea name="" id="" cols="30" rows="6" placeholder="请填写反馈内容（200字以内）" maxlength="200" v-model="feedBackContent"></textarea>
      </div>
    </div>
    <div class="upload_file">
      <div class="upload_file_title">上传凭证<span>（最多上传6个附件）</span></div>
      <div class="upload_file_input">
        <div class="input_file" v-for="(file,index) in files">
          <div class="file_img">
            <img src="../../../../static/images/jx_file.png">
          </div>
          <div class="file_name">{{file.name}}</div>
          <span class="delete_btn" v-on:click="deleteFile(index)" v-bind:data-fileName="file.name"></span>
        </div>
        <div class="input_add" v-if="files.length < 6">
          <input type="file" v-on:change="addFile">
        </div>
      </div>
      <div class="position">
        <img src="../../../../static/images/jx_position.png">
        <span>所在位置</span>
      </div>
    </div>
    <div class="save_btn" v-on:click="keepTaskDetailFn">提交</div>
  </div>
</template>
<script>
  export default {

    name: 'taskFeedback',

    data () {

      return {

        files: [],

        inputFile: '',

        resultUpload:'',//最终图片上传结果

        resultUploadList:[],//图片上传数组

        originalFileName:'',//最终名称上传结果

        originalFileNameList:[],//名字上传数组

        feedBackContent:'',//反馈内容

        longitude:'',//经度

        latitude:'',//纬度

        place:'',//位置

      }

    },


    mounted(){

      this.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxee620089167335f6', // 必填，公众号的唯一标识 - 测试版本
        //appId: 'wxee620089167335f6', // 必填，公众号的唯一标识 - 生产版本
        timestamp:'' , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名
        jsApiList: ['openLocation','getLocation'] // 必填，需要使用的JS接口列表
      });

      this.wx.error(function (res) {
        alert(res);
      });

    },
    methods: {

      addFile: function (event) {

        var thisFile = event.currentTarget.value.split('\\')[2];

        for(var file of this.files){

          console.log(file);

          console.log(file.name)

        }


        this.files.push(event.currentTarget.files[0]);

        var selfFile = event.target.files[0];

        var param = new FormData(); //创建form对象

        param.append('File',selfFile);//通过append向form对象添加数据

        this.$http.post(process.env.API_ROOT + 'jx/uploadimg/oss',param,{
          headers:{'Content-Type':'multipart/form-data'}

        }).then((res)=>{

            console.log(res.data)

          if(res.data.code=='0000'){

            this.$toast({

              message: '上传成功',
              position: 'middle',
              duration: 1500
            })

            //吧url拼起来
            this.resultUploadList.push(res.data.data.url);

            var list = this.resultUploadList.join(",");

            this.resultUpload = list;

            //console.log(this.resultUpload)


          }

        }).catch((res)=>{})



        console.log(this.files)


      },

      deleteFile: function (index) {

        this.$messagebox({
          title: '提示',
          message: '确认删除该附件？',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then((action) =>{

          if (action == 'confirm') {

            this.files.splice(index, 1)

            this.resultUploadList.splice(index, 1);

            var list = this.resultUploadList.join(",");

            this.resultUpload = list;
            

          }
        }).catch((res)=>{})


      },

      keepTaskDetailFn:function () {

        //判断输入内容
        if (!this.feedBackContent) {

          this.$toast({

            message: '请输入反馈内容',
            duration: 1500,
            position: 'bottom',


          })



        }
        else {

          /**
           * 接口：获取任务详情
           * 请求方式：POST
           * 接口：user/task/addfeedback
           * 入参：taskId,relId,pContent(必填)
           **/

          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'user/task/addfeedback',

            params: {

              taskId:this.getStorage('taskId'),

              relId:this.getStorage('relId'),

              pContent:this.feedBackContent,

              pFiles:this.resultUpload,//附件

              pLongitude:this.longitude,//经度

              pLatitude:this.latitude,//纬度

              pPlace:this.place,//位置
            },

          }).then((res) => {

              console.log(res.data)

            if(res.data.code=='0000'){

              this.$toast({

                message:  res.data.msg,
                duration: 1500,
                position: 'bottom',


              })

              this.$router.go(-1)


            }

          }).catch((res)=>{})



        }


      }



    },

  }

</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
