<template>
  <div class="transfer">
    <div class="transfer_input">
      <span>对方账户</span>
      <input type="number" pattern="\d*"  placeholder="请输入手机号" v-model="transferMobile" oninput="if(value.length > 11)value = value.slice(0, 11)" autofocus>
      <div class="input_img" v-on:click="$router.push('/transferHistoryUser')">
        <i class="iconfont icon-sign_phone color_text"></i>
      </div>
    </div>
    <div class="transfer_ps">
      资金将实时转入对方账户，无法退款
    </div>
    <div v-if="unused">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    </div>
    <div class="transfer_click_btn" v-else>
      <button>下一步</button>
    </div>
    <service v-bind:type1="serviceLeft" v-bind:type2="serviceRight" v-bind:spanShow="true" v-bind:iconName1="iconName1" v-bind:iconName2="iconName2" v-on:clickEventLeft="customerFn" v-on:clickEventRight="jumpToBill"></service>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import service from '../../../components/service/service'
  import { customerInit, customerClick } from "../../../../static/js/basic"
  export default {
    name: 'transfer',
    components: {
      orangeBtn: orangeBtn,
      service: service
    },
    data () {
      return {
        transferMobile: '',//转账账号
        btnName: '下一步',//按钮名称
        mobile: '',//当前登录账号
        serviceLeft: '联系客服',
        serviceRight: '转账记录',
        iconName1:'icon-withdraw_custom',
        iconName2:'icon-wages_transfer1',
        unused: false //控制显示button
      }
    },
    mounted () {
      //美恰初始化
      customerInit({
        name:this.getStorage('userName'),// 名字
        tel:this.getStorage('mobile'),// 电话
      });
      this.mobile = this.getStorage('mobile');
    },
    methods: {
      handleClick: function () {
        if(this.transferMobile == ''){
          this.$toast({
            message: '请输入手机号',
            position: 'bottom',
            duration: 1500
          })
        }else if(this.transferMobile.length != 11){
          this.$toast({
            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 1500
          })
        }else if(this.transferMobile == this.mobile){
          this.$toast({
            message: '不能给自己转账',
            position: 'bottom',
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
            console.log(res);
            if(res.data.code == -8){
              this.$messagebox({
                title: res.data.msg,
                message:  res.data.msg+'，请先注册并实名认证',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{
                if(res == 'cancel'){
                  return;
                }else if(res == 'confirm'){
                  this.setStorage('share','true');

                  localStorage.setItem('fingerShow',1);//分享是否出現遮罩

                  window.location.href='http://jxtest.99payroll.cn/jxpf-h5/share.html'
                  //this.$router.push('/share');
                }
              })
            }else if(res.data.code == -9){
              this.$messagebox({
                title: res.data.msg,
                message: res.data.msg+'，请先注册并实名认证',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '确定',
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
            }
            else if(res.data.code == -7){
              this.$messagebox({
                title: '提示',
                message: res.data.msg,
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: '确定',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{
                if(res == 'cancel'){
                  return;
                }else if(res == 'confirm'){
                  debugger;
                }
              })
            }
            else if(res.data.code == '-10'){
              this.$messagebox({
                title: '提示',
                message: '您有文件待签署，请至 “ 我的签约”中完成签署后再转账',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '去签约',
                cancelButtonText: '取消',
                cancelButtonClass:'cancel_btn',
                confirmButtonClass:'confirm_btn_orange',
              }).then((res)=>{

                if(res == 'confirm'){

                  this.$router.push('/contractList');

                }


              }).catch((res=>{}))
            }
            else if(res.data.code == '0000'){
              this.setStorage('transferMobile',this.transferMobile);
              this.setStorage('transferName',res.data.data.userName);
              this.$router.push('/accountCash');
            }else{
              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500
              })
            }
          })
        }
      },
      jumpToBill: function () {
        this.setStorage('whichBill','2');
        this.$router.push('/bill');
      },
      customerFn:function () {
        customerClick()
      }
    },
    watch: {
      transferMobile: function () {
        if(this.transferMobile == ''){
          this.unused = false;
        }
        else if(this.transferMobile != ''){
          this.unused = true;
        }
      }
    },
    destroyed (){
      this.$messagebox.close();
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer.less";
</style>
