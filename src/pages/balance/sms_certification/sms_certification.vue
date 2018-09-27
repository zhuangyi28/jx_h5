<template>
  <div class="sms_certification">
    <div class="sms_certification_input">
      <span>短信验证码</span>
      <input type="number" pattern="\d*" oninput="if(value.length > 6)value = value.slice(0, 6)" placeholder="请输入短信验证码" v-model="code" v-focus>
    </div>
    <div class="sms_ps">验证码已发送至{{mobile|plusXing(3,4)}},{{seconds}}s后可<span v-on:click="getAgain" v-bind:class="{orange: used}">重新获取</span></div>
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
      this.transferTips = this.getStorage('transferTips')
      //this.setCodeBack(this.getAgain())

      setTimeout(function () {

        if(localStorage.getItem('backing')==0) {

          this.getAgain()

        }
      }.bind(this),1)

    },
    methods: {

      //获取验证码
      getAgain: function () {
        if(this.used){
          this.used = false;
          if(!this.seconds){
            this.seconds = 60;
          }
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
        if(this.withdraw == 1){
          /*
           * 接口： 用户发起提现操作
           * 请求方式： GET
           * 接口： /user/withdraw/dowithdraw
           * 入参： bankCardId,balance,code
           * */
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'user/withdraw/dowithdraw?bankCardId='+this.bankCardId+'&balance='+this.withdrawMoney+'&code='+this.code
          }).then((res)=>{
            console.log(res.data);
            if(res.data.code=='3001') {
              setTimeout( ()=> {
                this.$router.push('/');
              },1500);
              return false;
            }
            else {
              if (res.data.code == '0000') {
                this.setStorage('orderId',res.data.data);
                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 500
                });
                setTimeout(() => {
                  this.$router.push( '/paySuccess')
                },1500);
              }
              else {
                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 500
                })
              }
            }
          })
        }else if(this.change == 1){
          /*
           * 接口： 用户发起转账操作
           * 请求方式： GET
           * 接口： /user/withdraw/dowithdraw
           * 入参： mobile,balance,code
           * */
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'user/transfer/dotransfer?mobile='+this.transferMobile+'&balance='+this.transferMoney+'&code='+this.code+'&remark='+this.transferTips
          }).then((res)=>{
            console.log(res.data);
            if(res.data.code=='3001') {
              setTimeout( ()=> {
                this.$router.push('/');
              },1500);
              return false;
            }
            else {
              if (res.data.code == '0000') {
                this.setStorage('transferOrderId',res.data.data);
                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 1500
                });
                setTimeout(() => {
                  this.$router.push( '/paySuccess')
                },1500);
              }
              else {
                this.$toast({
                  message: res.data.msg,
                  position: 'bottom',
                  duration: 1500
                })
              }
            }
          })
        }
      }


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
