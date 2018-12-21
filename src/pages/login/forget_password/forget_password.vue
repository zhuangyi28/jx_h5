<template>
  <div class="forget_password">

    <div class="content_box">
      <div class="field">
        <i class="iconfont icon-sign_phone color_text"></i>
        <input type="text" pattern="\d*" placeholder="请输入手机号" v-model="mobile" class="tel" maxlength="11">
      </div>
      <div class="field">
        <i class="iconfont icon-sign_pen color_text"></i>
        <input type="text" pattern="\d*" placeholder="请输入验证码" v-model="checkCode" class="code" maxlength="6">
        <span v-show="show" class="get_code color_background" @click="registerMsg">获取验证码</span>
        <span v-show="!show" class="get_code color_text_bg">{{count}}s后重新发送</span>

      </div>
      <div class="field">
        <i class="iconfont icon-sign_password color_text"></i>
        <input type="password" placeholder="6-20位字母数字密码" v-model="password" class="password" maxlength="20">
      </div>
      <div class="field">
        <i class="iconfont icon-sign_password color_text"></i>
        <input type="password" placeholder="请再次输入密码" v-model="confirmPassword" class="password_again" maxlength="20">
      </div>
    </div>

      <orangeBtn v-on:clickEvent="settingFn" :name="btnName"></orangeBtn>






  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {
    name: 'forgetPsw',
    components: {

      orangeBtn: orangeBtn,

    },


    data(){
      return{

        mobile: '',//手机号

        checkCode: '',//验证码

        password: '',//密码

        confirmPassword: '',//确定密码

        show: true,

        count: '',

        timer: null,

        btnName:'确认'


      }

    },


    methods:{


      registerMsg:function () {

        var _this= this;


        //如果手机号是正常的
        if(_this.mobile==''||_this.mobile.length<11){

          this.$toast({

            message: '请输入正确手机号',
            position: 'bottom',
            duration: 1500

          });


        }

        else {

          /**
           * 接口：忘记密码发送短信认证
           * 请求方式：/jx/action/forgetmsg
           * 接口：GET
           * 入参：mobile
           **/
          this.$http({

            method: 'get',

            url:process.env.API_ROOT+'jx/action/forgetmsg',

            //url:process.env.API_ROOT+'jx/action/registmsg',

            params:{

              mobile:_this.mobile,

            }

          }).then((res)=>{

            console.log(res.data);

            if(res.data.code=='0000'){

              this.$toast({

                message:  res.data.msg,
                position: 'bottom',
                duration: 1500

              });

              this.getCode();


            }

            else {

              this.$toast({

                message:  res.data.msg,
                position: 'bottom',
                duration: 1500

              });

            }



          }).catch((res)=>{

            //console.log(res.data);


          })


        }

      },

      getCode:function(){

        const TIME_COUNT = 60;

        if (!this.timer) {

          this.count = TIME_COUNT;

          this.show = false;

          this.timer = setInterval(() => {

            if (this.count > 0 && this.count <= TIME_COUNT) {

              this.count--;

            } else {

              this.show = true;

              clearInterval(this.timer);

              this.timer = null;

            }

          }, 1000)

        }

      },

      settingFn: function () {

        var _this = this;

        var a = /[@#\$%\^&\*]+/g;

        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;

        //如果手机号是正常的
        if (_this.mobile == '' || _this.mobile.length < 11) {

          this.$toast({

            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 1500

          });

        }

        else if (_this.checkCode == '' || _this.checkCode.length < 6) {

          this.$toast({

            message: '请输入正确的验证码',
            position: 'bottom',
            duration: 1500

          });

        }

        //校验密码
        else if (a.test(_this.password)) {

          this.$toast({

            message: '密码包含非法字符',
            position: 'bottom',
            duration: 1500

          });


        }

        else if (_this.password.length < 6) {

          this.$toast({

            message: '密码长度为6-20位',
            position: 'bottom',
            duration: 1500

          });

        }
        else if(!reg.test(_this.password)){

          this.$toast({

            message: '密码需包含数字和字母',
            position: 'bottom',
            duration: 1500

          });

        }

        else if (_this.password != _this.confirmPassword) {


          this.$toast({

            message: '请保证两次输入密码一致',
            position: 'bottom',
            duration: 1500

          });

        }


        else {



          /**
           * 接口：忘记密码
           * 请求方式：POST
           * 接口：/jx/action/retrievalpwd
           * 入参：mobile，password，confirmPassword，code
           **/
          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'jx/action/retrievalpwd',

            //url:process.env.API_ROOT+'jx/action/register',


            params: {

              mobile: _this.mobile,

              code: _this.checkCode,

              confirmPassword: hexMD5(_this.confirmPassword),

              password: hexMD5(_this.password),

            }
          }).then((res)=>{

            console.log(res.data);

            if(res.data.code=='0000'){

              this.$toast({

                message: res.data.msg,
                position: 'bottom',
                duration: 1500

              });

              setTimeout(function () {

                _this.$router.go(-1)

                //

              },1000)




            }


          }).catch((res)=>{


          })

        }


      },



    }
  }
</script>
<style lang="less" scoped>
  @import "forget_password.less";

</style>
