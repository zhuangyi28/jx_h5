<template>
  <div class="set">
    <div class="set_list">
      <div class="list_one" v-on:click="$router.push('/payCertification')"><span>支付验证</span></div>
      <div class="list_one" v-on:click="$router.push('/changeLoginPsw')"><span>修改登录密码</span></div>
      <div v-if="isPayPwd==0" class="list_one" v-on:click="onClickFn"><span>设置支付密码</span></div>
      <div v-else v-on:click="onclickPws" class="list_one"><span>重置支付密码</span></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'setHomepage',

    data(){
      return{

        isPayPwd:'',

        hasUserName:true,

      }

    },
    mounted(){

      this.setStorage('forgetPsw','0');

      /**
       * 接口：查看是否设置支付密码
       * 请求方式：POST
       * 接口：/user/set/getpaypwd
       * 入参：null
       **/
        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'user/set/getpaypwd',


        }).then((res)=>{

            console.log(res.data)

            this.isPayPwd= res.data.data.isPayPwd;

            this.setStorage('isPayPwd', res.data.data.isPayPwd)

        })


    },
    destroyed (){
      this.$messagebox.close();
    },
    methods:{

      onClickFn:function () {

          console.log('点击')

        var _isVerify = this.getStorage('isVerify');

        //判断是否认证
        if(_isVerify=='0'||_isVerify == '3'){

          //存指定的页面
          this.setStorage('hrefId','8');

          //区别是在设置页面修改密码成功还是在提现中忘记密码设置成功（在设置密码成功后取值）
          //4为从设置支付方式按钮
          this.setStorage('paySettingHref','8');

          this.$messagebox({
            title: '提示',
            message: '当前账户尚未进行实名认证，完成实名认证后即可设置支付密码',
            showCancelButton:true,
            confirmButtonText: '去认证',
            cancelButtonText: '取消',
            closeOnClickModal: true,
            cancelButtonClass: 'cancel_btn',
            confirmButtonClass: 'confirm_btn_orange',
          }).then(action => {

            if (action == 'confirm') {


                this.$router.push('/certification')
            }
          })

        }

        else if(_isVerify == '2'){

          //存指定的页面
          this.setStorage('hrefId','8');

          //区别是在设置页面修改密码成功还是在提现中忘记密码设置成功（在设置密码成功后取值）
          //4为从设置支付方式按钮
          this.setStorage('paySettingHref','8');

          this.$messagebox({
            title: '提示',
            message: '实名认证审核中，审核通过后即可设置支付密码',
            confirmButtonText: '我知道了',
            closeOnClickModal: true,
            confirmButtonClass: 'confirm_btn_orange',
          }).then(action => {

            if (action == 'confirm') {

            }
          });

        }


        else {

          //区别是在设置页面修改密码成功还是在提现中忘记密码设置成功（在设置密码成功后取值）
          //4为从设置支付方式按钮
          this.setStorage('paySettingHref','8');


          this.$router.push('/code')

        /*  wx.navigateTo({

            url: '../code/code'

          })*/


        }


      },

      onclickPws:function () {


        //区别是在设置页面修改密码成功还是在提现中忘记密码设置成功（在设置密码成功后取值）
        this.setStorage('paySettingHref','8');

        this.$router.push('/resetPayment')


      }



    }
  }
</script>
<style lang="less" scoped>
  @import 'set_homepage.less';
</style>
