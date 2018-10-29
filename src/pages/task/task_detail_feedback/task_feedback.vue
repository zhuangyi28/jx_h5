<template>
  <div class="task_feedback">
    <div class="feedback_content">
     <div class="title">反馈内容</div>
      <div class="content"></div>
    </div>

  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'taskFeedback',

    data () {
      return{
        btnName: '退出登录'
      }
    },
    mounted () {

    },
    methods:{

    }


  }
</script>
<style lang="less" scoped>
  @import "task_feedback.less";
</style>
