<template>
  <div class="certification_fail">
    <div class="fail_box">
      <img src="../../../../static/images/jx_fail_white.png"/>
      <div class="circle">
        <div class="circle_bot"></div>
        <div class="circle_mid"></div>
      </div>
      <div class="wave"></div>
    </div>
    <div class="fail_title">
      <span class="title">实名认证审核不通过</span>
      <span class="content">很抱歉，您提交的认证资料未通过审核</span>
      <span class="content">原因：{{errorCause}}</span>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="goAgainFn"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn';
  export default {
    name: 'certificationFail',
    components: {
      orangeBtn: orangeBtn,
    },
    data () {
      return {
        btnName: '重新认证',
        errorCause:''
      }
    },

    mounted (){
      /**
       * 接口：个人中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/
      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',



      }).then((res) => {

        console.log(res.data);

        if (res.data.code == '0000') {


            this.errorCause=res.data.data.refuseReason


        }
      }).catch((res=>{}))


    },
    methods: {

      goAgainFn:function () {

          this.$router.push('/certificationChoose')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "certification_fail.less";
</style>
