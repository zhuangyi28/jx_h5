<template>
  <div class="sign">

  </div>
</template>
<script>
  export default {
    name: 'sign',
    data(){

      return{

          signId: '',//合同编号
      }

    },

    mounted () {


      //获取signId=后面的字符串

      var thisSignid = location.href.split('?')[1].split('signId=')[1]

      this.setStorage('signId',thisSignid)

      this.signId = thisSignid;

      console.log(location.href.split('?')[1].split('signId=')[1])

      this.init();

    },

    methods: {

      init:function () {

        var that = this;

        this.$indicator.close()

        /**
         * 接口：查询合同状态
         * 请求方式：POST
         * 接口：user/contract/get/contractstate
         * 入参：signId，userId
         * */

        this.$http({

          method: 'post',

          url: process.env.API_ROOT + 'user/contract/get/contractstate',

          params: {

            signId: this.signId,

            userId: this.getStorage('userId'),

          },

        }).then((res)=>{

          this.$indicator.open({
            text: '跳转中...',
            spinnerType: 'fading-circle'

          });

          console.log(res.data);

          if(res.data.data.signState=='1'){



            setTimeout(function () {

              that.$router.push({path: '/contractDetail',query: {signId: that.signId}});

            },1000)

          }

          else {
            

            this.init()


          }


        }).catch((res)=>{})

      }

    },


    destroyed(){

      this.$indicator.close()

    },


  }
</script>
<style lang="less" scoped>
  @import "sign.less";
</style>

