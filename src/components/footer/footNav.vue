<template>

  <div class="footer">
    <div class="void_bottom"></div>
    <div class="tabs">
      <!--命名路由-->
      <ul>
        <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
        <div v-on:click="$router.push('/workDesk/taskSquare') ; (btnLight = 1)" v-bind:class='{"router-link-active orange_text":(btnLight == 1)}'>
          <div>
            <i class="iconfont icon-renwuguangchang"></i>
          </div>
          <div>任务广场</div>
        </div>
        <div v-on:click="$router.push('/workDesk/discovery') ; (btnLight = 2)" v-bind:class='{"router-link-active orange_text": btnLight == 2}'>
          <div>
            <i class="iconfont icon-bottom-find"></i>
          </div>
          <div>发现</div>
        </div>
        <div v-on:click="$router.push('/workDesk/mine'); (btnLight = 3)" v-bind:class='{"router-link-active orange_text": btnLight == 3}'>
          <div>
            <i class="iconfont icon-bottom-main1"></i>
          </div>
          <div>我的</div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'footNav',

    data () {

      return {

        homepage: '',

        btnLight: ''

      }

    },

    mounted () {

      var locationHref = location.href;

      if(locationHref.indexOf('homepage') != -1 || locationHref.indexOf('taskSquare') != -1){

        this.btnLight = 1;

      }else if(locationHref.indexOf('discovery') != -1){

        this.btnLight = 2;

      }else if(locationHref.indexOf('mine') != -1){

        this.btnLight = 3;

      }

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

    },



    methods: {

      jumpTo: function () {

        this.btnLight = 1;

        this.$router.push('/workDesk/' + this.homepage);

      }

    }

  }
</script>

<style lang="less">

  @import 'footNav.less';


</style>
