<template>
  <div class="transfer_success">
    <div class="success_img">
      <div class="out"></div>
      <div class="middle"></div>
      <div class="in">
        <img src="../../../../static/images/jx_success.png">
      </div>
      <img src="../../../../static/images/jx_background.png">
    </div>
    <div class="success_title">
      <span class="title">转账成功</span>
      <span class="money">￥{{money}}</span>
    </div>
    <orangeBtn v-bind:name="btnName"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  export default {
    name: 'transferSuccess',
    components: {
      orangeBtn: orangeBtn
    },
    data () {
      return {
        btnName: '查看订单',
        money: ''
      }
    },
    mounted () {
      this.money = this.getStorage('transferMoney');
    }
  }
</script>
<style lang="less" scoped>
  @import "transfer_success.less";
</style>
