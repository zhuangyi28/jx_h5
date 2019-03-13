<template>
  <div class="booking_withdrawals_detail">
    <div class="withdrawals_title">
      <div class="withdrawals_content">
        <div class="withdrawals_name">
          <div class="img"><img src="../../../../static/images/cash_detail1.png"></div>
          <span>预约预约预约预约预约预约提现提现提现</span>
        </div>
        <div class="withdrawals_time_change">
          <div class="withdrawals_time_bank">
            <div class="time color_text">每月15日提现3000.86元</div>
            <div class="bank">至南京银行（**1468）</div>
          </div>
          <div class="change">
            <div class="color_text message_btn_color">修改</div>
            <div class="color_text message_btn_color">终止</div>
          </div>
        </div>
      </div>
      <div class="next_time">
        <div>下期02月15日执行</div>
        <div>
          <span>查看全部计划</span>
          <span class="allow_right"></span>
        </div>
      </div>
    </div>
    <div class="history_withdrawals">
      <div class="withdrawals_time">
        <div>成功提现（期）</div>
        <div>3</div>
      </div>
      <div class="withdrawals_money">
        <div>累计提现（元）</div>
        <div>3000.00</div>
      </div>
    </div>
    <div class="withdrawals_list">
      <div class="list_one">
        <div class="money">
          <div><img src="../../../../static/images/jx_record.png"></div>
          <div>
            <div>1000.00</div>
            <div>余额提现</div>
          </div>
        </div>
        <div class="time">
          <div class="color_text">完成</div>
          <div>2018-09-01 15:00</div>
        </div>
      </div>
      <div class="list_one">
        <div class="money">
          <div><img src="../../../../static/images/jx_record.png"></div>
          <div>
            <div>1000.00</div>
            <div>余额提现</div>
          </div>
        </div>
        <div class="time">
          <div class="color_text">完成</div>
          <div>2018-09-01 15:00</div>
        </div>
      </div>
      <div class="list_one">
        <div class="money">
          <div><img src="../../../../static/images/jx_record.png"></div>
          <div>
            <div>1000.00</div>
            <div>余额提现</div>
          </div>
        </div>
        <div class="time">
          <div class="color_text">完成</div>
          <div>2018-09-01 15:00</div>
        </div>
      </div>
      <div class="list_one">
        <div class="money">
          <div><img src="../../../../static/images/jx_record.png"></div>
          <div>
            <div>1000.00</div>
            <div>余额提现</div>
          </div>
        </div>
        <div class="time">
          <div class="color_text">完成</div>
          <div>2018-09-01 15:00</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    name: 'booking_withdrawals_detail',

  }
</script>
<style lang="less" scoped>
  @import "booking_withdraw_detail.less";
</style>
