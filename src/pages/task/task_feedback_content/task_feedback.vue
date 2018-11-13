<template>
  <div class="task_feedback">
    <div class="feedback_content">
      <div class="feedback_content_title">反馈内容</div>
      <div class="feedback_content_input">
        <div class="feedback_Content">{{pContent}}</div>
      </div>
    </div>
    <div class="upload_file">
      <div class="upload_file_title">上传凭证</div>
      <div class="upload_file_input">
        <a class="input_file"  :href ="item.downLoadUrl" v-if="pFiles" v-for="item in pList" v-on:click="downloadFileFn">
          <div class="file_img">
            <img src="../../../../static/images/jx_file.png">
          </div>
          <div class="file_name">{{item.name}}</div>
        </a>
        <div class="input_file" v-else>
          <div class="file_img">
            <img src="../../../../static/images/jx_file_no.png">
          </div>
          <div class="file_name">暂无凭证</div>
        </div>


      </div>
      <div class="position">
        <img src="../../../../static/images/jx_position.png">
        <span v-if="pPlace">{{pPlace}}</span>
        <span v-else>暂无位置</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'taskFeedbackContent',

    data () {

      return {

        pContent: '',//反馈内容

        pPlace: '',//所在位置

        pList: [],

        pFiles:''//文件类型
      }

    },


    mounted(){

      this.init()
    },

    methods: {

      init:function () {

          /**
           * 接口：获取反馈详情
           * 请求方式：POST
           * 接口：user/task/getfeedbackdetail
           * 入参：pFeedbackId
           **/

          this.$http({

            method: 'post',

            url: process.env.API_ROOT + 'user/task/getfeedbackdetail',

            params: {

              pFeedbackId: this.getStorage('pFeedbackId'),

            },


          }).then((res) => {

            console.log(res.data);

            let thisData = res.data.data;

            this.pContent = thisData.pContent;//反馈内容

            this.pPlace = thisData.pPlace;//地理位置

            this.pFiles = thisData.pFiles;//文件链接

            this.originalFileName = thisData.originalFileName;//文件名称

            let pArray = this.originalFileName.split(",");//转为数组

            let urlArray = this.pFiles.split(",");//转为数组

            console.log(urlArray)

            let _Array = [], x,y;

            //循环文件名字
            for (x in pArray) {

                for(y in urlArray){

                    if(x==y){

                      _Array.push({

                        name: pArray[x],

                        downLoadUrl:urlArray[y]

                      })

                    }
                }


            }

            this.pList = _Array

            console.log(this.pList)


          }).catch((res) => {
          })


        },

      downloadFileFn:function () {

      }


    }

  }

</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
