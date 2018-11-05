<template>
  <div class="task_feedback">
    <div class="feedback_content">
      <div class="feedback_content_title">反馈内容</div>
      <div class="feedback_content_input">
        <textarea name="" id="" cols="30" rows="6" placeholder="请填写反馈内容（200字以内）"></textarea>
      </div>
    </div>
    <div class="upload_file">
      <div class="upload_file_title">上传凭证<span>（最多上传6张）</span></div>
      <div class="upload_file_input">
        <div class="input_file" v-for="file in files">
          <div class="file_img">
            <img src="../../../../static/images/jx_file.png">
          </div>
          <div class="file_name">{{file.name}}</div>
          <span class="delete_btn" v-on:click="deleteFile" v-bind:data-fileName="file.name"></span>
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
    <div class="save_btn">保存</div>
  </div>
</template>
<script>
  export default {
    name: 'taskFeedback',
    data () {
      return {
        files: [],
        inputFile: ''
      }
    },
    methods: {
      addFile: function (event) {
        var thisFile = event.currentTarget.value.split('\\')[2];
        debugger;
        for(var file of this.files){
          console.log(file);
        }
        this.files.push(event.currentTarget.files[0]);
      },
      deleteFile: function () {
        debugger;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
