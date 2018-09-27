<template>
  <div class="psw_certification">
    <div class="psw_certification_input">
      <span><img src="../../../../static/images/jx_lock.png" ></span>
      <input type="number" style="-webkit-text-security:disc" pattern="\d*" oninput="if(value.length > 6)value = value.slice(0, 6)" placeholder="请输入支付密码" v-model="password" maxlength="6">
    </div>
    <div class="forget_password"><span v-on:click="$router.push('/code')">忘记支付密码？</span></div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'pswCertification',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return{
        btnName: '确认',//按键名称
        password: '',//密码
        withdrawMoney: '',//提现金额
        bankCardId: '',//银行卡号
        change: '',//转账识别
        withdraw: '',//提现识别
        transferMoney: '',//转账金额
        transferMobile: ''//转账账号
      }
    },
    mounted () {
      this.withdrawMoney = this.getStorage('withdrawMoney');
      this.bankCardId = this.getStorage('bankCardId');
      this.change= this.getStorage('change');
      this.withdraw = this.getStorage('withdraw');
      this.transferMoney = this.getStorage('transferMoney');
      this.transferMobile = this.getStorage('transferMobile');
      this.setStorage('forgetPsw','1');
      document.getElementsByTagName('input')[0].focus();
    },
    methods: {
      handleClick: function () {
        if(this.password == ''){
          this.$toast({
            message: '请输入密码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }else if(this.password.length != 6){
          this.$toast({
            message: '请输入正确的密码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }else{
          if(this.withdraw == 1){
            /*
          * 接口： 用户发起提现操作
          * 请求方式： GET
          * 接口： /user/withdraw/dowithdraw
          * 入参： bankCardId,balance,code
          * */
            this.$http({
              method: 'get',
              url: process.env.API_ROOT + 'user/withdraw/dowithdraw?bankCardId='+this.bankCardId+'&balance='+this.withdrawMoney+'&payPassword='+hexMD5(this.password)
            }).then((res)=>{
              if(res.data.code == -4){
                this.$messagebox({
                  title: '提示',
                  message: res.data.msg,
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: '忘记密码',
                  cancelButtonText: '重新输入',
                  cancelButtonClass:'cancel_btn',
                  confirmButtonClass:'confirm_btn_orange',
                }).then((res)=>{
                  if(res == 'confirm'){
                    this.$router.push('/code');
                    return;
                  }else if(res == 'cancel'){
                    this.password = '';
                    return;
                  }
                })
              }
              var toast = this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500
              });
              if(res.data.code == '0000'){
                setTimeout(()=>{
                  toast.close();
                  this.setStorage('orderId',res.data.data);
                  this.$router.push('/paySuccess')
                },500);
              }
            }).catch((res)=>{
              console.log(res);
            });
          }else if(this.change == 1){
            /*
          * 接口： 用户发起转账操作
          * 请求方式： GET
          * 接口： /user/withdraw/dowithdraw
          * 入参： mobile,balance,code
          * */
            this.$http({
              method: 'get',
              url: process.env.API_ROOT + 'user/transfer/dotransfer?mobile='+this.transferMobile+'&balance='+this.transferMoney+'&payPassword='+hexMD5(this.password)
            }).then((res)=>{
              if(res.data.code == -4){
                this.$messagebox({
                  title: '提示',
                  message: res.data.msg,
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: '忘记密码',
                  cancelButtonText: '重新输入',
                  cancelButtonClass:'cancel_btn',
                  confirmButtonClass:'confirm_btn_orange',
                }).then((res)=>{
                  if(res == 'confirm'){
                    this.$router.push('/code');
                    return;
                  }else if(res == 'cancel'){
                    this.password = '';
                    return;
                  }
                })
              }
              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500
              });
              if(res.data.code == '0000'){
                setTimeout(()=>{
                  this.setStorage('transferOrderId',res.data.data);
                  this.$router.push('/paySuccess');
                },500);
              }
            }).catch((res)=>{
              console.log(res);
            });
          }
        }
      }
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import "psw_certification.less";
</style>
