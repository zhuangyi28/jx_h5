<template>
  <div class="submit_success">
    <div class="success_logo">
      <img src="../../../../static/images/jx_success_logo.png">
    </div>
    <div class="success_text">
      <div class="title">您已报名成功</div>
      <div class="success_ps">企业将审核您的履历信息，请耐心等待</div>
    </div>
    <div class="jump_btn" v-on:click="$router.push('taskDetail')">查看报名详情</div>
  </div>
</template>
<script>
  export default {
    name: 'submitSuccess',

    mounted () {

      localStorage.getItem('taskId');

    },
  }
</script>
<style lang="less" scoped>
  @import "submit_success.less";
</style>
