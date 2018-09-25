<template>
  <div class="tel_change">
    <div class="tel_now">
      <div>当前账户绑定账号：</div>
      <div>{{mobile|plusXing(3,4)}}</div>
    </div>
    <div class="change_btn" v-on:click="$router.push('/changeCertification')">
      <orangeBtn v-bind:name="btnName"></orangeBtn>
      <div class="change_ps">
        一个手机号只能绑定一个账户
      </div>
    </div>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'telChange',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '更换手机号',
        mobile: ''
      }
    },
    mounted () {

      /**
       * 接口：个人中心
       * 请求方式：POST
       * 接口：/user/center/usercenter
       * 入参：null
       **/
      this.$http({

        method: 'post',

        url: process.env.API_ROOT + 'user/center/usercenter',


      }).then((res) => {

        console.log(res.data);

        if (res.data.code == '0000') {

          this.mobile= res.data.data.mobile.substr(0, 3) + '****' + res.data.data.mobile.substr(7)


        }
      }).catch((res=>{}))

    }
  }
</script>
<style lang="less" scoped>
  @import 'tel_change.less';
</style>
