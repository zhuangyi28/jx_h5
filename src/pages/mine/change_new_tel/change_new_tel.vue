<template>
  <div class="change_new_tel">
    <div class="change_new_tel_ps">
      <img src="../../../../static/images/jx_prompt.png">
      <span>下次登录请使用更换的新手机号码，账户其他信息不变</span>
    </div>
    <div class="change_new_tel_input">
      <div class="change_new_tel_tel">
        <img src="../../../../static/images/tel.png">
        <input type="number" v-model="newMobile" placeholder="请输入新的手机号码" class="tel">
      </div>
      <div class="change_new_tel_code">
        <img src="../../../../static/images/jx_pen.png">
        <input type="number" v-model="code" placeholder="请输入验证码" class="code">
        <div class="get_code" v-on:click="getCode">
          <span v-if="show===''">获取验证码</span>
          <span v-else-if="show===true">{{seconds}}s后重新发送</span>
          <span v-else="show===false">重新发送</span>
        </div>
      </div>
    </div>
    <div class="change_new_tel_btn">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    </div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'changeNewTel',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        oldMobile: '',
        newMobile: '',
        code: '',
        btnName: '确认',
        seconds: 60,
        show: '',
        oldCode: '000000'
      }
    },
    mounted () {
      this.oldMobile = this.getStorage('mobile');
    },
    methods: {
      getCode: function () {
        if(!this.mobileTest()){
          return
        }
        if (!this.show) {
          this.show = true;
          if(!this.seconds){
            this.seconds = 60;
          }
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'jx/action/newmobilecheck?mobile=' + this.newMobile,
          }).then( (res) => {
            console.log(res);
            this.$toast({
              message: res.data.msg,
              position: 'middle',
              duration: 2000
            });
            var countDown = setInterval( () => {
              var time = this.seconds;
              time--;
              this.seconds = time;
              if (!time) {
                clearInterval(countDown);
                this.show = false;
              }
            }, 1000);
          }).catch( (res) => {
            console.log(res);
            alert(res.data.msg);
          });
        }
      },
      mobileTest: function () {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if(this.newMobile == this.oldMobile){
          this.$toast({
            message: '新手机号不能和原手机号一致，请更换新号码',
            position: 'middle',
            duration: 2000
          });
          return false
        }
        if (!this.newMobile) {
          this.$toast({
            message: '请输入手机号',
            position: 'bottom',
            duration: 2000
          });
          return false;
        }
        if (!reg.test(this.newMobile)) {
          this.$toast({
            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 2000
          });
          return false;
        }
        return true;
      },
      handleClick: function () {
        if(this.show === ''){
          this.$toast({
            message: '请先获取验证码',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(!this.mobileTest()){
          return;
        }
        if(!this.code){
          this.$toast({
            message: '请输入验证码',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(this.code.length != 6){
          this.$toast({
            message: '请输入正确的验证码',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        this.$http({
          method: 'post',
          url: process.env.API_ROOT+ 'user/set/changemobile',
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          params: {
            mobile:this.newMobile,
            oldCode:this.oldCode,
            newCode: this.code
          }
        }).then( (res) => {
          this.$toast({
            message: res.data.msg,
            position: 'middle',
            duration: 2000
          });
          if(res.data.code == '0000'){
            this.setStorage('mobile',this.newMobile);
            this.$router.push('/personalCenter');
          }
        }).catch( (res) => {
          console.log(res);
          alert(res.data.msg);
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'change_new_tel.less';
</style>
