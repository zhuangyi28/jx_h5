<template>
  <div class="loading">

    <div class="bg"><img src="../../../../static/images/jx_start_page7.png"></div>
    <div class="font">天下没有难发的薪水</div>
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


        if(this.getStorage('loadingShow')!=1){

          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });


        }

      this.init();

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

            console.log(res.data)


          if(res.data.code=='0000'){

                setTimeout(()=> {

                  console.log('触发')

                  this.$router.push('/workDesk/homepage')

                },1500)



          }


        }).catch(function (error) {

            console.log(error)

        }.bind(this))


}

  }

  }

  </script>
<style lang="less">

  @import "loading.less";

</style>
