<template>
  <div class="transfer">
    <div class="transfer_input">
      <span>对方账户</span>
      <input type="text" placeholder="请输入手机号" v-model="transferMobile">
      <div class="input_img" v-on:click="$router.push('/transferHistoryUser')">
        <img src="/static/images/jx_phone_orange.png">
      </div>
    </div>
    <div class="transfer_ps">
      *资金将实时转入对方账户，无法退款
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    <div class="transfer_help">
      <span>联系客服</span><span>转账记录</span>
    </div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'transfer',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        transferMobile: '',//转账账号
        btnName: '下一步',//按钮名称
        mobile: ''//当前登录账号
      }
    },
    mounted () {
      this.mobile = this.getStorage('mobile');
    },
    methods: {
      handleClick: function () {
        if(this.transferMobile == ''){
          this.$toast({
            message: '请输入手机号',
            position: 'middle',
            duration: 1500
          })
        }else if(this.transferMobile.length != 11){
          this.$toast({
            message: '请输入正确的手机号',
            position: 'middle',
            duration: 1500
          })
        }else if(this.transferMobile == this.mobile){
          this.$toast({
            message: '不能给自己转账',
            position: 'middle',
            duration: 1500
          })
        }else{
          /**
           * 接口：检测用户发起转账操作
           * 请求方式：post
           * 接口：/user/work/checktransfer
           * 入参：mobile
           **/
          this.$http({
            method: 'post',
            url: process.env.API_ROOT + 'user/work/checktransfer',
            header: {
              'content-type': 'application/x-www-form-urlencoded'// post请求
            },
            params: {
              mobile: this.transferMobile
            }
          }).then((res)=>{
            if(res.data.code == -8){
              this.$messagebox({
                title: res.data.msg,
                message: '分享微信小程序，邀请好友注册“嘉薪”并实名认证，通过后即可给该好友转账',
                showConfirmButton: 'true',
                showCancelButton: 'true',
                confirmButtonText: '去分享',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{
                if(res == 'cancel'){
                  return;
                }else if(res == 'confirm'){
                  debugger;
                }
              })
            }else if(res.data.code == -9){
              this.$messagebox({
                title: res.data.msg,
                message: '分享微信小程序，提醒好友完成实名认证，通过后即可给该好友转账',
                showConfirmButton: 'true',
                showCancelButton: 'true',
                confirmButtonText: '去分享',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{
                if(res == 'cancel'){
                  return;
                }else if(res == 'confirm'){
                  debugger;
                }
              })
            }else if(res.data.code == '0000'){
              this.setStorage('transferMobile',this.transferMobile);
              this.setStorage('transferName',res.data.data.userName);
              this.$router.push('/accountCash');
            }else{
              this.$toast({
                message: res.data.msg,
                position: 'middle',
                duration: 1500
              })
            }
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer.less";
</style>
