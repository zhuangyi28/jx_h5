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
      this.mobile = this.getStorage('mobile');
    }
  }
</script>
<style lang="less" scoped>
  @import 'tel_change.less';
</style>
