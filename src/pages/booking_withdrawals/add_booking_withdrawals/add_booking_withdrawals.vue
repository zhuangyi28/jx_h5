<template>
  <div class="add_booking_withdrawals" v-on:click="keyboardShow = false" v-bind:class="{'overflow' : pickerShow || dateShow}">

    <!--银行卡选择-->
    <div class="bank_choose" v-on:click="$router.push('/bankCard')">
      <div>
        <div class="bank_icon">
        <img v-bind:src="bankImg">
      </div>
        <div class="bank_information">
          <div class="bank_name">{{bankName}}</div>
          <div class="bank_card">尾号{{bankNo.substr(-4)}}{{cardType}}</div>
        </div>
      </div>
      <span class="allow_right"></span>
    </div>

    <!--提现输入-->
    <div class="withdraw_detail">
      <div class="title">提现金额<span class="help btn_border" v-on:click="psShow=true">?</span></div>
      <div class="withdraw_input">
        <span>￥</span>
        <div v-on:click="keyboardShow = true" v-on:click.stop>
          <span class="withdraw_money" v-if="!!withdrawMoney">{{withdrawMoney}}</span>
          <span class="flicker" v-if="keyboardShow == true"></span>
          <span v-if="!withdrawMoney">每笔最高{{dayMaxAmount}}元</span>
        </div>
        <span class="color_text" v-on:click="withdrawMoney = '到期提现全部余额'">全部提现</span>
      </div>
    </div>

    <!--预约选项-->
    <div class="withdraw_option">

      <!--提现周期-->
      <div class="withdraw_cycle" v-on:click="cycleSelect">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_cycle.png"></div>
          <div>提现周期</div>
        </div>
        <div class="option">
          <span>{{cycleType}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--首次开始时间-->
      <div class="withdraw_start" v-on:click="firstTimeSelect">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_start.png"></div>
          <div>
            <div>首次开始时间</div>
            <div>首次提现： <span class="color_text">{{firstNearTime}}</span></div>
          </div>
        </div>
        <div class="option">
          <span v-if=" cycleType== '按月循环'">每月{{firstTime}}</span>
          <span v-if="cycleType == '按周循环'">{{firstTime}}</span>
          <span v-if="cycleType == '按日循环'">{{firstTime}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--预约截止时间-->
      <div class="withdraw_end" v-on:click="getLastTime">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_end.png"></div>
          <div>
            <div>预约截止时间</div>
            <div v-show="!!lastDate">最后一次提现： <span class="color_text">{{lastDate}} 00:00</span></div>
          </div>
        </div>
        <div class="option">
          <span>{{lastDate}}</span>
          <span class="allow_right"></span>
        </div>
      </div>

      <!--备注-->
      <div class="withdraw_tips">
        <div class="title">
          <div><img src="../../../../static/images/cash_appt_tips.png"></div>
          <div>备注</div>
        </div>
        <input type="text" placeholder="选填，1-10个字" maxlength="10" @blur="lostPointFn" v-model="remark">
      </div>

    </div>

    <!--提现服务协议-->
    <div class="agreement">
      <input type="checkbox" name="agree" id="agree" checked>
      <label for="agree">同意</label><span class="color_text" v-on:click="$router.push('/bookingAgreement')">《预约提现服务协议》</span>
    </div>

    <orangeBtn v-bind:name="btnName" v-on:clickEvent="checkPage"></orangeBtn>

    <div class="limit">
      <div>温馨提示</div>
      <div>限额说明：单卡单笔{{amountMax}}元，当日{{dayMaxAmount}}元，当月{{monthMaxAmount}}元</div>
    </div>

    <!--提示弹框-->
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

    <!--时间组件-->

    <mt-datetime-picker ref="datetime" type="date" v-model="time" v-bind:startDate="new Date(startDate)" v-on:confirm="selectTime" v-on:cancel="dateComponentClose"></mt-datetime-picker>

    <!--提现周期选择组件-->
    <mt-popup v-model="pickerShow" position="bottom">
      <div class="button">
        <div class="cancel" v-on:click="pickerShow = false">取消</div>
        <div class="confirm" v-on:click="pickerSelect">确定</div>
      </div>
      <mt-picker v-bind:slots="popupData" v-on:change="cycleTypeChange"></mt-picker>
    </mt-popup>

    <!--密码/验证码输入组件-->
    <passwordBox v-if="passwordBoxShow" v-on:clickEvent="submitFn" v-on:boxClose="boxClose" v-on:getCode="getCode" v-on:getSoundCode="getSoundCode" ref="passwordbox"></passwordBox>

    <!--数字键盘组件-->
    <keyboard v-if="keyboardShow" v-bind:newNum="withdrawMoney" v-on:num="moneyInput" v-on:inputClose="keyboardShow=false" ref="keyboard"></keyboard>

  </div>
</template>
<script>
  import { bankCardJson } from "../../../../static/js/bankCardJson"
  import orangeBtn from '../../../components/orange_btn/orange_btn'
  import passwordBox from '../../../components/password_box/password_box'
  import keyboard from '../../../components/keyboard/calculation'

  export default {

    name: 'addBookingWithdrawals',

    components: {

      orangeBtn: orangeBtn,

      passwordBox: passwordBox,

      keyboard: keyboard

    },

    data () {

      return {

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

        cardType: '',//银行卡类型

        thisTime: '',//当前时间

        keyboardShow: false,//数组键盘组件显示状态

        popupData: [
          {
            values: []
          }
        ],//选择组件空值

        pickerType: '',//选择组件对应状态

        cycleData: [
          {
            flex: 1,
            values: ['按月循环','按周循环','按日循环'],
            defaultIndex: 0
          }
        ],//提现周期选择组件数据
        pickerShow: false,//提现周期组件显示状态
        char: '',//临时变量

        cycleType: '按月循环',//提现周期

        monthData: [
          {
            flex: 1,
            values: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日","28日"],
            defaultIndex: 0,
          }
        ],//按月循环组件数据

        weekData: [
          {
            flex: 1,
            values: ['每周一','每周二','每周三','每周四','每周五','每周六','每周日'],
            defaultIndex: 0
          }
        ],//按周循环组件数据

        firstTime: '',//首次开始时间

        firstNearTime: '',//首次提现时间

        time: '',//时间组件参数

        startDate: '',//时间组件开始日期

        dateComponent: '',//时间组件调用位置

        lastDate: '',//预约截止时间

        remark: '',//备注

        dateShow: false,//时间组件显示状况

        passwordBoxShow: false,//密码/验证码组件显示状况

        soundCodeTime: 60,//语音验证码倒计时

        params: {},//调用接口数据
      }

    },

    mounted () {

      this.init();

    },

    methods: {


      //备注失去焦点恢复页面（ios输入法）
      lostPointFn:function () {

        document.body.scrollTop =document.documentElement.scrollTop = window.pageYOffset = 100;

      },


      //初始化页面
      init: function () {

        var _this = this;

        var div = document.getElementsByClassName('add_booking_withdrawals')[0];

        div.addEventListener('click',function () {

          if(event.target.classList.contains('v-modal')){

            _this.dateShow = false;

          }

        });

        /**
         * 接口：检测用户发起添加预约操作
         * 请求方式：GET
         * 接口：user/work/checkappointment
         * 入参：null
         **/
        this.$http({
          method: 'get',
          url: process.env.API_ROOT + 'user/work/checkappointment',
        }).then(res=>{

          this.amountMax = res.data.data.amountMax;
          this.amountMin = res.data.data.amountMin;
          this.balance = res.data.data.balance;
          this.dayMaxAmount = res.data.data.dayMaxAmount;
          this.monthMaxAmount = res.data.data.monthMaxAmount;
          this.rate = res.data.data.rate;

          this.getBankCard(res.data.data.userBankCardDTOList);

          this.firstTime  = this.getFirstDate('month');
          this.firstNearTime = this.getFirstTime(this.firstTime);

        });


      },



      //获取预约提现银行卡信息
      getBankCard: function (bankcardlist) {

        if(!bankcardlist){

          this.$messagebox({
            title: '提示',
            message: '您还没有可用于提现的银行卡，请先添加一张储蓄卡',
            showCancelButton:true,
            confirmButtonText: '去添加',
            cancelButtonText: '取消',
            closeOnClickModal: true,
            cancelButtonClass: 'cancel_btn',
            confirmButtonClass: 'confirm_btn_orange',
          }).then(res=>{

            if(res == 'confirm'){

              this.$router.push('/addCard');

            }else if(res == 'cancel') {

              this.$router.go(-1);

            }

          });

          return;

        }

        var bankcard;

        if(!!this.$store.bank){

          for(var card of bankcardlist){

            (this.$store.bank.bankNo == card.bankNo) && (bankcard = card);

          }

        }

        (!bankcard) && (bankcard = bankcardlist[0]);

        this.bankName = bankcard.bankName;
        this.bankNo = bankcard.bankNo;
        this.cardId = bankcard.bankCardId;
        (bankcard.cardType == '1') && (this.cardType = '储蓄卡');
        (bankcard.cardType == '2') && (this.cardType = '信用卡');

        this.bankImg = this.getBanklogo(bankcard.bankName);

      },



      //获取银行logo
      getBanklogo: function (bankname) {

        for(var bankcard of this.bankCardJson){

          if(bankcard.name == bankname){

            return bankcard.img;

          }

        }

      },



      //获取时间   timechange:时间差距，单位为天   showtype: 年月日中间符号   needtime: 是否需要显示具体时间 true/false
      getThisTime: function (timechange, showtype, needtime) {

        var time;
        var timeshow;

        if(+timechange > 0){

          time = new Date((new Date()).getTime()+60*60*24*1000*timechange);

        }else if(timechange == 0){

          time = new Date();

        }else if(+timechange < 0){

          this.cycleType == '按月循环' && (time = this.getFirstTimeNextMonth(timechange));

          this.cycleType == '按周循环' && (time = this.getThisTime(+timechange+7));

        }

        if(showtype){

          timeshow = this.changeTimeType(time, showtype, needtime);
          return timeshow;

        }else{

          return time;

        }

      },



      //更改时间显示状态
      changeTimeType: function (time, showtype, needtime) {

        var year = time.getFullYear();
        var month = (time.getMonth()+1+'').padStart(2,'0');
        var day = (time.getDate() + '').padStart(2,'0');
        var datetime;

        if(needtime){

          var hour = (time.getHours() + 1 + '').padStart(2,'0');
          datetime = year + showtype + month + showtype + day + ' ' + hour + ':' + '00';

        }else{

          datetime = year + showtype + month + showtype + day;

        }

        return datetime;

      },



      //数字键盘组件数字输入
      moneyInput: function (num) {

        this.withdrawMoney = num;

      },



      //提现周期弹出框滑动
      cycleTypeChange: function (component, value) {

        this.char = value[0];

      },



      //提现周期选择组件弹出
      cycleSelect: function () {

        this.cycleData[0].defaultIndex = this.cycleData[0].values.indexOf(this.cycleType);

        this.popupData = this.cycleData;

        this.pickerType = 'cycle';

        this.pickerShow = true;

      },



      //组件值选择
      pickerSelect: function () {

        (this.pickerType == 'cycle') && (this.cycleType = this.char);

        (this.pickerType == 'firstTime') && (this.firstTime = this.char);

        if(this.pickerType != 'firstTime'){

          (this.cycleType == '按月循环') && (this.firstTime = this.getFirstDate('month'));

          (this.cycleType == '按周循环') && (this.firstTime = this.getFirstDate('week'));

          (this.cycleType == '按日循环') && (this.firstTime = this.getFirstDate('day'));

        }

        this.firstNearTime = this.getFirstTime(this.firstTime);

        this.pickerShow = false;

      },


      //首次开始事件组件弹出
      firstTimeSelect: function () {

        this.pickerType = 'firstTime';

        if(this.cycleType == '按月循环'){

          this.popupData = this.monthData;

        }else if(this.cycleType == '按周循环'){

          this.popupData = this.weekData;

        }else if(this.cycleType == '按日循环'){

          this.dateComponent = 'firstTime';

          this.startDate = this.getThisTime(0, '-', false);

          this.time = new Date(this.firstTimeDate);

          this.dateShow = true;

          this.$refs.datetime.open();

          return;

        }

        this.popupData[0].defaultIndex = this.popupData[0].values.indexOf(this.firstTime);

        this.pickerShow = true;

      },


      //获取首次开始日期
      getFirstDate: function (type) {

        var thistime = new Date();

        var firstDate;

        (type == 'month') && (firstDate = thistime.getDate() + '日');

        (type == 'week') && (firstDate = this.getFirstWeek(thistime.getDay()));

        (type == 'day') && (firstDate = this.getFirstDay('now'));

        return firstDate;

      },



      //获取周日期
      getFirstWeek: function (date) {

        var arr = ['每周日','每周一','每周二','每周三','每周四','每周五','每周六'];

        return arr[date];

      },



      //获取首次开始日期  参数为now  或者   日期的字符串（'2019-05-10'）
      getFirstDay: function (date) {

        if(date == 'now'){

          return this.getThisTime(0,'-',false);

        }else{

          return this.changeTimeType(new Date(date),'-',false);

        }

      },



      //获取首次提现时间
      getFirstTime: function (date) {

        var firstNearTime;

        if(this.cycleType == '按月循环'){

          firstNearTime = this.getFirstNearTime(date, 'month');

        }else if(this.cycleType == '按周循环'){

          firstNearTime = this.getFirstNearTime(date, 'week');

        }else if(this.cycleType == '按日循环'){

          firstNearTime = this.getThisTime(0, '-', true);

        }

        return firstNearTime;

      },



      //获取首次提现时间(精确到小时)
      getFirstNearTime: function (date, type) {

        var weekarr = [0, '每周一','每周二','每周三','每周四','每周五','每周六','每周日'];
        var thistime = new Date();
        var timechange;
        var day;

        if(type == 'month'){

          day = parseInt(date);
          timechange = day - thistime.getDate();

        }else if(type == 'week'){

          day = weekarr.indexOf(date);
          timechange = day - thistime.getDay();

        }

        if(timechange){

          return this.getThisTime(timechange, '-' , false) + ' 01:00';

        }else{

          return this.getThisTime(0, '-', true);

        }

      },


      //获取月循环下月日期
      getFirstTimeNextMonth: function (timechange) {

        var newtime = this.changeTimeType(new Date(), '-' , false);

        var newtimearr = newtime.split('-');

        newtimearr[1] = (+newtimearr[1]+1+'').padStart(2,'0');

        newtimearr[2] = (+newtimearr[2]+timechange+'').padStart(2,'0');

        newtime = newtimearr.join('-');

        return new Date(newtime);

      },


      //获取时间组件数据
      selectTime: function () {

        if(this.dateComponent == 'firstTime'){

          var time;

          this.firstTime = this.changeTimeType(this.time, '-' ,false);

          (this.firstTime == this.changeTimeType(new Date(), '-', false))?
          (this.firstNearTime = this.changeTimeType(new Date(), '-', true)):
            (this.firstNearTime = this.firstTime + ' 01:00');

        }else if(this.dateComponent == 'endTime'){

          this.lastDate = this.changeTimeType(this.time, '-', false);

        }

        this.dateShow = false;

      },


      //获取预约截止时间
      getLastTime: function () {

        this.dateComponent = 'endTime';

        var firstTime = this.firstNearTime.split('-');

        firstTime[2] = firstTime[2].slice(0,2);

        firstTime[2] = (+firstTime[2]+1+'').padStart(2,',');

        this.startDate = firstTime.join('-');

        (!this.lastDate) && (this.lastDate = this.startDate);

        this.time = new Date(this.lastDate);

        this.dateShow = true;

        this.$refs.datetime.open();

      },



      //检查页面数据
      checkPage: function () {

        var message;

        if(!this.withdrawMoney){

          message = '请输入提现金额';

        }else if(!this.lastDate){

          message = '请选择截止时间';

        }else if(new Date(this.firstTimeDate) >= (new Date(this.lastDate))){

          message = '提示：截止日期必须大约首次执行时间';

        }else if(!document.getElementById('agree').checked){

          message = '请同意《预约提现服务协议》';

        }

        if(message){

          this.$toast({

            message: message,
            position: 'middle',
            duration: 1500

          });

        }else{

          switch (this.cycleType) {

            case '按月循环':

              this.params.appoinmentType = '1';

              break;

            case '按周循环':

              this.params.appoinmentType = '2';

              break;

            case '按日循环':

              this.params.appoinmentType = '3';

              break;

          }

          (this.withdrawMoney == '到期提现全部余额') ? (this.params.banlane = '∞') : (this.params.banlane = this.withdrawMoney);

          this.params.startDate = this.firstTimeDate;

          this.params.bankCardId = this.cardId;

          this.params.remark = this.remark;

          this.params.endDate = this.lastDate;

          console.log(this.params);

          this.passwordBoxShow = true;

        }

      },



      //时间组件关闭事件
      dateComponentClose: function () {

        this.dateShow = false;

      },


      //密码/验证码组件关闭事件
      boxClose: function (bool) {

        this.passwordBoxShow = bool;

      },


      //获取验证码事件
      getCode: function () {

        /**
         * 接口：预约提现发送短信验证码
         * 请求方式：GET
         * 接口：jx/action/appointment
         * 入参：null
         **/
        this.$http({
          method: 'post',
          url: process.env.API_ROOT + 'jx/action/appointment'
        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          (res.data.code != '0000') && (this.$refs.passwordbox.seconds = 0);

        })

      },


      //获取语音验证码事件
      getSoundCode: function () {

        if(this.soundCodeTime < 60){

          this.$toast({

            message: '操作过于频繁，请稍后再试',
            position: 'middle',
            duration: 1500

          });

          return;

        }

        /**
         * 接口：预约提现发送语音验证码
         * 请求方式：GET
         * 接口：jx/action/appointmentaudio
         * 入参：null
         * */

        this.$http({

          method: 'get',

          url: process.env.API_ROOT + 'jx/action/appointmentaudio',


        }).then(res=>{

          this.$toast({

            message: res.data.msg,
            position: 'middle',
            duration: 1500

          });

          if(res.data.code == '0000'){

            this.soundCodeTime = 0;

            var addTime = setInterval(()=>{

              this.soundCodeTime++;

              if(this.soundCodeTime > 60){

                clearInterval(addTime);

              }

            },1000);

          }

        })

      },


      //提交预约提现
          submitFn: function (password, type) {

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

            this.$router.replace('/addBookingSuccess');

          }else{

            this.$indicator.close();

            if((res.data.code != '-4') && (res.data.code != '-1')){

              this.$messagebox({
                title: '提示',
                message: res.data.msg,
                confirmButtonText: '确定',
                closeOnClickModal: true,
                confirmButtonClass: 'confirm_btn_orange',
              });

              this.passwordBoxShow = false;

            }else{

              this.$toast({

                message: res.data.msg,
                position: 'middle',
                duration: 1500

              });

            }

          }

        });

      }

    },


    watch: {

      //监听提现金额格式
      withdrawMoney: function (newValue, oldValue) {

        if(this.withdrawMoney == '到期提现全部余'){

          this.withdrawMoney = '';

          this.$refs.keyboard.money = '';

        }else if(this.withdrawMoney.length > 10){

          this.withdrawMoney = this.withdrawMoney.slice(0,10);

          this.$refs.keyboard.money = this.$refs.keyboard.money.slice(0,10);

        }

      },



    },


    computed: {

      //首次提现日期
      firstTimeDate: function () {

        return this.firstNearTime.split(' ')[0];

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
