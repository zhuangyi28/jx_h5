<template>
  <div class="add_booking_success">
    <div class="success_img">
      <img src="../../../../static/images/icon_didi_1.png">
    </div>
    <div class="success_detail">
      <div>预约提现添加成功</div>
      <div>￥{{balance}}</div>
      <div class="color_text">{{information}}</div>
    </div>
    <div class="back_btn message_btn_color color_text" v-on:click="$router.push('/bookingList')">返回</div>
  </div>
</template>
<script>
  export default {

    name: 'addBookingSuccess',

    data () {

      return {

        balance: '',

        information: ''

      }

    },

    mounted () {

      this.balance = this.$store.data.balance;

      this.information = this.$store.data.information;

      this.balance = (+this.balance/100).toFixed(2);

    },


  }
</script>
<style lang="less" scoped>
  @import "add_booking_success.less";
</style>
