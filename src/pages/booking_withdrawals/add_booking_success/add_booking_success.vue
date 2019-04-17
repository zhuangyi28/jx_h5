<template>
  <div class="add_booking_success">
    <div class="success_img">
      <div class="big_round color_background"></div>
      <div class="middle_round color_background"></div>
      <div class="long_line color_background"></div>
      <div class="short_line color_background"></div>
      <div class="small_round_one border_color"></div>
      <div class="small_round_two border_color"></div>
      <div class="small_round_three color_background"></div>
      <div class="small_square_one color_background"></div>
      <div class="small_square_two border_color"></div>
      <img src="../../../../static/images/jx_right.png">
    </div>
    <div class="success_detail">
      <div>预约提现添加成功</div>
      <div>{{balance}}</div>
      <div class="color_text">{{information}}</div>
    </div>
    <div class="back_btn message_btn_color color_text" v-on:click="backFn">返回</div>
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

      (this.balance != '提现全部余额') && (this.balance ='￥' + (+this.balance).toFixed(2));

    },

    methods: {

      backFn: function () {

        (localStorage.getItem('addBankBack')== 1) && (localStorage.removeItem('addBankBack'));

        this.$router.replace('/bookingList');

      }

    }


  }
</script>
<style lang="less" scoped>
  @import "add_booking_success.less";
</style>
