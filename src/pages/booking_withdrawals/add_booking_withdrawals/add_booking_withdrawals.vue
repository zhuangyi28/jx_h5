<template>
  <div class="add_booking_withdrawals">
    <div class="bank_choose">
      <div>
        <div class="bank_icon">
        <img src="../../../../static/images/bank.png">
      </div>
        <div class="bank_information">
          <div class="bank_name">招商银行</div>
          <div class="bank_card">尾号5370储蓄卡</div>
        </div>
      </div>
      <span class="allow_right"></span>
    </div>
    <div class="withdraw_detail">
      <div class="title">提现金额<span class="help color_text">?</span></div>
      <div class="withdraw_input">
        <span>￥</span>
        <input type="number" v-bind:placeholder="maxWithdraw">
        <span class="color_text">全部提现</span>
      </div>
    </div>
    <div class="withdraw_option">
      <div class="withdraw_cycle">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_cycle.png"></div>
          <div>提现周期</div>
        </div>
        <div class="option">
          <span>按月循环</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_start">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_start.png"></div>
          <div>
            <div>首次开始事件</div>
            <div>首次提现： <span class="color_text">2019.02.15</span></div>
          </div>
        </div>
        <div class="option">
          <span>每月15日</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_end">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_end.png"></div>
          <div>提现截止时间</div>
        </div>
        <div class="option">
          <span>长期有效</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_tips">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_tips.png"></div>
          <div>备注</div>
        </div>
        <input type="text" placeholder="选填，1-10个字">
      </div>
    </div>
    <div class="agreement">
      <input type="checkbox" name="agree" id="agree">
      <label for="agree">同意</label><span class="color_text">《预约提现服务协议》</span>
    </div>
    <orangeBtn v-bind:name="btnName"></orangeBtn>
  </div>
</template>
<script>
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'addBookingWithdrawals',

    components: {

      orangeBtn: orangeBtn

    },

    data () {

      return {

        maxWithdraw: '每笔最高49500.00',

        btnName: '完成'

      }

    },

  }
</script>
<style lang="less" scoped>
  @import "add_booking_withdrawals.less";
</style>
