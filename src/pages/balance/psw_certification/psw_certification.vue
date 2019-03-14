<template>
  <div class="psw_certification">
    <div class="psw_certification_input">
      <span><img src="../../../../static/images/jx_lock.png" ></span>
      <input type="number" style="-webkit-text-security:disc" pattern="\d*" oninput="if(value.length > 6)value = value.slice(0, 6)" placeholder="请输入支付密码" v-model="password" maxlength="6" autofocus>
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
        transferMobile: '',//转账账号
        transferTips:''//转账备注
      }
    },
    mounted () {

      this.init();

    },
    methods: {

      init: function () {

        this.withdrawMoney = this.getStorage('withdrawMoney');
        this.bankCardId = this.getStorage('bankCardId');
        this.change= this.getStorage('change');
        this.withdraw = this.getStorage('withdraw');
        this.transferMoney = this.getStorage('transferMoney');
        this.transferMobile = this.getStorage('transferMobile');
        this.transferTips = this.getStorage('transferTips')
        this.setStorage('forgetPsw','1');
        document.getElementsByTagName('input')[0].focus();

      },

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
           * 入参： bankCardId,balance,payPassword
           * */

          (this.withdraw == 1)&&(url = process.env.API_ROOT + 'user/withdraw/dowithdraw')&&
          (params = {bankCardId: this.bankCardId,balance: this.withdrawMoney, payPassword: hexMD5(this.password)});

          /*
           * 接口： 用户发起转账操作
           * 请求方式： GET
           * 接口： /user/withdraw/dowithdraw
           * 入参： mobile,balance,payPassword,remark
           * */

          (this.change == 1)&&(url = process.env.API_ROOT + 'user/transfer/dotransfer')&&
          (params = {mobile: this.transferMobile, balance: this.transferMoney, payPassword: hexMD5(this.password), remark: this.transferTips});

          this.$http({

            method: 'get',
            url: url,
            params: params

          }).then(res=>{

            console.log(res);

            if(res.data.code == -10){

              this.$messagebox({
                title: '提示',
                message: '您有文件待签署，请至 “ 我的签约”中完成签署后再提现',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '去签约',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{

                if(res == 'confirm'){

                  this.$router.replace('/contractList');

                }


              }).catch((res=>{}))
            }
            else if(res.data.code == -4 || res.data.code == -3){
              this.$indicator.close();

              var buttonName;

              (res.data.msg.indexOf('输入错误3次') != -1)? (buttonName = '我知道了') : (buttonName = '重新输入');

              this.$messagebox({
                title: '提示',
                message: res.data.msg,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: buttonName,
                cancelButtonText: '忘记密码',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{
                if(res == 'confirm'){
                  this.password = '';
                  return;
                }else if(res == 'cancel'){
                  this.$router.replace('/code');
                  return;
                }
              });
            }else{

              (this.withdraw == 1) && (this.setStorage('orderId',res.data.data));

              (this.change == 1) && (this.setStorage('transferOrderId',res.data.data));

              setTimeout(()=>{
                this.$router.replace('/paySuccess');
              },1500);

            }

          }).catch(res=>{console.log(res)});
        }
      }
    },
    destroyed (){
      this.$messagebox.close();
      this.$indicator.close()
    }
  }
</script>
<style lang="less" scoped>
  @import "psw_certification.less";
</style>
