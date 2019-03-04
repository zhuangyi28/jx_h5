<template>
  <div class="sms_certification">
    <div class="sms_certification_input">
      <span>短信验证码</span>
      <input type="number" pattern="\d*" oninput="if(value.length > 6)value = value.slice(0, 6)" placeholder="请输入短信验证码" v-model="code" v-focus>
    </div>
    <div class="sms_ps">验证码已发送至{{mobile|plusXing(3,4)}},{{seconds}}s后可<span v-on:click="getAgain" v-bind:class="{color_text: used}">重新获取</span></div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'smsCertification',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return{
        code: '',//验证码
        btnName: '确认',//按键名称
        mobile: '',//当前登录账号
        seconds: 60,//倒计时
        used: true,//重新获取按钮识别
        withdrawMoney: '',//提现金额
        bankCardId: '',//银行卡号
        change: '',//转账识别
        withdraw: '',//提现识别
        transferMoney: '',//转账金额
        transferMobile: '',//转账账号

      }
    },
    mounted () {

      this.init();

    },
    methods: {

      //页面初始化
      init: function () {

        //重新调用data方法
        this.seconds = 60;
        this.used =true;

        this.mobile = this.getStorage('mobile');
        this.withdrawMoney = this.getStorage('withdrawMoney');
        this.bankCardId = this.getStorage('bankCardId');
        this.change= this.getStorage('change');
        this.withdraw = this.getStorage('withdraw');
        this.transferMoney = this.getStorage('transferMoney');
        this.transferMobile = this.getStorage('transferMobile');
        this.transferTips = this.getStorage('transferTips');

        this.getAgain()

      },

      //获取验证码
      getAgain: function () {
        const TIME_COUNT = 60;
        if(this.used){
          this.used = false;
          this.seconds = TIME_COUNT;

          /**
           * 接口：支付发送短信认证
           * 请求方式：GET
           * 接口：/jx/action/withdrawmsg
           * 入参：null
           * */
          this.$http({
            method: 'post',
            url: process.env.API_ROOT + 'jx/action/withdrawmsg'
          }).then((res)=>{

            this.$toast({

              message: res.data.msg,
              position: 'bottom',
              duration: 1500

            });

            if(res.data.code == '0000'){

              //倒计时
              var countDown = setInterval(()=>{
                this.seconds--;
                if(!this.seconds){
                  clearInterval(countDown);
                  this.used = true;
                }
              },1000);


            }else{
              this.seconds = 0;
              this.used = true;
            }
          }).catch((res)=>{
            console.log(res);
          })
        }


      },

      //提交验证码
      handleClick: function () {


        if(this.code == ''){
          this.$toast({
            message: '请输入验证码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }else if(this.code.length != 6){
          this.$toast({
            message: '请输入正确的验证码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }

        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });

        var url;
        var params;

        /*
         * 接口： 用户发起提现操作
         * 请求方式： GET
         * 接口： /user/withdraw/dowithdraw
         * 入参： bankCardId,balance,code
         * */

        (this.withdraw == 1)&&(url = process.env.API_ROOT + 'user/withdraw/dowithdraw')&&
        (params = {bankCardId: this.bankCardId,balance: this.withdrawMoney, code: this.code});

        /*
         * 接口： 用户发起转账操作
         * 请求方式： GET
         * 接口： /user/withdraw/dowithdraw
         * 入参： mobile,balance,code,remark
         * */

        (this.change == 1)&&(url = process.env.API_ROOT + 'user/transfer/dotransfer')&&
        (params = {mobile: this.transferMobile, balance: this.transferMoney, code: this.code, remark: this.transferTips});

        this.$http({

          method: 'get',
          url: url,
          params: params

        }).then(res=>{

          console.log(res);

          this.$indicator.close();
          this.$toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 1500
          });

          if(res.data.code == '0000'){

            (this.withdraw == 1) && (this.setStorage('orderId',res.data.data));

            (this.change == 1) && (this.setStorage('transferOrderId',res.data.data));

            setTimeout(() => {
              this.$router.replace( '/paySuccess');
            },1500);

          }

        }).catch(res=>{console.log(res)});
      }


    },
    destroyed (){
      this.$indicator.close()
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "sms_certification.less";
</style>
