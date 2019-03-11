<template>
  <div class="register">

    <div class="content_box">
        <div class="field">
          <i class="iconfont icon-sign_phone color_text"></i>
          <input type="text" v-model="mobile" pattern="\d*" placeholder="请输入手机号" class="tel" maxlength="11">
        </div>
        <div class="field">
          <i class="iconfont icon-sign_pen color_text"></i>
          <input type="text" pattern="\d*" v-model="checkCode" placeholder="请输入验证码" class="code" maxlength="6">
          <span v-show="show" class="get_code color_background" @click="registerMsg">获取验证码</span>
          <span v-show="!show" class="get_code color_text_bg">{{count}}s后重新发送</span>
        </div>
        <div class="field">
          <i class="iconfont icon-sign_password color_text"></i>
          <input type="password" v-model="password" placeholder="请输入6-20位字母数字密码" maxlength="20" class="password">
        </div>

    </div>


    <orangeBtn v-on:clickEvent="register" :name="btnName"></orangeBtn>
    <div class="register_button">

      <div class="register_ps">
        <p>点击注册，即表示您同意<span class="color_text" @click="$router.push('/Agreement')">《用户注册协议》</span></p>
      </div>
    </div>


  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {
    name: 'register',
    components: {
      orangeBtn: orangeBtn,
    },


    data(){
      return{

        mobile: '',//手机号

        checkCode: '',//验证码

        password: '',//密码

        show: true,//倒计时组件

        count: '',

        timer: null,

        btnName:'注册',//按钮名称

        channel:''

      }

    },


    mounted () {

      var anotherCompany = this.getCookie('anotherCompany') || 'orange';

      console.log('cookie' + anotherCompany)

      anotherCompany == 'orange' ? this.channel = 'jiaxin' : this.channel = anotherCompany;

      console.log('传值' + this.channel);

    },

    methods:{

      register:function () {

        let _this=this;

        let a = /[@#\$%\^&\*]+/g;

        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;


        //校验手机号
        if(_this.mobile==''||_this.mobile.length<11){


          this.$toast({

            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 1500

          });

        }

        //校验短信验证码
        else if(_this.checkCode==''||_this.checkCode.length<6){

          this.$toast({

            message: '请输入正确的短信验证码',
            position: 'bottom',
            duration: 1500

          });

        }

        //校验密码
        else if(a.test(_this.password)){

          this.$toast({

            message: '密码包含非法字符',
            position: 'bottom',
            duration: 1500

          });


        }

        else if(_this.password.length<6){

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


        else {

            console.log(this.getStorage('thisUserCodeWx'))


          /**
           * 接口：注册
           * 请求方式：POST
           * 接口：/jx/action/register
           * 入参：mobile，password，code
           **/
          this.$http({

            method: 'post',

            url:process.env.API_ROOT+'jx/action/register',

            params: {

              mobile: _this.mobile,

              code: _this.checkCode,

              wxCode:this.getStorage('thisUserCodeWx'),

              password: hexMD5(_this.password),

              device:'platform',



            }
          }).then((res)=>{

            console.log(res.data);


            if(res.data.code=='-1'){

              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500


              });


            }

            else if(res.data.code=='0000'){

              this.$toast({

                message: '注册成功',
                position: 'bottom',
                duration: 1500

              });


              setTimeout(function () {

                _this.signin()

              },1000)








            }

          }).catch((res)=>{


          })


        }



      },

      registerMsg:function () {

          var that = this;

          console.log(that.mobile);

        //如果手机号是正常的
        if(that.mobile==''||that.mobile.length<11){

          this.$toast({

            message: '请输入正确手机号',
            position: 'bottom',
            duration: 1500

          });

        }

        else {

          /**
           * 接口：注册发送短信认证
           * 请求方式：/jx/action/registmsg
           * 接口：GET
           * 入参：mobile
           **/
          this.$http({

            method: 'get',

            url:process.env.API_ROOT+'jx/action/registmsg',

            //url:process.env.API_ROOT+'jx/action/registmsg',

            params:{

              mobile:that.mobile,

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

      signin:function () {

        var _this=this;

        var str = location.href;

        var thisUserCode = str.split('?')[1].split('&')[0].split('=')[1];

        /**
         * 接口：登录
         * 请求方式：POST
         * 接口：login
         * 入参：mobile，password,code
         **/

        this.$http({

          method: 'post',

          url:process.env.API_ROOT+'login',

          params: {

            mobile:_this.mobile,

            password:hexMD5(_this.password),

            code: thisUserCode,

            device: 'platform',

            channel:this.channel,

          }


        }).then(function (res) {

          console.log(res.data);

          if(res.data.code=='-1'){

            this.$toast({
              message: res.data.msg,
              position: 'bottom',
              duration: 1500


            });

          }

          else if(res.data.code=='0000'){

            this.setStorage('userId',res.data.data.userId);

            this.$router.go(-2);


          }



        }.bind(this)).catch((res)=>{

          //console.log(res.data);


        })



      },


    },

  }
</script>
<style lang="less" scoped>
  @import "register.less";

</style>
