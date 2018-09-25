<template>
  <div class="certification_success">
    <div class="success_box">
      <img src="../../../../static/images/jx_success_white.png"/>
      <div class="circle">
        <div class="circle_bot"></div>
        <div class="circle_mid"></div>
      </div>
      <div class="wave"></div>
    </div>
    <div class="success_title">
      <span class="title">实名认证审核已提交</span>
      <span class="content">您的证件已提交审核，预计1-2个工作日内完成，请耐心等待</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'certificationSuccess',
    data () {
      return {
        btnName: '查看订单'
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "certification_success.less";
</style>
