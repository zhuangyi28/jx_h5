<template>
  <div class="pay_success">
    <div class="success_box">
      <img src="/static/images/jx_success_white.png"/>
      <div class="circle">
        <div class="circle_bot"></div>
        <div class="circle_mid"></div>
      </div>
      <div class="wave"></div>
    </div>
    <div class="success_title" v-if="withdraw == 1">
      <span class="title">提现申请已提交</span>
      <span class="money">￥{{money}}</span>
    </div>
    <div class="success_title" else-if="change == 1">
      <span class="title">转账成功</span>
      <span class="money">￥{{money}}</span>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="jumpTo"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'paySuccess',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '查看订单',
        money: '',
        change: '',
        withdraw: ''
      }
    },
    mounted () {
      this.change = this.getStorage('change');
      this.withdraw = this.getStorage('withdraw');
      if(this.change == 1){
        this.money = this.getStorage('transferMoney');
      }else if(this.withdraw == 1){
        this.money = this.getStorage('withdrawMoney');
      }
    },
    methods: {
      jumpTo: function () {
        if(this.withdraw == 1){
          this.$router.push('/cashDetail');
        }else if(this.change == 1){
          this.$router.push('/transferDetail');
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "pay_success.less";
</style>
