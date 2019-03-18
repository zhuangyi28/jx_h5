<template>
  <div class="pay_success">
    <div class="success_box color_background_gradient">
      <img src="../../../../static/images/jx_success_white.png"/>
      <div class="circle">
        <div class="circle_bot"></div>
        <div class="circle_mid"></div>
      </div>
      <div class="wave"></div>
    </div>
    <div class="success_title">
      <span class="title color_text" v-if="withdraw == 1">提现申请已提交</span>
      <span class="title color_text" v-else-if ="change == 1">转账成功</span>
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
        withdraw: '',
      }
    },
  destroyed(){



    },
    mounted () {

      this.change = this.getStorage('change');
      this.withdraw = this.getStorage('withdraw');
      if(this.change == 1){
        this.money = this.getStorage('transferMoney');
        document.title = '转账成功';
      }else if(this.withdraw == 1){
        this.money = this.getStorage('withdrawMoney');
        document.title = '提现申请已提交';
      }
    },
    methods: {
      jumpTo: function () {
        if(this.withdraw == 1){
          this.$router.push({path: '/cashDetail',query: {orderId: localStorage.getItem('orderId')}});
        }else if(this.change == 1){
          this.$router.push({path: '/transferDetail',query: {orderId: localStorage.getItem('transferOrderId'),orderType: '02'}});
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "pay_success.less";
</style>
