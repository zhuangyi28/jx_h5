<template>
  <div class="change_certification">
    <div class="change_certification_ps">
      <img src="/static/images/jx_prompt.png">
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
    </div>
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
        mobile: '',
        seconds: 0,
        code: '',
        btnName: '确认'
      }
    },
    mounted () {
      this.mobile = this.getStorage('mobile');
      this.getAgain();
    },
    methods: {
      getAgain: function () {
        if(this.seconds){
          return;
        }else{
          this.seconds = 60;
        }
        var span = document.getElementsByClassName('get_again')[0];
        span.style.color = '#ababab';
        this.$http({
          method: 'get',
          url: this.API_HOST + '/jx/action/oldmobilecheck',
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
              span.style.color = '';
            }
          }, 1000);
        }).catch( (res) => {
          console.log(res);
          alert(res.data.msg);
        });
      },
      enter: function () {
        if(this.code.length == 6){
          this.$http({
            method: 'get',
            url: this.API_HOST+ '/user/set/oldmobilechange',
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            params: {
              code: this.code,
            }
          }).then( (res) => {
            var instance = this.$toast({
              message: res.data.msg,
              position: 'middle',
              duration: 2000
            });
            if(res.data.code == '0000'){
              setTimeout( () => {
                instance.close();
                this.$router.push('/changeNewTel');
              },500);
            }
          });
        }else if(this.code == ''){
          this.$toast({
            message: '请输入验证码',
            position: 'middle',
            duration: 2000
          })
        }else{
          this.$toast({
            message: '输入的验证码有误',
            position: 'middle',
            duration: 2000
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import 'change_certification.less';

</style>
