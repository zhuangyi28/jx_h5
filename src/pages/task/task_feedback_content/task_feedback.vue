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
        <div class="input_file" v-for="item in pList">
          <div class="file_img">
            <img src="../../../../static/images/jx_file.png">
          </div>
          <div class="file_name">{{item.name}}</div>
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
      }

    },


    mounted(){


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

        this.originalFileName = thisData.originalFileName;//文件名称

        let pArray = this.originalFileName.split(",");//转为数组

        let _Array = [], x;

        for(x in pArray){

          _Array.push({

            name: pArray[x]

          })

        }

        this.pList = _Array



      }).catch((res) => {
      })


    },

  }

</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
