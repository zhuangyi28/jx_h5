<template>
  <div class="loading">

    <div>天下没有难发的薪水</div>
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

      this.init();

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

        }).catch((res)=>{})


}

  }

  }

  </script>
<style lang="less">

  @import "loading.less";

</style>
