<template>
  <div class="add_booking_withdrawals">
    <div class="bank_choose" v-on:click="$router.push('/bankCard')">
      <div>
        <div class="bank_icon">
        <img v-bind:src="bankImg">
      </div>
        <div class="bank_information">
          <div class="bank_name">{{bankName}}</div>
          <div class="bank_card">尾号{{bankNo.substr(-4)}}储蓄卡</div>
        </div>
      </div>
      <span class="allow_right"></span>
    </div>
    <div class="withdraw_detail">
      <div class="title">提现金额<span class="help color_text" v-on:click="psShow=true">?</span></div>
      <div class="withdraw_input">
        <span>￥</span>
        <input type="text" v-bind:placeholder="maxWithdraw+amountMax+'元'" v-model="withdrawMoney">
        <span class="color_text" v-on:click="withdrawMoney = '到期提现全部余额'">全部提现</span>
      </div>
    </div>
    <div class="withdraw_option">
      <div class="withdraw_cycle" v-on:click="cycleShow = true">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_cycle.png"></div>
          <div>提现周期</div>
        </div>
        <div class="option">
          <span>{{cycleType}}</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_start" v-on:click="firstTimeShow=true">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_start.png"></div>
          <div>
            <div>首次开始事件</div>
            <div>首次提现： <span class="color_text">2019.02.15</span></div>
          </div>
        </div>
        <div class="option">
          <span>每月{{firstTimeType}}</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_end" v-on:click="selectTimeShow">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_end.png"></div>
          <div>提现截止时间</div>
        </div>
        <div class="option">
          <span>{{newDate}}</span>
          <span class="allow_right"></span>
        </div>
      </div>
      <div class="withdraw_tips">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_tips.png"></div>
          <div>备注</div>
        </div>
        <input type="text" placeholder="选填，1-10个字" maxlength="10">
      </div>
    </div>
    <div class="agreement">
      <input type="checkbox" name="agree" id="agree">
      <label for="agree">同意</label><span class="color_text">《预约提现服务协议》</span>
    </div>
    <orangeBtn v-bind:name="btnName"></orangeBtn>
    <mt-popup v-model="psShow">
      <div class="ps">
        <div class="title">提示</div>
        <div class="content">
          <div>*手续费：0%，单卡单笔{{amountMax|thousandBitSeparator}}元，当日{{dayMaxAmount|thousandBitSeparator}}元，当月{{monthMaxAmount|thousandBitSeparator}}元</div>
          <div class="import">*若提现金额超出单笔最高额度，将分多笔进行提现</div>
        </div>
        <div class="close" v-on:click="psShow=false">确定</div>
      </div>
    </mt-popup>
    <mt-datetime-picker v-model="date" type="date" ref="date" v-bind:startDate="new Date(startDate)" @confirm="selectTime" @cancel="cancelTime"></mt-datetime-picker>
    <mt-popup v-model="cycleShow" position="bottom">

      <div class="button">

        <div class="cancel" v-on:click="cycleShow=false">取消</div>
        <div class="confirm" v-on:click="cycleConfirm">确定</div>

      </div>

      <mt-picker v-bind:slots="cycleList" @change="cycleChange"></mt-picker>
    </mt-popup>

    <mt-popup v-model="firstTimeShow" position="bottom">

      <div class="button">

        <div class="cancel" v-on:click="firstTimeShow=false">取消</div>
        <div class="confirm" v-on:click="firstTimeConfirm">确定</div>

      </div>

      <mt-picker v-bind:slots="firstTimeList" @change="firstTimeChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import { bankCardJson } from "../../../../static/js/bankCardJson"
  import orangeBtn from '../../../components/orange_btn/orange_btn'

  export default {

    name: 'addBookingWithdrawals',

    components: {

      orangeBtn: orangeBtn,

    },

    data () {

      return {

        maxWithdraw: '每笔最高',

        btnName: '完成',

        bankName: '',

        cardId: '',

        bankCardJson: bankCardJson,

        bankImg: '',

        bankNo: '',

        amountMax: '',//最大提现金额
        amountMin: '',//最小提现金额
        balance: '',//账户余额
        dayMaxAmount: '',//每日最大提现金额
        monthMaxAmount: '',//每月最大提现金额
        rate: '',//费率,

        psShow: false,

        withdrawMoney: '',

        date: '',

        startDate: '',

        newDate: '长期有效',

        cycleShow: false,

        cycleList: [

          {
            flex: 1,
            values: ['按月循环','按周循环','按天循环']
          }

        ],

        cycleType: '按月循环',

        char: '',

        firstTimeShow: false,

        firstTimeList: [

          {
            flex: 1,
            values: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日","28日"]
          }

        ],

        firstTimeType: '15日'

      }

    },

    mounted () {

      this.data();

    },

    methods: {

      data: function () {

        if(!!this.$store.bankCardId){

          this.bankName = this.$store.bankName;

          this.cardId = this.$store.bankCardId;

          this.bankImg = this.getBankImg(this.bankName);

          this.bankNo = this.$store.bankNo;

        }else{

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

            var bank = res.data.data[0];

            this.bankName = bank.bankName;

            this.cardId = bank.bankCardId;

            this.bankImg = this.getBankImg(this.bankName);

            this.bankNo = bank.bankNo;

          })

        }

        /**
         * 接口：检测用户发起提现操作
         * 请求方式：GET
         * 接口：user/work/checkwithdraw
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkwithdraw'
        }).then(res=>{

          this.amountMax = res.data.data.amountMax;
          this.amountMin = res.data.data.amountMin;
          this.balance = res.data.data.balance;
          this.dayMaxAmount = res.data.data.dayMaxAmount;
          this.monthMaxAmount = res.data.data.monthMaxAmount;
          this.rate = res.data.data.rate;

        });

        this.date = new Date((new Date()).getTime()+60*60*24*1000);

        this.startDate = this.date.getFullYear() + '-' + (this.date.getMonth()+1) + '-' + (this.date.getDate());

      },



      getBankImg: function (bankName) {

        for(var bankCard of this.bankCardJson){
          if(bankCard.name == bankName){
            return bankCard.img;
          }
        }

      },


      selectTime: function () {

        this.newDate = this.date.getFullYear() + '' + ((this.date.getMonth()+1)+'').padStart(2,'0') + (this.date.getDate() + '').padStart(2,'0');

      },


      cancelTime: function () {

        this.date = new Date((new Date()).getTime()+60*60*24*1000);

      },


      selectTimeShow: function () {

        /*var div = document.getElementsByClassName('picker-slot')[2];

        var divLong = div.getElementsByClassName('picker-item')[0];

        divLong.innerText = '长期有效';*/

        this.$refs.date.open();

      },



      cycleChange: function (component,value) {

        this.char = value[0];

      },



      cycleConfirm: function () {

        this.cycleType = this.char;

        this.cycleShow = false;

      },


      firstTimeChange: function (componet,value) {

        this.char = value[0];

      },


      firstTimeConfirm: function () {

        this.firstTimeType = this.char;

        this.firstTimeShow = false;

      }


    },



    watch: {

      withdrawMoney: function (newVal, oldVal) {

        if(oldVal.length < newVal.length){

          if(this.withdrawMoney != '到期提现全部余额'){

            (Number.isNaN(+this.withdrawMoney)) && (this.withdrawMoney = oldVal);

            (+this.withdrawMoney > +this.dayMaxAmount) && (this.withdrawMoney = this.dayMaxAmount);

            (+this.withdrawMoney < +this.amountMin) && (this.withdrawMoney = this.amountMin);

            ((this.withdrawMoney + '').indexOf('.') != -1) && ((this.withdrawMoney + '').split('.')[1].length > 2) && (this.withdrawMoney = (+this.withdrawMoney).toFixed(2));

          }

        }

      }



    }

  }
</script>
<style lang="less" scoped>
  @import "add_booking_withdrawals.less";
</style>
<style scoped>
  .button + .mint-popup{
    background-color: transparent;
  }
  .mint-popup>.button{
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .mint-popup>.button>.cancel, .mint-popup>.button>.confirm{

    padding: 5px 10px;
    font-size: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;

  }
</style>
