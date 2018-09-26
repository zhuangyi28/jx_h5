<template>
  <div class="pay_psw">

    <topTips :tips="tipsText"></topTips>

    <div class="content_box">
      <div class="field">
        <span>设置支付密码</span>
        <input type="text" pattern="\d*" style="-webkit-text-security:disc" v-model="password"  maxlength="6" placeholder="请输入6位数字支付密码">
      </div>
      <div class="field">
        <span>设置支付密码</span>
        <input type="text" pattern="\d*" style="-webkit-text-security:disc" v-model="confirmPassword" placeholder="请再次输入6位数字支付密码" maxlength="6">
      </div>

    </div>

    <orangeBtn v-bind:name="btnName" v-on:clickEvent="changePwdFn"></orangeBtn>



  </div>
</template>
<script>

  import topTips from '../../../components/tips/tips'

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'sePaymentPassWord',

    components: {

      orangeBtn: orangeBtn,

      topTips: topTips,

    },
    data () {

      return {

        password:'',

        confirmPassword:'',

        pswSetSucess:'',

        btnName:'设置',

        tipsText:'支付密码不能是连续、重复的数字'


      }
    },
    mounted () {

      var _forgetTab =  this.getStorage('isPayPwd');

      if(_forgetTab=='0'){

          document.title='设置支付密码'

      }

      else {

        document.title='忘记支付密码'

      }

    },
    methods: {

      changePwdFn:function () {


        //连续
        var reg='1234567890_0987654321';


        var a = /[@#\$%\^&\*]+/g;

        //重负
        var regText = /^(?=.*\d+)(?!.*?([\d])\1{5})[\d]{6}$/;


        if(this.password==''||this.password.length<6){

          this.$toast({

            message: '请输入6位支付密码',
            position: 'bottom',
            duration: 1500

          });

        }

        else if(this.confirmPassword==''||this.confirmPassword.length<6){

          this.$toast({

            message: '请再次输入6位支付密码',
            position: 'bottom',
            duration: 1500


          });

        }

        else if(a.test(this.password)||a.test(this.confirmPassword)){

          this.$toast({

            message: '密码包含非法字符',
            position: 'bottom',
            duration: 1500


          });

        }

        //连续
        else if(reg.indexOf(this.password)>=0){

          this.$toast({

            message: '请输入非连续、重复的6位密码',
            position: 'bottom',
            duration: 1500

          });

        }

        //重复
        else if(!regText.test(this.password)){


          this.$toast({

            message: '请输入非连续、重复的6位密码',
            position: 'bottom',
            duration: 1500

          });

        }

        else if(this.password!=this.confirmPassword){

          this.$toast({

            message: '请两次输入相同的密码',
            position: 'bottom',
            duration: 1500

          });

        }

        else {


          //储存清除支付密码的变量 当设置密码成功后input清空 没有成功则不成功（在支付密码中取出）

          this.setStorage('clearPsw','6');


          //判断要不要修改支付方式
          var _paySettingHref = this.getStorage('paySettingHref');

          var _this = this;


          /**
           * 接口：设置支付密码
           * 请求方式：POST
           * 接口：/user/set/setpaypwd
           * 入参：payPassword，confirmPassword
           * */
          this.$http({


            method: 'post',

            url: process.env.API_ROOT + 'user/set/setpaypwd',

            params: {

              password: hexMD5(this.password),

              confirmPassword:hexMD5(this.confirmPassword),

            }


          }).then((res)=>{

              console.log(res.data)

            if (res.data.code == '0000') {


              //修改成功之后存储的值 用于区别是否有修改成功页面卸载的时候提示开启成功 （在该页面卸载的时候取出）
             this.setStorage('successPsw','6');

              var toast = this.$toast({

                message: res.data.msg,
                position: 'bottom',
                duration: 1500

              });

              setTimeout(function () {

                toast.close();

                if(_this.getStorage('forgetPsw') == 0){

                  _this.$router.push('/setHomepage');

                }

                else if(_this.getStorage('forgetPsw') == 1){

                  _this.$router.push('/pswCertification');

                }

              }, 1500)

              //设置支付密码之后
              if(_paySettingHref=='4'){

                /**
                 * 接口：设置支付方式
                 * 请求方式：POST
                 * 接口：/user/set/getpaymode
                 **/

                this.$http({


                  method: 'post',
                  url: process.env.API_ROOT + 'user/set/updatepaymode',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded', // post请求
                  },
                  params: {
                    msgMode: 0,
                    pwdMode: 1
                  }


                }).then((res)=>{

                    console.log(res.data);

                    this.pswSetSucess='5'

                  this.setStorage('paySettingHref','');

                })


              }


            }

            else {

              this.$toast({

                message: res.data.msg,
                position: 'bottom',
                duration: 1500

              })
            }

          })


        }

      }


    }
  }

</script>

<style lang="less">

  @import "payment_psw.less";


</style>
