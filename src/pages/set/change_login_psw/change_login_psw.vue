<template>
  <div class="change_login_psw">
    <div class="change_login_psw_input">
      <div class="input">
        <span>原密码</span>
        <input type="password" placeholder="请输入原密码" maxlength="20" v-model="oldPassword">
      </div>
      <div class="input">
        <span>新密码</span>
        <input type="password" placeholder="6-20位字母数字密码" maxlength="20" v-model="newPassword">
      </div>
      <div class="input">
        <span>确认密码</span>
        <input type="password" placeholder="请再次输入密码" maxlength="20" v-model="newPasswordAgain">
      </div>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'changeLoginPsw',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '确认',
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    },
    methods: {
      handleClick: function () {
        var a = /[@#\$%\^&\*]+/g;
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if(this.oldPassword == ''){
          this.$toast({
            message: '请输入原密码',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(this.newPassword == '' || this.newPassword.length < 6){
          this.$toast({
            message: '请输入正确的新密码',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(this.newPasswordAgain == '' || this.newPasswordAgain.length < 6){
          this.$toast({
            message: '请再次输入正确的密码',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(a.test(this.newPassword) || a.test(this.newPasswordAgain)){
          this.$toast({
            message: '密码包含非法字符',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(this.newPassword.length < 6 || this.newPasswordAgain.length < 6){
          this.$toast({
            message: '密码长度为6-20位',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(!reg.test(this.newPassword)){
          this.$toast({
            message: '密码需要包含数字和字母',
            position: 'bottom',
            duration: 1500
          });
        }
        else if(this.newPassword != this.newPasswordAgain){
          this.$toast({
            message: '两次密码输入不一致',
            position: 'bottom',
            duration: 1500
          });
        }
        else{
          /*
          * 接口： 修改密码
          * 请求方式： POST
          * 接口： /user/set/changepwd
          * 入参： oldPassword, password, confirmPassword
          * */
          this.$http({
            method: 'post',
            url: process.env.API_ROOT + 'user/set/changepwd',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            params: {
              oldPassword: hexMD5(this.oldPassword),
              password: hexMD5(this.newPassword),
              confirmPassword: hexMD5(this.newPasswordAgain)
            }
          }).then((res)=>{
            console.log('success');
            console.log(res);
            if(res.data.code == '3001'){
              this.$router.push('/');
            }
            else if(res.data.code == '0000'){
              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 500
              });
              setTimeout(()=>{
                window.history.go(-1);
              },500);
            }else{
              this.$toast({
                message: res.data.msg,
                position: 'bottom',
                duration: 1500
              });
            }
          }).catch((res)=>{
            console.log(res);
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "change_login_psw.less";
</style>
