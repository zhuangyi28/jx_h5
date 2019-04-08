<template>
  <div class="booking_list">
    <!--预约提现列表-->
    <div class="list_show" v-if="booking_list.length != 0">
      <div class="list_one" v-for="content in booking_list" >
        <div class="title">
          <div>
            <div class="color_background"><img src="../../../../static/images/cash_appt_clock.png"></div>
            <span>预约提现</span>
          </div>
          <div class="img">
            <img src="../../../../static/images/contract_close.png">
          </div>
        </div>
        <div class="booking_content color_text">每月15日提现3000.86元</div>
        <div class="booking_card">至南京银行（**1468）</div>
        <div class="booking_time_state">
          <div class="booking_time">下期02月15日执行</div>
          <div class="booking_state border_color">暂停</div>
        </div>
      </div>
    </div>
    <!--长度为零时-->
    <div class="list_no" v-else>
      <div class="nodata_img">
        <div class="big_round color_background"></div>
        <div class="middle_round color_background"></div>
        <div class="long_line color_background"></div>
        <div class="short_line color_background"></div>
        <div class="small_round_one border_color"></div>
        <div class="small_round_two border_color"></div>
        <div class="small_round_three color_background"></div>
        <div class="small_square_one color_background"></div>
        <div class="small_square_two border_color"></div>
      </div>
      <div class="title color_text">您还没有预约提现哦~</div>
      <div class="content">添加后系统将按您的计划时间自动执行提现操作</div>
    </div>
    <!--按钮-->
    <orangeBtn v-bind:name="btnName" v-if="booking_list.length < 5" v-on:clickEvent="addBookingWithdrawalsFn"></orangeBtn>
    <!--提示-->
    <div class="ps">温馨提示：最多可设置<span class="color_text">5个</span>预约提现任务</div>
    <!--帮助-->
    <div class="help">
      <div class="rule">规则说明</div>
    </div>
  </div>
</template>
<script>

  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'booking_list',

    data () {

      return {

        booking_list: [],

        btnName: '添加预约提现'

      }

    },

    components: {

      orangeBtn: orangeBtn

    },

    methods: {

      addBookingWithdrawalsFn: function () {

        /*
      * 接口： 获取用户银行卡信息
      * 请求方式： GET
      * 接口： /user/bank/getbankcardinfo
      * 传参： null
      * */
        this.$http({
          method: 'get',
          url: process.env.API_ROOT+ 'user/bank/getbankcardinfo',
        }).then(res=>{

          console.log(res);

          localStorage.setItem('booking','1');

          (res.data.data.length == 0) ? (this.$router.push('/addCard')) : (this.$router.push('/addBookingWithdrawals'));

        }).catch(res=>{console.log(res)});



      }

    },

  }
</script>
<style lang="less" scoped>
  @import "booking_list.less";
</style>
