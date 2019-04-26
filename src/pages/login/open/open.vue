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

     var anotherCompany = this.getCookie('anotherCompany') || 'orange';

      var url1 = location.href.split('?')[1];

      url1.indexOf('type=jbt')!= -1 ?this.setCookie('type','jbt'):this.setCookie('type','jx')

      if(anotherCompany){

        switch (anotherCompany) {

          case 'orange':

            document.title = '嘉薪';

            break;

          case 'blue':

            document.title = '派云众包';

            break;


          case 'lexiang':

            document.title = '乐享易保';

            break;

          case 'rongyada':

            document.title = '嵘雅达';

            break;


          case 'yibangsheng':

            document.title = '亿邦盛';

            break;

          case 'xinqidian':

            document.title = '薪企点';

            break;


          case'zuirenli':

              document.title = '最人力企服';

            break;

          case'jianzhile':

            document.title = '兼职乐';

            break;

        }

      }

      var APPID = 'wxee620089167335f6';//测试开发者ID

      //var APPID = 'wx1c4f2e1dc540639e';//生产开发者ID

      var REDIRECT_URI = 'http://jxtest.99payroll.cn/jxpf-h5/#/loadingPage';//测试回调的URL

      //var REDIRECT_URI = 'https://user.99payroll.cn/#/loadingPage';//生产回调的URL

      var thisUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+encodeURIComponent(REDIRECT_URI)+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';

      //alert(thisUrl)

      window.location.href = thisUrl





    },


  }

</script>
<style lang="less">

  @import "open.less";

</style>
