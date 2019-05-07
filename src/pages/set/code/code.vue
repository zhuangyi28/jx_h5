<template>
<div class="code">

  <div class="tips">为确保是您本人操作,请输入验证码以验证身份</div>

  <div class="iphone">
  <img  src="../../../../static/images/code_iphone.png"/>
  </div>
  <div class="code_text">
    <span class="code_information">验证码已发送至{{mobile| plusXing(3, 4)}},{{count}}s后可</span>
    <span :class="lockBtn==1 ? 'color_text' :'locked'" v-on:click="hasCodeFn">重新获取</span>
  </div>

  <div class="content_box">
    <div class="field">
      <span>验证码</span>
      <input type="text" pattern="\d*" v-model="code" @blur="lostPointFn" maxlength="6" placeholder="请输入验证码">
    </div>
  </div>


  <orangeBtn v-bind:name="btnName" v-on:clickEvent="codeUrlFn"></orangeBtn>

  <div class="get_sound_code" v-if="soundCodeShow">没有收到验证码？请尝试获取<span class="color_text" v-on:click="getSoundCode">语音验证码</span></div>

</div>



</template>

<script>

  import topTips from '../../../components/tips/tips'

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'verificationCode',

    components: {

      orangeBtn: orangeBtn,

      topTips: topTips,

    },
    data () {

      return {

        mobile:'',//手机号

        idNumber:'',//份证号

        tokenMsg:'',//验证码标识

        code:'',//验证码

        disabled:true,//按钮的可点击

        count: '',//倒计时

        lockBtn:1,//重新获取验证

        timer: null,//倒计时函数

        btnName:'确定',//按钮名称

        soundCodeShow: true,

        soundCodeTime: 60,


      }
    },
    mounted () {

      this.init();

    },
    methods:{

      //页面初始化
      init:function () {

        var _mobile = this.getStorage('mobile');

        var _forgetTab = this.getStorage('isPayPwd');

        console.log(this.lockBtn);

        if(_forgetTab=='0'){

          document.title="安全验证"
        }
        else {

          document.title="忘记支付密码"
        }

        this.mobile = _mobile;

        //发验证码
        this.hasCodeFn();

      },



      //获取验证码按键事件
      hasCodeFn:function () {

        const TIME_COUNT = 60;

        if (!this.timer) {

          this.count = TIME_COUNT;

          this.lockBtn = 0;

          this.getCode();

          this.timer = setInterval(() => {

            if (this.count > 0 && this.count <= TIME_COUNT) {

              this.count--;

            } else {

              this.lockBtn = 1;

              this.soundCodeShow = true;

              clearInterval(this.timer);

              this.timer = null;

            }

          }, 1000)

        }

      },


      //获取验证码
      getCode:function(){

        /**
         * 接口：设置支付密码
         * 请求方式：GET
         * 接口：/jx/action/paymsg
         * 入参：null
         * */

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'jx/action/paymsg',


        }).then((res)=>{

          console.log(res);

          if (res.data.code == '0000') {

            this.$toast({

              message: res.data.msg,
              position: 'bottom',
              duration: 1500

            })

          }

          else if (res.data.code == '-1') {

            this.$toast({

              message: res.data.msg,
              position: 'bottom',
              duration: 1500

            })

          }

        }).catch((res)=>{})

      },


      //提交验证码
      codeUrlFn:function () {



        if(!this.code){

          this.$toast({

            message: '请输入验证码',
            position: 'bottom',
            duration: 1500

          })



        }

        else if(this.code.length<6){

          this.$toast({

            message: '输入的验证码有误',
            position: 'bottom',
            duration: 1500

          })

        }

        else {

          /**
           * 接口：校验支付密码验证码
           * 请求方式：POST
           * 接口：/user/set/checkpaypwdcode
           * 入参：code
           * */

          this.$http({


            method: 'post',

            url: process.env.API_ROOT + 'user/set/checkpaypwdcode',

            params: {

              code: this.code,

            }


          }).then((res)=>{

              console.log(res.data)

            var _this = this;

            if (res.data.code == '0000') {

              var toast = this.$toast({

                message: res.data.msg,
                position: 'bottom',
                duration: 1500

              });

              setTimeout(function () {


                toast.close();
                //跳转设置密码

                _this.$router.replace('/setPayPassword')



             },1500);

            }
            else {

              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500

              })

            }

          }).catch((res)=>{})



        }

      },



      //键盘防挡
      lostPointFn:function () {

        document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 200;

      },




      getSoundCode: function () {

        if(this.soundCodeTime < 60){

          this.$toast({

            message: '操作过于频繁，请稍后再试',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        /**
         * 接口：设置支付密码语音信息
         * 请求方式：GET
         * 接口：/jx/action/paymsgaudio
         * 入参：null
         * */

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'jx/action/paymsgaudio',


        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code == '0000'){

            this.soundCodeTime = 0;

            var addTime = setInterval(()=>{

              this.soundCodeTime++;

              if(this.soundCodeTime > 60){

                clearInterval(addTime);

              }

            },1000);

          }

        })

      }
    },


  }
</script>
<style lang="less">
  @import "code.less";
</style>
