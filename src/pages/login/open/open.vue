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

        this.init()

    },

    methods: {

      init: function () {


        var APPID = 'wxee620089167335f6';

        var REDIRECT_URI = 'http://jxtest.99payroll.cn/jxpf-h5/#/loadingPage';

        var thisUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+encodeURIComponent(REDIRECT_URI)+'&response_type=code&scope=snsapi_userinfo#wechat_redirect'

        window.location.href = thisUrl



      }

    }

  }

</script>
<style lang="less">

  @import "open.less";

</style>
