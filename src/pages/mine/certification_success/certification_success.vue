<template>
  <div class="certification_success">
    <div class="success_box color_background_gradient">
      <img src="../../../../static/images/jx_success_white.png"/>
      <div class="circle">
        <div class="circle_bot"></div>
        <div class="circle_mid"></div>
      </div>
      <div class="wave"></div>
    </div>
    <div class="success_title">
      <span class="title color_text">实名认证审核已提交</span>
      <span class="content">您的证件已提交审核，预计1-2个工作日内完成，请耐心等待</span>
    </div>
    <div class="return btn_border" v-on:click="$router.push('/workDesk/mine')">返回</div>
  </div>
</template>
<script>
  export default {
    name: 'certificationSuccess',
    data () {
      return {
      }
    },
    destroyed(){

        //从个人中心到审核中页面不退回
        if(this.getStorage('hrefId')!='1'){

          this.setAutoBack(3)

        }



    },
  }
</script>
<style lang="less" scoped>
  @import "certification_success.less";
</style>
