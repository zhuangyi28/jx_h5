<template>
  <div class="all_history">
    <div class="list_show" v-if="booking_list.length != 0">
      <div class="list_one" v-for="content in booking_list" >
        <div class="title">
          <div>
            <div class="img color_background"><img src="../../../../static/images/cash_appt_clock.png"></div>
            <span>预约提现</span>
          </div>
          <div class="close"><img src="../../../../static/images/contract_close.png"></div>
        </div>
        <div class="booking_content color_text">每月15日提现3000.86元</div>
        <div class="booking_card">至南京银行（**1468）</div>
        <div class="booking_time">下期02月15日执行</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'all_history',

    data() {

      return{

        booking_list: [1,2,3]

      }

    }

  }
</script>
<style lang="less" scoped>
  @import "all_history.less";
</style>
