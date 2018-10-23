<template>
  <div class="open">

  </div>
</template>

<script>

  export default{

    name: 'openPage',

    data(){

      return {


      }
    },

    mounted () {





      var APPID = 'wxee620089167335f6';//测试开发者ID

      //var APPID = '';//

      var REDIRECT_URI = 'http://jxtest.99payroll.cn/jxpf-h5/#/loadingPage';//测试回调的URL

      //var REDIRECT_URI = 'https://user.99payroll.cn/jxpf-h5/#/loadingPage';//生产回调的URL

      var thisUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+encodeURIComponent(REDIRECT_URI)+'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'

      //alert(thisUrl)

      window.location.href = thisUrl

    },


  }

</script>
<style lang="less">

  @import "open.less";

</style>
