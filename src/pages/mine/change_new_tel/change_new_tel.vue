<template>
  <div class="change_new_tel">
    <div class="change_new_tel_ps">
      <img src="../../../../static/images/jx_prompt.png">
      <span>下次登录请使用更换的新手机号码，账户其他信息不变</span>
    </div>
    <div class="change_new_tel_input">
      <div class="change_new_tel_tel">
        <i class="iconfont icon-sign_phone color_text"></i>
        <input type="number" v-model="newMobile" placeholder="请输入新的手机号码"  pattern="\d*" oninput="if(value.length > 11)value = value.slice(0, 11)" class="tel">
      </div>
      <div class="change_new_tel_code">
        <i class="iconfont icon-sign_pen color_text"></i>
        <input type="number" v-model="code" placeholder="请输入验证码"  pattern="\d*" oninput="if(value.length > 6)value = value.slice(0, 6)" class="code">
        <div class="get_code color_background" v-on:click="getCode">
          <span v-if="show===''">获取验证码</span>
          <span v-else-if="show===true">{{seconds}}s后重新发送</span>
          <span v-else="show===false">重新发送</span>
        </div>
      </div>
    </div>
    <div class="change_new_tel_btn">
      <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
    </div>

    <div class="get_sound_code" v-if="soundCodeShow">没有收到验证码？请尝试获取<span class="color_text" v-on:click="getSoundCode">语音验证码</span></div>
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
        oldMobile: '',//当前登录账号
        newMobile: '',//更换的手机号
        code: '',//验证码
        btnName: '确认',//按钮名称
        seconds: 60,//验证码倒计时
        show: '',//获取验证码显示
        oldCode: '',//上一页面验证码

        soundCodeShow: false,

        soundCodeTime: 60,
      }
    },
    mounted () {
      this.oldMobile = this.getStorage('mobile');
      this.oldCode = this.getStorage('oldCode');
    },
    methods: {
      //获取验证码
      getCode: function () {
        if(!this.mobileTest()){
          return
        }
        if (!this.show) {
          /*
          * 接口： 更换用户手机号-新手机号验证
          * 请求方式： GET
          * 接口： /jx/action/newmobilecheck
          * 传参： mobile
          * */
          this.$http({
            method: 'get',
            url: process.env.API_ROOT + 'jx/action/newmobilecheck?mobile=' + this.newMobile,
          }).then( (res) => {
            console.log(res);
            this.$toast({
              message: res.data.msg,
              position: 'bottom',
              duration: 1500
            });
            if(res.data.code == '0000'){
              this.show = true;
              if(!this.seconds){
                this.seconds = 60;
              }
              //获取验证码倒计时
              var countDown = setInterval( () => {
                var time = this.seconds;
                time--;
                this.seconds = time;
                if (!time) {
                  this.soundCodeShow = true;
                  clearInterval(countDown);
                  this.show = false;
                }
              }, 1000);
            }
          }).catch( (res) => {
            console.log(res);
            alert(res.data.msg);
          });
        }
      },
      //验证手机号
      mobileTest: function () {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        if(this.newMobile == this.oldMobile){
          this.$toast({
            message: '新手机号不能和原手机号一致，请更换新号码',
            position: 'bottom',
            duration: 1500
          });
          return false
        }
        if (!this.newMobile) {
          this.$toast({
            message: '请输入手机号',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        if (!reg.test(this.newMobile)) {
          this.$toast({
            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 1500
          });
          return false;
        }
        return true;
      },
      //更换手机号提交
      handleClick: function () {
        if(!this.mobileTest()){
          return
        }
        if(this.show === ''){
          this.$toast({
            message: '请先获取验证码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(!this.code){
          this.$toast({
            message: '请输入验证码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.code.length != 6){
          this.$toast({
            message: '请输入正确的验证码',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        /*
        * 接口： 更换用户手机号
        * 请求方式： POST
        * 接口： /user/set/changemobile
        * 传参： mobile, oldCode, newCode
        * */
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
            position: 'bottom',
            duration: 1500
          });
          if(res.data.code == '0000'){
            this.setStorage('mobile',this.newMobile);
            this.$router.go(-3);
          }
        }).catch( (res) => {
          console.log(res);
          alert(res.data.msg);
        })
      },


      getSoundCode: function () {

        if(!this.mobileTest()){
          return
        }

        if(this.soundCodeTime < 60){

          this.$toast({

            message: '操作过于频繁，请稍后再试',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        /*
        * 接口： 更换用户手机号-新手机号验证语音验证码
        * 请求方式： GET
        * 接口： /jx/action/newmobileaudiocheck
        * 传参： null
        * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'jx/action/newmobileaudiocheck',

          params:{

            mobile: this.newMobile

          }
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


    }
  }
</script>
<style lang="less" scoped>
  @import 'change_new_tel.less';
</style>
