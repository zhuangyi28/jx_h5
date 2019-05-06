<template>

  <div class="alipay_list">

    <div class="alipay_detail color_background_gradient" v-for="alipay in alipayList" v-on:click="chooseAlipay(alipay)" v-if="alipayList.length > 0">

      <div class="icon">
        <img src="../../../../static/images/alipay.png">
      </div>
      <div class="information">
        <div>{{alipay.userName}}</div>
        <div>{{alipay.alipayNo}}</div>
      </div>
      <div class="close" v-on:click="deleteAlipay(alipay.alipayId)" v-on:click.stop>
        <img src="../../../../static/images/jx_delate.png">
      </div>

    </div>

    <div class="nodata" v-else>

    </div>

    <div class="add_alipay" v-on:click="$router.push('/addAlipay')">
      <div class="add color_background">+</div>
      <div>添加支付宝账号</div>
    </div>

  </div>

</template>
<script>
  export default {
    name: 'alipayList',
    data () {

      return {

        alipayList: []

      }

    },

    mounted () {

      this.init();

    },


    methods: {


      init: function () {

        /**
         * 接口：获取用户支付宝信息
         * 请求方式：GET
         * 接口：user/alipay/getuseralipayinfo
         * 入参：null
         * */
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/alipay/getuseralipayinfo'
        }).then(res=>{

          console.log(res);

          if(res.data.code == '0000'){

            (!!res.data.data) && (this.alipayList = res.data.data.list);

          }

        });

      },



      deleteAlipay: function (alipayId) {

        this.$messagebox({
          title: '提示',
          message: '确认删除该支付宝账号？',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          cancelButtonClass: 'cancel_btn',
          confirmButtonClass: 'confirm_btn_orange',
        }).then(res=>{

          if(res == 'cancel'){

            return false;

          }else{

            /**
             * 接口：删除用户支付宝信息
             * 请求方式：GET
             * 接口：user/alipay/delalipayinfo
             * 入参：null
             * */
            this.$http({
              method: 'post',
              url: process.env.API_ROOT + 'user/alipay/delalipayinfo',
              params: {

                alipayId: alipayId

              }
            }).then(function (res){

              this.$toast({

                message: res.data.msg,
                position: 'middle',
                duration: 1500

              });

              for(var alipay of this.alipayList){

                if(alipay.alipayId == alipayId){

                  this.alipayList.splice(this.alipayList.indexOf(alipay),1);

                }

              }

            }.bind(this));

          }

        });


      },



      chooseAlipay: function (data) {

        this.$store.type = true;

        this.$store.alipay = data;

        this.$router.go(-1);

      },


    }

  }
</script>
<style lang="less" scoped>
  @import "alipay_list.less";
</style>
