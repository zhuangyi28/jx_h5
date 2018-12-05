<template>
  <div class="loading">
    <div class="bg">
      <img src="../../../../static/images/jx_start_page7.png">
      <div class="card"><img src="../../../../static/images/jx_start_page1.png"/></div>
      <div class="msg"><img src="../../../../static/images/jx_start_page2.png"/></div>
      <div class="paper"><img src="../../../../static/images/jx_start_page3.png"/></div>

    </div>
    <div class="font"><img src="../../../../static/images/jx_loading_title.png"></div>
    <div class="bottom"><img src="../../../../static/images/jx_start_page8.png"></div>
  </div>
</template>
 <script>

  export default{

    name: 'loadingPage',

    data(){

      return {


      }
    },

    mounted () {


        /*console.log('链接='+window.location.href);*/

      var str = window.location.href;


      this.setStorage('lactionReload','1');

      this.setStorage('taskSquare','0')


      var  thisUserCode = str.split('?')[1].split('&')[0].split('=')[1];

      this.init();


      //获取UnionID

    this.$http({

        method: 'post',

        url: process.env.API_ROOT+'jx/action/togetunionid',

        params: {

          code:thisUserCode

        }

      }).then((res) => {

        console.log(res.data)

      if(res.data.code=='-1'){

        this.$router.push('/login');

      }

      if(res.data.data){

        this.setStorage('thisKey',res.data.data)

      }



      }).catch((res)=>{})


        if(this.getStorage('loadingShow')!=1){

         this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });


       }





    },

    destroyed(){

      this.$indicator.close()

    },

    methods: {

      init: function () {


        /**
         * 接口：用户中心
         * 请求方式：POST
         * 接口：/user/center/usercenter
         * 入参：null
         **/

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/center/usercenter',



        }).then((res) => {

            console.log(res.data);

          if(res.data.code=='0000'){

            if(res.data.data.isCommitAuthorize == 0){

              this.$router.push('/workDesk/homepage')

            }else if(res.data.data.isCommitAuthorize == 1){

              this.$router.push('/workDesk/taskSquare');

            }

          }


        }).catch(function (error) {


        }.bind(this))


}

  }

  }

  </script>
<style lang="less">

  @import "loading.less";

</style>
