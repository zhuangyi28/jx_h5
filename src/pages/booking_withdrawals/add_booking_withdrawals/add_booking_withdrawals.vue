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
      <div class="title">提现金额<span class="help color_text" v-on:click="showPs">?</span></div>
      <div class="withdraw_input">
        <span>￥</span>
        <input type="text" v-bind:placeholder="maxWithdraw+amountMax+'元'" v-model="withdrawMoney" v-on:blur="moneyToFixed">
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
            <div>首次提现： <span class="color_text">{{firstTimeBooking}}</span></div>
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
        <input type="text" placeholder="选填，1-10个字" maxlength="10" v-model="remark">
      </div>
    </div>
    <div class="agreement">
      <input type="checkbox" name="agree" id="agree">
      <label for="agree">同意</label><span class="color_text">《预约提现服务协议》</span>
    </div>
    <orangeBtn v-bind:name="btnName" v-on:clickEvent="handleClick"></orangeBtn>
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

    <passwordBox v-on:clickEvent="submit" v-if="passwordBoxShow" v-on:boxClose="boxClose"></passwordBox>

  </div>
</template>
<script>
  import { bankCardJson } from "../../../../static/js/bankCardJson"
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import passwordBox from '../../../components/password_box/password_box'

  export default {

    name: 'addBookingWithdrawals',

    components: {

      orangeBtn: orangeBtn,

      passwordBox: passwordBox

    },

    data () {

      return {

        maxWithdraw: '每笔最高',//预约提现限额

        btnName: '完成',//按钮名称

        bankName: '',//银行名称

        cardId: '',//银行卡代码

        bankCardJson: bankCardJson,//银行logo列表

        bankImg: '',//银行logo

        bankNo: '',//银行卡号码

        amountMax: '',//最大提现金额
        amountMin: '',//最小提现金额
        balance: '',//账户余额
        dayMaxAmount: '',//每日最大提现金额
        monthMaxAmount: '',//每月最大提现金额
        rate: '',//费率,

        psShow: false,//预约提现介绍显示

        withdrawMoney: '',//预约提现金额

        date: '',//提现截止时间

        startDate: '',//时间插件开始时间

        newDate: '',//页面显示的提现截止时间

        cycleShow: false,//周期选择插件

        cycleList: [

          {
            flex: 1,
            values: ['按月循环','按周循环','按天循环']
          }

        ],//周期显示插件数据

        cycleType: '按月循环',//提现周期值

        char: '',//临时变量，临时保存数据

        firstTimeShow: false,//首次开始提现插件

        firstTimeList: [

          {
            flex: 1,
            values: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日","28日"]
          }

        ],//首次开始提现插件数据

        firstTimeType: '15日',//首次开始提现时间（每月）

        firstTimeBooking: '',//首次开始提现事件（最近一次）

        passwordBoxShow: false,//密码输入显示

        params: {},//添加预约参数

        remark: '',//备注

      }

    },

    mounted () {

      this.data();

    },

    methods: {

      data: function () {

        /**
         * 接口：检测用户发起添加预约操作操作
         * 请求方式：GET
         * 接口：user/work/checkwithdraw
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkappointment'
        }).then(res=>{

          this.amountMax = res.data.data.amountMax;
          this.amountMin = res.data.data.amountMin;
          this.balance = res.data.data.balance;
          this.dayMaxAmount = res.data.data.dayMaxAmount;
          this.monthMaxAmount = res.data.data.monthMaxAmount;
          this.rate = res.data.data.rate;

          var bank;

          (!!this.$store.bank) ? (bank = this.$store.bank) : (bank = res.data.data.userBankCardDTOList[0]);

          this.bankName = bank.bankName;

          this.cardId = bank.bankCardId;

          this.bankNo = bank.bankNo;

          this.bankImg = this.getBankImg(this.bankName);

          this.date = new Date((new Date()).getTime()+60*60*24*1000);

          this.startDate = this.date.getFullYear() + '-' + (this.date.getMonth()+1) + '-' + (this.date.getDate());

          this.firstTimeBooking = this.firstTimeNear(15);

        });

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

        this.firstTimeBooking = this.firstTimeNear(this.firstTimeType);

        this.firstTimeShow = false;

      },



      firstTimeNear: function (time) {

        var now = new Date();

        if(parseInt(time) > now.getDate()){

          return now.getFullYear() + '.' + ((now.getMonth()+1)+'').padStart(2,'0') + '.' + (parseInt(time)+'').padStart(2,'0');

        }else{

          return now.getFullYear() + '.' + ((now.getMonth()+2)+'').padStart(2,'0') + '.' + (parseInt(time)+'').padStart(2,'0');

        }

      },



      submit: function (password, type) {

        console.log(password, type);

        this.params[type] = password;

        /**
         * 接口：用户添加预约提现操作
         * 请求方式：GET
         * 接口：user/user/addappointment
         * 入参：bankCardId, banlane, appoinmentType, startDate, endDate, remark, payPassword, code
         **/
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'user/user/addappointment',
          params: this.params
        }).then(res=>{

          if(res.data.code == '0000'){

            this.$store.data = res.data.data;

            this.passwordBoxShow = false;

            this.$router.push('/addBookingSuccess');

          }else{

            this.$toast({

              message: res.data.msg,
              position: 'middle',
              duration: 1500

            });

            this.$indicator.close();

            this.passwordBoxShow = false;

          }

        })


      },



      boxClose: function (bool) {

        this.passwordBoxShow = bool;

      },




      handleClick: function () {

        var checkbox = document.getElementById('agree');

        if(!checkbox.checked){

          this.$toast({

            message: '请同意《预约提现服务协议》',
            position: 'middle',
            duration: 1500
          });

          return;

        }

        if(this.withdrawMoney){

          this.params.banlane = this.withdrawMoney;

        }else{

          this.$toast({

            message: '请输入提现金额',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        (!!this.date) ? (this.params.endDate = (this.date.getFullYear()) + '-' + ((this.date.getMonth()+1)+'').padStart(2,'0') + '-' + ((this.date.getDate())+'').padStart(2,'0')):
          (this.params.endDate = null);

        switch (this.cycleType) {

          case '按月循环':

            this.params.appoinmentType = '1';

            break;

          case '按周循环':

            this.params.appoinmentType = '2';

            break;

          case '按天循环':

            this.params.appoinmentType = '3';

            break;

        }

        this.params.startDate = this.firstTimeBooking.split('.').join('-');

        console.log(this.params.startDate);

        this.params.bankCardId = this.cardId;

        this.params.remark = this.remark;

        this.passwordBoxShow = true;

      },



      showPs: function () {

        this.$messagebox({

          title: '提示',
          message: `*手续费：0%，单卡单笔${this.amountMax}元，当日${this.dayMaxAmount}元，当月${this.monthMaxAmount}元</br>
          *若提现金额超出单笔最高额度，将分多笔进行提现`,
          confirmButtonText: '确定',
          closeOnClickModal: true,
          confirmButtonClass: 'confirm_btn_orange',

        })

      },




      moneyToFixed: function () {

        this.withdrawMoney = (+this.withdrawMoney).toFixed(2);

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



    },



    destroyed () {

      this.$indicator.close();

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
