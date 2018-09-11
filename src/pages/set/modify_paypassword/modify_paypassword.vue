<template>
  <div class="modify_psw">

    <topTips :tips="tipsText"></topTips>

    <div class="content_box">
      <div class="field">
        <span>原密码</span>
        <input type="password" v-model="oldPassword"  maxlength="6" placeholder="请输入原密码">
      </div>
      <div class="field">
        <span>新密码</span>
        <input type="password" v-model="password" placeholder="请再次输入6位数字支付密码" maxlength="6">
      </div>
      <div class="field">
        <span>确认密码</span>
        <input type="password" v-model="confirmPassword" placeholder="请再次输入6位数字支付密码" maxlength="6">
      </div>
    </div>

    <orangeBtn v-bind:name="btnName" v-on:clickEvent="modifyCode"></orangeBtn>



  </div>
</template>
<script>

  import topTips from '../../../components/tips/tips'

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'modifyPaymentPassWord',

    components: {

      orangeBtn: orangeBtn,

      topTips: topTips,

    },
    data () {

      return {

        oldPassword:'',//原手机密码

        password:'',//新密码

        confirmPassword:'',//密码

        btnName: '确认',

        tipsText: '支付密码不能是连续、重复的数字'


      }
    },
    methods: {

      modifyCode:function () {

        var _this = this;

        //连续
        var reg='1234567890_0987654321';

        //重负
        var regText = /^(?=.*\d+)(?!.*?([\d])\1{5})[\d]{6}$/;

        var a = /[@#\$%\^&\*]+/g;

        //如果手机号是正常的
        if(this.oldPassword==''||this.oldPassword.length<6){

          this.$toast({

            message: '请输入原6位支付密码',
            duration: 1500

          });

        }

        else if(this.password==''||this.password.length<6){

          this.$toast({

            message: '输入6位新支付密码',
            duration: 1500

          });

        }

        else if(a.test(this.password)||a.test(this.confirmPassword)){

          this.$toast({

            message: '密码包含非法字符',
            duration: 1500

          });

        }

        //连续
        else if(reg.indexOf(this.password)>=0){

          this.$toast({

            message: '请输入非连续、重复的6位密码',
            duration: 1500

          });

        }

        //重复
        else if(!regText.test(this.password)){

          this.$toast({

            message: '请输入非连续、重复的6位密码',
            duration: 1500

          });

        }

        else if(this.confirmPassword !=this.password){

          this.$toast({

            message: '请两次输入相同的密码',
            duration: 1500

          });

        }


        else{

          /**
           * 接口：更新支付验证码
           * 请求方式：POST
           * 接口：/user/set/updatepaypwd
           * 入参：oldPassword,password,confirmPassword
           **/

         this.$http({

           method: 'post',

           url: process.env.API_ROOT + 'user/set/updatepaypwd',

           params: {

             oldPassword:hexMD5(this.oldPassword),

             password:hexMD5(this.password),

             confirmPassword:hexMD5(this.confirmPassword),

           }



         }).then((res)=>{

           if (res.data.code == '-1') {

             this.$toast({
               message: res.data.msg,
               duration: 1500
             });

           } else if (res.data.code == '0000') {

             this.$toast({
               message: res.data.msg,
               duration: 1500
             });

             setTimeout(function () {

                 _this.$router.go(-1)

             }, 500)


           }


         }).catch((res)=>{})

        }

      }

    },

  }

  </script>

<style lang="less">

  @import "modify_paypassword.less";
</style>
