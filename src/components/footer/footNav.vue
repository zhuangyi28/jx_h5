<template>

  <div class="footer">
    <div class="void_bottom"></div>
    <div class="tabs">
      <!--命名路由-->
      <ul>
        <!--this inspection reports XML/HTML tags with missing mandatory attrbutes ,you can specify attrbute name that should not  be reported-->
        <div v-on:click="$router.push('/workDesk/taskSquare') ; (btnLight = 1)" v-bind:class='{"router-link-active color_text":(btnLight == 1)}'>
          <div>
            <i class="iconfont icon-renwuguangchang"></i>
          </div>
          <div>任务广场</div>
        </div>
        <div v-on:click="$router.push('/workDesk/discovery') ; (btnLight = 2)" v-bind:class='{"router-link-active color_text": btnLight == 2}'>
          <div>
            <i class="iconfont icon-bottom-find"></i>
          </div>
          <div>发现</div>
        </div>
        <div v-on:click="$router.push('/workDesk/mine'); (btnLight = 3)" v-bind:class='{"router-link-active color_text": (btnLight == 3), "hasNew": hasNew}'>
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

        btnLight: '',

        hasNew: false

      }

    },

    mounted () {

      this.bus.$on('pageChange',this.changeBtnLight);

      this.bus.$on('hasNew',this.cueHasNew);

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

        ('' + res.data.data.isHaveNewMsg + res.data.data.isNewSign != '00') && (this.hasNew = true);

        console.log(res);

        if(res.data.data.isCommitAuthorize == 1){

          this.homepage = 'taskSquare';

        }else{

          this.homepage = 'homepage';

        }

        /**
         * 接口：有待加入企业
         * 请求方式：GET
         * 接口：/user/workunit/selectisjoinent
         * 入参：null
         **/

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'user/workunit/selectisjoinent',


        }).then(function (res) {

          ((res.data.data.type == 1) || (this.hasNew)) ? (this.hasNew = true): (this.hasNew = false);

        }.bind(this))

      }.bind(this)).catch((res)=>{

        console.log(res);

      });

    },



    methods: {

      jumpTo: function () {

        this.btnLight = 1;

        this.$router.push('/workDesk/' + this.homepage);

      },

      changeBtnLight: function (data) {

        switch (data) {

          case '1':

            this.btnLight = 1;

            break;

          case '2':

            this.btnLight = 2;

            break;

          case '3':

            this.btnLight = 3;

            break;

        }

      },


      cueHasNew: function (data) {

        data ? (this.hasNew = true) : (this.hasNew = false);

      }

    },


    destroyed () {

      this.bus.$off('pageChange',this.changeBtnLight);

      this.bus.$off('hasNew',this.cueHasNew);

    }

  }
</script>

<style lang="less">

  @import 'footNav.less';


</style>
