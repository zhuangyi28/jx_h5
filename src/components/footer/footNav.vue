<template>

  <div class="footer">
    <div class="void_bottom"></div>
    <div class="tabs">
      <!--命名路由-->
      <ul>
        <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
        <router-link :to="{name: homepage}" tag="li" router-active-class>
          <div>
            <i class="iconfont icon-renwuguangchang"></i>
          </div>
          <div>任务广场</div>
        </router-link>
        <router-link :to="{name:'discovery'}" tag="li">
          <div>
            <i class="iconfont icon-bottom-find"></i>
          </div>
          <div>发现</div>
        </router-link>
        <router-link :to="{name:'mine'}" tag="li">
          <div>
            <i class="iconfont icon-bottom-main1"></i>
          </div>
          <div>我的</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'footNav',

    data () {

      return {

        homepage: ''

      }

    },

    mounted () {

      /**
       * 接口：用户中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/

      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',

      }).then(function (res) {

        console.log(res);

        if(res.data.data.isCommitAuthorize == 1){

          this.homepage = 'taskSquare';

        }else{

          this.homepage = 'homepage';

        }

      }.bind(this)).catch((res)=>{

        console.log(res);

      });

    }

  }
</script>

<style lang="less">

  @import 'footNav.less';


</style>
