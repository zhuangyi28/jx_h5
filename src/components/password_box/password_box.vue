<template>
  <div class="password_box">

    <div class="box_background"></div>

    <div class="password_input">
      <div class="title">
        <div class="close" v-on:click="boxClose">
          <img src="../../../static/images/go.png">
        </div>
        <span v-if="isSecurity == 1">请输入短信验证码</span>
        <span v-else-if="isSecurity == 2">请输入支付密码</span>
      </div>
      <div class="code_click" v-if="isSecurity ==1">
          <span>验证码已发送至{{mobile | plusXing(3, 4)}},<span class="color_text">{{seconds}}s后</span>可
            <span  v-bind:class="{color_text: used}" v-on:click="getAgain">重新获取</span>
          </span>
      </div>
      <div class="password_block">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="another_click" v-if="isSecurity == 2">
        <span class="color_text" v-on:click="$router.push('/code')">忘记密码</span>
      </div>
      <div class="get_sound_code" v-if="isSecurity == 1 && soundCodeShow">
        没有收到验证码？请尝试获取<span class="color_text" v-on:click="getSoundCode">语音验证码</span>
      </div>
      <calculation v-on:num="passwordInput" v-on:inputClose="passwordSubmit" key="password" newNum="" ref="passwordInput"></calculation>
    </div>

  </div>
</template>
<script>

  import calculation from '../../components/keyboard/calculation'

  export default {

    name: 'passwordBox',

    data () {

      return {

        isSecurity: '',

        password: '',

        mobile: '',

        seconds: '',

        used: true,

        soundCodeShow: true

      }

    },

    components: {

      calculation: calculation

    },

    mounted () {

      this.data();

    },

    methods: {

      data: function () {

        /**
         * 接口：用户中心
         * 请求方式：POST
         * 接口：/user/center/usercenter
         * 入参：null
         **/
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/center/usercenter',
          header: {
            'content-type': 'application/x-www-form-urlencoded', // post请求
          }
        }).then(res=>{

          this.isSecurity = res.data.data.isSecurity;

          this.mobile = res.data.data.mobile;

          (this.isSecurity == 1) && (this.getAgain());

        })

      },



      /*密码/验证码键盘输入事件*/
      passwordInput: function (num) {

        var divs = document.getElementsByClassName('password_block')[0].children;

        var length = divs.length;

        if(num === ''){

          if(event.target.dataset.num == 'C'){

            for(let div of divs){

              div.innerHTML = '';

              this.password = num;

            }

            return;

          }

          else if(event.target.dataset.num == 'D'){

            this.password = this.password.slice(0,-1);

          }

        }

        else if(num.indexOf('.') != -1 || this.password.length >= 6){

          this.$refs.passwordInput.money = '';

          return;

        }else{

          this.password = this.password + num;

        }

        if(this.isSecurity == 1){

          while(length--){

            if((typeof this.password[length]) == 'string'){

              divs[length].innerHTML = this.password[length];

            }else{

              divs[length].innerHTML = '';

            }

          }

        }else if(this.isSecurity == 2){

          while(length--){

            if((typeof this.password[length]) == 'string'){

              divs[length].innerHTML = '●';

            }else{

              divs[length].innerHTML = '';

            }

          }

        }

        this.$refs.passwordInput.money = '';
      },



      /*密码/验证码键盘确认事件*/
      passwordSubmit: function (num) {
        var type;
        (this.isSecurity == 1) && (type='验证码');
        (this.isSecurity == 2) && (type='密码');

        if(this.password == ''){
          this.$toast({
            message: '请输入' + type,
            position: 'bottom',
            duration: 1500
          });
        }else if(this.password.length != 6){
          this.$toast({
            message: '请输入正确的' + type,
            position: 'bottom',
            duration: 1500
          });
        }else{

          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });

          (this.isSecurity == 2) && (this.password = hexMD5(this.password));

          (this.isSecurity == 1) && (type='code');
          (this.isSecurity == 2) && (type='payPassword');

          this.$emit('clickEvent',this.password, type);

          this.password = '';

        }
      },



      boxClose: function () {

        this.$emit('boxClose',false);

      },



      getAgain: function () {

        if(this.used){

          this.used = false;

          var time = 60;

          this.seconds = time;

          this.getCode();

          var interval = setInterval(()=>{

            if(!this.seconds){

              this.used = true;

              this.soundCodeShow = true;

              clearInterval(interval);

            }else{

              this.seconds--;

            }

          },1000);

        }

      },



      getCode: function () {

        this.$emit('getCode');

      },


      getSoundCode: function () {

        this.$emit('getSoundCode');

      }

    },

  }
</script>
<style lang="less" scoped>
  @import "password_box.less";
</style>
