<template>
  <div class="change_certification">

    <div class="tips">更换登录账号，需验证当前登录账号身份</div>

    <div class="iphone">
      <img  src="../../../../static/images/code_iphone.png"/>
    </div>
    <div class="code_text">验证码已发送至{{mobile}},{{seconds}}s后可<span :class="lockBtn==1 ? '' :'locked'" v-on:click="getAgain">重新获取</span></div>

    <div class="content_box">
      <div class="field">
        <span>验证码</span>
        <input type="text" pattern="\d*" v-model="code"  maxlength="6" placeholder="请输入验证码">
      </div>
    </div>


    <orangeBtn v-bind:name="btnName" v-on:clickEvent="enter"></orangeBtn>
<!--    <div class="change_certification_ps">
      <img src="../../../../static/images/jx_prompt.png">
      <span>更换登录账号，需验证当前登录账号身份</span>
    </div>
    <div class="change_certification_content">
      <div class="change_certification_input">
        <span>验证码</span>
        <input type="number" placeholder="请输入验证码" v-model="code">
      </div>
      <div class="short_message_prompt">
        <span>验证码已发送至{{mobile}}，{{seconds}}s后可</span><span class="get_again" v-on:click="getAgain">重新获取</span>
      </div>
    </div>
    <div class="change_certification_btn">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="enter"></orangeBtn>
    </div>-->
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'changeCertification',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        mobile: '',//当前登录账号
        seconds: 0,//获取验证码倒计时
        lockBtn:1,//获取验证码按钮显示
        code: '',//验证码
        btnName: '确认'
      }
    },
    mounted () {
      this.mobile = this.getStorage('mobile');

      setTimeout(function () {

        if(localStorage.getItem('backing')==0) {

          this.getAgain()
        }
      }.bind(this),1);
    },
    methods: {
      //获取验证码
      getAgain: function () {
        if(this.seconds){
          return;
        }else{
          this.seconds = 60;
        }
        /*
        * 接口： 更换用户手机号-原手机号验证
        * 请求方式： GET
        * 接口： /jx/action/oldmobilecheck
        * 传参： null
        * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'jx/action/oldmobilecheck',
        }).then( (res) => {
          console.log(res);
          this.$toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 1500
          });
          var countDown = setInterval( () => {
            var time = this.seconds;
            time--;
            this.seconds = time;
            this.lockBtn = 0;
            if (!time) {
              clearInterval(countDown);
              this.lockBtn = 1;
              //span.style.color = '';
            }
          }, 1000);
        }).catch( (res) => {
          console.log(res);
          alert(res.data.msg);
        });
      },
      //验证验证码并跳转到下一页面
      enter: function () {
        if(this.code.length == 6){
          /*
          * 接口： 更换用户手机号-原号码验证
          * 请求方式： POST
          * 接口： /user/set/oldmobilechange
          * 传参： code
          * */
          this.$http({
            method: 'get',
            url: process.env.API_ROOT+ 'user/set/oldmobilechange',
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
              code: this.code,
            }
          }).then( (res) => {
            var instance = this.$toast({
              message: res.data.msg,
              position: 'bottom',
              duration: 1500
            });
            if(res.data.code == '0000'){
              setTimeout( () => {
                instance.close();
                this.setStorage('oldCode',this.code);
                this.$router.push('/changeNewTel');
              },500);
            }
          });
        }else if(this.code == ''){
          this.$toast({
            message: '请输入验证码',
            position: 'bottom',
            duration: 1500
          })
        }else{
          this.$toast({
            message: '输入的验证码有误',
            position: 'bottom',
            duration: 1500
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'change_certification.less';

</style>
